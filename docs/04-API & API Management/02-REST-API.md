# REST API

## 🎯 What is REST? 

REST (Representational State Transfer) is one of the software architectures used to transfer hypermedia. It was introduced by Roy Fielding, one of the main authors of HTTP (HyperText Transfer Protocol), in his doctoral dissertation titled ["Architectural Styles and the Design of Network-based Software Architectures"](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm).

- HTTP vs REST
  - HTTP is a communication protocol, while REST is an architecture. 
  - REST is one of the ways to effectively structure data to be transmitted via HTTP.

### RESTful API

REST has six constraints, and an API that satisfies all of these constraints is called a RESTful API.

- Six constraints of REST ([6 guiding constraints](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm))
1. **Client-Server**: It separates the user interface (UI) from the data storage (data), allowing the client and server to be independently constructed.
2. **Stateless**: Information related to session state is managed by the client and not exchanged with the server.
3. **Cacheable**: The client can reuse cached data for identical requests. The response is labeled as cacheable or non-cacheable to indicate whether it can be cached.
4. **Uniform interface**: In order to represent resources consistently across multiple systems, interface constraints are necessary. REST has four conditions for a consistent interface:
   - Identification of resources,
   - Manipulation of resources through representations via messages,
   - Self-descriptive messages,
   - Hypermedia as the engine of application state, acting as an engine for the application's state.
5. **Layered system**: The client communicates with the server as if it were a single server, but the server is composed of a hierarchical structure, with data being composed from multiple servers.
6. **Code on demand (optional)**: The client can download and execute Java applets or JavaScript.


## 🎯 Main Components of REST API

The format of a RESTful API has three main components:

1. **HTTP Method** : Tell the server what we want to do - GET, POST, PUT, DELETE
   
   Developers often implement RESTful APIs by using the Hypertext Transfer Protocol (HTTP). HTTP method tells the server what it needs to do to the resource. The following are four common HTTP methods: GET, POST, PUT, DELETE.
   
2. **URI** : Follow design guidelines for constructing URIs

    URIs are used to uniquely identify resources in a RESTful API. URIs typically follow a hierarchical structure, representing the location of the resource within the API. For example, **`/users`** could be the URI for accessing a collection of user resources, and **`/users/123`** could be the URI for accessing a specific user with the ID 123.

3. **Data Type** : JSON, XML, HTML …

    Representation, or information, is delivered in one of several formats via HTTP: JSON (Javascript Object Notation), HTML, XLT, Python, PHP, or plain text.

![https://images.ctfassets.net/vwq10xzbe6iz/5sBH4Agl614xM7exeLsTo7/9e84dce01735f155911e611c42c9793f/rest-api.png](https://images.ctfassets.net/vwq10xzbe6iz/5sBH4Agl614xM7exeLsTo7/9e84dce01735f155911e611c42c9793f/rest-api.png)
