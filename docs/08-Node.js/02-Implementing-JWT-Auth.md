# Implementing Token-based Authentication (JWT)

## Let's implement Token-based Authentication (JWT)!

Now that we know what token-based authentication is, let’s see how we can implement token-based authentication (using JWT) in Node.js.

## `jsonwebtoken`

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is a popular Node.js library used for working with JSON Web Tokens (JWTs). It provides convenient methods for creating, signing, verifying, and decoding JWTs. It is commonly used for user authentication and authorization in JavaScript server applications, and often used directly or indirectly through frameworks or libraries like `passport-jwt`.

But, in this posting, let's implement JWT directly with `jsonwebtoken`, not using any other frameworks or libraries.

:::tip 
When issuing a JWT token, the server must ***sign*** the token before sending it to the client. This signing process ensures that the server can later ***verify*** the token when it is received from the client. 

=> Understanding of this token-based authentication process is required!
::: 

### 1) Generate and Sign a JWT

`jwt.sign(payload, secretOrPrivateKey, [options, callback])`

To issue a token, the **`jsonwebtoken`** library provides the **`sign()`** function. It takes the payload, which is the JSON data to be included in the token, as the first argument, and the key as the second argument.

```jsx
const token = jwt.sign({ email: "test@user.com" }, "our_secret", {
  expiresIn: "1h",
});
```

HS256 is used as the default algorithm, which is a symmetric key algorithm where the same key is used for encryption and decryption. 

If you want to use an asymmetric key algorithm like RS256, you need to pass the private key as the second argument and specify the **`algorithm`** option as the third argument. However, when verifying the token later, you should use the public key instead of the same key.

```jsx
const privateKey = fs.readFileSync("private.key");
const token = jwt.sign({ email: "test@user.com" }, privateKey, {
  algorithm: "RS256",
});
```

### 2) Verifying and decoding a JWT

**`jwt.verify(token, secretOrPublicKey, [options, callback])`**

JWT tokens can be verified using the **`verify()`** function provided by the **`jsonwebtoken`** library. It takes the token string as the first argument and the key as the second argument.

```jsx
const token = jwt.sign({ email: "test@user.com" }, "our_secret");
const verified = jwt.verify(token, "our_secret"); // secret key 로 서명을 복호화
console.log(verified);
// { email: 'test@user.com', iat: 1678920125 }
```

In the above code, you can see that in addition to the JSON data passed to the **`sign()`** function, there is an additional `iat` claim. The additional data stored in the JWT token is called ‘claim’. The `iat` claim stands for "issued at" and contains a Unix timestamp representing the time when the token was issued.

```jsx
const token = jwt.sign({ email: "test@user.com" }, "our_secret", {
  expiresIn: "1m",
});
const verified = jwt.verify(token, "our_secret");
console.log(verified);
// { email: 'test@user.com', iat: 1678922236, exp: 1678922296 }
```

In the second code snippet, we generate a token that expires in 1 minute. When verifying the token, you can see that in addition to the **`iat`** claim, there is now an **`exp`** claim added to the JSON data. The **`exp`** claim stands for "expiration time" and represents the timestamp when the token will expire. If you subtract the **`iat`** value from the **`exp`** value, you will get exactly 60 seconds, indicating that the token is valid for one minute.

## 0. Environment

```jsx
# 폴더 생성 및 열기
mkdir jwt-practice
cd jwt-practice

# package.json 생성
npm init -y

# 필요한 모듈 설치
npm install http express body-parser jsonwebtoken dotenv
```

## 1. Application code

- Folder Structure

```jsx
📦jwt-practice
 ┣ 📂node_modules
 ┣ 📜.env
 ┣ 📜jwt.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

- **.env**

```jsx
ACCESS_TOKEN_SECRET=d7d34917fbd11fdd89357decfb506b5e563e418bf7b136d30436dfa0dddbd4a6e318099c8e4918b87fd8e47e23196c441a5c892a6895d6061e27f89ed1ba19d6
REFRESH_TOKEN_SECRET=3a13ce20d9e44269e1a01f31e6cb67b6f200450ecc7cf09c3d0a199e512037422145d7727fa874e128bfbbc198b06e99ae1f6e24b57e8cd598102b61bffa8e69
```

- Set up server using JWT with jsonwebtoken

```jsx
// jwt.js

require("dotenv").config();

const http = require("http");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { request } = require("../session-practice/db");

const app = express();
const server = http.createServer(app);
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 임시 id, pw 배열
const users = [
    { id: "hello", pw: "world" },
    { id: "good", pw: "bye" },
];

// 로그인 id, pw 확인
const login = (id, pw) => {
    let len = users.length;

    for (let i = 0; i < len; i++) {
        if (id === users[i].id && pw === users[i].pw) return id;
    }

    return "";
};

// access token을 secret key 기반으로 생성
const generateAccessToken = id => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

// refersh token을 secret key  기반으로 생성
const generateRefreshToken = id => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "180 days",
    });
};

// login 요청 및 성공시 access token, refresh token 발급
app.post("/login", (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;

    let user = login(id, pw);
    if (user === "") return res.sendStatus(500);

    let accessToken = generateAccessToken(user);
    let refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
});

// access token의 유효성 검사
const authenticateAccessToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            console.log(error);
            return res.sendStatus(403);
        }

        req.user = user; // req.user is passed to next middleware
        next();
    });
};

// access token을 refresh token 기반으로 재발급
app.post("/refresh", (req, res) => {
    let refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
            if (error) return res.sendStatus(403);

            const accessToken = generateAccessToken(user.id);

            res.json({ accessToken });
        }
    );
});

// access token 유효성 확인을 위한 예시 요청
app.get("/user", authenticateAccessToken, (req, res) => {
    console.log(req.user);
    res.json(users.filter(user => user.id === req.user.id));
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
```

---

Reference.

[https://www.daleseo.com/js-jwt/](https://www.daleseo.com/js-jwt/)

[https://millo-l.github.io/Nodejs-JWT-사용하기/](https://millo-l.github.io/Nodejs-JWT-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)