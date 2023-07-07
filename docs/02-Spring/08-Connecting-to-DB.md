# Connecting to DB (JDBC, JdbcTemplate, MyBatis, JPA)

## What is DTO, DAO?

![https://velog.velcdn.com/images/h000/post/b38ee3cf-d096-4a80-8da3-cde9f82cb969/image.png](https://velog.velcdn.com/images/h000/post/b38ee3cf-d096-4a80-8da3-cde9f82cb969/image.png)

### DTO (Data Transfer Object)

It is an object used for data exchange between layers and is not directly accessed by DB. DTOs normally are created as POJOs. A DTO should just contain data, not business logic, and has only the properties and the getter and setter methods to access them.

The pattern's main purpose is to reduce roundtrips to the server by batching up multiple parameters in a single call. This reduces the network overhead in such remote operations.


### DAO (Data Access Object)

It is an object that provides a common interface to perform all database operations like persistence mechanism. It is a bridge between Business Logic and Persistence Layer(Database).


```
public interface GenericDao<T> {
  public T find(Class<T> entityClass, Object id);
  public void save(T entity);
  public T update(T entity);
  public void delete(T entity);
  public List<T> findAll(Class<T> entityClass);
}
```



## **JDBC → Spring JDBC → JPA**

We have multiple options for connecting to a database using Java applications. Usually, we refer to different layers, starting from [JDBC](https://www.baeldung.com/java-jdbc). Then, we move to [JPA](https://www.baeldung.com/learn-jpa-hibernate), with implementations like Hibernate. 

Also, we have a framework-like integration, for example, [Spring Data JPA](https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa), with pre-defined interfaces to access entities but still using JPA and an entity manager under the hood.

:::tip
The green part of the picture is the part that the developer has to deal with directly on the code.
:::

**A plain JDBC** 

Plain JDBC refers to the Java Database Connectivity API, which is a standard Java API for interacting with relational databases. With Plain JDBC, developers write code that directly interacts with the JDBC API to perform database operations. To establish a connection to the database, it uses `DriverManager` class.

![Untitled](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbbKZQI%2FbtrcAcPMjo0%2Flv3bP3mmielKHfXUKHWg61%2Fimg.png)

**Spring JDBC** 

Spring JDBC let **SQL Mapper** to do what DriveManager does at plain JDBC. Therefore, developers can query with SQL statements. **In this case, the `JdbcTemplate` is one of the SQL Mapper. `MyBatis` is also one of the SQL Mappers,** which can be considered as the advanced version of the JdbcTemplate. MyBatis has many functions that automatically perform processing that was done manually on the existing JDBC and JDBCTemplate.  

![https://blog.kakaocdn.net/dn/cibMem/btqDJf5WUpi/CoMEm3JcjkF5SamoI5Xk81/img.png](https://blog.kakaocdn.net/dn/cibMem/btqDJf5WUpi/CoMEm3JcjkF5SamoI5Xk81/img.png)

**JPA** 

JPA stands for Java Persistence API. It is a Java specification that provides a standardized way of working with relational databases using an object-oriented approach. JPA defines an ORM (Object-Relational Mapping) framework for mapping Java objects to database tables and performing database operations. **JPA also uses JDBC internally.**

To briefly explain ORM, it is a technology that eliminates the need for writing SQL queries manually and provides a more object-oriented programming model. (The above JdbcTemplate, MyBatis method requires writing SQL statements directly when we access and manipulate DB) It is convenient because SQL statements are already implemented inside the JPA, but it is also difficult to cope with when performance optimization is required.  ****

![https://blog.kakaocdn.net/dn/c2STGr/btqDGg6mOoZ/1bBezKvUwA8JsdQNvCOAVK/img.png](https://blog.kakaocdn.net/dn/c2STGr/btqDGg6mOoZ/1bBezKvUwA8JsdQNvCOAVK/img.png)



### 💃 Which one is better? : SQL Mapper VS ORM

![https://blog.kakaocdn.net/dn/boFROg/btqDHrGEiKF/g5IxO48PgfbPSxoJ8kPP0k/img.png](https://blog.kakaocdn.net/dn/boFROg/btqDHrGEiKF/g5IxO48PgfbPSxoJ8kPP0k/img.png)

|  | Technique |
| --- | --- |
| MyBatis | Object Mapping |
| JdbcTemplate | Object Mapping |
| JPA | ORM(Object Relational Mapping) |

You may wonder which one to use, **SQL Mapper or ORM**.

With SQL Mapper, developers have the explicit control over SQL queries and mapping and it brings the flexibility to optimize and fine-tune their database interactions based on specific requirements. However, it also means that developers are responsible for managing the execution and processing of the queries, which mean it needs a good understanding of SQL and database-specific syntax. That's why many developers love ORM! 😘

**Using ORM is very convenient, but it needs to be designed as carefully as possible.** As the complexity of the project increases, the difficulty increases, and if it is implemented incorrectly due to insufficient design, it can lead to problems that slow down and destroy consistency. In addition, some frequently used large SQL statements require separate tuning for speed, so they may eventually have to be written.

Therefore, it is necessary to consider whether to choose SQL Mapper or ORM depending on the situation.


### 💃 Trend

![https://vladmihalcea.com/wp-content/uploads/2022/05/java-data-access-technology.png](https://vladmihalcea.com/wp-content/uploads/2022/05/java-data-access-technology.png)

[Google Trend : Mybatis VS JPA](https://trends.google.com/trends/explore?date=all&q=mybatis,jpa&hl=en)

Undeniably, JPA and Hibernate thrived due to their tight integration with Spring. **The more popular Spring became, the more people used Spring Data JPA, and the more Hibernate was used since this is the default JPA implementation Spring uses.**

While the Spring framework provides declarative transaction handling, Spring Data JPA solves the DAO (Data Access Object) layer problem since it can provide default implementations for entity repositories.

While JPA and Hibernate are still the most popular Java data access technologies, there are many other great frameworks that are worth using, like MyBatis or JOOQ.

> Trends over time : raw JDBC → SpringJDBC(ex. JdbcTemplate, MyBatis) → JPA 🫅

---


## 📽️ Plain JDBC

- Plain JDBC refers to the Java Database Connectivity API, which is a standard Java API for interacting with relational databases. It is the basis of all data access technologies of Java.
- With Plain JDBC, developers write code that directly interacts with the JDBC API to perform database operations.
- The Disadvantages of Plain JDBC
  1. Boilerplate code: Working with Plain JDBC often involves writing a significant amount of **boilerplate code to handle tasks such as establishing database connections, creating and executing SQL statements, handling result sets, and managing transactions.** This can lead to verbose and error-prone code, increasing development effort and maintenance overhead.
  2. Manual resource management: Plain JDBC requires **manual management of database resources** such as connections, statements, and result sets. Failing to properly release these resources can lead to resource leaks, which can degrade application performance and even cause stability issues. 


🎯 **Example**

- Configuration

```java
// Configuration file -> let's define DataSource bean here
// DataSource 는 설정 파일에서 생성하고, 그 빈을 DAO class 에 의존성 주입하는 방식이 권장된다. 
@Configuration
@ComponentScan("...")
public class AppConfig {
    @Bean
    public DataSource mysqlDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/springjdbc");
        dataSource.setUsername("guest_user");
        dataSource.setPassword("guest_password");

        return dataSource;
    }
}
```

A common practice is to configure a `DataSource` in your Spring configuration file and then dependency-inject that shared `DataSource` bean into your DAO classes. 

- DAO interface and implementation

```java
public interface EmployeeDAO { 
	public Employee getById(int id);
}
```

```java
@Repository
public class EmployeeDAOImpl implements EmployeeDAO {

	private DataSource dataSource;

  @Autowired
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
 
	@Override
	public Employee getById(int id) {
		String query = "select name, role from Employee where id = ?";
		Employee emp = null;
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;

		try{
			// Creating the Connection
			con = dataSource.getConnection();  
			ps = con.prepareStatement(query);
			ps.setInt(1, id);
			rs = ps.executeQuery();

			if(rs.next()){
				emp = new Employee();
				emp.setId(id);
				emp.setName(rs.getString("name"));
				emp.setRole(rs.getString("role"));
				System.out.println("Employee Found::"+emp);
			}else{
				System.out.println("No Employee found with id="+id);
			}

		}catch(SQLException e){
			e.printStackTrace();
		}finally{
			try { 
				// Closing the connection
				rs.close(); 
				ps.close();
				con.close();  
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return emp;
	}
}
```

The data **is directly set in each query parameter and stored in the DB.** These codes are quite less readable and inconvenient to work with.

---

## 📽️ Spring JDBC w/ JdbcTemplate(SQL Mapper)

- JdbcTemplate is **SQL Mapper** which is used in Spring JDBC approach.
- The Advantages of JdbcTemplate
  1. Simplified database access: JdbcTemplate simplifies database access by abstracting away many low-level JDBC operations. **It handles tasks like connection management, statement creation and execution, result set handling, and exception translation. (In plain JDBC, we should do these by ourserlves, manually!)** This reduces the amount of boilerplate code and makes the code more concise and readable.
  2. Resource management: Plain JDBC requires manual management of database resources such as connections, statements, and result sets. **However, JdbcTemplate takes care of resource management,** ensuring that database connections, statements, and result sets are properly opened and closed. It helps prevent resource leaks and ensures efficient resource utilization.
  
  Overall, JdbcTemplate simplifies the development of JDBC-based data access code by providing a higher-level abstraction, handling common tasks, and promoting best practices. It reduces boilerplate code, improves code readability, and enhances developer productivity when working with relational databases in Spring applications.
    

**🎯 Example**

- Configuration file

```java
// Configuration file -> let's define DataSource bean here
@Configuration
@ComponentScan("...")
public class AppConfig {
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/springjdbc");
        dataSource.setUsername("guest_user");
        dataSource.setPassword("guest_password");

        return dataSource;
    }
}
```

A common practice when using the `JdbcTemplate` class is to configure a `DataSource` in your Spring configuration file and then dependency-inject that shared `DataSource` bean into your DAO classes. The `JdbcTemplate` is created in the setter for the `DataSource`.

- DAO interface and implementation

```java
public interface PersonDAO {
	Person getPersonById(Long id); 
}
```

```java
@Repository
public class PersonDAOImpl implements PersonDAO {

	JdbcTemplate jdbcTemplate;

	@Autowired // Annotate the DataSource setter method with @Autowired
	public setPersonDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource); // Create a new JdbcTemplate with the DataSource.
	}

	private final String SQL_FIND_PERSON = "select * from people where id = ?"; 

	public Person getPersonById(Long id) {
		**return jdbcTemplate.queryForObject(SQL_FIND_PERSON, new Object[] { id }, new PersonMapper());**
	} 
}
```

[https://docs.spring.io/spring-framework/reference/data-access/jdbc/core.html#jdbc-JdbcTemplate](https://docs.spring.io/spring-framework/reference/data-access/jdbc/core.html#jdbc-JdbcTemplate)

[https://www.digitalocean.com/community/tutorials/spring-jdbctemplate-example](https://www.digitalocean.com/community/tutorials/spring-jdbctemplate-example)

 ---

## 📽️ Spring JDBC w/ MyBatis(SQL Mapper)

- Both JdbcTemplate and MyBatis are categorized as SQL mappers. But, MyBatis eliminates some disadvantge of JdbsTemplate, so it is called as advanced version of `JdbcTemplate`. 
- The Advantages of MyBatis (compared to JDBC, JdbcTemplate)
    1. Separate SQL statement from Java code : In the way of programming using JDBC, SQL statements are written in the program source. This tight coupling between Java code and SQL queries can make the code less maintainable and harder to refactor. However, with MyBatis, **SQL statements are separated from the program and separately written in XML files.**  This separation of concerns makes the code more maintainable and easier to understand, as you can focus on the Java objects and let MyBatis handle the SQL mapping. 
    2. Higher-level abstractions : There are certain functions that **need to be handled manually in JDBC, JdbcTemplate but are handled automatically in MyBatis**. (such as SQL statement preparation, Result set mapping, Dynamic SQL generation, Transaction management) MyBatis provides higher-level abstractions and features that reduce the amount of boilerplate code and make database access more convenient and efficient.

- Structure of MyBatis
    - Configuration file : Defines the rules that MyBatis works such as DB settings and transactions
    - Mapper: Refers to the **Mapper XML file** that defines SQL in XML, and the **Mapper interface** that defines SQL as an annotation for each method of the interface
    - Mapping Statements: Refers to the result mapping indicating the rules for setting search result to the Java object and the mapping statement defining SQL in XML.


🎯 **Example**

- Dependency

```java
dependencies {
		// spring boot starter for mybatis
    implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter'
		// JDBC driver for connecting with mysql database
    implementation 'mysql:mysql-connector-java:8.0.27'
}
```

Spring Boot provides mechanisms that simplify the configuration of MyBatis with Spring even more, by using [the mybatis-spring-boot-starter dependency](https://search.maven.org/search?q=g:org.mybatis.spring.boot%20a:mybatis-spring-boot-starter). We will use this mybatis-spring -boot-starter.

- Configuration

```java
// application.properties

# JSP 설정하기
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp

# Datasource (MySQL 설정하기)
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/DB명
spring.datasource.username=계정 이름
spring.datasource.password=계정 비밀번호
spring.datasource.driver-class-name: com.mysql.cj.jdbc.Driver

# Mapper Location (자동 의존성 주입을 사용하지 않는 경우)
mybatis.mapper-locations=classpath:mybatis/mapper/**/**.xml
```

```java
// application.yml

spring: 
  mvc:
    view:
      prefix: /WEB-INF/views/
      suffix: .jsp
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/DB명
    username: 계정 이름
    password: 계정 비밀번호
    driver-class-name: com.mysql.cj.jdbc.Driver

mybatis:
  mapper-locations: classpath:mybatis/mapper/**/**.xml
```

By default, if we use an auto-configuration feature, Spring Boot configures both `Datasource` and `SqlSessionFactory` for us. If we don't use an embedded database like H2 embedded database, we can use configuration via an `application.yml` or `application.properties`file or define a Datasource bean pointing to our database.  

- Mapper interface

```java
// **UserMapper.java**
@Mapper
@Repository
public interface UserMapper {
    List<User> getAllUsers();
    User getUserById(int id);
    void addUser(User user);
    void updateUser(User user);
    void deleteUser(int id);
}
```

The only thing we have left to do is to define a mapper interface and annotate it with the `@Mapper` annotation from MyBatis. As a result, Spring Boot scans our project, looking for that annotation, and registers our mappers as beans. Or, we can use `@MapperScan` annotation to register our mappers as beans automatically.

- Mapper file

```java
// **UserMapper.xml**
<?xml version="1.0" encoding="UTF-8"?> 
<mapper namespace="UserMapper">
	<select id="getAllUsers" resultType="User">
	    SELECT * FROM user
	</select>
	<select id="getUserById" parameterType="int" resultType="User">
	    SELECT * FROM user WHERE id = #{id}
	</select>
	<insert id="addUser" parameterType="User">
	    INSERT INTO user (name, email) VALUES (#{name}, #{email})
	</insert>
	<update id="updateUser" parameterType="User">
	    UPDATE user SET name = #{name}, email = #{email} WHERE id = #{id}
	</update>
	<delete id="deleteUser" parameterType="int">
	    DELETE FROM user WHERE id = #{id}
	</delete>
	...
</mapper>
```

- Service → How to use data from Mapper  

```java
@Service
public class UserServiceImpl implements UserService {
 
  private UserMapper userMapper;  

  @Autowired	  
  public setUserServiceImpl(UserMapper userMapper) { 
    this.repository = repository;
  }

  @Override
  public List<User> getAllUsers() {
      return userMapper.getAllUsers();
  } 
  ....
}
```

---

## 📽️ JPA

- JPA is a collection of interfaces used as **object-relational mapping (ORM) technology**. It defines **a method of using a relational database (RDB)** in a Java application. Since it is an interface, Hibernate, OpenJPA, etc. are the tools for implementing JPA.
    
    ![https://blog.kakaocdn.net/dn/c0s8MF/btqDJLKFtQ2/sqKs4k3JmMUKpkal6rUGTK/img.png](https://blog.kakaocdn.net/dn/c0s8MF/btqDJLKFtQ2/sqKs4k3JmMUKpkal6rUGTK/img.png)
    
- Prior to the advent of Java Persistent API (JPA), an Object Mapping technology like MyBatis was used, which required mapping of Java class code and directly written SQL code. On the other hand, ORM technologies such as JPA **do not write SQL directly** but process it on a standard interface basis because **objects are connected to DB.**
    
    |  | Technique |
    | --- | --- |
    | MyBatis | Object Mapping |
    | JdbcTemplate | Object Mapping |
    | JPA | ORM(Object Relational Mapping) |

- The key concepts and features of JPA  
   - Object-relational mapping (ORM): JPA allows developers to map Java objects to relational database tables. It provides annotations and XML configuration options to define the mapping between Java classes and database tables, as well as the mapping between object fields and database columns. This abstraction layer eliminates the need for writing SQL queries manually and provides a more object-oriented programming model.
   - Entity classes: In JPA, entity classes represent the persistent objects that are mapped to database tables. These classes are annotated with **`@Entity`** to indicate that they are persistent entities. Each entity class typically corresponds to a database table, and its fields represent the columns of that table.
   - EntityManager: The **`EntityManager`** is the central interface in JPA for performing database operations. It provides methods to persist, retrieve, update, and delete entities, as well as execute queries. The EntityManager manages the lifecycle of entities, tracks changes, and synchronizes them with the database.
   - Persistence Unit: A Persistence Unit is a logical grouping of entity classes and their associated configuration. It is defined in a **`persistence.xml`** file and specifies the database connection settings, mapping information, and other persistence-related configurations.
   - JPQL: JPA provides the Java Persistence Query Language (JPQL), which is a database-independent query language similar to SQL. JPQL allows developers to write queries using entity and property names instead of database-specific table and column names. It supports various query operations such as SELECT, INSERT, UPDATE, and DELETE.
   - Relationships: JPA supports defining relationships between entities, such as one-to-one, one-to-many, and many-to-many relationships. These relationships are represented through annotations or XML configurations and are used to establish associations between entities.
   - Transaction management: JPA integrates with the Java Transaction API (JTA) and provides transaction management capabilities. It allows developers to manage database transactions declaratively or programmatically, ensuring the consistency and integrity of data operations.



### 🌱 Spring Data JPA

- Spring Data JPA is a module within the [Spring Data](https://www.baeldung.com/spring-data) project that provides a simplified approach to working with relational databases using JPA.
- It is built **as an abstraction layer over the JPA**. So, we have all the features of JPA plus the Spring ease of development.
- The Advantage of Spring Data JPA
  - Reduced boilerplate code: Spring Data JPA reduces the amount of boilerplate code needed for data access. By using the repository abstraction provided by Spring Data JPA, **developers can use pre-defined methods for performing common database operations (such as CRUD operations) without having to write repetitive code.** The framework generates the necessary SQL queries based on method names and conventions, eliminating the need for manual query construction.
  - Increased productivity: With Spring Data JPA, developers can focus more on business logic and application development instead of dealing with low-level database interactions. The provided abstractions and query generation capabilities save development time and effort, leading to increased productivity.
  - Simplified query creation: Spring Data JPA **allows developers to create queries by simply defining method names following a naming convention**. **The framework automatically translates these method names into SQL queries.** This approach reduces the need for writing complex queries manually and promotes a more readable and maintainable codebase.
  - Flexibility and extensibility: Spring Data JPA provides flexibility in terms of query creation. Developers can define custom query methods using the **`@Query`** annotation and write JPQL (Java Persistence Query Language) or native SQL queries when needed. This allows for more complex and specific query requirements while still benefiting from the convenience of Spring Data JPA's repository infrastructure.
  - Integration with other Spring technologies: Spring Data JPA seamlessly integrates with other Spring projects and technologies, such as Spring Framework and Spring Boot. It leverages Spring's dependency injection and transaction management capabilities, allowing for easy integration with other components of a Spring-based application.
  - Transaction management: Spring Data JPA integrates with Spring's transaction management infrastructure, providing declarative and programmatic transaction management. It simplifies the handling of database transactions, ensuring consistency and data integrity.
  - Support for caching: Spring Data JPA integrates with caching providers, allowing query results to be cached and improving performance. By enabling caching, subsequent identical queries can be served from the cache, reducing the need for database hits and enhancing application responsiveness.
  - Abstraction from specific JPA implementations: Spring Data JPA provides a level of abstraction from specific JPA implementations, such as Hibernate or EclipseLink. Developers can switch between different JPA implementations without making significant changes to their codebase, as Spring Data JPA handles the underlying implementation details.
    
    Overall, Spring Data JPA simplifies database access, reduces boilerplate code, promotes productivity, and provides a flexible and extensible approach to working with relational databases in Java applications. 🤩🤩🤩
    
- [Difference Between JPA and Spring Data JPA](https://www.baeldung.com/spring-data-jpa-vs-jpa)

![https://suhwan.dev/images/jpa_hibernate_repository/overall_design.png](https://suhwan.dev/images/jpa_hibernate_repository/overall_design.png)


🎯 **Example**

- Configuration file

```java
@Configuration
@EnableJpaRepositories("com.acme.repositories")
class AppConfig {

  @Bean
  public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2).build();
  }

  @Bean
  public JpaTransactionManager transactionManager(EntityManagerFactory emf) {
    return new JpaTransactionManager(emf);
  }

  @Bean
  public JpaVendorAdapter jpaVendorAdapter() {
    HibernateJpaVendorAdapter jpaVendorAdapter = new HibernateJpaVendorAdapter();
    jpaVendorAdapter.setDatabase(Database.H2);
    jpaVendorAdapter.setGenerateDdl(true);
    return jpaVendorAdapter;
  }

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    LocalContainerEntityManagerFactoryBean lemfb = new LocalContainerEntityManagerFactoryBean();
    lemfb.setDataSource(dataSource());
    lemfb.setJpaVendorAdapter(jpaVendorAdapter());
    lemfb.setPackagesToScan("com.acme");
    return lemfb;
  }
}
```

- Repository interface

```java
public interface PersonRepository extends CrudRepository<Person, Long> {

  List<Person> findByLastname(String lastname);

  List<Person> findByFirstnameLike(String firstname);
}

```

- Service → How to use data from Repository

```java
@Service
public class MyService {

  private final PersonRepository repository;

  public MyService(PersonRepository repository) {
    this.repository = repository;
  }

  public void doWork() {

    repository.deleteAll();

    Person person = new Person();
    person.setFirstname("Oliver");
    person.setLastname("Gierke");
    repository.save(person);

    List<Person> lastNameResults = repository.findByLastname("Gierke");
    List<Person> firstNameResults = repository.findByFirstnameLike("Oli*");
 }
}

```

---

Reference.

[https://medium.com/an-idea/spring-boot-spring-data-jpa-vs-mybatis-514d969648ee](https://medium.com/an-idea/spring-boot-spring-data-jpa-vs-mybatis-514d969648ee)

[https://www.baeldung.com/spring-mybatis](https://www.baeldung.com/spring-mybatis)

[https://gmlwjd9405.github.io/2018/05/15/setting-for-db-programming.html](https://gmlwjd9405.github.io/2018/05/15/setting-for-db-programming.html)

[https://mangkyu.tistory.com/20](https://mangkyu.tistory.com/20)