# [TDD] Unit Tests, Test Isolation

## What is Test Driven Development (TDD)?

TDD stands for Test-Driven Development. TDD is an approach to software development in which the **unit tests are written before the business logic**. In other words, developers write unit tests for the feature before implementing it. 

The goal of TDD is to avoid duplication of code, and gradually build up a comprehensive suite of tests that verify the behavior of the code.

- TDD vs Unit tests :
    
    TDD is a **software development approach with a specific work cycle, so it’s a broader concept than unit tests.** Unit tests can be used with or without the TDD approach.
    
![https://www.baeldung.com/wp-content/uploads/sites/4/2021/12/Blank-diagram-Page-1.svg](https://www.baeldung.com/wp-content/uploads/sites/4/2021/12/Blank-diagram-Page-1.svg)


- **A TDD cycle consists of three stages**:
    1. **Red – during this stage we write a test for functionality that is not yet implemented**. We need to run the test to ensure it’s failing. Otherwise, we’ll get a false positive which means the test is badly written. Most popular IDE’s displays test failures using red color. That is why the stage is called red.
    2. **Green – during this stage we write enough code to just cover the test.** We should focus on covering the test, not on the code quality. We write a minimum amount of code to pass the test. IDE’s often signals passing tests with a green color. So, the stage is called green.
    3. **Refactor – final stage, here we focus on improving the code quality.** Therefore, we should make all refactors needed to improve the code. While making changes, we can run the tests to avoid any regression.


## Test Isolation : Provide a reliable and independent testing environment!

**👉 Why Test Isolation?**

**When test is using a external database**, it is necessary to have test isolation. Test isolation means that tests should be executed independently of each other, regardless of the order, and they should be deterministically performed.

The fundamental reason why test isolation is needed is that the **data used in each test is shared**. Since the behavior of this data is uncertain and can change at any time, it can lead to writing non-deterministic and unreliable tests.


**👉 How to Manage Test Isolation**

**JUnit and Spring Boot provide tools that support test isolation** based on annotations such as @BeforeEach, @AfterEach, and @Transactional.

1.  One method is to manually perform setup and cleanup tasks before / after each test using @BeforeEach and @AfterEach.
2. Another method is to execute the test code within a transaction using @Transactional.

> Furthermore, although JUnit and Spring Boot support isolation, **many developers use the Mock framework to write tests.** It is a method of testing using the Mock framework, not the actual DB. In particular, if you use TDD, this method is effective, and if you test using the Mock framework, you can focus on the Service layer without worrying about test isolation because you don't even go near the actual database. (However, if the test should be under real environment, the actual DB must be used to meet the conditions, not Mock framework anymore.)



### 1️⃣ Manually perform setup and cleanup tasks

We can isolate each test environment, to send requests to create the data using `@BeforeEach` and after the test, delete the data using `@AfterEach`, thereby bringing the database back to its original state.

In other words, the data will always be initialized and cleaned up for each test, ensuring that all tests are executed in the same initial environment.

This is a simple approach when there is a small amount of data required for testing. However, it can be **highly inefficient** when it should create a large amount of data or there are complex relationship mappings.

- **JUnit Lifecycle Methods**
    - In the setup method, you start a transaction, initialize test data, and perform necessary setup operations.
        - Class-Level Setup : **`@BeforeAll`** annotation denote that the annotated method should be executed **before all test methods** in the test class.
        - Method-Level SetUp : **`@BeforeEach`** mean the annotated method should be executed **before each test method** in the test class.
    - In the teardown method, you roll back the transaction, ensuring that any modifications made during the test are undone.
        - Class-Level Setup : **`@AfterAll`** annotation denote that the annotated method should be executed **after all test methods** in the test class.
        - Method-Level Setup : **`@AfterEach`**  mean the annotated method should be executed  **after each test method** in the test class.

Here's an example to illustrate the usage of **`@BeforeEach`** and **`@AfterEach`** annotations for initializing and cleaning up the test database.

Test (BlogRepositoryTest.java)

```java
package com.example.blog.repository;

import ...

@SpringBootTest   
public class BlogRepositoryTest {
    @Autowired
    BlogRepository blogRepository;  

    @BeforeEach  
    public void setBlogRepository(){
        blogRepository.createBlogTable(); // create table
        blogRepository.insertTestData(); // insert data 
    }

    @Test 
    public void findAllTest(){
        // given  
        int blogId = 1;
        // when  
        List<Blog> blogList = blogRepository.findAll(); 
        // then 
        assertEquals(3, blogList.size()); 
        assertEquals(2, blogList.get(blogId).getBlogId());  
    }

    @AfterEach  
    public void dropBlogTableTest(){
        blogRepository.dropBlogTable(); // drop table
    }
```
```

Repository (BlogRepositoy.java)

```java
// src/main/java/com/example/blog/repository/BlogRepository.java

package com.example.blog.repository;

import ...

@Mapper
public interface BlogRepository { 
    List<Blog> findAll(); 

    /* for test isolation */
    void createBlogTable();  
    void insertTestData();  
    void dropBlogTable();  
}
```

### 2️⃣ Run tests within transactions with @Transactional

In most test cases, using `@Transactional` is more efficient than the first method above(dealing with explicit setup and cleanup operations manually).

When Spring’s `@Transactional` annotation is used in test (which is called test-managed transaction in Spring), the test framework (ex. JUnit) automatically manages transactions for you. 

Annotating a test method with `@Transactional` causes the test to be run within a transaction that is, **by default, automatically rolled back after completion of the test.** Test methods that are not annotated with `@Transactional` (at the class or method level) are not run within a transaction.

- By default, test transactions will be automatically *rolled back* after completion of the test; however, transactional commit and rollback behavior can be configured declaratively via the `@Commit` and `@Rollback` annotations at the class level and at the method level.

- Even if rollback is performed, pk increased by auto_increment will not be rolled back. Therefore, it should not be allowed to rely on auto_increment pk when doing any work. Check this [stackoverflow](https://stackoverflow.com/questions/449346/mysql-auto-increment-does-not-rollback)

![https://vladmihalcea.com/wp-content/uploads/2014/01/transaction-workflow1.gif](https://vladmihalcea.com/wp-content/uploads/2014/01/transaction-workflow1.gif)


**Why is it more efficient than manually setup and cleanup?**

1. **Cleaner test code.** : It eliminates the need to manually handle setup and cleanup.
2. **Improved performance:** Creating the data and delete it for each test can be highly inefficient when it should create a large amount of data. The usage of @Transactional  is particularly beneficial when there are complex relationship mappings or when multiple tests need to interact with the same set of data.

```java
package com.example.blog.repository;

import ...

@SpringBootTest   
@Transactional
public class BlogRepositoryTest {
    @Autowired
    BlogRepository blogRepository;  

    @Test 
    public void findAllTest(){
        // given  
        int blogId = 1;
        // when  
        List<Blog> blogList = blogRepository.findAll(); 
        // then 
        assertEquals(3, blogList.size()); 
        assertEquals(2, blogList.get(blogId).getBlogId());  
    }
}
```

When using the **`@Transactional`** annotation, there is no need to use the **`@BeforeEach`** and **`@AfterEach`** methods to explicitly handle the setup and teardown operations.

By annotating the test class with **`@Transactional`**, the test case will be executed within a transaction. The transaction will automatically roll back at the end of each test method, ensuring that any changes made to the database during the test are undone, and the database remains in a clean state for subsequent tests.

---

## [ Additional🏃‍♀️] Transactions


**👉 What is transactions?**

- In a database management system, a transaction is a single unit of logic or work, sometimes made up of multiple operations. It typically includes database operations such as **inserting, updating, or deleting records.**
- **The process of transaction**
    1. Begin the transaction.
    2. Execute a set of data manipulations and/or queries.
    3. If no error occurs, then ***commit*** the transaction.
    4. If an error occurs, then ***roll back*** the transaction.
- **A transaction is always completed by a COMMIT or ROLLBACK:**
    - When a transaction is successfully concluded with a COMMIT, all of the data changes are retained.
    - If a transaction is ended with a ROLLBACK or terminated in any other way, the database system reverses all the data changes made during the transaction.
- ACID properties(Atomicity, Consistency, Isolation, Durability)
    - A transaction must be [atomic](https://en.wikipedia.org/wiki/Atomicity_(database_systems)) (it must either be complete in its entirety or have no effect whatsoever), [consistent](https://en.wikipedia.org/wiki/Consistency_(database_systems)) (it must conform to existing constraints in the database), [isolated](https://en.wikipedia.org/wiki/Isolation_(database_systems)) (it must not affect other transactions) and [durable](https://en.wikipedia.org/wiki/Durability_(database_systems)) (it must get written to persistent storage).

**👉 Why is it good?**

- Transactions are essential for maintaining data integrity and consistency in systems where multiple operations need to be executed atomically. They ensure that the system remains in a valid state **even in the presence of concurrent access or failures.**

![https://maxdb.sap.com/doc/7_7/81/74b30edc2142658e510080ef6917f1/ppt_img.gif](https://maxdb.sap.com/doc/7_7/81/74b30edc2142658e510080ef6917f1/ppt_img.gif)

### **Transactions in Spring: @Transactional**

In **Spring**, handling transactions is supported, and one common approach is to use the **`@Transactional`** annotation. This approach is called **declarative transaction**.

When **`@Transactional`** is added on a class or method, a proxy object with transactional functionality is created for that class. This proxy object uses the **PlatformTransactionManager** to start a transaction when a method annotated with **`@Transactional`** is called. Next, it performs either a commit or a rollback.

- It automatically performs transaction **`begin`** and **`commit`** operations.
- In case of an Exception, it automatically performs a **`rollback`**.
    - However, in case of **test transaction**, **rollback occurs after completion of the test automatically,** not due to an Exception. This is default setting of test-managed  transaction of Spring.

## [Question🤔] Why did we use transaction even in SELECT query?

Using transactions in a simple SELECT query might seem unnecessary at first, as SELECT queries typically do not modify data. However, there are a few reasons why you might still want to use transactions even for read-only operations:

1. To guarantee ‘Isolation’ property of transaction **:** According to ACID properties, a transaction must be [isolated](https://en.wikipedia.org/wiki/Isolation_(database_systems)) (it must not affect other transactions). Isolation ensures that concurrent transactions do not interfere with each other. Even though a SELECT query doesn't modify data, it can still be affected by **concurrent write operations in a multi-user environment**. By using transactions, you can control the isolation level and ensure that your SELECT query operates in a consistent and predictable manner.
2. To maintain a consistent programming pattern **:** Using transactions consistently throughout your application, regardless of the type of operation, can simplify your code and maintain a consistent programming pattern. It ensures that all database interactions follow the same transactional approach, making it easier to reason about and maintain the codebase.

## [Question🤔] What if test class has both `@Before~` and `@After~` methods along with the `@Transactional` annotation?

When using the `@Transactional` annotation, there is no need to use the `@BeforeEach` and `@AfterEach` methods to explicitly handle the setup and teardown operations. 

However, occasionally, you may need to run certain code before or after a transactional test method but outside the transactional context — for example, to verify the initial database state prior to running your test. 

According to [the documentation](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/testing.html#testcontext-tx-attribute-support):

- Note that `@Transactional` is not supported on test lifecycle methods — for example, methods annotated with JUnit Jupiter’s `@BeforeAll`, `@BeforeEach`, etc.
- Method-level lifecycle methods — for example, methods annotated with JUnit Jupiter’s **@BeforeEach** or **@AfterEach** — are run within a test-managed transaction.
- On the other hand, suite-level and class-level lifecycle methods — for example, methods annotated with JUnit Jupiter’s **@BeforeAll** or **@AfterAll** and methods annotated with TestNG’s **@BeforeSuite**, **@AfterSuite**, **@BeforeClass**, or **@AfterClass** — **are not run within a test-managed transaction**.

---

Reference

[https://www.baeldung.com/cs/unit-testing-vs-tdd#:~:text=TDD is a broader concept,and avoiding bugs and regression](https://www.baeldung.com/cs/unit-testing-vs-tdd#:~:text=TDD%20is%20a%20broader%20concept,and%20avoiding%20bugs%20and%20regression).

[https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/tx.html](https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/tx.html)

[https://me-analyzingdata.tistory.com/m/entry/SpringTransactional과-JUnit-Test](https://me-analyzingdata.tistory.com/m/entry/SpringTransactional%EA%B3%BC-JUnit-Test)

[https://velog.io/@kdhyo/JavaTransactional-Annotation-알고-쓰자-26her30h](https://velog.io/@kdhyo/JavaTransactional-Annotation-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90-26her30h)

[https://stackoverflow.com/questions/17308335/before-and-transactional](https://stackoverflow.com/questions/17308335/before-and-transactional)

[https://mangkyu.tistory.com/143](https://mangkyu.tistory.com/143)

[https://mangkyu.tistory.com/170](https://mangkyu.tistory.com/170)