# Monolithic vs Micro Service Architecture (MSA)

## TLDR;

![https://www.abtasty.com/wp-content/uploads/monolithic-vs-microservices.png](https://www.abtasty.com/wp-content/uploads/monolithic-vs-microservices.png)

The table below summarizes some of the major differences between the two architectures:

|   | Monolithic  | Microservices |
| --- | --- | --- |
| Deployment | Simple deployment of the entire system  | More complex as there are independent services which need to be deployed independently |
| Scalability | Harder to scale; the whole system needs to be redeployed | Each element can be scaled independently without downtime |
| Testing | Easier to test: end-to-end testing | Harder to test; each component needs to be tested individually |
| Flexibility | Limited to single technology | Freedom of choice of tech stack |
| Security | Communication with a single unit and so security is handled in one place | Large system of standalone services communicating via network protocols raises security concerns |
| Adoption  | Traditional way to build applications so easier to implement and develop as developers possess necessary skills | Specialized skills are required |
| Resiliency | Single point of failure- any issue can cause a breakdown in the entire application | A failure in one microservice doesn’t affect the other services |

## 1. **Monolithic Architecture**

![https://www.datarobot.com/wp-content/uploads/2022/03/1.png](https://www.datarobot.com/wp-content/uploads/2022/03/1.png)

If all the functionalities of a project exist in a single codebase, then that application is known as a monolithic application. We all must have designed a monolithic application in our lives in which we were given a problem statement and were asked to design a system with various functionalities. We design our application in various layers like presentation, service, and persistence and then deploy that codebase as a single jar/war file.

### 👎 Disadvantages

⇒ **Tight coupling, Less scalability, Reliability issues, Flexibility, Complexity**

- It becomes too large with time and hence, difficult to manage.
- We need to redeploy the whole application, even for a small change.
- As the size of the application increases, its start-up and deployment time also increases.
- For any new developer joining the project, it is very difficult to understand the logic of a large Monolithic application even if his responsibility is related to a single functionality.
- Even if a single part of the application is facing a large load/traffic, we need to deploy the instances of the entire application in multiple servers. It is very inefficient and takes up more resources unnecessarily. Hence, horizontal scaling is not feasible in monolithic applications.
- It is very difficult to adopt any new technology which is well suited for a particular functionality as it affects the entire application, both in terms of time and cost.
- It is not very reliable, as a single bug in any module can bring down the entire monolithic application.

### 👍 Advantages

- Simple to develop relative to microservices, where skilled developers are required in order to identify and develop the services.
- Easier to deploy as only a single jar/war file is deployed.
- Relatively easier and simple to develop in comparison to microservices architecture.
- The problems of network latency and security are relatively less in comparison to microservices architecture.
- Developers need not learn different applications, they can keep their focus on one application.

**Figure 1. The original monolithic application had the web and application servers, business functions, and database all on one system.**

![https://developers.redhat.com/sites/default/files/styles/article_full_width_1440px_w/public/monolith.png?itok=zim-KQi2](https://developers.redhat.com/sites/default/files/styles/article_full_width_1440px_w/public/monolith.png?itok=zim-KQi2)

**Figure 2. The first step in relieving the burden of the monolith on the underlying system is to move the database into a separate system.**

![https://developers.redhat.com/sites/default/files/styles/article_full_width_1440px_w/public/database.png?itok=wB5kr6UI](https://developers.redhat.com/sites/default/files/styles/article_full_width_1440px_w/public/database.png?itok=wB5kr6UI)

**Figure 3. To scale better, the monolithic application is simply replicated on multiple systems, all talking to the database.** Architects implemented a multiple instance design in which many computers hosting identical business logic were put behind a load balancer. The load balancer routed traffic optimally so as not to overpower any one machine with each computer hosting business logic stored data on a central database.

![https://developers.redhat.com/sites/default/files/replicate.png](https://developers.redhat.com/sites/default/files/replicate.png)

## 2. **Microservice Architecture (MSA)**

![https://media.geeksforgeeks.org/wp-content/uploads/20200322182733/microservices.jpg](https://media.geeksforgeeks.org/wp-content/uploads/20200322182733/microservices.jpg)

Microservices architecture is an architectural style where an application is built as a collection of small, loosely coupled, and independently deployable services. It breaks down the application into smaller, autonomous services that communicate with each other through APIs or messaging protocols. According to Sam Newman, **“Microservices are the small services that work together.”**

**Instead of sharing a single database with other microservices, each microservice has its own database. How that data is carried is the concern of the particular microservice.** Also, each microservice can have its own frontend and backend components, allowing for greater flexibility and scalability.

Therefore, each microservice can **use the type of database** best suited for its needs. Also, each service offers a secure module boundary so that different services can be written in **different programming languages.** There are many patterns involved in microservice architecture like service discovery & registry, caching, API gateway & communication, observability, security, etc.

**Figure 4. The microservices-oriented application runs each function as a separate service on separate systems.**

![https://developers.redhat.com/sites/default/files/styles/article_full_width_1440px_w/public/moa.png?itok=0f1_-RVT](https://developers.redhat.com/sites/default/files/styles/article_full_width_1440px_w/public/moa.png?itok=0f1_-RVT)

### Principles of microservices

- **Single responsibility:** It is one of the principles defined as a part of the SOLID design pattern. It states that a single unit, either a class, a method, or a microservice should have one and only one responsibility. Each microservice must have a single responsibility and provide a single functionality. You can also say that: the number of microservices you should develop is equal to the number of functionalities you require. The database is also decentralized and, generally, each microservice has its own database.
- **Built around business capabilities:** In today’s world, where so many technologies exist, there is always a technology that is best suited for implementing a particular functionality. But in monolithic applications, it was a major drawback, as we can’t use different technology for each functionality and hence, need to compromise in particular areas. A microservice shall never restrict itself from adopting an appropriate technology stack or backend database storage that is most suitable for solving the business purpose, i.e., each microservice can use different technology based on business requirements.
- **Design for failure:** Microservices must be designed with failure cases in mind. Microservices must exploit the advantage of this architecture and going down one microservice should not affect the whole system, other functionalities must remain accessible to the user. But this was not the case in the Monolithic applications, where the failure of one module leads to the downfall of the whole application.

### 👍 Advantages

- It is easy to manage as it is relatively smaller.
- If there’s any update in one of the microservices, then we need to redeploy only that microservice.
- Microservices are self-contained and, hence, deployed independently. Their start-up and deployment times are relatively less.
- It is very easy for a new developer to onboard the project as he needs to understand only a particular microservice providing the functionality he will be working on and not the whole system.
- If a particular microservice is facing a large load because of the users using that functionality in excess, then we need to scale out that microservice only. Hence, the microservices architecture supports horizontal scaling.
- Each microservice can use different technology based on the business requirements.
- If a particular microservice goes down due to some bug, then it doesn’t affect other microservices and the whole system remains intact and continues providing other functionalities to the users.

### 👎 Disadvantages

- Being a distributed system, it is much more complex than monolithic applications. Its complexity increases with the increase in a number of microservices.
- Skilled developers are required to work with microservices architecture, which can identify the microservices and manage their inter-communications.
- Independent deployment of microservices is complicated.
- Microservices are costly in terms of network usage as they need to interact with each other and all these remote calls result in network latency.
- Microservices are less secure relative to monolithic applications due to the inter-services communication over the network.
- Debugging is difficult as the control flows over many microservices and to point out why and where exactly the error occurred is a difficult task.

### Business Use Cases

Companies implementing microservices have been very open about their process and why they chose it. Here are some useful examples from companies that might not surprise you:

- **[Netflix Conductor: A Microservices Orchestrator](https://medium.com/netflix-techblog/netflix-conductor-a-microservices-orchestrator-2e8d4771bf40)** (Netflix)
- **[What Led Amazon to its Own Microservices Architecture](https://thenewstack.io/led-amazon-microservices-architecture/)** (Amazon)
- **[Walmart Embraces Microservices to Get More Agile](http://www.baselinemag.com/enterprise-apps/walmart-embraces-microservices-to-get-more-agile.html)** (Walmart)

[Microservice Architecture Tutorial](https://www.tutorialspoint.com/microservice_architecture/index.htm) (tutorialspoint) – “*Microservice Architecture is a special design pattern of Service-oriented Architecture. It is an open source methodology. In this type of service architecture, all the processes will communicate with each other with the smallest granularity to implement a big system or service. This tutorial discusses the basic functionalities of Microservice Architecture along with relevant examples for easy understanding.”*

[Microservices: Yesterday, Today, and Tomorrow](https://arxiv.org/abs/1606.04036) (Paper) – “*Microservices is an architectural style inspired by service-oriented computing that has recently started gaining popularity.*”

[Building Microservices: Designing Fine-Grained Systems](https://www.amazon.com/Building-Microservices-Designing-Fine-Grained-Systems/dp/1491950358/ref=sr_1_3?ie=UTF8&qid=1524229802&sr=8-3&keywords=microservices&dpID=51m85J4Zi9L&preST=_SX218_BO1,204,203,200_QL40_&dpSrc=srch) (O’Reilly) – “*Distributed systems have become more fine-grained in the past 10 years, **shifting from code-heavy monolithic applications to smaller, self-contained microservices.** But developing these systems brings its own set of headaches. With lots of examples and practical advice, this book takes a holistic view of the topics that system architects and administrators must consider when building, managing, and evolving microservice architectures.”*

### Challenges with Deploying Microservices

As with any design decision, there are drawbacks to a microservices architecture. The major issue is complexity––breaking up your codebase makes it easier to understand, but creates complications in orchestration. Testing and deployment can become troublesome in a microservices-oriented architecture.

- For example, any individual microservice can fail at any point, just like a traditional software deployment. You need to write logic to deal with that. 
- Another issue is database management––with the monolith there’s typically only one or a few databases to update, but with microservices there can be many. Managing data consistency across a distributed system can be a major challenge.

🤩 However, fortunately, it fits well with two other important trends in the deployment space: **serverless and containers.**

- Serverless is about abstracting the code around server side logic, and having a provider manage your infrastructure for you.
- Containers are all about bundling your code and dependencies into self-executing, independent packages.

Containers and microservices fit together because they have the same fundamental goal—package individual components as independent, responsive elements. Serverless empowers this architecture by focusing on functions as a service––now that your application pieces are packaged individually, deploying them as functions can make a lot of sense.

---

Reference.

[https://www.geeksforgeeks.org/monolithic-vs-microservices-architecture/amp/](https://www.geeksforgeeks.org/monolithic-vs-microservices-architecture/amp/)

[https://developers.redhat.com/articles/2022/01/19/monolith-microservices-how-applications-evolve#](https://developers.redhat.com/articles/2022/01/19/monolith-microservices-how-applications-evolve#)

[https://www.datarobot.com/blog/introduction-to-microservices/](https://www.datarobot.com/blog/introduction-to-microservices/)