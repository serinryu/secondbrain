# Integrating Frontend and Backend (feat. CORS)

## CORS

When integrating frontend and backend, one of the primary concerns is CORS (Cross-Origin Resource Sharing). Generally, web browsers enforce the Same-Origin Policy for security reasons, which blocks AJAX requests to resources on different origins (domains, ports, protocols, etc.). This policy is known as CORS. **Therefore, when frontend and backend are hosted on different domains or ports, CORS issues may arise due to the browser's security policy.**

Using a proxy can bypass CORS issues by making it appear as if the frontend and backend are being served from the same domain/port. In the case of a proxy, server-to-server communication occurs, eliminating CORS problems.

For example, when a React application runs on port 3000 and a Spring Boot backend runs on port 8080, the web browser recognizes them as different origins, resulting in CORS policy restrictions on resource access.


To sum up, these are the methods to avoid CORS problems.

1. **Bundle together under one domain** : In the development stage, the frontend and backend can be run on separate development servers. During deployment, they can be bundled together under **one domain or subdomain**, effectively avoiding CORS issues.
2. **CORS middleware configuration**: By setting up CORS-related configurations on the backend server, it is possible to allow requests from different origins. This enables the frontend to directly send requests to the backend.
3. **Proxy Server**

 3-1. **Establishing a proxy server**: Requests sent from the client (frontend) are routed through the proxy server before reaching the backend, and the proxy server then forwards the backend's response back to the client. This way, the proxy server situated between the client and server can circumvent CORS issues, enabling the requests to be successful. Typically, web servers like Nginx or Apache are used to set up the proxy.
 
 3-2. **Frontend development server proxy configuration**: In the development environment, the frontend development server can be configured with a proxy setting to relay requests to the backend API server. This makes the frontend appear as if it is running on the same domain/port as the backend, thus bypassing CORS issues. For instance, in React's **`create-react-app`**, adding a setting like **`"proxy": "http://localhost:8080"`** in the **`package.json`** file allows communication with the backend API without needing a separate proxy.

## Frontend : Development server(3000 port) vs Built static files 

During the development stage, a React application is accessible through a local development server on a specific port (e.g., 3000). This allows developers to quickly make changes and test the application.

In contrast, during the deployment stage, it is common to host the built static files on a web server. These static files are served to clients, and the React application runs in the client's web browser.

> - Development stage : local development server (3000 port)
> - Deployment stage : Build static files

The advantages of hosting built static files on a web server are as follows:

1. Client-Side Execution: The React application runs in the client's web browser, reducing server load and improving user experience.
2. Caching and Performance: Built static files are cached in the web browser, leading to faster loading times for returning users.
3. Simplified Server Configuration: Hosting static files on a web server simplifies server setup.
4. Use of CDN: Content Delivery Networks (CDNs) can be utilized to distribute static files globally, providing high performance to users worldwide.

To deploy the frontend application, developers typically use the command **`npm run build`** or **`yarn build`**, which generates optimized static files for hosting on the web server.

## **Example of Architecture** : How many servers do we need?

**Case 1. React (Port 3000, Development Server) + Spring (Port 8080) + MySQL (Port 3306)**

- Minimum of 3 servers.

