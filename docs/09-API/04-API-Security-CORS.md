# [API Security] Cross-Origin Resource Sharing (CORS)

## TLDR;
- CORS (Cross-Origin Resource Sharing) is a security mechanism implemented by web browsers to restrict cross-origin HTTP requests. It is a browser-based security feature that helps prevent malicious scripts on one website from accessing resources on another website.
- When a web page makes a cross-origin request (i.e., a request to a different domain, protocol, or port), the browser enforces the same-origin policy, which blocks the request by default. CORS allows the server to specify who can access its resources and under what conditions.
- To resolve CORS issues, the server needs to be configured correctly to include the appropriate CORS headers in its responses. This allows the browser to understand that the server is permitting cross-origin requests and enables the browser to proceed with the request.

:::tip
In summary, while CORS is a browser-based security mechanism, its resolution requires server-side configuration to handle and allow cross-origin requests. 

(CORS 는 브라우저 문제, but 해결은 서버에서 해야함)
:::

## Why does Same-Origin policy exist?

**⇒ Because of cross-domain vulnerability! 🥵**

Without features like CORS, websites are restricted to accessing resources from the same origin through what is known as **same-origin policy.**

You, like many websites, may use `cookies` to keep track of authentication or session info. **Those cookies are bounded to "a certain domain" when they are created**. **On every HTTP call to that domain, the browser will automatically attach the `cookies` that were created for that domain.** 👉 This makes cross-domain vulnerability...!

> When you log into *https://examplebank.com*, a `cookie` is stored for *https://examplebank.com*. If that bank is a single-page React app, they may have created a REST API at *https://examplebank.com/api* for the SPA to communicate via AJAX.
> 
> Let’s say you browse to a malicious website *https://evilunicorns.com* while logged into *https://examplebank.com*. Without same-origin policy, that hacker website could make authenticated malicious AJAX calls to *https://examplebank.com/api* to `POST /withdraw` even though the hacker website doesn’t have direct access to the bank’s cookies.
> 
> Why? This is due to the browser behavior of automatically attaching any `cookies` bounded to *https://examplebank.com* for any HTTP calls to that domain, including AJAX calls from *https://evilunicorns.com* to *https://examplebank.com*.

## How is Origin defined?

*Origin* includes the combination of **protocol, domain,** and **port.** 

- This means *https://**api**.mydomain.com* and *https://mydomain.com* are actually different origins and thus impacted by same-origin policy.
- In a similar way, *http://localhost:**9000*** and *http://localhost:**8080*** are also different origins. The path or query parameters are ignored when considering the origin.

## What is CORS?

Sometime, there are a need of cross-domain requests. For example,

- Maybe a single-page app at *https://mydomain.com* needs to make AJAX calls to *https://api.mydomain.com*
- Maybe *https://mydomain.com* incorporates some 3rd party fonts or analytics providers like Google Analytics.

***Cross-Origin Resource Sharing* (CORS) enables these cross-domain requests. In other words, CORS is a security mechanism that allows cross-domain requests.**

## How CORS works?

