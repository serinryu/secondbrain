# Token-based Authentication 

## Login Process

1. **User Authentication**: The user provides their ID and password, which are then compared with the information stored in the server's database to verify if the user exists. If the information matches, the user is authenticated and allowed to log in.
   
2. **Maintaining user's authentication status** : 
    
    1️⃣ Session-based authentication: A session is created on the server, and a unique session ID is sent to the client. The client includes this session ID in subsequent requests, allowing the server to recognize the user without revalidating credentials for each request. The server can store session data in memory or a database.
    
    > 👉 2️⃣ ***Token-based authentication: Instead of using sessions, tokens are issued to authenticated users. These tokens are typically in the form of JSON Web Tokens (JWT) and are sent to the client upon successful authentication. The client includes the token in subsequent requests as a means of authentication. The server can verify the token's authenticity and extract user information from it, eliminating the need for database lookups.***
    
|  | Session Authentication | Token Authentication |
| --- | --- | --- |
| Suitable for | Websites in the same root domain (e.g. Server-side rendered applications) | Mobile apps or single-page web applications. |
| What does the server do to authorize users' requests? | Search for the session ID from the cookie in the server's database. | Decode the user's token to see if it is valid. |
| What keeps the authentication details? | Server | Client |

:::tip
Session-based authentication has been the default method for a long time. Nowadays, it’s very common for web applications to use the JSON Web Token (JWT Token) rather than sessions for authentication.
:::

## 2️⃣ How to Maintain Login Status 2 : Token-based authentication

