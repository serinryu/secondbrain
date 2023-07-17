# Entity & DTO

## Model attribute : Entity vs DTO

In Spring MVC, which is a web framework within the Spring ecosystem, **Model is often represented by a Java object (commonly referred to as a model attribute)** that carries data from Controller to View for rendering. **The model attribute can be an Entity, and an DTO.**

- **Entity**
    - Entity is responsible for representing the structure and state of data within the application's domain. It is often **associated with a database table or a collection in a DB.**
    - In Spring, an entity class is typically annotated with Spring's JPA (Java Persistence API) annotations such as `@Entity`, `@Table`, and `@Column`, which provide the necessary metadata for mapping the entity to a relational database.
- **DTO (Data Transfer Object)**
    - **DTO is for encapsulating Entity.** It is used to encapsulate a subset of the fields or properties of an entity or multiple entities.
    - Therefore, we can say this is a design pattern to transfer data between different layers of an application or between different components.
    - In the Spring framework, DTOs are typically plain Java objects (POJOs) that carry data between the presentation layer and the service or persistence layer.

![https://gmlwjd9405.github.io/images/spring-framework/spring-package-flow.png](https://gmlwjd9405.github.io/images/spring-framework/spring-package-flow.png)


## Why DTO?

### Use Entity alone VS Use DTO

You should decide whether to use only Entity or to use DTO to encapsulate Entity. It depends on your applications.  

Using only entities can be suitable for simpler applications or scenarios where the entities directly represent the data required by different layers of your application. In such cases, the entities can be used as the data transfer objects as well, eliminating the need for separate DTO classes.

However, **in the long run, using DTO to encapsulate Entity is always beneficial.** It's important to consider the complexity, requirements, and future evolution of your application when deciding whether to use entities alone or to introduce DTOs.

### ⭐️ **The main purpose of DTO is to encapsulate Entity**

- If you directly use the Entity in all layers without using DTOs, there is a possibility that all properties of the Entity will be unnecessarily exposed to the outside world.
- However, **by using DTOs, you can encapsulate the data** **within the Entity**, which means it allows you to expose only the necessary data while preventing all properties of the Entity from being exposed unnecessarily.

### Benefits of DTO

What are the benefits of encapsulating entity?

1. Performance improvement : You can **fetch only the required data**, reducing the amount of data transferred and potentially improving performance.
2. Decoupling Layers : You can define a clear contract for data transfer, **independent of the underlying entity structure.** This allows for greater flexibility in modifying the entities without impacting the other layers.


## It’s a good practice…

### **1. To Avoid Setter in Entity**

Avoiding the use of setters in entities is generally considered a good practice in software development. 

- Entity often contain domain-specific behavior and business rules. It means, **immutability should be promoted in Entity.** (The values in Entity prevent from being changed externally.)
- If setters are used, the entity's internal state can be modified without invoking the necessary domain logic or validation checks, leading to potential inconsistencies in the system.
- Therefore, **by avoiding setters, you can prevent values from being changed externally.** It encourages the design of immutable or read-only entities, which can help in building more robust and maintainable code.

### 👉 Use Constructors or Builders

Instead of setters, it is recommended to **use constructors or Builders to prevent values from being changed externally**. 

By doing this, the values of the **entity are set once during creation** and cannot be modified thereafter. This can be beneficial in scenarios where you want to ensure data integrity and prevent accidental modification.

```java
// Bad example (using Setter in Entity)
@Getter @Setter @ToString
@NoArgsConstructor @AllArgsConstructor
public class Url {
    private String originalUrl;
    private String shortUrl;
    private long requestNum; // Number of URL requests
}
```

```java
// Good example (without Setter)
@Getter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Url {
    private String originalUrl;
    private String shortUrl;
    private long requestNum; // Number of URL requests

    @Builder
    protected Url(String originalUrl, String shortUrl, long requestNum){
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.requestNum = requestNum;
    } 
}
```

### 👉 Use business methods if the specific field should be modified

However, in reality, sometimes we should change the specific field of Entity. If setter is really needed, it can be used. 
The key is to use less setters. Therefore, it’s better to **create business methods** that have specific meanings (dedicated method) to update the field that you want to modify, so that you have more control over the data modification process.

For example, if you simply need to modify a single field, setters can be used, or you can create business methods that have specific meanings. 


```java
@Getter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Url {
    private String originalUrl;
    private String shortUrl;
    private long requestNum; // Number of URL requests

    @Builder
    protected Url(String originalUrl, String shortUrl, long requestNum){
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.requestNum = requestNum;
    }
	
	// modify a single field 
    public void updateRequestNum(long requestNum){
        this.requestNum = requestNum;
    }
}
```

**`updateRequestNum`** modifies the value of the **`requestNum`** field. It can be considered a business method or an update method specific to the **`Url`** entity.

It provides a way to update the **`requestNum`** field based on a given value. By using this method, you can encapsulate any additional logic or validation related to updating the **`requestNum`** field, rather than directly exposing it as a public setter method.

By not providing a traditional setter and instead using a dedicated method, you have more control over the data modification process and can apply any necessary business rules or validations.


### **2. To introduce DTO (not using Entity alone)**

When transferring data from the persistence layer(DB) to the presentation layer, you can use the DTO to encapsulate the necessary fields and provide a clean representation of the data to be sent.

Let's consider a scenario where we need to transfer only a subset of properties from an entity.

Entity (PersonEntity.java) :

```java
@Entity
@Table(name = "persons")
public class PersonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDate;

    // Constructors, getters, and setters
}
```

DTO (PersonDTO.java) :

```java
public class PersonDTO {
    private String firstName;
    private String lastName;

    // Constructors, getters, and setters
}
```

In this example, we have an **`PersonEntity`** representing a person with properties such as **`id`**, **`firstName`**, **`lastName`**, **`email`**, and **`birthDate`**. However, for a specific data transfer requirement, we only need to transfer the **`firstName`** and **`lastName`** properties. By creating a separate **`PersonDTO`** with only the required properties, we can ensure that only the necessary data is transferred.

### **3. To Separate DTOs for different API endpoints**

It's a good practice to create separate DTOs for different API endpoints or specific data transfer requirements.

**Different API endpoints may have varying data needs and response structures.** By creating separate DTOs, you can tailor the data representation to meet those requirements without exposing unnecessary information or internal implementation details.

Let's assume we have an **`Employee`** entity with properties such as **`id`**, **`name`**, and **`email`**. We want to expose two API endpoints: one to retrieve basic employee information and another to retrieve detailed employee information.

BasicEmployeeDTO.java:

```java
public class BasicEmployeeDTO {
    private Long id;
    private String name;

    // Constructors, getters, and setters
} 
```

DetailedEmployeeDTO.java:

```java
public class DetailedEmployeeDTO {
    private Long id;
    private String name;
    private String email;

    // Constructors, getters, and setters
}
```

In this example, we have two separate DTOs: **`BasicEmployeeDTO`** and **`DetailedEmployeeDTO`**. The **`BasicEmployeeDTO`** includes only the basic information such as **`id`** and **`name`**, while the **`DetailedEmployeeDTO`** includes additional details like **`email`**. This allows us to expose different levels of employee information based on the API endpoint requirements.


## Question 1🤔. Where should I map Entity to DTO, Controller Layer or Service Layer?

The decision of where to perform the mapping from Entity to DTO can vary depending on the specific requirements and design of your application. **However, it is a common practice to perform the mapping in the Service Layer. **

  - Why? The Service Layer is responsible for handling the business logic and coordinating different components. By performing the mapping in the Service Layer, you keep the responsibility of data transformation separate from the Controller Layer, which focuses on handling HTTP requests and responses.

In fact, no matter which layer of conversion is made, there are pros and cons of each layer, and there is a trade-off depending on the choice. Therefore, I think we can choose according to the situation according to the size of the project.

```jsx
@Service
public class BlogServiceImpl implements BlogService {
    BlogRepository blogRepository; 

		@Override
    @Transactional
    public void save(BlogCreateRequestDTO blogCreateRequestDTO) { // DTO 에 의존
        Blog blog = blogCreateRequestDTO.toEntity(); // DTO to Entity
        blogRepository.save(blog);
				....
    }
}
```



## Question 2🤔. Isn’t it over-specification to use Builder pattern in DTO?

Using builders in DTO classes is not a strict requirement. Whether to use builders in DTO classes depends on your specific needs and preferences.

Although Builder pattern provides a fluent and flexible way to construct objects by chaining method calls, it may add unnecessary complexity to your codebase. So, **some developers may consider it over-specification for simple DTOs.**

If your DTOs are simple and the extra features provided by the Builder pattern are not necessary, it might be more pragmatic to use simpler initialization methods like constructor-based initialization or setter methods. It's important to consider the balance between code simplicity and the specific needs of your application.

Anyway, remember that ****the purpose of DTOs is to transfer data between layers or components, and **their primary focus is on data representation rather than complex object construction.**

```java
@Getter
@Setter
@Builder
public class PersonDTO {
    private String firstName;
    private String lastName;
    private int age;
    private String email;
}
```

---

Reference.

[https://tecoble.techcourse.co.kr/post/2020-08-31-dto-vs-entity/](https://tecoble.techcourse.co.kr/post/2020-08-31-dto-vs-entity/)

[https://velog.io/@minide/Spring-boot-DTO의-사용-범위](https://velog.io/@minide/Spring-boot-DTO%EC%9D%98-%EC%82%AC%EC%9A%A9-%EB%B2%94%EC%9C%84)

[https://velog.io/@sally_devv/Builder-%ED%8C%A8%ED%84%B4-Dto](https://velog.io/@sally_devv/Builder-%ED%8C%A8%ED%84%B4-Dto)