There are two types of CORS requests, *[simple requests](https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/#simple-requests)* and *[preflighted requests.](https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/#preflighted-requests)*

### 1️⃣ Simple requests

A simple request is a CORS request that doesn’t require a preflight request (preliminary checks) before being initiated.

1. A browser tab open to `https://www.mydomain.com`  initiates AJAX request `GET https://api.mydomain.com/widgets`. Along with adding headers like `Host`, the browser automatically adds the `Origin` Request Header for cross-origin requests:

    ```jsx
    GET /widgets/ HTTP/1.1
    Host: api.mydomain.com
    Origin: https://www.mydomain.com
    [Rest of request...]
    ```

2. The server checks the `Origin` request header. **If the Origin value is allowed**, it sets the `Access-Control-Allow-Origin` to the value in the request header `Origin`.
    
    ```jsx
    HTTP/1.1 200 OK  
    Access-Control-Allow-Origin: https://www.mydomain.com  
    Content-Type: application/json
    [Rest of response...]
    ```
    
    - Therefore, the **server has control over whether to allow the request or not,** depending on the origin of the request.
2. When the browser receives the response, the browser checks the `Access-Control-Allow-Origin` header to see if it matches the origin of the tab. ***If not, the response is blocked.*** The check passes such as in this example if either the `Access-Control-Allow-Origin` matches the single origin exactly or contains the wildcard **** operator.
    - A server that responds `Access-Control-Allow-Origin: *` allows all origins which can be a [large security risk](https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/#common-pitfalls). Only use * if your application absolutely requires it such as creating an open/public API.

### 2️⃣ Preflighted requests

**1. [☄️Preflight Request] →** **2. [☄️Original CORS Request]**

A preflighted request is another type of CORS request that require a preflight request (preliminary checks) before being initiated. 

Since the original CORS request has a preflight request before it, we call the original CORS request *preflighted*. This preflight request itself is an `OPTIONS` request to the same URL.

> **Any CORS request has to be preflighted when..**
> 
> 1. A website makes an AJAX call to **POST** JSON data to a REST API meaning the `Content-Type` header is `application/json`
> 2. A website makes an AJAX call to an API which uses a **token** to authenticate the API in a request header such `Authorization`
> 
> This means it can be **common for a REST API** powering a single-page app to have the majority of AJAX requests preflighted.
> 

1. **[☄️Preflight Request]**
    
    A browser tab open to `https://www.mydomain.com` initiates an authenticated AJAX request `POST https://api.mydomain.com/widgets` with a JSON payload. 
    → Yes, this is when preflighted requests are needed.
    
    ```jsx
    // Preflighted request
    OPTIONS /widgets/ HTTP/1.1
    Host: api.mydomain.com
    Origin: https://www.mydomain.com
    Access-Control-Request-Method: POST
    Access-Control-Request-Headers: Authorization, Content-Type
    [Rest of request...]
    ```
    
    - The browser sends the `OPTIONS` request first (aka the preflight request) with the proposed Requested Method and Requested Headers of the main request.

2. The server respond back specifying the allowed HTTP methods and headers. If the original CORS request intended to send a header or HTTP method not in the list, the browser will fail without attempting the CORS request.
    
    ```jsx
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: https://www.mydomain.com
    Access-Control-Allow-Methods: POST, GET, OPTIONS
    Access-Control-Allow-Headers: Authorization, Content-Type
    Content-Type: application/json
    [Rest of response...]
    ```
    

3. **[☄️Original CORS Request]**
    
    Since the headers and method pass the check, the browser sends the original CORS request. Note the `Origin` header is on this request also.
    
    ```jsx
    // Original CORS request
    POST /widgets/ HTTP/1.1
    Host: api.mydomain.com
    Authorization: 1234567
    Content-Type: application/json
    Origin: https://www.mydomain.com
    [Rest of request...]
    ```
    
4. The response has the correct origin in `Access-Control-Allow-Origin` header so checks pass and control is handed back to the browser tab.
    
    ```jsx
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: https://www.mydomain.com
    Content-Type: application/json
    [Rest of response...]
    ```
    

## More Headers that control CORS

You already saw a few headers in the previous examples that are used for CORS such as `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods`, but there are more headers for finer control.

### Request Headers

| Header Name | Example Value | Description | Used in preflight requests | Used in CORS requests |
| --- | --- | --- | --- | --- |
| Origin | https://www.mydomain.com | Combination of protocol, domain, and port of the browser tab opened | YES | YES |
| Access-Control-Request-Method | POST | For the preflight request, specifies what method the original CORS request will use | YES | no |
| Access-Control-Request-Headers | Authorization, X-PING | For the preflight request, a comma separated list specifying what headers the original CORS request will send | YES | no |

### Response Headers

| Header Name | Example Value | Description | Used in preflight requests | Used in CORS requests |
| --- | --- | --- | --- | --- |
| Access-Control-Allow-Origin | https://www.mydomain.com | The allowed origins for this request as specified by the server. If it doesn’t match the Origin header and is not a *, browser will reject the request. If domain is specified, protocol component is required and can only be a single domain | YES | YES |
| Access-Control-Allow-Credentials | true | CORS requests normally don’t include cookies to prevent CSRF attacks. When set to true, the request can be made with/will include credentials such as Cookies. The header should be omitted to imply false which means the CORS request will not be returned to the open tab. https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/#credentials-with-wildcard | YES | YES |



---
Reference.

[https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/#simple-requests](https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/#simple-requests)
