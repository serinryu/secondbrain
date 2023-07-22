# Microservice Architecture (feat. API Gateway)

## Microservice Architecture (MSA)

- Microservices are small, independent, and loosely coupled. A single small team of developers can write and maintain a service.
- Each service is a separate codebase, which can be managed by a small development team.
- Services can be deployed independently. A team can update an existing service without rebuilding and redeploying the entire application.
- Services are responsible for persisting their own data or external state. This differs from the traditional model, where a separate data layer handles data persistence.
- Services communicate with each other by using well-defined APIs. Internal implementation details of each service are hidden from other services.
- Supports polyglot programming. For example, services don't need to share the same technology stack, libraries, or frameworks.

## 🧟‍♂️ Direct client-to-microservice communication 

In a microservices architecture, each microservice exposes a set of (typically) fine-grained endpoints.

![https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/media/direct-client-to-microservice-communication.png](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/media/direct-client-to-microservice-communication.png)

![http://4.bp.blogspot.com/-c18ISS2iASc/Vm7PvTF1lqI/AAAAAAAADGg/MgzY4DPQ6TQ/s640/msa_integration.png](http://4.bp.blogspot.com/-c18ISS2iASc/Vm7PvTF1lqI/AAAAAAAADGg/MgzY4DPQ6TQ/s640/msa_integration.png)

If the client apps send requests directly to the microservices and that raises problems, there are the following issues.

- **Coupling**: Without the API Gateway pattern the client apps are coupled to the internal microservices. The client apps need to know how the multiple areas of the application is decomposed in microservices. When evolving and refactoring the internal microservices that will impact the client apps and it will be hard to maintain as the client apps need to keep track of the multiple microservice endpoints.
- **Too many round-trips**: A single page/screen in the client app might require several calls to multiple services. That can result in multiple network round trips between the client and the server, adding significant latency. Aggregation handled in an intermediate level could improve the performance and user experience for the client app.
- **Security issues**: Without a gateway, all the microservices must be exposed to the “external world”, making larger the attack surface than if you hide internal microservices not directly used by the client apps. The smaller is the attack surface, the more secure your application can be.
- **Cross-cutting concerns**: Each publicly published microservice must handle concerns such as authorization, SSL, etc. In many situations those concerns could be handled in a single tier so the internal microservices are simplified.

To sum up, in a microservices architecture, the client apps usually need to consume functionality from more than one microservice. If that consumption is performed directly, the client will need to handle multiple microservice endpoints to call. If your application has many microservices, handling so many endpoints from the client apps can be a nightmare and since the client app would be coupled to those internal endpoints, evolving the microservices in the future can cause high impact for the client apps.

Therefore, having an intermediate level or tier of indirection (Gateway) can be very convenient for microservice-based applications. **API gateway helps to address these issues by decoupling clients from services.** 

## 👼 **Why API Gateways?**

Why we should use API Gateways instead of direct client-to-microservice communication?

### What is an API gateway?

The API Gateway is a server. It sits between clients and services. It acts as a reverse proxy, routing requests from clients to services. If you don't deploy a gateway, clients must send requests directly to front-end services. 

API Gateway encapsulates the internal system architecture. It provides an API that is tailored to each client. It also has other responsibilities such as **authentication, monitoring, load balancing, caching, request shaping and management,** and **static response handling**. API Gateway is also responsible for **request routing, composition,** and **protocol translation**. All the requests made by the client go through the API Gateway. After that, the API Gateway routes requests to the appropriate microservice.

### API Gateway Pattern

Implement an API gateway that is the single entry point for all clients. The API gateway handles requests in one of two ways. Some requests are simply proxied/routed to the appropriate service. It handles other requests by fanning out to multiple services.

![https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan1.png](https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan1.png)

![http://2.bp.blogspot.com/-mUR7PGsj0eo/Vm7Qd5WvZEI/AAAAAAAADGo/Kc19jdnZbN0/s640/msa_api_gw.png](http://2.bp.blogspot.com/-mUR7PGsj0eo/Vm7Qd5WvZEI/AAAAAAAADGo/Kc19jdnZbN0/s640/msa_api_gw.png)

You need to be careful with the API Gateway pattern. Usually it isn’t a good idea to have a single API Gateway aggregating all the internal microservices of your application. If it does, it acts as a monolithic aggregator or orchestrator and violates microservice autonomy by coupling all the microservices.

Therefore, the API Gateways should be segregated based on business boundaries and the client apps and not act as a single aggregator for all the internal microservices.

### Multiple API Gateways (Backend For Frontend, BFF)

A variation of this pattern is the Backends for frontends pattern. It defines a separate API gateway for each kind of client.

![https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan2.png](https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan2.png)

![https://microservices.io/i/bffe.png](https://microservices.io/i/bffe.png)

![https://static.javatpoint.com/tutorial/microservices/images/introduction-to-api-gateways.png](https://static.javatpoint.com/tutorial/microservices/images/introduction-to-api-gateways.png)


### Security (Authentication & Authorization)

Before jumping in to microservices security let's have a quick look at how we normally implements security at monolithic application level.

- In a typical monolithic application, the security is about finding that 'who is the caller', 'what can the caller do' and 'how do we propagate that information'.
- This is usually implemented at a common security component which is at the beginning of the request handling chain and that component populates the required information with the use of an underlying user repository (or user store).

So, can we directly translate this pattern into the microservices architecture? Yes, but that requires a security component implemented at each microservices level which is talking to a centralized/shared user repository and retrieve the required information. That's is a very tedious approach of solving the Microservices security problem.

Instead of implementing security components at each microservices level, **we can leverage the widely used API-Security standards such as OAuth2 and OpenID Connect to find a better solution to Microservices security problem.** After obtaining an auth token from the auth provider, it can be used to communicate with other microservices.

![http://4.bp.blogspot.com/--AsSN_1XbQ8/Vm7RSSZ9bUI/AAAAAAAADHI/uPJALTn97io/s1600/msa_security.png](http://4.bp.blogspot.com/--AsSN_1XbQ8/Vm7RSSZ9bUI/AAAAAAAADHI/uPJALTn97io/s1600/msa_security.png)

- Leave authentication to OAuth and the OpenID Connect server(Authorization Server), so that microservices successfully provide access given someone has the right to use the data.


### Deployment

When it comes to microservices architecture, the deployment of microservices plays a critical role and has the following key requirements.

- Ability to deploy/un-deploy independently of other microservices.
- Must be able to scale at each microservices level (a given service may get more traffic than other services).
- Building and deploying microservices quickly.
- Failure in one microservice must not affect any of the other services.

[Docker](https://www.docker.com/) (an open source engine that lets developers and system administrators deploy self-sufficient application containers in Linux environments) provides a great way to deploy microservices addressing the above requirements. The key steps involved are as follows.

- Package the microservice as a (Docker) container image.
- Deploy each service instance as a container.
- Scaling is done based on changing the number of container instances.
- Building, deploying and starting microservice will be much faster as we are using docker containers (which is much faster than a regular VM)

[Kubernetes](http://kubernetes.io/) is extending Docker's capabilities by allowing to manage a cluster of Linux containers as a single system, managing and running Docker containers across multiple hosts, offering co-location of containers, service discovery and replication control. As you can see, most of these features are essential in our microservices context too. Hence using Kubernetes (on top of Docker) for microservices deployment has become an extremely powerful approach, specially for large scale microservices deployments.

![http://3.bp.blogspot.com/-AXGTeLekuM0/Vm7RL100LNI/AAAAAAAADHA/lg5wiae0C3I/s400/msa_deployment.png](http://3.bp.blogspot.com/-AXGTeLekuM0/Vm7RL100LNI/AAAAAAAADHA/lg5wiae0C3I/s400/msa_deployment.png)

- Each microservice instance is deployed as a container and there are two container per each host.



## Example

As an example, eShopOnContainers has around 6 internal microservice-types that have to be published through the API Gateways, as shown in the following image.

![https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan4.png](https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan4.png)

![https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan13.png](https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan13.png)

![https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan14.png](https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan14.png)

![https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan7.png](https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan7.png)

- **Authentication and authorization in API Gateways**

![https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan16.png](https://devblogs.microsoft.com/cesardelatorre/wp-content/uploads/sites/32/2018/05/051518_1821_Designingan16.png)

---

Reference.

[https://devblogs.microsoft.com/cesardelatorre/designing-and-implementing-api-gateways-with-ocelot-in-a-microservices-and-container-based-architecture/](https://devblogs.microsoft.com/cesardelatorre/designing-and-implementing-api-gateways-with-ocelot-in-a-microservices-and-container-based-architecture/)

[http://kasunpanorama.blogspot.com/2015/11/microservices-in-practice.html](http://kasunpanorama.blogspot.com/2015/11/microservices-in-practice.html)