![img](https://i.ibb.co/8s8kdyv/22.png)

**Case 2. Web Server (Port 80 or 443) + Spring (Port 8080) + MySQL (Port 3306) => ⭐️Deployment Environment!** 

- Minimum of 3 servers.
- **Nginx hosts the built static files**, allowing users to access the application. Nginx typically runs the frontend application on standard HTTP/HTTPS ports such as 80 or 443.

![img](https://i.ibb.co/x1S7pQt/3.png)

**Case 3. Web Server (Port 80 or 443) + React (Port 3000, Development Server) + Spring (Port 8080) + MySQL (Port 3306)**

- Minimum of 4 servers.
- **Nginx acts as a reverse proxy**, forwarding incoming requests to port 3000. The requests are then directed to the frontend server (React app) to facilitate interaction with clients.

![img](https://i.ibb.co/LhYwN4B/a.png)


To sum up, the servers used in the given architecture are as follows:

1. Frontend Server (React) and Web Server:
    - Either a **Frontend Development Server** or a **Web Server** that serves static files.
    - During development, the **development server** is used to run the React application. During deployment, the built static files are served through a **Web Server** like Nginx. (Usually, the development server is used only during development and testing, and in the production environment, the built static files are served through a Web Server like Nginx.)
2. Backend Server (Spring Boot, Tomcat, etc.):
    - The backend server runs the web application or API server.
    - It operates independently from the frontend server and provides or processes data through API endpoints.
3. Database Server (MySQL, etc.):
    - The database server stores and manages data used by the application.
    - The backend server communicates with the database server to retrieve or store the required data.
4. (In the case of MSA Architecture) **API Gateway Server**: The API Gateway receives client requests from microservices, routes them, and performs necessary functionalities. Therefore, at least one API Gateway server is required.

The minimum number of servers needed is one or more for each category, and the actual number may vary depending on the project's configuration and traffic. Typically, during development and testing, having one server for each category is sufficient. However, in the production environment, ensuring availability and performance is essential, which may involve server replication and load balancing. The minimum number of servers should be determined based on the required functionalities and expected traffic before deployment.

## 🏰 Deployment Environment

In the production environment, it is common to integrate React and Spring into one service (hosted in the same environment, e.g., `http://example.com`.

- `http://example.com/api/**` → Backend API Server (Web server providing Spring Boot REST API)
- `http://example.com/**` → Frontend Server (Web server providing React application)

How do the frontend and backend communicate in the deployment environment? There are two main methods.

### 1. Sending API Requests + **CORS Configuration**

- In the React application, API requests can be sent using **environment variables.** Depending on whether it's the deployment or local development environment, the React application fetches the API server address specified in the environment variables. Thus, in the deployment environment, it sends requests to the backend API server at **`http://example.com/api`**, and in the local development environment, it sends requests to the backend API server on the local development server at **`http://localhost:8080/api`**. In this way, based on the configured environment variables, the React application can send requests to the backend API server.
    - The **`.env.production`** file is used to set the API server address for the deployment environment to **`http://example.com/api`**, and the **`.env.development`** file is used to set the API server address for the local development environment to **`http://localhost:8080/api`**.
- However, if the frontend and backend are not running on the same domain and port, CORS (Cross-Origin Resource Sharing) settings need to be configured on the backend server to resolve the CORS policy issue.
- Additionally, in this scenario, since in the deployment environment, the backend server is typically operated separately on a different server, the frontend application needs to know **the address and port number of the backend server.**

![img](https://i.ibb.co/8s8kdyv/22.png)


#### Example

**React Frontend:**

1. Create two environment files: `.env.production` and `.env.development`. Place them in the root directory of your React application.
2. Inside the `.env.production` file, add the following:
    
    ```
    REACT_APP_API_URL=http://example.com/api
    ```
    
3. Inside the `.env.development` file, add the following:
    
    ```
    REACT_APP_API_URL=http://localhost:8080/api
    ```
    
4. In your React application, use the `REACT_APP_API_URL` environment variable to send API requests.
    
    ```js
    // api.js
    
    const API_URL = process.env.REACT_APP_API_URL;
    
    export const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/data`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };
    ```
    
    In the above code, the `fetchData` function uses the `REACT_APP_API_URL` environment variable to construct the API endpoint. The value of the variable will be different depending on whether it is the production or development environment.
    

**Spring Backend:**

1. In your Spring Boot backend application, configure CORS to allow requests from the frontend.
    
    ```jsx
    // AppConfig.java
    
    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
    
    @Configuration
    public class AppConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            // Allow requests from any origin in development environment
            if ("development".equals(System.getenv("SPRING_PROFILES_ACTIVE"))) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        }
    }
    ```
    
    In the above code, the `addCorsMappings` method configures CORS to allow requests from any origin when in the development environment. In a production environment, you can configure CORS to allow requests only from specific origins (e.g., `http://example.com`).
    
2. Create a REST API endpoint in your Spring controller to handle the incoming requests from the React frontend.
    
    ```jsx
    // DataController.java
    
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;
    
    @RestController
    @RequestMapping("/api")
    public class DataController {
        @GetMapping("/data")
        public String getData() {
            // Your logic to fetch and return data goes here
            return "This is the data from the backend.";
        }
    }
    ```
    
    In the above code, the `getData` method represents a simple example of fetching data from the backend. You can replace it with your own logic to interact with your database or other data sources.
    

**Nodejs Backend:**

Create a Node.js server using Express and configure CORS to allow requests from the frontend.

```jsx
// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// Allow requests from any origin in development environment
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

// Define your API routes
app.get('/api/data', (req, res) => {
  // Your logic to fetch and return data goes here
  res.json({ message: 'This is the data from the backend.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### 2. Hosting Built Staic files using a **Web Server**

- Nginx hosts the built static files, allowing users to access the application. Nginx typically runs the frontend application on standard HTTP/HTTPS ports such as 80 or 443.
![img](https://i.ibb.co/x1S7pQt/3.png)

### 3. Proxy Server using a **Web Server**

- It is also possible to set up a proxy server using a web server (e.g., Nginx).
- By using Nginx, the frontend and backend can be connected, and the backend API requests can be relayed through the proxy to communicate with the backend server.
- This way, the frontend application communicates with the backend API server through the web server (Nginx).

![img](https://i.ibb.co/LhYwN4B/a.png)



## 👩‍🚒 Development Environment

During the local development stage, the development server is run to execute the API and frontend locally.

- `http://localhost:8080/api` → Backend API Server
- `http://localhost:3000` → Frontend dev Server
    - Frontend development primarily takes place using the webpack dev server at `http://localhost:3000/`.

How do the frontend and backend communicate in the development environment? There are two main methods.

### 1. Sending API Request + **CORS Configuration**

- In the React application, **environment variables** can be used to differentiate between the deployment and local development environments. In the local development environment, API requests are sent to the backend API server on the local development server at **`http://localhost:8080/api`**. In this way, based on the configured environment variables, the React application can send requests to the backend API server.
    - The **`.env.production`** file is used to set the API server address for the deployment environment to **`http://example.com/api`**, and the **`.env.development`** file is used to set the API server address for the local development environment to **`http://localhost:8080/api`**.
- However, if the frontend and backend are not running on the same domain and port, CORS (Cross-Origin Resource Sharing) settings need to be configured on the backend server to resolve the CORS policy issue.
- Additionally, in this scenario, the frontend application **needs to be aware of the backend server's port number**. Since in the deployment environment, the backend server is typically operated separately on a different server, the frontend application needs to know the address and port number of the backend server.

### 2. Frontend Development Server **Proxy Setup**

- To avoid CORS (Cross-Origin Resource Sharing) issues in the local development environment, the frontend development server uses the proxy functionality. This is achieved by adding a **`"proxy"`** configuration in the **`package.json`** file, which automatically sets up the proxy server.
- **The proxy server in the development environment is automatically provided by the frontend development framework**, and there is no need to set up a separate proxy server.

#### Example

1. Add proxy configuration to the `package.json` file:
    
    ```json
    "proxy": "<http://localhost:8080>"
    ```
    
    In the above setting, `"<http://localhost:8080>"` refers to the address of the API server.
    
2. Start the Frontend development server:
    
    Start the Frontend development server with the proxy configuration. For example, in React, you can run the following command:
    
    ```
    npm start
    ```
    
    With this configuration, the Frontend development server receives client requests and forwards them to the configured proxy (`http://localhost:8080`). Therefore, communication with the API server is facilitated through the Frontend development server, and there's no need to open a separate server for the proxy. This allows for resolving CORS (Cross-Origin Resource Sharing) issues and enables convenient development of the API and Frontend together in the development environment.