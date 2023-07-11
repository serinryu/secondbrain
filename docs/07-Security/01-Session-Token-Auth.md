# Session-based Authentication

## Login Process

### 🌊 Flow

1. The user accesses the login page through a client application (web browser, mobile app, etc.).
2. The user enters identifiable credentials (e.g., username and password) on the login page.
3. The client application sends the entered login information to the backend server.
4. The backend server verifies the received login information. This may involve checking the username and password or using other authentication methods (e.g., social login, two-factor authentication, etc.).
5. If the provided information is valid, the backend server authenticates the user and generates **a session OR authentication token.**
6. The backend server returns the generated **session OR authentication token** to the client. Typically, the token is included in the HTTP response headers or body.
7. When making subsequent requests, the client includes the **session OR authentication token** in the request sent to the backend server.
8. The backend server validates the **session OR authentication token** upon receiving the request and checks if the user is authenticated.
9. If the authentication is successful, the backend server generates an appropriate response for the request and returns it to the client. If the authentication fails, it may return an authentication error response or deny the request.


### 1. Authenticate user -> 2. Maintain user's status

In a typical web application, the login process can be divided into two main steps: user authentication and maintaining login information.

1. **User Authentication**: The user provides their ID and password, which are then compared with the information stored in the server's database to verify if the user exists. If the information matches, the user is authenticated and allowed to log in.
    
    :::caution
    BUT, WE NEED MORE.. The login process requires communication between the server and the client, and HTTP is commonly used as the underlying protocol. **HTTP has characteristics of being connectionless and stateless🚫**, which means that it doesn't maintain a continuous connection and doesn't store any state information. These characteristics present challenges in implementing the login process because without additional measures, the user would need to log in with every request, which is inconvenient and negatively impacts performance.
    :::
    
2. **Maintaining user's authentication status** : After successful authentication, both session-based and token-based authentication methods provide a way to maintain the user's authentication status without repeatedly validating credentials, thereby improving user experience and performance.
    
    👉 1️⃣ **Session-based authentication:** A session is created on the server, and a unique session ID is sent to the client. The client includes this session ID in subsequent requests, allowing the server to recognize the user without revalidating credentials for each request. The server can store session data in memory or a database.
    
    2️⃣ **Token-based authentication:** Instead of using sessions, tokens are issued to authenticated users. These tokens are typically in the form of JSON Web Tokens (JWT) and are sent to the client upon successful authentication. The client includes the token in subsequent requests as a means of authentication. The server can verify the token's authenticity and extract user information from it, eliminating the need for database lookups.
    
    |  | Session Authentication | Token Authentication |
    | --- | --- | --- |
    | Suitable for | Websites in the same root domain (e.g. Server-side rendered applications) | Mobile apps or single-page web applications. |
    | What does the server do to authorize users' requests? | Search for the session ID from the cookie in the server's database. | Decode the user's token to see if it is valid. |
    | What keeps the authentication details? | Server | Client |


:::tip
Session-based authentication has been the default method for a long time. Nowadays, it’s very common for web applications to use the JSON Web Token (JWT Token) rather than sessions for authentication.
:::

## How to Maintain User's Status 1️⃣ : Session-based authentication

