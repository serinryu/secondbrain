---
sidebar_position: 3
---

# Spring VS Spring Boot

## 1. What is Spring Boot?

The conventional Spring framework seeks extreme flexibility giving lots of choices to developers. However, developers knew that these technology selection and version conflict was quite hassle. Therefore, they made Spring Boot which is equipped with an automatic configuration function.

Spring Boot is built on top of the conventional Spring Framework, widely used to develop REST APIs. It is basically an extension of the Spring Framework, which eliminates the boilerplate configurations required for setting up a Spring application. It greatly increases developers' productivity, such as simplifying deployment tasks and so on. That’s why Spring Boot has become **essential** today, rather than just being an optional framework.

To sum up, Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run". It provides all the features of Spring and is yet easier and faster to use than Spring. Most Spring Boot applications need very little Spring configuration.

### 1-1. What is Maven and Gradle?

Maven and Gradle is the most popular build automation tool (build tool) for Java development. 

Build automation tools, or build tools, are applications used for build automation. Build automation is an important aspect of software development. It refers to the process of automating the tasks necessary to turn source code into executable programs.

### 1-2. What Build tools do

Build tools facilitate a wide variety of build automation tasks, including:

- **Compiling**: Compiling source code into machine code. By default, Maven and Gradle compiles sources from `src/main/java`. That’s why we code in that folder.
- **Dependency management**: Identifying and patching necessary third party integrations.
    
    Maven and Gradle provide a curated list of dependencies that it supports. The curated list contains all the Spring modules that you can use with Spring Boot as well as a refined list of third party libraries. 
    
    However, The two build tools use different approaches to resolve dependency conflicts. Maven follows a declaration order, while Gradle references a dependency tree.
    
- **Automated tests**: Executing tests and reporting failure
- **Packaging app for deployment**: Prepares source code for deployment to servers

### 1-3. Why is Dependency Management necessary?

This is a advantages of Dependency Management. 

- It provides the centralization of dependency information by specifying the Spring Boot version in one place. It helps when we switch from one version to another.
- It avoids mismatch of different versions of Spring Boot libraries.
- We only need to write a library name with specifying the version. It is helpful in multi-module projects.

In result, dependency management is useful. 

Of course, you can manage dependencies of your application by yourself. You can use Spring Boot as any standard Java library, meaning that you can copy `spring-boot-*.jar` Spring Boot JAR files on your classpath. However, Spring Boot Team highly recommend to use a build tool like Maven or Gradle in order to manage your application easily. Of course, Spring Boot provides [build tool plugins](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins.html) for Maven and Gradle.