![https://miro.medium.com/v2/resize:fit:720/format:webp/1*PDry-Wb8JRquwnikIbJOJQ.png](https://miro.medium.com/v2/resize:fit:720/format:webp/1*PDry-Wb8JRquwnikIbJOJQ.png)

1. The user provides their credentials (e.g., username and password) to the server.
2. The server verifies your credentials, and if valid, it returns a signed token(ACCESS TOKEN, REFRESH TOKEN).
3. The server sends the token back to the client (usually in the **response body or as a response header**). The signed token(ACCESS TOKEN, REFRESH TOKEN) is then stored on the client-side. **It can either be stored in your local storage, in your session storage, or within a cookie.** 
    
    ```java
    // HTTP Response - Token is sent in response body in JSON payload
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
      "message": "Login successful",
      "access_token": "<ACCESS_TOKEN>",
      "expires_in": 3600
    }
    ```
    
4. For each subsequent request that requires authorization, the client includes the token(ACCESS TOKEN) in the request headers (e.g., Authorization header) or as a query parameter.
    
    ```java
    // HTTP Request
    GET /api_path HTTP/1.1
    Host: yourdomain.com
    Authorization: Bearer <ACCESS_TOKEN>
    ```
    
5. The server receiving the request validates the token(ACCESS TOKEN)'s integrity and authenticity. This involves verifying the token's signature, expiration time, and possibly performing additional checks such as token revocation or user permission validation. If the token is valid, the server uses the decoded information within the token(ACCESS TOKEN) to authorize the requested action or resource.
6. The server sends back the response based on the authorization result. If authorized, the requested data or resource is returned; otherwise, an appropriate error response is sent.
7. If you log out from an application, the token is deleted from the client-side, preventing further interactions.

### 🧖‍♀️ Access Token & Refresh Token

The access token and refresh token are both tokens issued by the server using a secret key when a user logs in and is authenticated.

1. The access token is a token used by the user to access protected resources on the server. It is typically included in the request header when the user sends a request to the server. The access token has a short expiration time, usually around 10-15 minutes, to ensure security. By keeping the expiration time short, even if the access token is stolen, it will quickly become invalid, enhancing the security of the system.
2. The refresh token is used **to obtain a new access token** when the current access token expires. It is not typically included in regular requests but is used specifically for obtaining a new access token. The expiration time of the refresh token can **be set longer**, depending on the desired duration of the "remember me" or "automatic login" feature. Once the refresh token expires, the user will be prompted to log in again to obtain a new access token.

When a user logs in, the server sends both the access token and the refresh token. However, they have **different expiration times**. For example, the refresh token may have an expiration time of one month, while the access token may have an expiration time of one day. This allows the user to obtain a new access token without needing to log in again as long as the refresh token is still valid, providing a way to maintain the user's login session.

In summary, the refresh token is primarily used to obtain a new access token, while the access token is the token used for accessing protected resources.


#### 🌊 Flow

To sum up, the refresh token is used when the access token expires or becomes invalid. Here is the typical flow:

1. When a user logs in, the server sends both ACCESS TOKEN and REFRESH TOKEN.
2. The client includes ACCESS TOKEN in the authorization header of each API request.
3. If ACCESS TOKEN is expired or invalid, the server responds with a `401 Unauthorized` status code.
4. The client detects the `401 Unauthorized` response and recognizes that ACCESS TOKEN needs to be refreshed.
5. The client sends a request to the server, typically to a designated "refresh" API endpoint, including **REFRESH TOKEN** in the request body or as a parameter.
6. The server verifies REFRESH TOKEN's validity and checks if it has expired.
7. If REFRESH TOKEN is valid and has not expired, the server generates a new ACCESS TOKEN and responds with a new ACCESS TOKEN in the HTTP response.
8. The client receives the new ACCESS TOKEN from the server.
9. The client updates its local storage or memory with the new ACCESS TOKEN and includes it in subsequent API requests.
10. If REFRESH TOKEN has expired or becomes invalid, the client will need to perform a full authentication process (e.g., re-login) to obtain a new REFRESH TOKEN and ACCESS TOKEN.


- HTTP Response (Authorization with Access Token):
    
    ```html
    HTTP/1.1 200 OK
    Content-Type: application/json
    Set-Cookie: refreshToken=<refreshTokenValue>; Secure; HttpOnly
    
    {
      "accessToken": "<accessTokenValue>",
      "expiresIn": 900
    }
    ```
    
    - The server responds with a `200 OK` status code.
    - The `Set-Cookie` header sets the `refreshToken` value as a secure and http-only cookie. ⇒ Don’t store `accessToken` in cookie to mitigate CSRF attacks 😈
    - The response body contains a JSON payload with the `accessToken` value and the `expiresIn` indicating the expiration time of the access token in seconds.

- HTTP Request (Authorized API Request):
    
    ```
    GET /api/resource HTTP/1.1
    Host: example.com
    Authorization: Bearer <accessTokenValue>
    ```
    
    - The client makes an HTTP request to access a protected resource (`/api/resource` in this example).
    - The request includes the `Authorization` header with the value `Bearer <accessTokenValue>`, where `<accessTokenValue>` is the access token obtained from the server.
    - The server validates the access token from the `Authorization` header to authenticate the user and authorize the request to access the requested resource.
    
    Note: **The refresh token itself is typically not sent in requests**. It is securely stored in a **cookie** and sent automatically by the browser in subsequent requests due to the `httpOnly` attribute, preventing client-side access. The server handles the refresh token separately for token renewal purposes.
    

#### 👷‍♀️ How to Build APIs using Access Token & Refresh Token

Let’s build APIs for our web application that implements token-based authentication. How can we deal with Access Token and Refresh Token?

- **`Login API`**
    - This API is called during the login process.
    - It receives the **`RefreshToken`** and a new **`AccessToken`**.
- After API calls:
    - The **`AccessToken`** is set in the request headers by default, so it is sent with each API call.
    - You can set up automatic calls to the **`Refresh API`** before the **`AccessToken`** expires to obtain a new one (this is optional).
    - The **`RefreshToken`** is stored in a cookie. If the **`RefreshToken`** expires, the user will need to log in again.
- **`Refresh API`**
    - This API is called during a refresh or when the **`AccessToken`** expires (can be set to automatically call using **`setTimeout`**).
    - It reads the **`RefreshToken`** from the cookie and sends it to the server.
    - You have the option to receive both the **`RefreshToken`** and a new **`AccessToken`**, or just the new **`AccessToken`**.

![https://hasura.io/blog/content/images/2019/08/Screen-Shot-2019-08-29-at-12.54.53.png](https://hasura.io/blog/content/images/2019/08/Screen-Shot-2019-08-29-at-12.54.53.png)

### 🫙 Token Storage on Client Side

**So we’ve got the token, now where do we store this token?**

There are the different storage options for storing tokens on the client-side: **Local Storage, Session Storage, and Cookies.** When choosing a storage option for tokens, consider the **trade-offs between convenience, security.** 

:::tip
💡 Be careful for [CSRF](https://owasp.org/www-community/attacks/csrf) & [XSS](https://owasp.org/www-community/attacks/xss/) attacks❗️
:::

1. **Local Storage :** Local Storage is a web storage mechanism available in web browsers. It provides a simple key-value store that persists even when the browser is closed and reopened. Storing tokens in Local Storage is convenient because they are easily accessible and can be accessed by JavaScript code running in the browser. However, there are security considerations to keep in mind. Local Storage is vulnerable to cross-site scripting (XSS) attacks, where malicious scripts can access and steal the tokens. Therefore, it's important to implement proper security measures, such as ensuring the tokens are encrypted and taking precautions against XSS vulnerabilities.
2. **Session Storage** : Session Storage is similar to Local Storage but has a different scope. While Local Storage persists even after the browser is closed, Session Storage is limited to the current browsing session. When the user closes the browser or the tab, the Session Storage is cleared. Storing tokens in Session Storage can provide additional security benefits compared to Local Storage since the tokens are automatically cleared when the session ends. However, it also means that users need to log in again after closing the browser.
3. **Cookies** : Cookies are small pieces of data stored in the user's browser. They are typically used for maintaining session information. Tokens can be stored in cookies as well. When using cookies, you have control over attributes like expiration time, secure flag, and HTTP-only flag. **The secure flag ensures that the cookie is only transmitted over HTTPS,** providing protection against interception. The HTTP-only flag prevents client-side scripts from accessing the cookie, which helps protect against cross-site scripting (XSS) attacks. However, cookies also have some limitations, such as size limitations and the fact that they are included in every request to the server, which can slightly increase overhead.


### 👍 Advantages of Token Authentication

1. **Tokens expire**

When a user finishes their browsing session and logs out of the service, the token they were granted is destroyed. This ensures that users’ accounts are protected and are not at risk of cyberattacks.

2. **Tokens are encrypted and machine-generated**

Token-based authentication uses encrypted, machine-generated codes to verify a user’s identity. Each token is unique to a user’s session and is protected by an algorithm, which ensures servers can identify a token that has been tampered with and block it.

3. **Statelessness (Self-contained) and Scalability**

*Tokens are stateless.* The token is self-contained and contains all the information it needs for authentication. This is great for **scalability** as it frees your server from having to store session state.

4. **Supports Multiple Domains**

Unlike cookies, which are bound to a single domain or its subdomains, tokens can be sent to any domain or server. Tokens, such as JSON Web Tokens (JWTs), are a form of authentication mechanism that can be used for cross-domain authentication.

By using tokens, you can achieve cross-domain authentication without the limitations imposed by cookies and the same-origin policy. Tokens provide more flexibility and control over authentication across different domains and are commonly used in modern web applications and APIs. Imagine a single-page app which is making multiple requests to multiple services, the same token can be used to authenticate in these servers.

5. **Mobile Ready**

While native mobile platforms may not combine seamlessly with cookies, Tokens are easier to implement on iOS and Android. It’s also easier to enforce Tokens for IoT applications or services that do not necessarily have a cookie store.

### 👎 Limitations of Token Authentication

1. **Size of JWT Tokens**

Unlike cookies, JWT Tokens are significantly larger in sizes, and this is because they contain a lot more information.

2. **Tokens can be hijacked**

It is common to use JWT tokens for authentication. The authentication state is handled in the client. The tokens can be hijacked by hackers and they are harder to be invalidated on the server.

### 🫀 Best Practices for Token Authentication

1. Validate your JWT Tokens and reject those that do not conform to your signature algorithm. You should also validate all claims, issuers, expiration dates, and audience.
2. Ensure that an expiration time is set for tokens. If you fail to set an expiration time for your tokens expressly, it could be set to remain valid forever.
3. You should avoid hardcoding tokens as it could ultimately make the work of compromising your applications easy for hackers.
4. Enforce HTTPS communication and avoid sending tokens across non-secure connections where they can be intercepted and compromised.

## 🪙 What is JWT?

[JWT is a standard specification for a JSON-based token used in web applications.](https://jwt.io/introduction) It is primarily used for securely transmitting authentication or authorization information between the server and the client.

In the web context, JWT tokens are typically sent from the client to the server by setting the **`Authorization`** HTTP header as **`Bearer <token>`**. The server can then verify the integrity of the token by checking the signature information contained within the token itself.

JWT tokens are encoded in Base64, resulting in a long string that typically starts with **`eyJ`**. Using an online debugger, such as **[jwt.io](https://jwt.io/)**, you can easily decode the token and examine the actual data stored within it in JSON format.

### JWT Structure

A JWT looks something like this, when it's serialized:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o`

If you decode that base64, you'll get JSON in 3 important parts: **header**, **payload** and **signature**.

[ base64UrlEncode(header) ] . [ base64UrlEncode(payload) ] . [ signature ]

![https://millo-l.github.io/static/de29dfbfc2666aa7d37dd88390f73e17/21b4d/jwt.png](https://millo-l.github.io/static/de29dfbfc2666aa7d37dd88390f73e17/21b4d/jwt.png)

1. **Header**

The header *typically* consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

For example:

```
{
  "alg": "HS256",
  "typ": "JWT"
}

```

Then, this JSON is **Base64Url** encoded to form the first part of the JWT.

2. **Payload**

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: *registered*, *public*, and *private* claims.

An example payload could be:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}

```

The payload is then **Base64Url** encoded to form the second part of the JSON Web Token. Do note that for signed tokens this information, though protected against tampering, is readable by anyone. Do not put secret information in the payload or header elements of a JWT unless it is encrypted.

3. **Signature**

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)

```

The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.


---
Reference.

[https://www.authgear.com/post/session-vs-token-authentication](https://www.authgear.com/post/session-vs-token-authentication)

[https://mangkyu.tistory.com/56](https://mangkyu.tistory.com/56)

[https://millo-l.github.io/Nodejs-JWT-사용하기/](https://millo-l.github.io/Nodejs-JWT-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)

[https://temanngoding.com/en/rest-api-login-and-register-node-js-with-jwt/](https://temanngoding.com/en/rest-api-login-and-register-node-js-with-jwt/)

[https://chanyeong.com/blog/post/28](https://chanyeong.com/blog/post/28)

[https://www.daleseo.com/js-jwt/](https://www.daleseo.com/js-jwt/)