![https://miro.medium.com/v2/resize:fit:720/format:webp/1*Hg1gUTXN5E3Nrku0jWCRow.png](https://miro.medium.com/v2/resize:fit:720/format:webp/1*Hg1gUTXN5E3Nrku0jWCRow.png)

1. User submits the login request for authentication.
2. Server validates the credentials. If the credentials are valid, the server creates a session and stores it in storage.(**This information can be stored in memory, file system, or database.** These are called a storage for session data.) When the server creates a session, server generates a unique identifier called ‘session ID’ that it can later use to retrieve this session information from the storage. Server sends this session ID inside a cookie to the client.
    
    ```java
    // HTTP Response
    HTTP/1.1 302 Found
    Content-Type: text/html
    Location: https://www.test.com/
    Set-Cookie: sessionId=a2dd774e36e2
    ```
    
3. Client saves the session ID in a cookie. 
4. The client includes this cookie, containing the session ID, in each subsequent request to the server. On the server side, when it receives a request from the client, it checks the session ID included in the cookie.
    
    ```java
    // HTTP Request
    GET / HTTP/1.1
    Host: www.test.com
    Cookie: sessionId=a2dd774e36e2
    ```
    
5. If you log out of an application, the session ID is destroyed on both the client and server sides.

### 🍪 `Sessions` use `cookies` to pass sessionID!

- Cookies are stored on the client's web browser, while sessions are stored on the server.
- Cookies are used to store information on the client side and are sent with each request to the server.
- Sessions, on the other hand, are managed by the server and are identified using a session ID typically stored in a cookie. The server uses the session ID to identify the corresponding session and handle the client's requests while maintaining state.

⇒ Sessions use cookies to store and pass the session ID, enabling the server to authenticate the client and maintain the session's state. Therefore, cookies and sessions complement each other rather than being in opposition. 

### 🫙 Storage for Session data

There are three storage options for session data (memory, disk, and database) 

1. Memory Session Store: This option involves storing session data directly in **memory**. It offers fast response times since accessing data from memory is quicker than disk or database access. However, storing a large amount of session data in memory can be resource-intensive. It's important to control the amount of data loaded into memory or adjust the session expiration time to manage the load on the server.
2. File Session Store: With this option, session data is stored in **files on disk**. It provides faster access compared to a database, but it may not be as fast as memory-based storage. One advantage of file-based storage is that it offers more storage capacity on disk compared to memory. Typically, a "sessions" folder is created in the same directory, and session information is written to files within that folder.
3. Database(DB) Session Store:
    - Disk-Based Database: This refers to traditional disk-based databases such as **Oracle, MySQL, MS-SQL**, etc., where data is stored and managed on disk. These databases provide persistent storage and can handle large amounts of data efficiently.
    - In-Memory Database: In-memory databases store and manage data entirely in memory, without disk access. Examples of in-memory databases include **Redis, H2, memcached,** etc. In-memory databases offer extremely fast data access since all operations are performed in memory, avoiding disk I/O. They are particularly useful when speed and low latency are crucial.

:::tip
[Check how to implement them in Node.js Project!](http://localhost:3000/wiki/Node.js/Implementing-Session-Auth)
:::

### 🫀 Best Practices for Session Authentication

1. Keep Session IDs long and [random](https://beaglesecurity.com/blog/article/session-security.html) to prevent brute force attacks. The recommended length is 128 bits.
2. Record Session ID without sensitive or user-specific data. Ideally, the ID should be a random and meaningless string of characters.
3. Enforce mandatory HTTPS communications for all session-based apps.
4. Create Cookies with secure and HTTP-only attributes.
5. Securely manage your sessions. For instance, you could destroy all sessions when you close your browser, where there’s a timeout, or when you log in or log out from different locations.

### 👍 Advantages of Session Authentication

1. **Easy to use**

If you are working on a web-based application, cookies are supported by the browser on the client-side. There is no need to use any JavaScript to create interactivity.

2. **Storage Size**

Session cookies are naturally small in size. This small size makes it efficient for storage on the client-side.

### 👎 Limitations of Session Authentication

1. **Scalability**
- **Session based authentication:**  As your application grows and your user base increases, you’ll have to start scaling either horizontally or vertically. Session data is stored in memory on the server either via files or in a database. In a horizontal scaling scenario, where you have to start replicating servers, you have to come up with a separate central session storage system that all of your application servers have access to. However, under this kind of system, managing the sessions would be way too complicated…😓
- **Token based authentication:** There is no issue with scaling because token is stored on the client side.

2. **Multiple Device**

- **Session based authentication:**
    
    Cookies are typically bound to a specific domain or subdomain, and they are normally disabled by browser if they work cross-domain (3rd party cookies). When a cookie is set by a domain, it is generally only accessible to that domain or its subdomains. This is known as the **same-origin policy.**
    
    Third-party cookies, which are cookies set by a domain other than the one the user is currently visiting(cross-domain), are subject to stricter security measures. Modern browsers often block or restrict third-party cookies by default due to privacy concerns. This can pose challenges when working with APIs served from a different domain, especially when trying to make cross-origin requests from web and mobile devices.
    
    > (+) To overcome these challenges, various techniques can be employed, such as implementing Cross-Origin Resource Sharing (CORS) on the server to specify which domains are allowed to access the API, using alternative authentication mechanisms like token-based authentication, or using proxy servers to forward API requests from the client-side to the server-side within the same domain. These approaches help mitigate the issues related to cross-domain requests and the limitations of cookies.
    > 
- **Token based authentication:** There is no issue with cookies as the token is included in the request header.

