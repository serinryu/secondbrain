# Web Server (feat.Nginx)

## Web Server VS WAS

![img](https://i.ibb.co/my7Hwwm/image.png)

1. **Web Server**: The web server is responsible for handling client requests and serving static content (e.g., .html, .png, .css files). When a client sends an HTTP request, the web server processes it, serves static content directly, and relays dynamic content requests to the Web Application Server (WAS).
2. **Web Application Server (WAS)**: The WAS processes dynamic content, which involves business logic and data retrieval from the database. It generates dynamic responses based on the client's request and returns the results to the web server, which then sends the response back to the client.
    - WAS can function independently and handle both static and dynamic content, but it is more commonly used for processing dynamic content and offloading such tasks from the web server.
    - Some frameworks, like Node.js with Express.js, can act as both a web server and a WAS, simplifying the architecture for smaller applications.
    - Notable examples of WAS include Tomcat, JBoss, Jeus, and WebSphere.

## Why Web Server and WAS?

When a user sends a request to access a web application, the request first reaches the web server. The web server's primary task is to handle various types of requests, including static resource requests (like HTML, CSS, and image files), as well as dynamic requests that need processing from the application server.

- **Web Server**: A web server is used to **efficiently serve static content directly to clients**, reducing the load on the application server (WAS). It helps optimize resource usage and speeds up the process of delivering static resources like images, stylesheets, etc.
- **Web Application Server (WAS)**: **Dynamic content,** such as personalized data and business logic, requires processing on the server-side. The WAS handles these dynamic requests, retrieving data from the database, and generating responses based on the client's requirements. By using a dedicated application server for this purpose, resources can be utilized more efficiently, and the server can handle a larger number of requests from multiple clients.

## 🍱 **Benefits for Separating Web Server and WAS**

Even though WAS has an internal web server and can handle static resources,  web server is commonly placed in front of the application server (WAS).

By segregating the tasks between the web server and the application server, it becomes easier to manage and scale each component independently based on the specific demands of the application. **This separation of concerns and added functionality make it a common and effective server architecture for web applications.**

By placing the web server in front of the application server, several benefits are achieved:

1. **Load Distribution**: Web Servers efficiently handle static content, while WAS focuses on processing dynamic content and database access. Separating these functions allows for better load distribution, reducing the burden on each server and improving overall performance.
    - The web server serves static content directly, reducing the load on the backend.
2. **Enhanced Security**: Physically separating the Web Server from the WAS strengthens security by preventing direct access to the WAS, limiting potential vulnerabilities.
    - Backend port numbers are hidden, enhancing security by reducing direct exposure to clients.
3. **Scalability with Load Balancing**: By placing Web Servers in front of multiple WAS instances and using load balancing techniques, the system can handle increased traffic and scale out as needed. Load balancing evenly distributes requests among WAS instances, ensuring efficient resource utilization.
    - Load balancing allows adding multiple backend instances and distributing requests efficiently.
4. **Facilitating Maintenance and Updates**: Separating the functionalities makes maintenance and updates easier. It allows for independent management of Web Servers and WAS, minimizing disruptions during updates or upgrades.

Overall, separating the roles of Web Server and WAS in a Web Service Architecture offers benefits in terms of performance, security, scalability, and maintenance.



## 👁️ **Overall Architecture**

![Untitled](https://i.ibb.co/xzrSSrC/b.png)

In summary, let me explain the overall architecture of the web application developed using React and Spring:

1. **Client (Frontend):**
    - Frontend is developed using React.
    - It creates the user interface (UI) and renders screens using components.
    - It handles user inputs and requests necessary data from the server for rendering.
    - It operates within web browsers and can be developed using the React development server.
2. **Server (Backend):**
    - Backend is developed using Spring.
    - It accepts and processes HTTP requests from the client.
    - It handles business logic and interacts with the database.
    - It defines API endpoints to provide data to the client.
3. **Web Server:**
    - In the production environment, React and Spring can be integrated to build a web server.
    - The web server receives HTTP requests from the client and routes requests between React and Spring as needed.
    - It integrates the client and backend into a single service.
    - Web servers like Nginx, Apache, etc., can be used for this purpose.




## 🏄‍♀️ Example

![a](https://i.ibb.co/LhYwN4B/a.png)

Here's an example of how Nginx, React, and each backend microservice (implemented using Spring Boot) handle incoming requests, assuming React runs on port 3000 and the backend microservice runs on port 8080:

1. **Nginx (Port: 80)**:
    
    Nginx acts as a reverse proxy, routing requests for the React application and backend microservice appropriately.
    
    For example, when a user accesses `example.com`, Nginx routes the request to the React application.
    
    ```xml
    http {
        server {
            listen 80;
            server_name example.com;
    
            location / {
                proxy_pass <http://localhost:3000>; # Routes to the React application
            }
    
            # Other configurations...
        }
    }
    
    ```
    
2. **React Application (Port: 3000)**:
    
    The React application runs on port 3000 and is served through Nginx for the frontend.
    
    For example, when a user accesses `example.com`, Nginx routes the request to the React application, and the React homepage is displayed.
    
3. **Spring Boot Microservice (Port: 8080)**:
    
    The Spring Boot backend microservice runs on port 8080, and API requests are handled through the API Gateway.
    
    For example, when a user accesses `example.com/api`, the API request is routed through the API Gateway to the backend microservice.
    
    ```jsx
    @RestController
    public class ExampleController {
        @GetMapping("/api/hello")
        public String hello() {
            return "Hello from Spring Boot Microservice!";
        }
    }
    ```
    
    The above example shows a simple Spring Boot controller with the `/api/hello` endpoint. When a request comes to `example.com/api/hello`, it is routed through the API Gateway to this endpoint, and the response "Hello from Spring Boot Microservice!" is returned.
    

In this setup, Nginx routes requests to either the React application or the backend microservice through the API Gateway, enabling a separation of concerns and a clear distinction between frontend and backend in the architecture.