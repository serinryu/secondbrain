# What is Spring Framework?

## 1. **What is the Spring Framework?**

**Spring is an open-source lightweight framework** that provides infrastructure support for developing Java applications**.** Spring provides everything required beyond the Java programming language for creating enterprise applications for a wide range of scenarios and architectures.

- By using Spring, it is easy to maintain and write test codes in large-scale application.
- By using Spring, it is flexible to create many kinds of architectures depending on an application’s needs.

Since Spring provides comprehensive infrastructure support for developing Java applications, you can focus on your application. It helps developers to make Java applications into powerful object-oriented programs with some nice features like Dependency Injection. 

Overall, the goal of Spring is to leverage the power of object-oriented programming in Java and provide tools and abstractions to make it easier to use and maximize its benefits.

## 1-1. Spring Modules

The Spring Framework consists of several modules, and applications can choose which modules they need. These modules are grouped into Core Container, Data Access/Integration, Web, AOP (Aspect Oriented Programming), Instrumentation, and Test. The popular modules include Spring Core, Spring MVC (Spring MVC), and Spring Data. 

- **[Core](https://docs.spring.io/spring/docs/5.1.8.RELEASE/spring-framework-reference/core.html#spring-core)**: Provides core features like DI (Dependency Injection), Internationalization, Validation, and AOP (Aspect Oriented Programming)
- **[Data Access](https://docs.spring.io/spring/docs/5.1.8.RELEASE/spring-framework-reference/data-access.html#spring-data-tier)**: Supports data access through JTA (Java Transaction API), JPA (Java Persistence API), and JDBC (Java Database Connectivity)
- **[Web](https://docs.spring.io/spring/docs/5.1.8.RELEASE/spring-framework-reference/web.html#spring-web)**: Supports both Servlet API (**[Spring MVC](https://docs.spring.io/spring/docs/5.1.8.RELEASE/spring-framework-reference/web.html#spring-web)**) and of recently Reactive API (**[Spring WebFlux](https://docs.spring.io/spring/docs/5.1.8.RELEASE/spring-framework-reference/web-reactive.html#spring-webflux)**), and additionally supports WebSockets, STOMP, and WebClient
- **[Integration](https://docs.spring.io/spring/docs/5.1.8.RELEASE/spring-framework-reference/integration.html#spring-integration)**: Supports integration to Enterprise Java through JMS (Java Message Service), JMX (Java Management Extension), and RMI (Remote Method Invocation)
- **[Testing](https://docs.spring.io/spring/docs/5.1.8.RELEASE/spring-framework-reference/testing.html#testing)**: Wide support for unit and integration testing through Mock Objects, Test Fixtures, Context Management, and Caching

These modules can drastically reduce the development time of an application. For example, in the early days of Java web development, we needed to write a lot of boilerplate code to insert a record into a data source. By using the *JDBCTemplate* of the Spring JDBC module, we can reduce it to a few lines of code with only a few configurations.

All Spring Modules share the same release version as the Spring Framework. They are part of the same project. 

![https://docs.spring.io/spring-framework/docs/4.2.6.RELEASE/spring-framework-reference/html/images/spring-overview.png](https://docs.spring.io/spring-framework/docs/4.2.6.RELEASE/spring-framework-reference/html/images/spring-overview.png)

## 1-2. Spring Projects

Spring Framework is the foundation for all [Spring projects](https://spring.io/projects). On the top of Spring Framework, Spring projects are releasing every year to solve emerging problems more easily. Therefore, collectively the Spring Framework and the family of Spring projects are often referred to simply as "Spring".

The popular projects include Spring Boot, Spring Security, Spring Data, Spring Cloud, Spring Batch. See [spring.io/projects](https://spring.io/projects) for the complete list of Spring projects.

### Spring Boot

The conventional Spring framework seeks extreme flexibility giving lots of choices to developers. However, developers knew that these technology selection and version conflict was quite hassle. Therefore, they made Spring Boot which is equipped with an automatic configuration function.

Spring Boot which is the most popular Spring Project, is built on top of the conventional Spring Framework, widely used to develop REST APIs. Simply put, it is basically an extension of the Spring Framework, which eliminates the boilerplate configurations required for setting up a Spring application. Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". It provides all the features of Spring and is yet easier to use than spring. 

1. Simplified Configuration: In conventional Spring framework, developers should configure lots of stuff. However, in Spring Boot, everything is auto-configured. This is the main or primary feature of the Spring Boot. Spring Boot reduces the amount of boilerplate configuration required for setting up a Spring application. It provides sensible defaults and auto-configuration, reducing manual configuration efforts and allowing developers to quickly bootstrap projects.
2. Embedded Server: In conventional Spring framework, developers need to set the server explicitly. However, Spring Boot includes an embedded servlet container (such as Tomcat, Jetty, or Undertow) that allows developers to package their applications as standalone JAR files, making deployment and distribution easier. 
3. Dependency Management: Spring Boot simplifies dependency management by providing a curated set of compatible dependencies. It ensures that the different components of the Spring ecosystem work well together, avoiding version conflicts and reducing the complexity of managing dependencies.
4. Production-Ready Features: It enables to make a production-ready application in very less time, with less configuration.

Overall, Spring Boot framework validates and selects annoying and cumbersome parts instead. Also, it greatly increases developers' productivity, such as simplifying cumbersome deployment tasks. That’s why Spring Boot has become essential today, rather than just being an optional framework.

## 1-3. Memory Allocation : Java VS Spring

- Java Memory Allocation Order:
    - Static Memory: Allocated for static variables associated with the class.
    - Stack Memory: Used for method calls and local variables.
    - Heap Memory: Allocated for dynamically created objects.
- Spring Memory Allocation Order:
    - Static Memory: Allocated for static variables associated with the class.
    - Spring Container: Created when the application starts and holds instances of all defined beans.
    - Stack Memory: Used for method calls and local variables.
    - Heap Memory: Allocated for dynamically created objects.

In both Java and Spring, static memory is allocated first, followed by stack memory for method calls and local variables. Finally, heap memory is used for dynamically created objects.

The introduction of the Spring container in the Spring framework does not affect the order of memory allocation. It is an additional component that **manages the lifecycle of beans** but does not change the fundamental memory allocation order in Java applications.

## 2. POJO and Spring

> Spring enables you to build applications from “plain old Java objects” (POJOs) and to apply enterprise services non-invasively to POJOs. - Official Docs of Spring
> 

What is the advantages of building your application from POJOs and why does Spring follow this programming model?

## 2-1. What is POJO?

When developing business services using Java, EJB (Enterprise Java Beans) was created to eliminate the burden of writing low-level logic such as transactions and security. Using EJB, low-level logic development could be reduced, but the inheritance or implements of a huge EJB to use one or two functions made even light services heavy, and the problem of having to modify the entire code to replace them with other functions.

Spring provided a very simple, leaner, and lighter programming model compared with other existing Java technologies. Spring makes this possible by using many available design patterns, but it focused on the Plain Old Java Object (POJO) programming model to make the application flexible and simple. 

POJO is a plain Java object that encapsulates data and provides access to it through **simple getter and setter methods.** POJO is **not dependent on a specific class or library**, so it does not require you to extend framework classes or implement framework interfaces for most use cases. That’s why it’s important to build an application with POJOs for flexibility and simplicity. 

```java
// A example of POJO (a plan Java object)

public class User {
    private int id;
    private String name;
    private String email;
    
    public int getId() {
    	return id;
    }
    public String getName() {
    	return name;
    }
    public String getEmail() {
    	return email;
    }
    
    public void setId(int id) {
    	this.id = id;
    }
    public void setName(String name) {
    	this.name = name;
    }
    public void setEmail(String email) {
    	this.email = email;
    }
}
```

Here are some key characteristics of a POJO:

1. Simple Java Class: A POJO is a regular Java class without any specific restrictions or requirements imposed by frameworks or libraries. It does not need to extend or implement any specific classes or interfaces.
2. Encapsulates Data: A POJO typically contains private fields that encapsulate data and provides public getter and setter methods to access and modify that data. This helps maintain encapsulation and follows the principle of data hiding.
3. No Dependencies on Frameworks: A POJO should not have any direct dependencies on specific frameworks or libraries. It should be independent and not rely on framework-specific annotations or configurations.
4. Serializable: In some contexts, a POJO may need to be serializable, meaning it can be converted to a byte stream for storage or transmission. Adding serialization support is not a strict requirement for a POJO but can be beneficial in certain scenarios.

## 2-2. Why and How Spring follow POJOs

The Spring framework follows POJOs programming model, meaning that it encourages the use of POJOs for implementing business logic and components within the application. Spring is designed to be non-intrusive, which means your domain logic code generally has no dependencies on the framework itself.

In your integration layer (such as the data access layer), some dependencies on the data access technology and the Spring libraries will exist. However, it should be easy to isolate these dependencies from the rest of your code base.

### **Why Spring follows POJOs**

By adhering to the POJO programming model, Spring aims to achieve loose coupling, modular design, and easier unit testing of the application code.

### **How Spring follows POJOs**

Here's how the Spring Framework supports the POJO programming model:

1. Dependency Injection (DI) / IoC : Spring's DI mechanism allows dependencies to be injected into POJOs, rather than the objects themselves being responsible for creating and managing their dependencies. This promotes loose coupling and makes it easier to configure and test the components independently.
2. Aspect-Oriented Programming (AOP): Spring provides AOP capabilities, allowing cross-cutting concerns (such as logging, caching, or transaction management) to be implemented separately and applied to POJOs without cluttering the core business logic.
3. Testability: By promoting loose coupling and dependency injection, Spring facilitates easier unit testing of POJOs. Dependencies can be easily mocked or replaced with test doubles, enabling isolated testing of individual components.

Overall, the Spring Framework embraces the POJO programming model to facilitate cleaner, more maintainable, and testable code. It aims to keep the components free from framework-specific dependencies, allowing them to be easily understood, reused, and tested in isolation.


---


Reference.

[https://docs.spring.io/spring-framework/reference/overview.html](https://docs.spring.io/spring-framework/reference/overview.html)

[https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)

[https://docs.spring.io/spring-framework/docs/3.0.x/spring-framework-reference/html/overview.html](https://docs.spring.io/spring-framework/docs/3.0.x/spring-framework-reference/html/overview.html)