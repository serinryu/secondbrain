# Tests

## Unit Tests

- Focus on testing individual units or components of code in isolation.
- Test a single function, method, or class with all its dependencies mocked or stubbed.
- Aim to verify the correctness of the behavior of a specific unit of code.
- Typically executed quickly, as they don't involve complex setups or external resources.
- Provide fast feedback during development, making it easier to locate and fix bugs.
- Help ensure the stability and maintainability of the codebase by catching issues early.
  
:::tip
### Unit Testing in MVC Pattern
In the MVC (Model-View-Controller) pattern, dependencies exist between different layers in the hierarchical structure. Therefore, when designing unit tests, it is important to disconnect these dependencies in order to test each layer independently. 

> [How to Write Efficient Unit Test by Layer in MVC Pattern
👉 Check out my blog article!](https://serinryu.medium.com/tdd-how-to-write-efficient-unit-test-by-layer-in-spring-mvc-7a27f823c403)
:::

## Integration Tests

- Focus on testing the interaction and integration between multiple components or modules.
- Test the collaboration and compatibility of various units and their interactions with external dependencies (e.g., databases, external services, APIs).
- Involve running the code in a more realistic environment, often with actual dependencies or external resources.
- Aim to uncover issues that may arise due to the integration of different components or subsystems.
- Require more setup time and may take longer to execute compared to unit tests.
- Validate the system's behavior as a whole and help ensure its overall functionality and correctness.
- The `@SpringBootTest` annotation is useful in Integration Tests because it helps to bootstrap the entire container.


> Unit tests provide rapid feedback and isolate issues within specific units, while integration tests verify the system's behavior as a whole and help ensure the interoperability of different components. Both types of tests are valuable and should be used in combination to achieve comprehensive test coverage.


## Functional Tests
 
- It means testing a slice of functionality in the system (may interact with dependencies) to confirm that the code is doing the right things.
- Functional tests are related to integration tests, however, they signify to the tests that check the entire application’s functionality with all the code running together, nearly a super integration test.

![https://www.softwaretestinghelp.com/wp-content/qa/uploads/2016/12/image-result-for-unit-testing-vs-functional-testin.png](https://www.softwaretestinghelp.com/wp-content/qa/uploads/2016/12/image-result-for-unit-testing-vs-functional-testin.png)