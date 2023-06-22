# Test Slicing (feat. Mocking)

## 1. What is **Mock Object?**

Mock is one of **Test doubles**. **Test doubles** are objects that stand in for other objects during a test. There are different types of test doubles with different purposes: Fake, Mock, Stubb.

![https://miro.medium.com/v2/resize:fit:1024/0*AtEcgjYzyuEmkWiv.png](https://miro.medium.com/v2/resize:fit:1024/0*AtEcgjYzyuEmkWiv.png)

**Mocks** are objects that have predefined behavior. These objects register calls they receive, allowing us to assert how we use them in the code. Unlike fakes, mocks don’t have working implementations. Instead, they have pre-programmed expectations about how they will be used in the code.

> There is a difference in that the stub uses **state verification** while the mock uses **behavior verification.** 
> Reference *: [http://martinfowler.com/articles/mocksArentStubs.html](http://martinfowler.com/articles/mocksArentStubs.html)*

You can manually create a mock object or use the library like Mockito. Let’s see below.

### 1-1. Manual Mocking

First of all, you can manually create a mock object by implementing an interface or extending a class and overriding its methods. 

Here are two different classes : `CellphoneMmsSender`, and `CellphoneService`

![https://miro.medium.com/v2/resize:fit:640/format:webp/1*l1U7ejkPRK_UBEyCS4Idow.jpeg](https://miro.medium.com/v2/resize:fit:640/format:webp/1*l1U7ejkPRK_UBEyCS4Idow.jpeg)

![https://miro.medium.com/v2/resize:fit:720/format:webp/1*haWJWaeTceXjxl6tlFM5Rg.png](https://miro.medium.com/v2/resize:fit:720/format:webp/1*haWJWaeTceXjxl6tlFM5Rg.png)

`CellPhoneServiceMock` is a mock object of `CellPhoneService`. `CellPhoneServiceMock` is extending `CellPhoneService` and override ***sendSMS()*** methods.

By manually implementing the interface or extending the class, you have full control over the behavior of the mock object.

![https://miro.medium.com/v2/resize:fit:720/format:webp/1*msHB8w3eCgR0iKz18qWi0Q.png](https://miro.medium.com/v2/resize:fit:720/format:webp/1*msHB8w3eCgR0iKz18qWi0Q.png)

This is a test code using a mock object, `CellPhoneServiceMock`.

![https://miro.medium.com/v2/resize:fit:640/format:webp/1*g1mfRsXrp--bQVPdAzhO4w.png](https://miro.medium.com/v2/resize:fit:640/format:webp/1*g1mfRsXrp--bQVPdAzhO4w.png)

To sum up, we can create mock object manually like this in Spring project. This is Service Layer Test creating Mocked object manually, without using Mockito.

```java
// Manual mock implementation
public class MyDependencyMock implements MyDependency {
    @Override
    public String someMethod() {
        return "Mocked result";
    }
}

public class MyServiceTest {
    private MyService myService; 

	@BeforeEach
    public void setup() {
		// Create a mock object manually
        MyDependency myDependencyMock = new MyDependencyMock();

        // Create an instance of the service with the mock dependency
        MyService myService = new MyService(myDependencyMock);
    }

    @Test
    public void testMyServiceMethod() {
        // Test the method of the service using the mock dependency
        String result = myService.someMethod();

        // Assert the result
        // ...
    }
}
```

### 1-2. Mockito 🧞‍♀️

Mockito is a Java-based mocking framework used for unit testing of Java application. Mockito plays a crucial role in developing testable applications. The main purpose of using the Mockito framework is to simplify the development of a test by mocking external dependencies and use them in the test code. As a result, it provides a simpler test code that is easier to read, understand, and modify. We can also use Mockito with other testing frameworks like **JUnit** and **TestNG**.

*Mockito* provides an implementation for JUnit5 extensions in the library – *[mockito-junit-jupiter](https://mvnrepository.com/artifact/org.mockito/mockito-junit-jupiter)*.

### 1️⃣ Mocking with Plain Mockito

First of all, let’s just use Mockito programmatically:

```java
private UserRepository userRepository = Mockito.mock(UserRepository.class);
```

This will create an object that looks like a `UserRepository` from the outside.  ****

```java
@Test
void savedUserHasRegistrationDate() {
  User user = new User("zaphod", "zaphod@mail.com");
  when(userRepository.save(any(User.class))).then(returnsFirstArg());
  User savedUser = registerUseCase.registerUser(user);
  assertThat(savedUser.getRegistrationDate()).isNotNull();
}
```

This will make `userRepository.save()` return the same user object that is passed into the method.

### 2️⃣ Mocking with Mockito’s `@Mock` Annotation

An alternative way of creating mock objects is Mockito’s `@Mock` annotation in combination with the `MockitoExtension` for JUnit Jupiter:

```java
@ExtendWith(MockitoExtension.class)
class RegisterUseCaseTest {

  @Mock
  private UserRepository userRepository;**

  private RegisterUseCase registerUseCase;

  @BeforeEach
  void initUseCase() {
    registerUseCase = new RegisterUseCase(userRepository);
  }

  @Test
  void savedUserHasRegistrationDate() {
    // ...
  }

}
```

- `@Mock` annotation specifies the fields in which Mockito should inject mock objects.
- `MockitoExtension` tells Mockito to evaluate those `@Mock` annotations, because JUnit does NOT do this automatically.

The result is the same as if calling `Mockito.mock()` manually, it’s a matter of taste which way to use. Note, though, that by using `MockitoExtension` our tests are bound to the test framework.

## 2. **Slice Test** 

> **⇒ We will use Mock to avoid dependencies between layers!**

By **using mocking or stubbing techniques**, you can replace the dependencies with mock objects or fake implementations, allowing you to test each layer in isolation. This approach enables you to verify the behavior of each layer in a controlled environment.

- Controller : **Mock or stub the service layer** to isolate the controller from the actual business logic.
- Service : **Mock or stub the repository** to isolate the service layer from the actual data access.
- Repository : The Repository layer typically does NOT depend on another layer directly.

:::caution
Before start..
**Dependencies**

We’re going to use JUnit Jupiter (JUnit 5) as the testing framework, Mockito for mocking, AssertJ for creating assertions.

*Mockito* provides an implementation for JUnit5 extensions in the library – *[mockito-junit-jupiter](https://mvnrepository.com/artifact/org.mockito/mockito-junit-jupiter)*.

AssertJ and Mockito automatically come with the dependency to `spring-boot-starter-test`.

```java
dependencies {
  compile('org.springframework.boot:spring-boot-starter-web')
  compileOnly('org.projectlombok:lombok')
  testCompile('org.springframework.boot:spring-boot-starter-test')
  testCompile 'org.junit.jupiter:junit-jupiter-engine:5.2.0'
  testCompile('org.mockito:mockito-junit-jupiter:2.23.0')
}
```
:::

### 2-1. Controller Test 

In a Spring MVC application, controllers often guard the HTTP layer. For instance, it is responsible for parsing request parameters from URL, headers, and body, performing deserialization where needed, selecting the right handler, and performing routing.

To test the web layer, Spring Boot provides lots of annotation, thankfully 💃 (It uses Mockito framework internally) ! **`MockMvc`**is a test tool class provided by Spring Boot. By using the **`@AutoConfigureMockMvc`** or **`@WebMvcTest`** annotation on your test case, you can request **`MockMvc`** to be injected and configured for you automatically.

- [MockMVC](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/test/web/servlet/MockMvc.html) : `MockMVC` encapsulates all web application beans and makes them available for testing. MockMvc is a **mocked servlet environment** that we can use to test our HTTP controller endpoints without the need to launch our embedded servlet container. While MockMvc is a mocked environment, it still comes with HTTP semantics so that we can test the serialization, HTTP status codes, and return types of our endpoints.
- [@AutoConfigurationMockMvc](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/autoconfigure/web/servlet/AutoConfigureMockMvc.html) or [@WebMvcTest](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/autoconfigure/web/servlet/WebMvcTest.html) : Spring Boot will auto-configure MockMvc for us when using `@AutoConfigureMockMvc` or `@WebMvcTest` annotation in a test class. That’s why we can use MockMvc in a test class! 😀
    1. **@AutoConfigureMockMvc:** This annotation is used to automatically configure and inject the **`MockMvc`** instance into your test class. It enables you to perform HTTP requests and simulate the behavior of the web layer without starting the full server. It sets up a mock environment for the web layer testing.
    2. **@WebMvcTest:** This annotation, in addition to auto-configuring **`MockMvc`**, also enables auto-configuration of only the web-related components needed for testing, such as controllers, advice, and converters. It focuses on testing the web layer while slicing out the unnecessary components.
- [@MockBean](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/mock/mockito/MockBean.html) : Spring Boot provides **`@MockBean`** annotation to create mock objects. (It internally uses Mockito. Check out the document.)

Here’s an example of using `MockMvc` with `WebMvcTest`.

```java
@WebMvcTest(MyController.class)
public class MyControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MyService myService; // Assuming MyService is a dependency of MyController

    @Test
    public void testEndpoint() throws Exception {
        // Define the behavior of the mock service
        when(myService.someMethod()).thenReturn("Mocked result");

        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.get("/my-endpoint"));

        resultActions.andExpect(MockMvcResultMatchers.status().isOk());
        // Add more assertions as needed
    }
} 
```

- Spring Boot provides the `@WebMvcTest` annotation to fire up an application context that contains only the beans needed for testing a web controller.
- We can now `@Autowire` all the beans we need from the application context. Spring Boot automatically provides beans like an `ObjectMapper` to map to and from JSON and a `MockMvc` instance to simulate HTTP requests.
- We use `@MockBean` to mock away the business logic, since we don’t want to test integration between controller and business logic, but between controller and the HTTP layer. We use `@MockBean` to mock away the business logic, since we don’t want to test integration between controller and business logic, but between controller and the HTTP layer.

### 2-2. Service Test

How about Service Layer?

In the service layer, you typically do not need to test the web layer interactions or dependencies like you would in a controller. The service layer focuses on business logic and encapsulates the core functionality of your application.

Since the service layer is independent of the web layer, you can use simpler and more straightforward mock testing techniques without the need for specialized tools like **`MockMvc`**. **Original Mockito** or other mock frameworks can be used effectively to create mock objects and verify the behavior of the service layer methods.

```java
@ExtendWith(MockitoExtension.class)
public class MyServiceTest {
    @Mock
    private MyRepository myRepository;

    @InjectMocks
    private MyService myService; // Target object to test

    //@BeforeEach
    //public void setUp() {
    //    MockitoAnnotations.openMocks(this);
    //}

    @Test
    public void testMyServiceMethod() {
        // Define the behavior of the mock dependency
        when(myRepository.someMethod()).thenReturn("Mocked result");

        // Test the method of the service using the mock dependency
        String result = myService.someMethod();

        // Assert the result
        // ...
    } 
}
```

- Mockito’s `@Mock` is to create mock. It injects a mock for an instance variable that we can use anywhere in the test class.
- Mockito's `@InjectMocks` is to mark a field on which an injection is to be performed.

Of course, If you prefer not to use Mockito or want more control over the mock object's behavior, you can manually create a mock implementation of the dependency interface or class. 👉 We already talked about it earlier.

### 2-3. Repository Test

The Repository layer typically does NOT depend on another layer directly. Therefore, you don’t have to try to avoid dependencies on different layers. But, **it should  care about external databases.**  

### 1️⃣ Mocking (Not using the actual database)

You can use an **1) in-memory database** or **2) mock the database interactions.** Here's an example of testing a repository using an in-memory H2 database

```java
@DataJpaTest
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndRetrieveUser() {
        // Create a user entity
        User user = new User();
        user.setUsername("john");
        user.setEmail("john@example.com");

        // Save the user entity
        **userRepository.save(user);**

        // Retrieve the user from the repository
        User retrievedUser = **userRepository.findByUsername("john");**

        // Perform assertions
        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.getUsername()).isEqualTo("john");
        assertThat(retrievedUser.getEmail()).isEqualTo("john@example.com");
    }
}
```

- The **`@DataJpaTest`** annotation is used to set up an in-memory H2 database and configure the Spring Data JPA repository infrastructure **for testing.**
- By using an in-memory database and the **`@DataJpaTest`** annotation, you can test the repository's data access operations in an isolated and controlled environment. The in-memory database ensures that the tests are executed against a fresh and separate database instance each time, without affecting the production database.
- Alternatively, if you want to mock the database interactions and avoid using an in-memory database, you can use mocking frameworks like Mockito to mock the repository and define the desired behavior for the mocked methods. However, it's generally recommended to use an in-memory database for repository tests to ensure more comprehensive and realistic testing of the data access layer.

### 2️⃣ Use the actual database

In some cases, you may want to perform tests that involve the actual database to ensure that your application interacts correctly with the database and to validate the behavior of the entire system. 

By using **`@Transactional`**, you can isolate each test within a transaction and roll back the transaction at the end of the test, ensuring that any modifications made during the test do not persist in the database. This allows you to use the real database and verify the behavior of your application while still maintaining test isolation. 

👉 *Check out the previous article about TEST ISOLATION.* 

> 1), 2) ⇒ Both approaches have their merits and it depends on the specific requirements and goals of your testing.

## 🤔 Considerations when using mock-based slice testing

1. **Real-world behavior:** Mock-based slice testing may not accurately represent the behavior of the system in a real-world environment. Mocks simulate dependencies and interactions, but they don't always reflect the actual behavior of those dependencies in production.
2. **Incomplete testing:** When using mocks, it's necessary to understand the internal implementation details and set up the test code accordingly. This means that the tests may not provide comprehensive coverage and may not catch all potential issues or bugs.
3. **False positives:** If the internal implementation of a component changes, the tests using mocks may still pass, giving a false sense of success. This can lead to confusion and hide potential problems.

Considering these points, mock-based testing is generally suitable in the following scenarios:

- Functions with random behavior or dependencies on external factors that are difficult to control, such as time-sensitive operations.
- Components relying on external systems or services that are not under your control, such as external APIs or databases.
- Large-scale applications with deep layers of dependencies, where setting up the test environment with real instances of each dependency is impractical or time-consuming.

Mock-based testing can be useful for isolating and testing specific parts of the system, but it's essential to complement it with other types of testing (such as integration or end-to-end tests) to validate the system's behavior in a more realistic context.

---
Reference.

[https://reflectoring.io/spring-boot-web-controller-test/](https://reflectoring.io/spring-boot-web-controller-test/)

[https://velog.io/@sussa3007/Spring-JUnit-Mockito-기반-Spring-단위-테스트-코드-작성](https://velog.io/@sussa3007/Spring-JUnit-Mockito-%EA%B8%B0%EB%B0%98-Spring-%EB%8B%A8%EC%9C%84-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1)

[https://medium.com/@SlackBeck/mock-object란-무엇인가-85159754b2ac](https://medium.com/@SlackBeck/mock-object%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-85159754b2ac)

[https://velog.io/@minchoi/Springboot-Controller-테스트-해보기-1탄](https://velog.io/@minchoi/Springboot-Controller-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%95%B4%EB%B3%B4%EA%B8%B0-1%ED%83%84)