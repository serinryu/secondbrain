# [Node.js] Implementing Session-based Authentication

## Let's Implement Session-based Authentication!

Now that we know what session-based authentication is, let’s see how we can implement session-based authentication in Node.js.

As you know, **there are three methods to store session in server**. I will implement session storage in Node.js using three different methods: memory, disk, and a database. Let's go through each approach step by step.

## TLDR; Where should I store session? 🤔
1. Memory session store
2. File session store
3. DB session store
   
> Considering the trade-offs between speed, persistence, and storage capacity,
> - **Speed** : Memory session store (fast) > File session store > DB session store (slow)
> - **Storage capacity** : Memory session store (low) < File session store < DB session store (high)
> - **Persistence** : Memory session store (short) < File session store < DB session store (long)

## `express-session`

Express, a popular web framework for Node.js, provides a middleware called [express-session](https://www.npmjs.com/package/express-session) that makes it easier to handle session management in your web server. The `express-session` middleware allows you to store session data for each user and retrieve it as needed during subsequent requests. It provides session management capabilities, including session creation, tracking, and destruction. To sum up, with `express-session`, you have a flexible and convenient way to manage sessions in your Express web server.

- **Note❗️** Session data is *not* saved in the cookie itself, just the session ID. Session data is stored server-side.

`express-session` uses cookies to store session identifiers (session ID), so you needed to include the `cookie-parser` middleware in your application for cookie parsing.

- **Note❗️** Since version 1.5.0, the [cookie-parser middleware](https://www.npmjs.com/package/cookie-parser) no longer needs to be used for this module to work. `express-session` now directly reads and writes cookies on `req`/`res`.

- **Warning❗️** The default server-side session storage, `MemoryStore`, is *purposely* not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.


#### How to use `express-session` in an Express web server

```jsx
const express = require('express');
const session = require('express-session');

const app = express();

// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Example route that stores session data
app.get('/store', (req, res) => {
  req.session.username = 'John';
  res.send('Session data stored.');
});

// Example route that retrieves session data
app.get('/retrieve', (req, res) => {
  const username = req.session.username;
  res.send(`Session data retrieved. Username: ${username}`);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

- `secret`: This is used to sign the session ID cookie. Using a secret key that cannot be guessed will reduce the ability to hijack a session.
- `cookie`: Object containing the configuration for session id cookie.
- `resave`: Forces the session to be saved back to the session store, even if the session data was never modified during the request.
- `saveUninitialized`: Forces an “uninitialized” session to be saved to the store, i.e., saves a session to the store even if the session was not initiated.
- `store` : We can configure to change how/where the session data is stored on the server. By default, this data is stored in the memory, i.e., `MemoryStore`.
    
    > **Warning** : The default server-side session storage, `MemoryStore`, is ***purposely*** not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing. 
    > For a list of stores, see [compatible session stores](https://expressjs.com/en/resources/middleware/session.html#compatible-session-stores).


:::tip
💡 We set the `username` in the session by updating `req.session.username`.

```jsx
req.session.username = 'John';
```

Similarly, you can set any data in the session. For example, if we wanted to store the user role, we would do the following:

```
req.session.username = 'admin';
```
:::

## 0. Environment

```
# 폴더 생성 및 열기
mkdir session-practice
cd session-practice

# package.json 생성
npm init -y

# 필요한 모듈 설치
npm install http express express-session memorystore session-file-store mysql express-mysql-session  
```

- [https://www.npmjs.com/package/express-session](https://www.npmjs.com/package/express-session)
- [https://www.npmjs.com/package/memorystore](https://www.npmjs.com/package/memorystore)
- [https://www.npmjs.com/package/session-file-store](https://www.npmjs.com/package/session-file-store)
- [https://www.npmjs.com/package/express-mysql-session](https://www.npmjs.com/package/express-mysql-session)

## 1. Memory session store

The first exercise we will do is implementing a **memory session store**. As the name suggests, this method stores session data in memory. 

Remember that this approach will only keep session data in memory as long as your Node.js application is running. If the server restarts, the session data will be lost.

```jsx
// memory-session.js

const http = require("http");
const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const app = express();
const server = http.createServer(app);
const PORT = 8080;

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
        store: new MemoryStore({
            checkPeriod: 86400000, // 24 hours (= 24 * 60 * 60 * 1000 ms)
        }),
        cookie: { maxAge: 86400000 },
    })
);

