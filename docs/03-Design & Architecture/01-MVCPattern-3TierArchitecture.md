# MVC Pattern VS 3-tier Architecture

## 🤺 MVC Pattern

The **Model-View-Controller (MVC)** is an architectural pattern that separates an application into **three logical components**: the **model**, the **view**, and the **controller**.

- Model - handles the data and the business logic of your application.
- View - displays the data and the user interface of your application.
- Controller - handles the user input and communicates with the model and the view.

[💡 More detail about MVC Pattern with Spring MVC](../Spring/SpringMVC#-mvc-pattern)

![https://www.interviewbit.com/blog/wp-content/uploads/2022/05/Working-of-MVC-1024x686.png](https://www.interviewbit.com/blog/wp-content/uploads/2022/05/Working-of-MVC-1024x686.png)

## 🤾‍♀️ 3-tier Architecture

Three-tier architecture is a well-established software application architecture that organizes applications into **three logical and physical Layer**: 

- Presentation Layer - the user interface (UI), which displays data to the user and accepts user input. In a web application, this part receives the HTTP request and returns the HTML response.
- Business Layer - handles data validation, business rules, and task-specific behavior.
- Data Access Layer - communicates with the database by constructing SQL queries and executing them via the relevant API.

![https://www.tonymarston.net/php-mysql/3-tier-architecture-005.png](https://www.tonymarston.net/php-mysql/3-tier-architecture-005.png)

![https://www.tonymarston.net/php-mysql/infrastructure-04.png](https://www.tonymarston.net/php-mysql/infrastructure-04.png)

## MVC Pattern VS 3-tier Architecture

While there are similarities, there is important difference. 3-tier is a Architecture Style and MVC is a Design Pattern. When the MVC pattern and 3-tier architecture are brought together,

- The View and Controller both fit into the **Presentation layer.**
- Although **Data(Model) and Business layers** seem to be identical, the MVC pattern does not have a separate component which is dedicated to data access.

| 3-tier Architecture | MVC Pattern |
| --- | --- |
| Presentation Layer | View |
| Presentation Layer | Controller |
| Business Layer & Data Access Layer | Model |

## 🤾‍♀️🤺 MVC + 3-Tier Architecture

![https://www.tonymarston.net/php-mysql/infrastructure-faq-05.png](https://www.tonymarston.net/php-mysql/infrastructure-faq-05.png)

As I mentioned above, MVC pattern does not have a separate component which is dedicated to Data Access layer or Business layer. MVC’s Model does everything.

To a certain extent the Model could span both the Business and Data tiers. However, if the Business and Data logic is getting numerous, **it is reasonable that the Model may access the Data layer directly without going through a Business layer,** mainly for maintainability and scalability.

Therefore, **applying MVC pattern implemented in 3-tier architecture** would be great choice when we have to cope with complexity within the Business and Data layers.

This picture below is the flow of project that MVC pattern and 3-Tier architectures combined.

![https://www.tonymarston.net/php-mysql/model-view-controller-03a.png](https://www.tonymarston.net/php-mysql/model-view-controller-03a.png)

## 🌱 How Spring MVC implements 3-Tier Architecture

** To deal with this problem, in Spring MVC, we can implement 3-Tier Architecture by using @Service which is like a bridge connectin @Controller and @Repository. **

Without @Service, @Controller is directly connected to @Repository because there is no specific component which is responsible for Business Layer. It leads @Controller having complex code inside. That is MVC pattern that doesn’t implement 3-Tier Architecture.

| 3-tier Architecture | MVC Pattern |
| --- | --- |
| Presentation Layer | View |
| Presentation Layer   | @Controller |
| Business Layer & Data Access Layer | @Repository |

Here, @Service comes in for business logic. We can design MVC pattern having a separate component which is dedicated to business layer. This is MVC pattern implemented in 3-Tier Architecture.

| 3-tier Architecture | MVC Pattern |
| --- | --- |
| Presentation Layer | View |
| Presentation Layer | @Controller |
| Business Layer  | @Service |
| Data Access Layer | @Repository |

![https://static.javatpoint.com/springboot/images/spring-boot-architecture2.png](https://static.javatpoint.com/springboot/images/spring-boot-architecture2.png)


## Example Code

```java
@Controller
@RequestMapping("/score") 
@RequiredArgsConstructor  
public class ScoreController {  
 
  // import the data from Repository
  @Autowired
  private final ScoreRepository repository; 
  
  // deliver the data to Views
  // 1. Show scores list
  @RequestMapping(value = "/list", method = RequestMethod.GET)
  public String list(Model model){
      System.out.println("/score/list : GET방식");
      List<Score> scoreList = repository.findAll();
      model.addAttribute("scoreList", scoreList);
      return "MVC03/score-list"; // /WEB-INF/views/MVC03/score-list.jsp

  // ...

    }
```
[Example code - ScoreController](https://github.com/serinryu/blog-example-code/blob/8f503da746d251ac2fc2ceafcc65978395a6b7e1/spring/mvc/src/main/java/com/spring/mvc/MVC03/controller/ScoreController.java)

In this example code, @Controller not only import the data from @Repository but also deliver the data to Views. It leads @Controller having complex code inside. Now, this site doesn't have any business logic except simple CRUD functions, so it doesn't necessarily separate the Business layer by using @Service. 

However, if the business and data logic is getting numerous, **it is reasonable to separate the Business layer.**  Then, @Service will import data from @Repository and make business logic using the data, while @Controller can focus on delievering these  data to Views. That's why @Service is called a bridge between @Controller and @Repository.

---

Reference.

[http://criticaltechnology.blogspot.com/2011/09/mvc-in-three-tier-architecture.html](http://criticaltechnology.blogspot.com/2011/09/mvc-in-three-tier-architecture.html)

[https://www.geeksforgeeks.org/spring-mvc-crud-with-example/](https://www.geeksforgeeks.org/spring-mvc-crud-with-example/)