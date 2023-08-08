# Service Discovery in MSA (feat. Eureka Server)

- 🥞 Check out my [Github Code](https://github.com/serinryu/spring-msa)

## Wait, why Use API Gateway?

An API Gateway is a server that is the single entry point into the system. It is similar to the **[Facade](http://en.wikipedia.org/wiki/Facade_pattern)** pattern from object‑oriented design. **The API Gateway encapsulates the internal system architecture and provides an API that is tailored to each client.** It might have other responsibilities such as authentication, monitoring, load balancing, caching, request shaping and management, and static response handling.

All requests from clients first go through the API Gateway. It then routes requests to the appropriate microservice. The API Gateway will often handle a request by invoking multiple microservices and aggregating the results. For most microservices‑based applications, it makes sense to implement an API Gateway, which acts as a single entry point into a system. 

## Why Use **Service Discovery?**

![https://www.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part4-1_difficult-service-discovery.png](https://www.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part4-1_difficult-service-discovery.png)

The API Gateway needs to know the location (IP address and port) of each microservice with which it communicates. In a traditional application, you could probably hardwire the locations, **but in a modern, cloud‑based microservices application this is a nontrivial problem.Service instances have dynamically assigned network locations.** Moreover, the set of service instances changes dynamically because of autoscaling, failures, and upgrades.

**Consequently, your client code needs to use a more elaborate service discovery mechanism.** Consequently, the API Gateway, like any other service client in the system, needs to use the system’s service discovery mechanism: either **[Server‑Side Discovery](http://microservices.io/patterns/server-side-discovery.html)** or **[Client‑Side Discovery](http://microservices.io/patterns/client-side-discovery.html)**.


- In essence, **Eureka Server** acts as a tool for implementing the Service Discovery pattern, storing and managing the network information(such as IP addresses and ports) of services.
- **Each service registers its information (such as IP addresses and ports)** with the Eureka Server upon initialization. Subsequently, when needed, services can retrieve information about other services from the Eureka Server.


### 1️⃣ Client Side Service Discovery

![https://www.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part4-2_client-side-pattern.png](https://www.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part4-2_client-side-pattern.png)


When using **[client‑side discovery](https://microservices.io/patterns/client-side-discovery.html)**, **the client is responsible for determining the network locations of available service instances and load balancing requests across them.** The client queries a service registry, which is a database of available service instances. The client then uses a load‑balancing algorithm to select one of the available service instances and makes a request.

The network location of a service instance is registered with the service registry when it starts up. It is removed from the service registry when the instance terminates. The service instance’s registration is typically refreshed periodically using a heartbeat mechanism.

**[Netflix OSS](https://netflix.github.io/)** provides a great example of the client‑side discovery pattern. **[Netflix Eureka](https://github.com/Netflix/eureka)** is a service registry. It provides a REST API for managing service‑instance registration and for querying available instances. **[Netflix Ribbon](https://github.com/Netflix/ribbon)** is an IPC client that works with Eureka to load balance requests across the available service instances.

- Benefits
    - This pattern is relatively straightforward and, except for the service registry, there are no other moving parts.
    - Also, since the client knows about the available services instances, it can make intelligent, application‑specific load‑balancing decisions such as using hashing consistently.
- Drawback
    - It couples the client with the service registry. You must implement client‑side service discovery logic for each programming language and framework used by your service clients.

### 2️⃣ Server Side Service Discovery

![https://www.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part4-3_server-side-pattern.png](https://www.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part4-3_server-side-pattern.png)

The client makes a request to a service via a load balancer. The **load balancer** queries the service registry and routes each request to an available service instance. As with client‑side discovery, service instances are registered and deregistered with the service registry.

The **[AWS Elastic Load Balancer](https://aws.amazon.com/elasticloadbalancing/)** (ELB) is an example of a server-side discovery router. An ELB is commonly used to **load balance** external traffic from the Internet. However, you can also use an ELB to load balance traffic that is internal to a virtual private cloud (VPC). A client makes requests (HTTP or TCP) via the ELB using its DNS name. The ELB load balances the traffic among a set of registered Elastic Compute Cloud (EC2) instances or EC2 Container Service (ECS) containers. There isn’t a separate service registry. Instead, EC2 instances and ECS containers are registered with the ELB itself.

- Benefit
    - Details of discovery are abstracted away from the client. Clients simply make requests to the load balancer. This eliminates the need to implement discovery logic for each programming language and framework used by your service clients.
    - Also, some deployment environments provide this functionality for free.
- Drawback
    - Unless the load balancer is provided by the deployment environment, it is yet another highly available system component that you need to set up and manage.


---
Reference.

[https://www.nginx.com/blog/building-microservices-using-an-api-gateway/](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)

[https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/](https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture/)