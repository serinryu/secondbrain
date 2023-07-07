# Building REST API

## 🎯 REST

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


## 🎯 Shift from MVC pattern to REST API

Developers started to shift from traditional MVC (Model-View-Controller) patterns to REST APIs for several reasons:

1. **Decoupling of Front-end and Back-end**
    
    Traditional MVC architectures tightly couple the front-end and back-end components of an application. This makes it challenging to scale, maintain, and evolve each component independently. REST APIs provide a clear separation between the client-side (front-end) and server-side (back-end) components, allowing them to evolve independently. This decoupling enables more flexibility and scalability in development.

2. **Client Diversity and Reusability**
   
   With the proliferation of different client platforms (web, mobile, desktop, IoT devices), developers needed a way to serve data and functionality to various clients using a single back-end. REST APIs provide a uniform interface for clients to consume data and perform operations, enabling reusability across different client applications. This simplifies development, as developers can focus on building robust APIs rather than creating separate back-ends for each client.
   
3. **Simplicity and Scalability**
   
   REST APIs follow a lightweight and straightforward architectural style. They utilize standard HTTP methods (GET, POST, PUT, DELETE) to represent operations on resources. This simplicity makes it easier to understand, design, and maintain APIs. Additionally, REST APIs can scale well due to their statelessness and cacheability characteristics, allowing for high-performance and efficient communication between clients and servers.
   
4. **Integration and Interoperability**
   
   REST APIs facilitate seamless integration and interoperability between different systems and services. They leverage widely adopted web standards, such as HTTP and JSON, making it easier for different applications to communicate and exchange data. This promotes a modular and interoperable architecture, allowing developers to leverage existing services and build composite applications.
   
5. **Mobile Application Development**
   
   The rise of mobile applications created a demand for back-ends that can efficiently support mobile clients. REST APIs provide a lightweight and flexible approach for mobile app development, enabling efficient data transfer and minimizing the overhead on mobile devices. Mobile apps can consume REST APIs to retrieve data, perform operations, and synchronize data with the server.

Overall, the adoption of REST APIs offers advantages in terms of flexibility, scalability, reusability, simplicity, and interoperability, making it a preferred choice for developers transitioning from traditional MVC patterns to more modern and distributed architectures.



## 🌱 **How to Build REST API in Spring**

To develop a REST API server using Spring Boot, you can follow the following approach:

1. **Design REST API in MVC pattern**: 
    
    While traditional MVC was primarily used for delivering rendering views such as HTML, JSP  content, with REST API, you can handle XML or JSON as well. Fortunately, in Spring Boot, you can build your REST API keeping MVC pattern you are already using, with the help of some features and annotations that Spring Boot provides (by using **`@RequestBody`** and **`@ResponseBody`** annotation in your controller methods.)
    
    While REST architecture does not strictly enforce the use of the traditional MVC pattern, you can still apply the principles of MVC in the development of your REST API using Spring Boot. So, you can handle JSON or XML representations of resources within the context of RESTful API development while keeping the separation of concerns provided by the MVC pattern.
    
2. **Utilize the Spring Boot Data REST library**
    
    By leveraging the Spring Boot Data REST library, you can simplify the implementation of your REST API without explicitly writing the VC (View and Controller) components of the MVC pattern. With this library, you can focus on defining your domain models and repositories, and the REST API endpoints will be automatically generated and made available for you.
    

In this article, with MVC pattern + Spring Boot 3.x, let’s develop a REST API server.


## 🌱 **MVC Pattern vs. REST API in Spring** 

### 1. Traditional MVC Pattern : Controller returns VIEW.

In traditional Spring MVC, it was responsible for handling the entire process of rendering the view(such as HTML, JSP, or other view technologies) and sending it to the client. Therefore, when using the **`@Controller`** annotation in Spring MVC, by default, it is assumed that the annotated methods will return a **View**.

Please note that Spring MVC follows a server-side rendering approach, where the server generates the view and sends it to the client as a complete HTML page. This is in contrast to RESTful APIs, where the server typically sends data in a structured format (such as JSON or XML) that the client can process and render on its own.

