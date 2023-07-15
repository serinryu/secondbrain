# Passport + Session / JWT / OAuth2.0

## 🎫 What is Passport?

Passport middleware is **a Node.js module that makes it easy to implement authentication** in your web applications. It provides a number of strategies for authenticating users, such as username and password authentication, social media authentication, and two-factor authentication. In other words, it provides a flexible and modular approach to handle user authentication, making it easier to integrate various login strategies. 

Passport middleware is a popular choice for authentication in Node.js applications because it is easy to use and provides a number of features that make it secure. It is also well-documented and supported by a large community of developers. If you are looking for a secure and easy-to-use authentication solution for your Node.js application, then Passport middleware is a good option.

:::caution
Of course it is possible to implement authentication yourself. Passport is just a middleware that makes it easy to implement authentication in your Node.js application. 
👉 Check the previous articles that I implement login authentication itself witout any help of passport.
:::

### Benefits of using Passport middleware

- **Easy to use:** Passport middleware is easy to set up and use. There are a number of tutorials available online that can help you get started.
- **Secure:** Passport middleware provides a number of features that make it secure, such as support for hashing passwords and two-factor authentication.
- **Flexible:** Passport middleware supports a number of authentication strategies, so you can choose the one that best suits your needs.
- **Well-documented:** Passport middleware is well-documented and supported by a large community of developers. This makes it easy to find help if you need it.

### Strategies that Passport supports