app.get("/", (req, res) => {
    console.log(req.session);
		// we set the num in the session by updating req.session.num.
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }

    res.send(`View: ${req.session.num}`);
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
```

When accessing [http://localhost:8080/](http://localhost:8080/) with a browser, the number next to 'View:' increases every time you reload. The session has recently saved num, so it is maintained even if you reload  the browser.

In the code, checkPeriod specifies the period to be stored in the memory store. If the most recent connection exceeds the time specified by checkPeriod, the session in memory is automatically destroyed.

### 👍 Advantages

1. Speed: Storing session data in memory allows for faster access and retrieval compared to disk or database storage.  
2. Simplicity: Memory session storage is straightforward to implement and does not require additional setup or dependencies like databases or file systems. 
3. Lightweight: Memory storage does not consume additional disk space or require network communication, making it a lightweight option.  

### 👎 Disadvantages

1. Scalability and Memory Usage: **Storing large amounts of session data in memory may consume a significant amount of server memory**, leading to resource constraints and potential performance degradation.
2. Data Persistence: **Session data stored in memory is volatile and does not persist across server restarts or crashes.** If the server goes down, all session data is lost. This can be problematic if session data needs to be retained for long-term or recovery purposes.
3. Limited Availability: Memory session storage is only accessible from the server that holds the data. It may cause difficulties when attempting to distribute session data across multiple servers or when implementing load balancing strategies.

To mitigate some of the drawbacks, it's important to carefully manage the amount of data stored in memory, implement session expiration mechanisms, and consider alternative storage options if scalability or data persistence is a concern for your application.

## 2. File session store

The first exercise we will do is implementing a file session store.  The file session store involves storing session data in files on disk. This approach offers the advantage of utilizing the disk's storage capacity, which is typically much larger than the memory capacity.

```jsx
// file-session.js

const http = require("http");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();
const server = http.createServer(app);
const PORT = 8080;

app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
        store: new FileStore(),
    })
);

