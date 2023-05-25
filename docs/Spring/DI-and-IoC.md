---
sidebar_position: 2
---

# Dependency Injection and Inversion of Control

The primary or most important feature of the Spring framework is DI(Dependency Injection). However, it is ‘not’ specific to the Spring Framework or any other framework. 

Then, what is DI? And why does Spring, as a framework, leverage DI as its core feature? Let’s start from the definition of IoC design pattern. 

## 1. What is IoC?

One of the major principles of Software Engineering is that classes should have minimum interdependence, i.e., low coupling. 

**Inversion of Control (IoC)** is a design principle that allows classes to be loosely coupled and, therefore, easier to test and maintain. IoC refers to transferring the control of objects and their dependencies from the main program to a container or framework. IoC is a design principle, not a design pattern – the implementation details depend on the developer. All IoC does is provide high-level guidelines.

**Benefits of IoC**

- Reduces amount of application code
- Decreases coupling between classes
- Makes the application easier to test and maintain

## 2. What is DI?

Inversion of Control and Dependency Injection are often used interchangeably. However, Dependency Injection is only one implementation of IoC. Using DI technique, you can implement IoC design principle. 

Dependency Injection (DI) is a programming technique that can be applied in object-oriented programming to achieve loose coupling and flexibility in object relationships. It allows objects to be separated from the objects they depend upon. That is, **the objects are created externally and then injected into them, rather than directly creating them.** Therefore, it leads to achieve loose coupling and flexibility in object relationships. 

```java
public class ClubService{

	// ClubService has a dependency on a FileClubRepository
	private final FileClubRepository fileClubRepository;

	// directly create a object of FileClubRepository
	public ClubService(){
		this.fileClubRepository = new FileClubRepository();
	}

	public void create(...){
		fileClubRepository.save(...);
	}
}
```

Suppose object A requires a method of object B to complete its functionality. If an instance of class B is created in class A using the new operator, class A is dependent on class B. For example, ClubService class cannot function without FileClubRepository. In other words, ClubService is dependent on FileClubRepository.

Well, dependency injection suggests that instead of creating an instance of class B in class A using the new operator, the object of class B should be injected in class A using one of the following methods: 1) Constructor injection, 2) Setter injection, 3) Field injection, 4) Method injection.

```java
// Constructor-based dependency injection

public class ClubService{
  // ClubService has a dependency on a FileClubRepository
	private final ClubRepository clubRepository;

  // constructor injection
	public ClubService(ClubRepository clubRepository){
		this.clubRepository = clubRepository;
	}

	public void create(){
		clubRepository.save(...);
	}
}
```

The above example shows a class that is dependency-injected with Constructor injection. When you create a ClubService object in Constructor, dependencies are injected through its parameters. That is, we pass the required components into a class at the time of instantiation.

```java
// Setter-based dependency injection

public class ClubService{
	// ClubService has a dependency on a FileClubRepository
	private final ClubRepository clubRepository;

  // setter injection
	public void setClubService(ClubRepository clubRepository){
		this.clubRepository = clubRepository;
	}

	public void create(){
		clubRepository.save(...);
	}
}
```

The above example shows a class that is dependency-injected with Setter injection. The dependencies are injected by setter method. 

** Yes..it is hard to implement DI yourself… ** 

So far, we've learned what dependency injections are and why they're needed. As mentioned above, in the case of a very simple program, dependency injection can be implemented with writing codes by developers line by line. But what if there are dozens of classes that depend on each other? The developers are likely to make mistakes for sure.

Although you can use design patterns such as *Factory*, *Abstract Factory*, *Builder*, *Decorator*, and *Service Locator on your own*, you must implement them yourself in your application. Spring Framework simply implements these patterns internally, providing you with an infrastructure to use in a formalized way.

## 3. Spring supports DI

The Spring solves this inconvenience. The Spring helps to inject dependencies of bunches of classes on behalf of developers.

To sum up, IoC and DI emphasize keeping the Java classes independent of each other in order to apply object-oriented programming. In order to achieve that, Spring, as a framework, uses Spring Container and Beans to implement IoC & DI. 

For example, suppose there is an object of the class `Course` that is dependent on an object of `Teacher`. Spring Container is responsible for creating the objects – when it encounters the Course bean and sees that it has a dependency on the Teacher bean, it automatically instantiates the Teacher bean first and injects it into the Course bean.

### 3-1. Container

The Spring container, also known as the `ApplicationContext`, is responsible for instantiating, initializing, and managing the lifecycle of beans. It handles the creation and wiring of beans based on their configurations and resolves their dependencies through dependency injection.

If you are working on Spring MVC application and your application is configured to use Spring Framework, Spring IoC container gets initialized when the application starts and when a bean is requested, the dependencies are injected automatically. However, for a standalone application, you need to initialize the container somewhere in the application and then use it to get the spring beans.

### 3-2. Beans

In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A Spring IoC container manages one or more beans. 

A bean is an object that is created, configured, and managed by a Spring IoC container. These beans are created with the configuration metadata that you supply to the container. Here we are going to discuss how to create a Spring Bean in 3 different ways as follows:

### (1) Creating Bean Inside an XML Configuration File (beans.xml)

One of the most popular ways to create a spring bean is to define a bean in an XML configuration file something like this. In this way, you can create beans in spring.

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="[http://www.springframework.org/schema/beans](http://www.springframework.org/schema/beans)"
xmlns:xsi="[http://www.w3.org/2001/XMLSchema-instance](http://www.w3.org/2001/XMLSchema-instance)"
xsi:schemaLocation="[http://www.springframework.org/schema/beans](http://www.springframework.org/schema/beans)[https://www.springframework.org/schema/beans/spring-beans.xsd](https://www.springframework.org/schema/beans/spring-beans.xsd)">
	<bean id="studentAmiya" class="Student">
	</bean>
</beans>
```

### (2) Using @Component Annotation

Spring Annotations are a form of metadata that provides data about a program. Annotations are used to provide supplemental information about a program. **@Component** is an annotation that allows Spring to automatically detect the custom beans.

### (3) Using @Bean Annotation

One of the most important annotations in spring is the **@Bean annotation** which is applied on a method to specify that it returns a bean to be managed by Spring context. Spring Bean annotation is usually declared in Configuration classes methods.

Overall, beans are typically defined in the Spring configuration files or through annotations, specifying their scope, dependencies, and other configurations. Once the beans are created by one of three ways above, Spring can implement dependency Injection. For example, this is the case that Spring Container finds a Bean that is already created and managed in Container, and injects dependency.

```java
// Constructor-based dependency injection with Spring's @Autowired

@Service
public class ClubService{
  // ClubService has a dependency on a FileClubRepository
	private final ClubRepository clubRepository;

	// constructor injection, Spring container can 'inject' a ClubRepository
	@Autowired
	public ClubService(ClubRepository clubRepository){
		this.clubRepository = clubRepository;
	}

	public void create(){
		clubRepository.save(...);
	}
}
```

@Autowired is an annotation that automatically finds a Bean (ClubRepository type) in Spring Container. Of course, a ClubRepository type of Bean should be already in Spring Container, otherwise @Autowired couldn’t find it in the container.

---

Reference.

[https://docs.spring.io/spring-framework/reference/core/beans/introduction.html](https://docs.spring.io/spring-framework/reference/core/beans/introduction.html)

[https://www.educative.io/answers/what-is-inversion-of-control](https://www.educative.io/answers/what-is-inversion-of-control)