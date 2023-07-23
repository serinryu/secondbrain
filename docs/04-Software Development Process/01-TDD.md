# TDD

## What is Test Driven Development (TDD)?

TDD stands for Test-Driven Development. TDD is an approach to software development in which the **unit tests are written before the business logic**. In other words, developers write unit tests for the feature before implementing it. 

The goal of TDD is to avoid duplication of code, and gradually build up a comprehensive suite of tests that verify the behavior of the code.

- TDD vs Unit tests :
    
    TDD is a **software development approach with a specific work cycle, so it’s a broader concept than unit tests.** Unit tests can be used with or without the TDD approach.
    
![https://www.baeldung.com/wp-content/uploads/sites/4/2021/12/Blank-diagram-Page-1.svg](https://www.baeldung.com/wp-content/uploads/sites/4/2021/12/Blank-diagram-Page-1.svg)


### A TDD cycle consists of three stages.

**1. Red**
      
   During this stage we write a test for functionality that is not yet implemented. We need to run the test to ensure it’s failing. Otherwise, we’ll get a false positive which means the test is badly written. Most popular IDE’s displays test failures using red color. That is why the stage is called red.

**2. Green **
   
   During this stage we write enough code to just cover the test. We should focus on covering the test, not on the code quality. We write a minimum amount of code to pass the test. IDE’s often signals passing tests with a green color. So, the stage is called green.

**3. Refactor**

   Final stage, here we focus on improving the code quality. Therefore, we should make all refactors needed to improve the code. While making changes, we can run the tests to avoid any regression.


---

Reference

[https://www.baeldung.com/cs/unit-testing-vs-tdd#:~:text=TDD is a broader concept,and avoiding bugs and regression](https://www.baeldung.com/cs/unit-testing-vs-tdd#:~:text=TDD%20is%20a%20broader%20concept,and%20avoiding%20bugs%20and%20regression).

[https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/tx.html](https://docs.spring.io/spring-framework/reference/testing/testcontext-framework/tx.html)