![https://blog.kakaocdn.net/dn/bED6o9/btrx1wyKwpF/NtSlrTohpAI79l6MA95SZ1/img.png](https://blog.kakaocdn.net/dn/bED6o9/btrx1wyKwpF/NtSlrTohpAI79l6MA95SZ1/img.png)

### 2. REST API : Controller returns Data.

Nowadays, the trend is to separate the backend and frontend completely, where the backend focuses on providing APIs, and the frontend handles the presentation layer. In this architecture, the backend's APIs are designed to return data instead of views. When applying REST API principles, you can return data in formats such as XML or JSON. JSON, in particular, is popular due to its compatibility with JavaScript.

In Spring, by using both the **`@Controller`** and **`@ResponseBody`** annotations together, you can indicate that the controller methods should return data in a RESTful manner, typically in formats like JSON. However, when only the **`@Controller`** annotation is used, Spring automatically assumes that it will return a view, and if the corresponding view does not exist, an error will occur.  

To further simplify development, the **`@RestController`** annotation emerged as a combination of **`@Controller`** and **`@ResponseBody`**. With **`@RestController`**, it becomes more convenient to develop REST APIs.

- **`@RestController` = `@Controller`** + **`@ResponseBody`**

![https://blog.kakaocdn.net/dn/b3McJC/btrx1IGcnGs/2iHFmw3bbqasfCJzwCKYuK/img.png](https://blog.kakaocdn.net/dn/b3McJC/btrx1IGcnGs/2iHFmw3bbqasfCJzwCKYuK/img.png)
```java
@RestController
public class UserController {

    private List<User> users = new ArrayList<>();

    // 모든 사용자를 조회하는 API (HTTP GET 요청 처리)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return users;
    }

    // 새로운 사용자를 생성하는 API (HTTP POST 요청 처리)
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        users.add(user);
        return user;
    }
}
```

[Reference](https://blog.neonkid.xyz/220)

### 3. Mixture : mix MVC and REST concepts

It is also possible to mix MVC and REST concepts in your development approach. 

You can use the **`@RestController`** annotation for handling data in JSON format and the **`@Controller`** annotation for handling view-related concerns. This approach allows you to maintain a clear separation of responsibilities and take advantage of the strengths of both paradigms in your application. 

- **`@RestController`** is responsible for **returning data (JSON, etc.)**
- **`@Controller`** is responsible for **return views**.

By using **`@RestController`**, you can focus on building APIs that return data directly in JSON or other structured formats. You can still utilize the **`@Controller`** annotation for specific endpoints that are responsible for rendering views.  

Overall, by leveraging both **`@RestController`** and **`@Controller`**, you can achieve a combination of RESTful API functionality for data handling and traditional MVC capabilities for view-related concerns. 



## 🌱 @ResponseEntity

**`@ResponseEntity` is** for more flexible response handling in RESTful APIs. Then, what is the benefit of using **`@ResponseEntity`** ? 

```java
@RestController 
@RequiredArgsConstructor // Constructor-injected DI for urlService
public class urlController {

    private final urlService urlService; // autowire urlServiceImpl
 
	@RequestMapping(value = "/example1", method = RequestMethod.GET)
    public Map<String, Url> findAllController(){
        return urlService.findAllUrl();
    }

    @RequestMapping(value = "/example2", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Url>> findAllController(){
        Map<String, Url> allUrl = urlService.findAllUrl();
        return ResponseEntity.ok(allUrl);
    }
}
```

Both two controllers return data in the context of REST API. 

The benefits of using the **`ResponseEntity`** class include the ability to provide detailed control over the HTTP response in terms of status codes, headers, and the response body. This capability empowers you to design and deliver flexible and robust response handling in your RESTful APIs.


## 🌱 @ResponseBody & @RequestBody

When constructing a REST API, the **`@RequestBody`** and **`@ResponseBody`** annotations are commonly used to facilitate communication between the client and server through **data**. 

These annotations are utilized for converting (deserializing and serializing) Java objects to and from the body of HTTP requests and responses. Internally, this conversion process is handled automatically by the MessageConverter.

- **@RequestBody** is used to convert the JSON data from the body of an HTTP request into a Java object (JSON → Java object, deserialization).
- **@ResponseBody** is used to convert a Java object into the body of an HTTP response (Java object → JSON, serialization).
- The [HttpMessageConverter](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/HttpMessageConverter.html) is responsible for performing these conversions, enabling seamless communication between the client and server.

Therefore, using **@RequestBody** and **@ResponseBody** annotations along with the HttpMessageConverter allows for automatic conversion between Java objects and JSON data, facilitating efficient data transmission in RESTful APIs.

```java
@PostMapping("/users")
public User createUser(**@RequestBody** User user) {
    // ... 사용자 생성 로직
}

@GetMapping("/users/{id}")
**@ResponseBody**
public User getUser(@PathVariable int id) {
    // ... 사용자 조회 로직
}
```


## 🌱 **Example : Building REST APIs**

Let’s change non-REST APIs into REST APIs.

:::tip
How to get data from client on the server-side?
You should understand the difference between `@RequestBody` and `@RequestParam`.
Check out my blog article! 👇
- [[Spring] @RequestBody vs @RequestParam](https://serinryu.medium.com/spring-requestbody-vs-requestparam-78b1b433fc0c)
:::
[This example code](https://serinryu.medium.com/spring-requestbody-vs-requestparam-78b1b433fc0c) is used for understanding how to obtain data from client on the server-side using @**RequestBody, @RequestParam.** 

Since these are not REST APIs, the server couldn’t pass JSON data to the browser. Let’s develop the above API as a REST API and return the data in JSON format, not View anymore.

- Example 1. General POST request (form data)
```
// Original (Non REST API)
@PostMapping("/giveformdata")
public String giveformdata(@RequestBody String req) { 
    System.out.println("🔥" + req);
    return ""; // return VIEW
}
```
```
// Change into REST API
@PostMapping("/giveformdata")
public String giveformdata(@RequestBody String req) {
    System.out.println("🔥" + req);
    return req;
}
```

- Example 2. Asynchronous POST request (JSON data)
```
// Non REST API
@PostMapping("/givejsondata2")
public String givejsondata2(@RequestBody String req) {  
    System.out.println("🔥" + req);
    return ""; // return VIEW
}
```
```
// Change into REST API
@PostMapping("/givejsondata2")
public String givejsondata2(@RequestBody String req) {  
    System.out.println("🔥" + req);
    return req;
}
```

---
Reference.

[https://medium.com/webeveloper/ajax-의-클라이언트와-서버-비동기-통신-d681c905e2a9](https://medium.com/webeveloper/ajax-%EC%9D%98-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%EC%99%80-%EC%84%9C%EB%B2%84-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%86%B5%EC%8B%A0-d681c905e2a9)

[https://restfulapi.net/](https://restfulapi.net/)

[https://betterprogramming.pub/restful-api-design-step-by-step-guide-2f2c9f9fcdbf](https://betterprogramming.pub/restful-api-design-step-by-step-guide-2f2c9f9fcdbf)

[https://mangkyu.tistory.com/49](https://mangkyu.tistory.com/49)

[https://blog.neonkid.xyz/219](https://blog.neonkid.xyz/219)