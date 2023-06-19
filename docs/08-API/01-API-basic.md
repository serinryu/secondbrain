# API Basic

## 1. Basics of API

### API(Application Programming Interface)
 
> API ? ⇒ **A bridge between different programs, A channel for client to access data**
> 

**Application Programming Interface (API)** is a way for different software applications to talk to each other and exchange information or data. It uses a set of rules or protocols that define how different components or systems can interact with each other.

In the contexts of API, Interface can be thought of as a point of entry of database or server. When developers say that they do not provide APIs, it means that they do not provide the information they have.

If they provide API, they should create their own API documentation, which contains information about how to use your API. With this document, your client can know how to use API. 

### APIs vs. web services

A web service is a software component that can be accessed and facilitates data transfers via a web address. Because a web service exposes an application’s data and functionality to other applications, in effect, **every web service is an API. However, not every API is a web service.**

APIs are any software component that serves as an intermediary between two disconnected applications. While web services also connect applications, **they require a network** to do so. Where some APIs are open source, web services are typically private and only approved partners may access them.

### API Server
![https://voyager.postman.com/illustration/diagram-what-is-an-api-postman-illustration.svg](https://voyager.postman.com/illustration/diagram-what-is-an-api-postman-illustration.svg)

> The application or service doing the accessing is called the **client**, and the application or service containing the resource is called the **server**.

Most modern services separate the **server** and **client**, and create their own API as a channel for clients to access data. **An API server is a tool that provides such APIs.**

> **APIs are provided by API Server.**

API architecture is usually explained in terms of client and server. **For servers, it is beneficial to distinguish between the Main Server and API Server.** For example, functions like signing up and posting articles can be divided into the Main Server, while token authentication and reading articles can be handled by the API Server. The Main Server and API Server can run on different ports and communicate with each other. By separating them, we can prevent any disruption to the Main Server even if the API Server goes down. Yes, this design is called Micro Service Architecture. We will see this later.
 
**To create API, API server is needed, of course**. The reason why we didn’t consider API server separately is that probably we used the frameworks which provide this API Server functionality. There are many frameworks that provide API server functionality, depending on the programming language and platform you are working with. Here are a few examples:

1. Node.js: Express.js is a popular Node.js web framework that provides a simple and flexible API server.
2. Python: Flask and Django are popular Python web frameworks that provide **API server** functionality.
3. Ruby: Ruby on Rails is a popular Ruby web framework that includes **API server** functionality out of the box.
4. Java: Spring Boot is a popular Java web framework that provides a simple and lightweight **API server.**
5. Go: Gin and Echo are popular Go web frameworks that provide **API server** functionality.

These frameworks provide a wide range of functionality, including routing, middleware, request/response handling, database integration, authentication, and more. They can help simplify the process of building and deploying API servers and can provide a solid foundation for building scalable and maintainable applications.

### API endpoint

API endpoints is the final touchpoints in the API communication system. It is the location address from which APIs can access the resources they need to carry out their function. It means, **API endpoint specifies ‘where’ resources can be accessed by APIs.**

Since API Endpoints play a key role in guaranteeing the correct functioning of the software that interacts with it, API performance relies on its ability to communicate effectively with API Endpoints.

**Why does we need to Monitor API Endpoints?**

Understanding how each API is performing can drastically change the way you’re able to capture the value APIs add to your business. Proactively Monitoring APIs can ensure that you’re able to find issues before real users experience them.

⇒ In next posting, I will cover API Testing & Monitoring.



## 2. Benefits of APIs

There are several other advantages that come with using APIs.

**Lean on the work of others**

One of the benefits of using APIs is that they allow developers to lean on the work of others. For instance, if you are building a website and you need to retrieve location-based data, you can easily do that by using Google Maps API to retrieve the information. This saves your time and resources, as you don’t have to build everything from scratch.

**Improve the User Experience**

Another benefit is that they can help improve the user experience. APIs are often developed by professionals who specialize in a specific field, so using an API can provide a better user experience than developing a system from scratch. A good user experience is essential to create a loyal community of customers.

**External Usage**

If an app or service becomes popular, other technologies may ask for an API to interact with the system. This can lead to free publicity and introduce the product to new populations of users.

**Security**

Since APIs act as a buffer between systems, developers can choose which behaviors they allow and which they do not. This allows users to make more customized choices based on their privacy preferences.

For example, a user may want to use an app’s Twitter API integration to post a picture on social media, but not share their location. With APIs, users can use one service (the post) without automatically allowing another (location sharing).

**Faster Production**

APIs can streamline the number of devices developers have to consider and allow them to import external APIs to add certain key functionalities, making it easier for programmers to build applications quickly.

**Automation**

Lastly, APIs can be useful for automation testing. The abstraction provided by APIs allows testers to create general testing suites in XML or JSON files and use them on any system integrated with the API. This saves time and resources by avoiding custom scripts, outside web services, and direct integrations.

## 3. Types of APIs

### API Types by Audience

- **Private APIs** are internal APIs that are only used within the company.
- **Partner APIs** are shared with select business partners to allow approved users to access the API.
- **Public APIs**, on the other hand, are available for use by the public in a similar format to open-source software. Public APIs are widely used by developers to build new applications or services. They offer a level of access that is suitable for most applications, and they are often designed to be easy to use.

Many public APIs follow the **OpenAPI standard**. Previously known as Swagger, the [OpenAPI standard](https://www.openapis.org/) is a specification for writing a public API, with guidelines for details like endpoint naming conventions, data formats, and error messaging. However, a private API may adhere to the OpenAPI Standard without being publicly accessible, so pay close attention to whether an “open” API is truly open to the public or just following the OpenAPI standard.

 

### API Types by Architecture
 
- **Monolithic API architecture**
    - In a Monolithic architecture, the entire application is built as a single, self-contained unit. This means that all the application's components, including the user interface, business logic, and data access layer, are tightly coupled together and run on the same server or platform.
    - In short, **all the API endpoints are contained within a single application**, and are responsible for handling all incoming requests, processing data, and returning responses.

- **Microservices API architecture**
    - Microservices architecture is an alternative to Monolithic architecture, where the application is decomposed into smaller, independent services that communicate with each other through APIs. Each service is responsible for a specific business capability and runs as a separate process, communicating with other services through lightweight APIs using a common communication protocol like REST.
    - Microservices API architecture is a powerful approach to building large, complex applications that require high scalability and flexibility. However, splitting up a server into multiple services can add complexity to deployment, difficulty of finding error, monitoring, and can increase the overhead of inter-service communication. It's important to consider the trade-offs.

## 4. API Protocols

The protocol defines **how your API connects to the internet and how it communicates information**.  

They are standardized rules that define how APIs should be constructed so that new APIs can be implemented quickly and consistently.

- REST APIs
- GraphQL APIs
- SOAP APIs
- RPC APIs
- Websocket APIs

**REST APIs** : **REST** (Representational State Transfer) is currently the most popular API protocol. REST is an architectural style that uses HTTP requests to GET, POST, PUT, and DELETE data, and is widely used for building web APIs. RESTful APIs are designed to be simple, scalable, and easy to use, making them a popular choice for web applications and mobile apps.

**GraphQL APIs** : Another popular API protocol is **GraphQL**, which provides a more flexible and efficient way to query and manipulate data, particularly when dealing with complex and varied data structures. GraphQL is becoming increasingly popular, particularly in the context of building modern web applications that require high performance and flexibility.

**Etc.** : Other API protocols include **SOAP** (Simple Object Access Protocol), which is a more rigid and complex protocol that is used in enterprise-level applications, and JSON-RPC (Remote Procedure Call), which provides a lightweight and efficient protocol for remote method calls. However, neither SOAP nor JSON-RPC is as popular as REST or GraphQL in modern web development.

---
Reference.

[https://www.hanl.tech/blog/api란-api의-정의와-종류-장단점/](https://www.hanl.tech/blog/api%EB%9E%80-api%EC%9D%98-%EC%A0%95%EC%9D%98%EC%99%80-%EC%A2%85%EB%A5%98-%EC%9E%A5%EB%8B%A8%EC%A0%90/)