```java title="pom.xml"
<project>
    <modelVersion>4.0.0</modelVersion>
    <artifactId>getting-started</artifactId>
    <!-- ... -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

```java title="build.gradle"
plugins {
	id 'org.springframework.boot' version '3.1.0'
}
```

## 2. What You Can Do with Spring Boot

The following is the main differences from the conventional Spring Framework. Let’s see what Spring Boot can do for you, compared to Spring. 

### 2-1. Manages dependencies automatically.

In the conventional Spring Framework, we had to match the compatible version of the dependencies. For this reason, if one dependency version was changed, the rest of the version had to be set up (to the correct version). 

**Spring Boot has Starters 🤩**

Spring Boot provides [a number of starters](https://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#using.build-systems.starters) that allow us to add jars in the classpath, **so we don’t have copy-paste every dependencies in the classpath.** Starters are a set of convenient dependency descriptors that you can include in your application. You get a one-stop shop for all the Spring and related technologies that you need without having to hunt through sample code and copy-paste loads of dependency descriptors. Typically, your project declares dependencies to one or more Starters. In the Spring Boot Framework, all the starters follow a similar naming pattern: **spring-boot-starter-***, where ***** denotes a particular type of application.

```java title="build.gradle"
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-aop:2.2.0.RELEASE'
}
```

**How can Spring Boot do that?**  

If you use a build tool such as Maven or Gradle, Spring Boot will read pom.xml (Maven) or build.gradle (Gradle) and then, **Spring Boot will *automatically* get the libraries written on pom.xml or build.gradle**. So, we need not to specify the version of the dependencies in our build configuration, if you are using Spring Boot. That’s how Spring Boot has Auto Dependency Management. 

For example, if we need a JPA, just add '`spring-boot-starter-data-jpa`' to prom.xml (Maven) or build.gradle (Gradle), and spring boot will get the libraries it needs on its own. So, you do not need to provide a version for any of these dependencies in your build configuration, as it manages that for you. 

If you fill it out as above, the Spring Boot finds all the libraries that depend on it properly through this Starter, so you don't have to worry about dependencies or compatible versions. 

### 2-2. Manages configuration automatically.

Spring-based application requires a lot of configuration. When we use Spring MVC, we need to configure **dispatcher servlet, view resolver, web jars** among other things.

In conventional Spring framework, developers should configure lots of stuff. However, in Spring Boot, rather than hardcoding some properties that are also specified in your project’s build configuration, you can automatically expand them by instead using the existing build configuration. This is possible in both Maven and Gradle.

To sum up, Spring Boot auto-configuration attempts to automatically configure your Spring application based on the jar dependencies that you have added. It reduces the amount of boilerplate configuration required for setting up a Spring application. 

**How can Spring Boot do that?** 

In order to use its auto-configuration feature, you need to opt-in to auto-configuration by adding the `@EnableAutoConfiguration` or `@SpringBootApplication` annotations. Especially, `@SpringBootApplication` annotation is the combination of three annotations : 

- `@EnableAutoConfiguration`: enable [Spring Boot’s auto-configuration mechanism](https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/using-boot-auto-configuration.html)
- `@ComponentScan`: enable @Component scan on the package where the application is located
- `@Configuration`: allow to register extra beans in the context or import additional configuration classes

All auto-configuration logic is implemented in `spring-boot-autoconfigure.jar`.

For example, when we add the `spring-boot-starter-web` dependency in the project, Spring Boot auto-configuration looks for the Spring MVC is on the classpath. It auto-configures dispatcherServlet, a default error page, and web jars.

Similarly, when we add the `spring-boot-starter-data-jpa` dependency, we see that Spring Boot Auto-configuration, auto-configures a datasource and an Entity Manager.

### 2-3. Embedded Server

In conventional Spring framework, developers need to set the server explicitly. However, Spring Boot includes an embedded(built-in) servlet container (such as Tomcat, Jetty, or Undertow). Because Spring Boot uses the built-in server, you don't have to install server separately or manage the version every time.

### 2-4. Production-Ready Features

If you are building a web site for your business, you probably need to add some management services. It enables to make a production-ready application in very less time, with less configuration.

**How can Spring Boot do that?** 

Spring Boot provides several such services (such as health, audits, beans, and more) with its [actuator module](http://docs.spring.io/spring-boot/docs/2.5.0/reference/htmlsingle/#production-ready).

If you use Gradle, add the following dependency to your `build.gradle` file:

```java title="build.gradle"
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
}
```

If you use Maven, add the following dependency to your `pom.xml` file:

```java title="pom.xml"
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
</dependencies>
```

## 3. Spring Boot Architecture

![https://static.javatpoint.com/springboot/images/spring-boot-architecture2.png](https://static.javatpoint.com/springboot/images/spring-boot-architecture2.png)

Spring Boot uses all the modules of Spring-like Spring MVC, Spring Data, etc. The architecture of Spring Boot is the same as the architecture of Spring MVC, except one thing: there is no need for **DAO** and **DAOImpl** classes in Spring boot.

- Creates a data access layer and performs CRUD operation.
- The client makes the HTTP requests (PUT or GET).
- The request goes to the controller, and the controller maps that request and handles it. After that, it calls the service logic if required.
- In the service layer, all the business logic performs. It performs the logic on the data that is mapped to JPA with model classes.
- A JSP page is returned to the user if no error occurred.

## 4. How to Start Spring Boot application

### 4-1. **Starting with Spring Initializer**

Spring Initializer is a web-based tool, officially provided by Spring at [https://start.spring.io](https://start.spring.io/). It provides an environment where you can start coding immediately without worrying about the execution environment or infrastructure such as dependency management. With this tool, we can easily generate the structure of the Spring Boot Project.

1. Navigate to [https://start.spring.io](https://start.spring.io/). This service pulls in all the dependencies you need for an application and does most of the setup for you.

2. Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.

3. Click **Dependencies** and select **Spring Web**.

4. Click **Generate**.

5. Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.

### 4-2. Learn more

[https://spring.io/guides/gs/spring-boot/](https://spring.io/guides/gs/spring-boot/)

---

Reference.

[https://www.educative.io/blog/java-build-tools-maven-vs-gradle](https://www.educative.io/blog/java-build-tools-maven-vs-gradle)

[https://www.javatpoint.com/spring-boot-auto-configuration](https://www.javatpoint.com/spring-boot-auto-configuration)

[https://spring.io/blog/2014/03/07/deploying-spring-boot-applications](https://spring.io/blog/2014/03/07/deploying-spring-boot-applications)

[https://docs.spring.io/spring-boot/docs/current/reference/html/features.html](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html)

[https://www.javatpoint.com/spring-boot-architecture](https://www.javatpoint.com/spring-boot-architecture)