---
sidebar_position: 5
---

# Spring MVC

## What is Spring MVC?

The Spring MVC is a one of Spring Module to build web application **with the Model-View-Controller(MVC) design pattern.** I makes it easier to build lines of code without having to start over each time.

It combines all the advantages of the MVC pattern with the convenience of Spring.

:::tip
**What is Spring Module?**

The Spring Framework consists of features organized into about 20 modules. **Spring Modules are the building blocks of Spring Projects and Spring Framework.** They are what defined Spring Framework. These modules does not have to be used in full, but we can choose the modules that is needed in the application like Lego. 

That’s why the Spring Framework is considered as a lightweight container. Also, it is easy to make large-scale applications, because the modules can be just selected whenever it’s needed. 
:::

## 🎨 MVC Pattern

![https://www.interviewbit.com/blog/wp-content/uploads/2022/05/Working-of-MVC-1024x686.png](https://www.interviewbit.com/blog/wp-content/uploads/2022/05/Working-of-MVC-1024x686.png)

The **Model-View-Controller (MVC)** is an architectural pattern that separates an application into three main logical components: the **model**, the **view**, and the **controller**.

The model is the part that handles the data and the business logic of your application. The view is the part that displays the data and the user interface of your application. The controller is the part that handles the user input and communicates with the model and the view. By separating these components, you can achieve a modular and maintainable code structure.



### 🥶 The Drawbacks of MVC

Even though MVC supports rapid and parallel development, MVC is not a perfect solution for every web application. It also has some drawbacks that you should be aware of. 

1. Increase the complexity and overhead of your code.

One of the drawbacks of MVC is that it can increase the complexity and overhead of your code. Because you have to create and manage three components, you may end up with more files, classes, and functions than necessary. This can make your code harder to debug and refactor. 

2. Can create tight coupling between the components.

Another drawback of MVC is that it can create tight coupling between the components. Although MVC aims to separate the concerns, sometimes the components may depend on each other too much. For example, the view may need to know the details of the model or the controller may need to manipulate the view. This can reduce the modularity and maintainability of your code.

That’s why [rumors of MVC’s death](https://hackernoon.com/from-mvc-to-modern-web-frameworks-8067ec9dee65) comes in, and another Modern Web Framework using a different design pattern is getting more popular. 


## 🎨 Front Controller Pattern

In MVC pattern, we separate three aspects (Model, View and Control) of an application from each other. Now, this idea can be realized in different ways according to specifics of a situation/application. One way is to have many controllers, each responding to an action or a set of actions. Another way is to have one main controller which receives all actions and then dispatches them to different controllers, this one is called **Front Controller Pattern**.

Overall, **Front Controller Pattern** is used to provide a centralized request handling mechanism so that all requests will be handled by a single handler.

![https://media.geeksforgeeks.org/wp-content/uploads/20220302055243/DispatcherServlet.jpg](https://media.geeksforgeeks.org/wp-content/uploads/20220302055243/DispatcherServlet.jpg)

**How can we use this Front Controller Pattern in Spring?**

In Spring MVC, it has **`DispatcherServlet`** and we can use it as the Front Controller. Therefore, in your Spring MVC project, you don’t have to create your own front controller, but you can use the one already created by developers. Then let’s see how can we configure Dispatcher Servlet in the following three different ways:

**How we can register DispatcherServlet?** 

Before the Servlet 3.x specification, *DispatcherServlet* would be registered in the `web.xml` file for a Spring MVC application. Since the Servlet 3.x specification, we can register servlets programmatically using *ServletContainerInitializer*.

Spring Boot provides the `spring-boot-starter-web` library for developing web applications using Spring MVC. One of the main features of Spring Boot is autoconfiguration. The Spring Boot autoconfiguration registers and configures the *DispatcherServlet* **automatically**. Therefore, we don’t need to register the *DispatcherServlet* manually. By default, the *spring-boot-starter-web* starter configures *DispatcherServlet* to the URL pattern “/”. So, we don't need to complete any additional configuration for the above *DispatcherServlet* example in the *web.xml* file. However, we can customize it in the *application.properties* files.

[Reference1](https://www.geeksforgeeks.org/spring-configure-dispatcher-servlet-in-three-different-ways/)

[Reference2](https://www.baeldung.com/spring-boot-dispatcherservlet-web-xml#:~:text=The%20DispatcherServlet%20is%20the%20front,xml%20file)


## Spring's MVC Pattern & Front Controller Pattern

- **Model** - A model contains the data of the application. A data can be a single object or a collection of objects.
- **Controller** - A controller contains the business logic of an application. Here, the `@Controller` annotation is used to mark the class as the controller.
- **View** - A view is represented by any of the  [various template engines](https://www.baeldung.com/spring-template-engines). Generally, JSP+JSTL is used to create a view page, and Spring also supports other view technologies such as Apache Velocity, Thymeleaf and FreeMarker.
- **Front Controller** - In Spring Web MVC, the `DispatcherServlet` class works as the front controller. It is responsible to manage the flow of the Spring MVC application. That is, it routes requests to its intended destination.

## Flow of Spring Web MVC

![https://www.codejava.net/images/articles/frameworks/spring/spring_mvc_architecture.png](https://www.codejava.net/images/articles/frameworks/spring/spring_mvc_architecture.png)

Following is the sequence of events corresponding to an incoming HTTP request to *DispatcherServlet* −

1. After receiving an HTTP request, `DispatcherServlet` consults the `HandlerMapping` to call the appropriate Controller. 
2. `Controller` takes the request and calls the appropriate service methods based on used GET or POST method. The service method will set model data based on defined business logic and returns view name to the DispatcherServlet.
3. After receiving ModelAndView object from the controller, Dispatcher Servlet now sends model object to `view resolver` to get the name of the view which needs to be rendered.
4. Once the view to be rendered has been identified, Dispatcher Servlet passes model object to the `view`. Model object contains the data which needs to be displayed in the view. 
5. This view is returned to the client and client can see the view and associated data on his browser.



## Spring View Technologies : JSP, Thymeleaf

The Spring web framework is built around the MVC (Model-View-Controller) pattern, so it needs view technology(templating mechanism) to render the content on view page. 

Generally, we use [JavaServer Pages (JSP)](https://www.baeldung.com/jsp)+JSTL to create view page. But there are another template engines that can be used with Spring: Thymeleaf, Groovy, FreeMarker, Jade.

In addition, to render each view type, we need to define a `ViewResolver` bean corresponding to each technology. This means that we can then return the view names from `@Controller` mapping methods in the same way we usually return JSP files. For example, in JSP, a commonly used type of ViewResolver bean is InternalResourceViewResolver for rendering JSP files.

- **JavaServer Pages(JSP)**
    - JSP is one of the most popular view technologies for Java applications, and it is supported by Spring out-of-the-box.
    - Create JSP files in the /WEB-INF/views location. Spring MVC will look for JSP files inside this directory.
    - JSP pages rely on the JavaServer Pages Standard Tag Library (JSTL) to provide common templating features like branching, iterating and formatting, and it even provides a set of predefined functions.
    - However, JSP has limitations on its own and even more so when combined with Spring Boot. So, we should consider [Thymeleaf](https://www.baeldung.com/thymeleaf-in-spring-mvc) or [FreeMarker](https://www.baeldung.com/freemarker-in-spring-mvc-tutorial) as better alternatives to JSP.

- **Thymeleaf**
    - [Thymeleaf](http://www.thymeleaf.org/) is a Java template engine which can process HTML, XML, text, JavaScript or CSS files. Unlike other template engines, Thymeleaf allows using templates as prototypes, meaning they can be viewed as static files.


[Reference1](https://www.baeldung.com/spring-boot-jsp)
[Reference2](https://www.baeldung.com/spring-template-engines)



## Difference between Spring Annotations

@Controller is used in Spring MVC to define controller, which are first Spring bean and then the controller. Similarly, @Service is used to annotated classes that hold business logic in the Service layer and @Repository is used in the Data Access layer.
They are used for the different purposes.

![https://3.bp.blogspot.com/-6WXke4IU-TQ/Wh-bKt1kLiI/AAAAAAAAJmY/jHszFFD0O1M5NJkzQU_AQURUaV131nL2wCLcBGAs/w620-h279/Service+Component+and+Repository+annotation+difference+Spring+framework.jpg](https://3.bp.blogspot.com/-6WXke4IU-TQ/Wh-bKt1kLiI/AAAAAAAAJmY/jHszFFD0O1M5NJkzQU_AQURUaV131nL2wCLcBGAs/w620-h279/Service+Component+and+Repository+annotation+difference+Spring+framework.jpg)

- @Component is a generic stereotype for any Spring-managed component or bean.
- @Repository is a stereotype for the persistence layer.
- @Service is a stereotype for the service layer.
- @Controller is a stereotype for the presentation layer (spring-MVC).

DispatcherServlet will look for @RequestMapping on classes that are annotated using @Controller but not with @Component. This means @Component and @Controller are the same with respect to bean creation and dependency injection but later is a specialized form of former. Even if you replace @Controller annotation with @Compoenent, Spring can automatically detect and register the controller class but it may not work as you expect with respect to request mapping.

The same is true for @Service and @Repository annotation, they are a specialization of @Component in service and persistence layer. A Spring bean in the service layer should be annotated using @Service instead of @Component annotation and a spring bean in the persistence layer should be annotated with @Repository annotation.



---

## 🌐 Request Mapping

You can use the `@RequestMapping` annotation to map requests to controllers methods. It has various attributes to match by URL, HTTP method, request parameters, headers, and media types. 

There are also HTTP method specific shortcut variants of `@RequestMapping`:

- `@GetMapping`
- `@PostMapping`
- `@PutMapping`
- `@DeleteMapping`
- `@PatchMapping`

[More about HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

> The **HTTP `GET` method** only retrieve data, using Query String in URL.

> The **HTTP `POST` method** sends data to the server, using Body of HTTP request message. 



## 🌐 Request Handling

### 1. HttpServletRequest Object

HttpServletRequest is a class that represents a request that the browser sends to a servlet using the HTTP protocol. The servlet container creates an **HttpServletRequest object** and passes it as an argument to the servlet's service methods. This is conventional way.

```java
// /example?param1=value1&param2=value2

@GetMapping("/example")
public String example(HttpServletRequest request) {
    String param1 = request.getParameter("param1");
    int param2 = Integer.parseInt(request.getParameter("param2"));
    // ...
    return "result";
}
```

### 2. `@RequestParam`

In Spring MVC, the `@RequestParam` annotation is used to read the form data and bind it automatically to the parameter present in the provided method. So, it ignores the requirement of **HttpServletRequest** object to read the provided data. In addition, **`@RequestParam` can be omitted.**

```java
@GetMapping("/example")
public String example(
					@RequestParam("param1") String param1, 
					@RequestParam("param2") int param2
) {
    // ...
    return "result";
}
```
[Reference](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestparam.html)


### 3. Command Object

Spring Web MVC allows you to use a command object. By using command object, it’s easier to read than using 'HttpServletRequest' or '@RequestParam'.

```java
public class ExampleRequest {
    private String param1;
    private int param2;
    // getter, setter ..
}
```

```java
@GetMapping("/example")
public String example(@ModelAttribute ExampleRequest request) {
		// ...
    return "result";
}
```

### 4. `@PathVariable`

`@PathVariable` is a Spring annotation which indicates that a method parameter should be bound to a **URI template variable**.

```java
@GetMapping("/example/{param1}/{param2}")
public String example(@PathVariable String param1, @PathVariable int param2) {
		// ... 
    return "result";
}
```

In this example, we use the *@PathVariable* annotation to extract the templated part of the URI, represented by the variable *{param1}, {param2}*.


[🔥🔥 Check out my Github : Example Code of Request Handling - MVC01](https://github.com/serinryu/blog-example-code/blob/main/spring/mvc/src/main/java/com/spring/mvc/MVC01/MVC01.java)


## 🌐 Response Handling

How to pass data from Spring MVC Controller to JSP view? There are two ways to pass data from Controller to View. First is using a Model object, and second is using a ModelAndView object.

### 1. A `Model` object

A `Model` is an object that you can use to pass attributes from the `Controller` to the `View`. 

We add attributes to the `Model` using addAttribute(). And we can access data from the Model object in the view layer by using the Expression Language (EL) syntax. For example, ${name} would retrieve the value of an attribute named “name” from the Model object.

The Model object is automatically created by the Spring container when a controller method is invoked.

```java
@GetMapping("/example")
public String example(Model model) {
    model.addAttribute("name", "John");
    model.addAttribute("age", 30);
    return "exampleView"; // return a View called "exampleView"
}
```

```java title=exampleView.jsp
<h1>My name is ${name} and my age is ${age}.</h1>
```
   
### 2. A `ModelAndView` object

`ModelAndView` is a holder for both `Model` and `View` in the web MVC framework. ModelAndView is an object that can handle Model and View together. You can use the ModelAndView class to pass the name and data of the View together.

```java
@GetMapping("/example")
public ModelAndView example() {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("exampleView"); // View "exampleView"
    modelAndView.addObject("name", "John");
    modelAndView.addObject("age", 30);
    return modelAndView;
}
```

The code above creates a `ModelAndView` object to name the View(”exampleView”) and add data using the addObject() method. If you later return a `ModelAndView` object, View can reference and output the data that you set in the `ModelAndView` object.


[🔥🔥 Check out my Github : Example Code of Response Handling - MVC02](https://github.com/serinryu/blog-example-code/blob/main/spring/mvc/src/main/java/com/spring/mvc/MVC02/MVC02.java)


---

Reference.

[https://www.baeldung.com/spring-mvc-tutorial](https://www.baeldung.com/spring-mvc-tutorial)

[https://docs.spring.io/spring-framework/reference/web/webmvc.html](https://docs.spring.io/spring-framework/reference/web/webmvc.html)

[https://medium.com/webeveloper/modelattribute-와-커맨드-객체-command-object-42c14f268324](https://medium.com/webeveloper/modelattribute-%EC%99%80-%EC%BB%A4%EB%A7%A8%EB%93%9C-%EA%B0%9D%EC%B2%B4-command-object-42c14f268324)

[https://www.tutorialspoint.com/spring/spring_web_mvc_framework.htm](https://www.tutorialspoint.com/spring/spring_web_mvc_framework.htm)