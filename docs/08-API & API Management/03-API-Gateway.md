# API Gateway

## Why API Gateway?

![U](https://i.ibb.co/M9b8t6p/Screenshot-2023-07-30-at-12-04-51-PM.png)

Microservices Architecture (MSA) is an approach where a large service is broken down into smaller, more manageable services for development and operation. A single large service is divided into tens to hundreds of smaller services. However, if these services are directly accessed by clients, several issues may arise:

1. **Cumbersome Implementation of Common Logic**: Each service requires the implementation of common functionalities such as authentication and authorization, leading to complexity and redundancy.
2. **Difficulty in Managing API Calls**: Keeping track of numerous API calls and managing them becomes challenging and error-prone.
3. **Client Complexity**: Clients need to make multiple tedious calls to different microservices.
4. **Exposure of Business Logic**: Direct client access to microservices may compromise security by revealing internal business logic.

These problems escalate as the number of microservices increases.

To address these issues, introducing an **API Gateway** becomes highly effective in applications with a considerable number of microservices. **The API Gateway acts as another layer in front of the API servers**, unifying the endpoints of all API servers. It provides authentication and authorization functionalities for APIs and routes incoming messages to the appropriate microservices within the application based on their content.

![Untitled](https://i.ibb.co/5Y4STCz/1.png)



## 🧾 Main Functions of API Gateway

![im](https://i.ibb.co/f0HB07q/3.png)

### 1. Authentication and Authorization

In a microservices architecture, implementing authentication and authorization for each service's API calls would require embedding the same code in multiple service instances. This duplication not only complicates maintenance but also makes managing logging and monitoring more challenging.

![Untitled](https://i.ibb.co/WzHQ0N3/4.png)

To alleviate this burden, API Gateway offloads functions such as certificate management, authentication, SSL, and protocol conversion. This reduces the workload on individual services and makes service management and upgrades easier.

> Difference between Authentication and Authorization:
> 
> 
> *Authentication is the process of verifying who the user is (e.g., confirming if the accessing person is really user A), while Authorization is the process of determining if a particular user has permission to access a specific resource.*
> 

### 2. Simplification of Request Procedure

When trying to utilize functionalities targeting multiple microservices, without an API Gateway, the client would have to make requests to multiple services separately.

However, an API Gateway allows the replacement of multiple client requests with a single request, simplifying communication between the client and the backend. This reduces waiting time and improves overall efficiency.

### 3. Routing and Load Balancing

The API Gateway can route incoming messages from clients to the appropriate services based on their content. Additionally, it enables load balancing among service instances, distributing the workload evenly.

### 4. Service Orchestration

Orchestration is a concept of combining multiple microservices to create a new service. However, putting excessive orchestration logic in the API Gateway can overload it and lead to performance degradation. Therefore, service orchestration should be executed based on a high level of technical understanding of MSA and API Gateway.

### 5. Service Discovery

In order to call each service, the API Gateway needs to know the IP addresses and port numbers of the services. In legacy environments with fixed IP addresses, this may not be a significant issue. However, in cloud environments where services are dynamically deployed, finding the locations (IP addresses and port numbers) of services becomes challenging. This process of discovering service locations is known as "Service Discovery," and the API Gateway can implement it from a server-side or client-side perspective.

## 🤔 Considerations for Applying API Gateway

1. The most significant drawback of applying an API Gateway is coupling it with internal microservices.
    - Integrating the API Gateway with internal microservices can lead to increased complexity and potential dependencies between the gateway and individual services. This can make it harder to modify or update microservices independently, as changes to the gateway might also be required.
2. If the **scaling-out** of the API Gateway does not happen flexibly, it may become a bottleneck and lead to performance degradation in the application.
    - Scaling the API Gateway is crucial to handle increased traffic and avoid performance issues. If the gateway becomes a bottleneck, it can slow down the entire system and affect user experience negatively.
    - To prevent bottlenecks, we can start by implementing a single gateway server and then, if possible, quickly scale it out by adding more nodes and implementing proxies. The goal is to achieve smooth and efficient scaling as the application grows.
3. Introducing an additional layer like the API Gateway can lead to **increased network latency.**
    - As the client requests pass through the API Gateway before reaching the microservices, there might be a slight increase in network latency. Careful consideration should be given to optimize the gateway's performance and minimize latency impact.

In summary, while the API Gateway offers significant benefits in terms of simplifying client interactions and managing microservices, it's essential to carefully consider and plan its implementation. Addressing potential drawbacks and ensuring proper scaling and performance optimization will help maximize the advantages of using an API Gateway in a microservices architecture.

    

## 🍬 Types of API Gateways

When it comes to choosing an API gateway for a microservices architecture, there are various options available, each with its own set of features and capabilities:

1. [Zuul](https://github.com/Netflix/zuul?ref=aboullaite.me) (from Netflix): Zuul is a popular open-source API gateway developed by Netflix. It provides routing, filtering, and load balancing capabilities.
2. [Kong](https://github.com/Kong/kong?ref=aboullaite.me): Kong is an open-source API gateway and microservices management layer. It offers features like authentication, rate-limiting, and request/response transformations.
3. [Nginx](https://www.nginx.com/?ref=aboullaite.me): While Nginx is primarily known as a web server, it can also function as an API gateway. It is lightweight and efficient, offering various features to handle API traffic.
4. [HAProxy](https://www.haproxy.com/?ref=aboullaite.me): HAProxy is a high-performance TCP/HTTP load balancer that can also be used as an API gateway to distribute incoming requests across multiple backend services.
5. [Traefik](https://traefik.io/?ref=aboullaite.me): Traefik is a modern reverse proxy and load balancer that works well with containerized environments and microservices.
6. Cloud Vendor Solutions: Major cloud providers like Amazon Web Services (AWS) offer their API gateway services, such as `Amazon API Gateway`, and Google Cloud Platform has `Google Cloud Endpoints`. These services are fully managed and integrated with their respective cloud ecosystems.
7. **Spring Cloud Gateway**: Spring Cloud Gateway is a library for building an API Gateway on top of Spring WebFlux. It aims to simplify routing to APIs and provide cross-cutting concerns like security, monitoring/metrics, and resiliency. Spring Cloud Gateway integrates well with Spring Cloud and offers various cloud patterns to handle microservices' distributed nature.

Each of these API gateway options has its own strengths and use cases, so the choice depends on specific project requirements and the underlying technology stack.

### Spring Cloud Gateway

This project provides a **library** for building an API Gateway on top of Spring WebFlux. Spring Cloud Gateway aims to provide a simple, yet effective way to route to APIs and provide cross cutting concerns to them such as: security, monitoring/metrics, and resiliency.

The distributed nature of microservices brings challenges. Spring helps you mitigate these. With several ready-to-run cloud patterns, [Spring Cloud](https://spring.io/cloud) can help with service discovery, load-balancing, circuit-breaking, distributed tracing, and monitoring. It can even act as an API gateway.

![https://spring.io/img/extra/microservices-6-dark.svg](https://spring.io/img/extra/microservices-6-dark.svg)

To run your own gateway use the `spring-cloud-starter-gateway` dependency.

```jsx
@SpringBootApplication
public class DemogatewayApplication {
	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
			.route("path_route", r -> r.path("/get")
				.uri("http://httpbin.org"))
			.route("host_route", r -> r.host("*.myhost.org")
				.uri("http://httpbin.org"))
			.route("rewrite_route", r -> r.host("*.rewrite.org")
				.filters(f -> f.rewritePath("/foo/(?<segment>.*)", "/${segment}"))
				.uri("http://httpbin.org"))
			.route("hystrix_route", r -> r.host("*.hystrix.org")
				.filters(f -> f.hystrix(c -> c.setName("slowcmd")))
				.uri("http://httpbin.org"))
			.route("hystrix_fallback_route", r -> r.host("*.hystrixfallback.org")
				.filters(f -> f.hystrix(c -> c.setName("slowcmd").setFallbackUri("forward:/hystrixfallback")))
				.uri("http://httpbin.org"))
			.route("limit_route", r -> r
				.host("*.limited.org").and().path("/anything/**")
				.filters(f -> f.requestRateLimiter(c -> c.setRateLimiter(redisRateLimiter())))
				.uri("http://httpbin.org"))
			.build();
	}
}
```

---

Reference.

[https://velog.io/@tedigom/MSA-제대로-이해하기-3API-Gateway-nvk2kf0zbj](https://velog.io/@tedigom/MSA-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-3API-Gateway-nvk2kf0zbj)

[https://spring.io/microservices](https://spring.io/microservices)