You can find more information about the strategies that Passport supports on the Passport website: [https://www.passportjs.org/](https://www.passportjs.org/).

- **Local strategy:** This strategy authenticates users using a username and password.
- **JWT strategy:** This strategy authenticates users using JSON Web Tokens (JWTs).
- **OAuth strategy:** This strategy authenticates users using OAuth 2.0 providers, such as Google, Facebook, and Twitter.
- **OpenID Connect strategy:** This strategy authenticates users using OpenID Connect providers, such as Google and Microsoft.

| Strategy | Library |
| --- | --- |
| Local | passport-local |
| OAuth | passport-oauth |
| OpenID Connect | passport-openidconnect |
| JWT | passport-jwt |

You need to install another library to use strategies that Passport supports. Passport is a middleware that helps you authenticate users in your Node.js application. It does not provide any strategies itself, but it provides a framework for you to implement your own strategies or use third-party strategies.


> 
> **Session authentication**
> 
> Session authentication uses a cookie to store the user's session ID. This ID is then used to authenticate the user on subsequent requests. Session authentication is easy to implement and can be used to protect both RESTful and stateful APIs. However, session authentication can be vulnerable to session hijacking attacks.
> 
> **JWT authentication**
> 
> JWT authentication uses a JSON Web Token (JWT) to authenticate the user. A JWT is a token that contains the user's identity and other information. JWTs are signed or encrypted, which makes them more secure than session cookies. JWT authentication is also stateless, which means that the server does not need to store any session information. This makes JWT authentication more scalable than session authentication.
> 
> In terms of popularity, JWT authentication is becoming more popular than session authentication. This is because JWTs are more secure and scalable than session cookies. However, session authentication is still a popular option for simple applications. 
> 👉 If you need a secure and scalable authentication method, then JWT authentication is a good option. If you need a simple and easy-to-implement authentication method, then session authentication is a good option.

## 1. **Passport + Session**
Let’s implement Passport Middleware for Login and MySQL for Session Storage!

### 1) Install dependencies

```
$ npm install express passport passport-local express-session express-mysql-session bcrypt
```

- **Express:** Express is a web framework for Node.js.
- **Passport:** Passport is a middleware for Node.js that makes it easy to implement authentication in your web applications.
- **Passport-local:** Passport-local is a library that provides the implementation of the local strategy for Passport. The local strategy authenticates users using a username and password.
- **Express-session:** Express-session is a middleware for Express that provides session management. Session management allows you to store data about a user's session in the browser. This data can be used to keep track of the user's state, such as their login status.
    
    In express-session library, we can configure to change how/where the session data is stored on the server. By default, this data is stored in the memory, i.e., `MemoryStore`. But we will use MySQL for session storage this time. (express-mysql-session)
    
- **Express-mysql-session:** Express-mysql-session is a middleware for Express that stores session data in a MySQL database.

### 2) Configure Passport

First, let's set up our main server file, `index.js`, where we'll configure Express and Passport. We configure the session middleware to use the MySQL session store. 

**File: /src/index.js**

```jsx
// Import dependencies
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Create the Express app
const app = express();

// Configure MySQL session store
const sessionStore = new MySQLStore({
  // MySQL connection options
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Configure Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session middleware
app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Configure Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Import and use your routes
const routes = require('./routes');
app.use('/', routes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

```

Next, let's create the Passport configuration file, `passport/index.js`. This file will contain the strategies and serialization logic required for Passport authentication.

We import `passport` and the `LocalStrategy` from `passport-local`. We define the local strategy for login, where we find the user by their username and validate the password. We also implement the serialization and deserialization methods for user instances.  

**File: /src/passport/index.js**

```jsx
// Import dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import your user model (replace User with your own model)
const User = require('../models/User');

// Serialize and deserialize user instances
// These two method are necessary when using 'session'
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Define the local strategy for login
const passportConfig = {
    usernameField: 'userId',
    passwordField: 'password'
};

const passportVerify = async (userId, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: userId
            }
        });
        if (!user) {
            done(null, false, {
                message: 'You are not registered.'
            });
            return;
        }

        const compareResult = await bcrypt.compare(password, user.password);

        if (compareResult) {
            done(null, user); // login success, user is passed to req.user
            return;
        }

        done(null, false, {
            reason: 'password is not correct.'
        });
    } catch (error) {
        console.error(error);
        done(error);
    }
};  

module.exports = () => {
		// for local login
    passport.use('local', new LocalStrategy(passportConfig, passportVerify));  
};
```

### 3) Create the login route

Lastly, let's create the routes file, `routes.js`, where we'll define the login and protected routes.

We create an instance of the Express router and define the login route using `passport.authenticate('local')` middleware.  

If the user is authenticated, the `req.isAuthenticated()` method will return `true` and the user will be able to access the `/protected` route. If the user is not authenticated, the `req.isAuthenticated()` method will return `false` and the user will receive an unauthorized error.

You can also use the `req.user` property to get the user object if the user is authenticated. The `req.user` property will be a JavaScript object that contains the user's data, such as their username, email address, and role.

**File: /src/routes/user.js**
```jsx
// Import dependencies
const express = require('express');
const passport = require('passport');

// Create the router
const router = express.Router();

// Login route -> passport's local Strategy
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful!' });
});

// Protected route
router.get('/protected', (req, res) => {
  if (req.isAuthenticated()) { // passport method
    res.json({ message: 'You are authorized to access this route.' });
  } else {
    res.status(401).json({ message: 'Unauthorized access.' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(); // passport method
  res.json({ message: 'Logout successful!' });
});

// Export the router
module.exports = router;

```

### 4) Test

Here is an example of an HTTP request and response for the `/login` route:

**HTTP Request**

```jsx
POST /login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password"
}
```

**HTTP Response**

```jsx
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Logout successful!"
}
```

Check your session storage to see if session is well stored!

## 2. **Passport + JWT**

Let’s implement Passport Middleware for Login with JWT Authentication!

### 1) Install dependencies

```
$ npm install express passport passport-local passport-jwt jsonwebtoken bcrypt 
```

- **passport-jwt** : Passport-jwt is a library that provides the implementation of the JWT strategy for Passport. The JWT strategy authenticates users using JSON Web Tokens (JWTs).
- **jsonwebtoken :** jsonwebtoken is a library that is used to create and verify JSON Web Tokens (JWTs).

### 2) Configure Passport

Create a **`passport.js`** file in your project and configure Passport with the JWT strategy. We specify the strategy options to extract the JWT from the **`Authorization`** header as a bearer token and provide the JWT secret.

**File: /src/passport/index.js**
```jsx
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const passportConfig = {
    usernameField: 'userId',
    passwordField: 'password'
};

const passportVerify = async (userId, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: userId
            }
        });
        if (!user) {
            done(null, false, {
                message: 'You are not registered.'
            });
            return;
        }

        const compareResult = await bcrypt.compare(password, user.password);

        if (compareResult) {
            done(null, user); // login success, user is passed to req.user
            return;
        }

        done(null, false, {
            reason: 'password is not correct.'
        });
    } catch (error) {
        console.error(error);
        done(error);
    }
}; 

const JWTConfig = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'jwt-secret-key',
};

const JWTVerify = async (jwtPayload, done) => {
    try {
        // payload의 id값으로 유저의 데이터 조회
        const user = await User.findOne({
            where: {
                id: jwtPayload.id
            }
        });
        if (user) {
            done(null, user); // Verified, 유저 데이터 객체 전송
            return;
        } 
        done(null, false, {
            reason: '올바르지 않은 인증정보 입니다.'
        });
    } catch (error) {
        console.error(error);
        done(error);
    }
};

module.exports = () => {
  // for local login
  passport.use('local', new LocalStrategy(passportConfig, passportVerify)); 
  // for JWT Auth
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
};
```

### 3) Create the login route

If the login is successful, you should receive a token in the response. You can then use this token to access the `/protected` route.

**File: /src/routes/user.js**
```jsx
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login route (local login)
router.post('/signin',async (req, res, next) => {
	try { 
		passport.authenticate('local', (passportError, user, info) => {
			if (passportError || !user) {
				res.status(400).json({ message: info.reason });
				return;
			} 

			// req.login is password method => localStrategy, 
			// Not using session, cuz we will use JWT below.
			req.login(user, { session: false }, (loginError) => {
				if (loginError) {
	      res.send(loginError);
				return;
			}

			// Generate and sign JWT
			const token = jwt.sign(
				{ id: user.id, name: user.name, auth: user.auth },
				'jwt-secret-key'
			);
      res.json({ token });

     });
   })(req, res);
  
	}
	catch (error) {
		console.error(error);
		next(error);
  }
});

// protected route (need JWT Auth)
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Access the authenticated user's information
  console.log(req.user);
  res.send('Protected route');
});

module.exports = router;
```

### 4) Test

Here is an example of a POST request to the `/login` route:

```jsx
// HTTP request
POST /login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password"
}
```

If the login is successful, you should receive a token in the response. For example:

```jsx
// HTTP response
HTTP/1.1 200 OK
Content-Type: application/json
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjE2NjE0MzcsImlkIjoiY2F0Y2giLCJzdWIiOiIxMjM0NTY3ODkwIn0.X855-6a-0-9-0-9-0-9"
}
```

You can then use this token to access the `/protected` route. For example:

```jsx
// HTTP request
GET /protected HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ```
```

## 3. **Passport + OAuth2.0**

To be continued..

[https://millo-l.github.io/Nodejs-passport-Google-OAuth-2-로그인-사용하기/](https://millo-l.github.io/Nodejs-passport-Google-OAuth-2-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)

---

Reference.

[https://chanyeong.com/blog/post/28](https://chanyeong.com/blog/post/28)

[https://millo-l.github.io/Nodejs-passport-session-사용하기/](https://millo-l.github.io/Nodejs-passport-session-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)

[http://www.passportjs.org/packages/passport-local/](http://www.passportjs.org/packages/passport-local/)

[http://www.passportjs.org/packages/passport-jwt/](http://www.passportjs.org/packages/passport-jwt/)