app.get("/", (req, res) => {
    console.log(req.session);
    if (req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num += 1;
    }

    res.send(`View: ${req.session.num}`);
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
```

When accessing [http://localhost:8080/](http://localhost:8080/) with a browser, the number next to 'View:' increases every time you reload. The session has recently saved num, so it is maintained even if you reload  the browser.

When using the file session store approach, a "sessions" folder is typically created in the same directory as your application, or in a designated location specified in the configuration. The session data is then stored as individual files within that folder.  

```jsx
/myapp
  |- app.js (your application file)
  |- sessions
      |- session1.json
      |- session2.json
      |- ...
```

### 👍 Advantages

1. Persistence: Unlike memory storage, session data stored in files persists even if the server restarts or crashes. This ensures that session data is retained over a longer period and can be recovered in case of server failures.
2. Storage Capacity: Disk storage provides a larger storage capacity compared to memory. This makes file session store suitable for applications that handle a large volume of session data or require long-term storage of session information.
3. Simplicity: File session store is relatively simple to implement since it leverages the file system for data storage. It doesn't require additional dependencies or complex configuration, making it a straightforward option for session management.

### 👎 Disadvantages

1. Speed: Reading and writing session data to disk can be slower compared to memory storage. Disk operations involve accessing physical storage, which introduces additional latency compared to memory access. However, the impact on performance may vary based on factors such as disk speed, file system, and server load.
2. Scalability: File session store may face scalability challenges in distributed or high-traffic environments. As the number of concurrent sessions increases, accessing and managing a large number of files can become inefficient and impact performance. Coordinating file access across multiple servers can also be challenging.
3. Disk Space Usage: Storing session data in files requires disk space, and the space requirements can grow as more sessions are created. It's essential to monitor disk usage and implement mechanisms to manage and clean up expired or inactive session files.

## 3. DB session store

DB session store involves storing session data in a database, providing a more structured and scalable approach compared to memory or file storage.

- Database Selection: You can choose a suitable database management system (DBMS) for storing session data. Popular options include relational databases like MySQL, PostgreSQL, or Oracle, as well as NoSQL databases like MongoDB or Redis. The choice depends on your specific requirements, scalability needs, and familiarity with the database technology.
- Database Connection: Ensure that your chosen database provides appropriate drivers or libraries for Node.js, allowing seamless integration with your Node.js application. You'll need to establish a connection to the chosen database using a database client or an ORM (Object-Relational Mapping) library. Node.js provides various modules and libraries like **`mysql`**, **`pg`** (for PostgreSQL), **`mongodb`**, or ORMs like **`sequelize`**, **`mongoose`**, or **`typeorm`** that facilitate database integration.
    
    [List of Compatible Session Stores](https://www.npmjs.com/package/express-session#compatible-session-stores)
    
    - [connect-redis](https://www.npmjs.com/package/connect-redis) A Redis-based session store. ⇒ 2.7k stars
    - [connect-mongo](https://www.npmjs.com/package/connect-mongo) A MongoDB-based session store. ⇒ 1.9k stars

**Folder Structure**

```jsx
📦session-practice
 ┣ 📂node_modules
 ┣ 📂webpage
 ┃ ┣ 📜login.html
 ┃ ┗ 📜main.html
 ┣ 📜db-session.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

**Create Database**

```jsx
# MySQL Command Line Client
CREATE DATABASE session_test;
```

**Setting up the server**

```jsx
// db-session.js

const http = require("http");
const express = require("express");
const session = require("express-session");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = (module.exports = express());
const server = http.createServer(app);
const MySQLStore = require("express-mysql-session")(session);
const PORT = 8080;

const options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "session_test",
};

const sessionStore = new MySQLStore(options);

app.use(
    session({
        secret: "secret key",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));

// login 페이지
app.get("/login", (req, res) => {
    if (req.session.user !== undefined) return res.redirect("/");

    fs.readFile("./webpage/login.html", (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).send("<h1>500 error</h1>");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

// 임시 user DB -> 이후 별도의 유저 데이터베이스 생성 필요
const users = [
    { id: "hello", pw: "world" },
    { id: "good", pw: "bye" },
];

// id, pw 체크
const login = (id, pw) => {
    let len = users.length;

    for (let i = 0; i < len; i++) {
        if (id === users[i].id && pw === users[i].pw) return id;
    }

    return "";
};

// login 요청
app.post("/login", (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;

    let user = login(id, pw);
    if (user === "") return res.redirect("/login");

    req.session.user = user;
    req.session.save(err => {
        if (err) {
            console.log(err);
            return res.status(500).send("<h1>500 error</h1>");
        }
        res.redirect("/");
    });
});

// main 페이지
app.get("/", (req, res) => {
    if (req.session.user === undefined) return res.redirect("/login");

    fs.readFile("./webpage/main.html", (error, data) => {
        if (error) {
            console.log(error);
            return res.status(500).send("<h1>500 error</h1>");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

// logout 요청
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(error);
            return res.status(500).send("<h1>500 error</h1>");
        }
        res.redirect("/");
    });
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
```

### 👍 Advantages

1. Persistence: Data stored in a database session store persists even when the server restarts or crashes. This ensures session data is not lost and allows for session recovery.
2. Scalability: Databases are designed to handle large amounts of data and concurrent access. Using a DB session store allows for scaling the application across multiple servers without the need for shared memory.
3. Security: Databases provide robust security features, such as encryption, access controls, and authentication mechanisms. Storing session data in a secure database can enhance the overall security of the application.
4. Advanced querying: Databases offer powerful querying capabilities, allowing for efficient retrieval and manipulation of session data based on various criteria. This can be beneficial for analytics, reporting, and managing session-related information.

### 👎 Disadvantages

1. Performance: Compared to memory-based session stores, accessing session data from a database introduces additional overhead due to network latency and disk I/O operations. This can result in slower session retrieval and update times.
2. Complexity: Setting up and maintaining a database session store requires additional configuration and management compared to in-memory session stores. It involves database setup, connection pooling, and potentially complex queries for session retrieval and management.
3. Cost: Depending on the database solution chosen, there may be licensing or hosting costs associated with using a database session store. This can be a factor to consider, especially for small-scale applications or in cost-sensitive environments.
4. Single point of failure: If the database server fails or experiences downtime, it can impact the availability of session data and result in session-related issues for users. Implementing backup and failover mechanisms becomes crucial to mitigate this risk.

---

Reference.

[https://roadmap.sh/guides/session-based-authentication](https://roadmap.sh/guides/session-based-authentication)

[https://millo-l.github.io/Nodejs-express-session-사용하기/](https://millo-l.github.io/Nodejs-express-session-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/)