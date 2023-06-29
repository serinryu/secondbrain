# JPA & Spring Data JPA

## 🪴 What is JPA?

**The Java Persistence API (JPA) is a specification that defines how to persist data in Java applications.** JPA follows Object-Relational Mapping (ORM) which is the process of converting Java objects to database tables. In other words, this allows us to interact with a relational database without any SQL. 

![https://static.javatpoint.com/springboot/images/spring-boot-jpa3.png](https://static.javatpoint.com/springboot/images/spring-boot-jpa3.png)

JPA is just a specification, so it needs an implementation. There is various enterprises vendor such as Eclipse, RedHat, Oracle, etc. that provides new products by adding the JPA in them. There are some popular JPA implementations frameworks such as **Hibernate, EclipseLink, DataNucleus,** etc. **Hibernate is a standard implementation of the JPA specification.** Hibernate is one of the most popular Java ORM frameworks in use today.

![Hibernate](https://dz2cdn1.dzone.com/storage/temp/15904206-hibernate-orm-mpping-latest.png)

## 🪴 Why should we use JPA?

The main advantage of JPA over JDBC is that, in JPA, **data is represented by objects and classes** while in JDBC data is represented by tables and records. It uses POJO to represent persistent data that simplifies database programming. There are some other advantages of JPA:

- JPA avoids writing DDL in a database-specific dialect of SQL. Instead of this, it allows mapping in XML or using Java annotations.
- JPA allows us to avoid writing DML in the database-specific dialect of SQL.
- JPA allows us to save and load Java objects and graphs without any DML language at all.
- When we need to perform queries JPQL, it allows us to express the queries in terms of Java entities rather than the (native) SQL table and columns.

## 🪴 Architecture of Java Persistence API (JPA)

The Java Persistence API (JPA) is a specification that defines a set of standard interfaces and annotations for object-relational mapping (ORM) in Java. JPA provides a high-level, object-oriented approach to interact with relational databases using Java objects.

> **[Package javax.persistence](https://docs.oracle.com/javaee/7/api/javax/persistence/package-summary.html#package.description)**
> Java Persistence is the API for the management for persistence and object/relational mapping.



### 1. Entity

→ [javax.persistence.Entity](https://docs.oracle.com/javaee/7/api/javax/persistence/Entity.html) (Annotation Type)

- Entities in JPA are nothing but POJOs representing data that can be persisted in the database. An entity represents a table stored in a database. Every instance of an entity represents a row in the table.
- To do this, we need to define our entities by making use of the *@Entity* annotation.
- Each JPA entity must have a primary key that uniquely identifies it.

```java
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    private String name;
    
    // getters and setters
}
```

### 🔁 4 Lifecycle States of Entity object

All entity operations are based on JPA’s lifecycle model. It consists of 4 states : New, Managed, Removed and Detached. It defines how your persistence provider handles the entity object.

![https://thorben-janssen.com/wp-content/uploads/2020/07/Lifecycle-Model-1024x576.png](https://thorben-janssen.com/wp-content/uploads/2020/07/Lifecycle-Model-1024x576.png)

- **Transient :** The lifecycle state of a newly instantiated entity object is called *transient*. The entity hasn’t been persisted yet, so it doesn’t represent any database record.
- **Managed : All entity objects attached to the current *persistence context* are in the lifecycle state *managed*.** That means that your persistence provider, e.g. Hibernate, will detect any changes on the objects and generate the required SQL INSERT or UPDATE statements when it flushes the persistence context.
- **Detached :** If a previously managed entity is no longer associated with an active persistence context, it has the lifecycle state *detached*. Changes to such an entity object will not be persisted in the database.
- **Removed** : Entities in the state *removed* are scheduled for removal. The persistence provider will generate and execute the required SQL DELETE statement during the next flush operation.

### 2. EntityManager

→ [javax.persistence.EntityManager](https://docs.oracle.com/javaee/7/api/javax/persistence/EntityManager.html) (Interface)

The EntityManager is the core component of the Java Persistence API (JPA) and is responsible for managing entities and their lifecycle in the context of a persistence unit.

EntityManager is an interface to perform main actual database interactions.

1. Creates persistence instance.
2. Removes persistence instance.
3. Finds entities by entity’s primary key.
4. Allows queries to be run on entities.

![https://www.baeldung.com/wp-content/uploads/2019/11/transition-persistence-context.png](https://www.baeldung.com/wp-content/uploads/2019/11/transition-persistence-context.png)

### 3. Persistence Context

→ [javax.persistence.PersistenceContext](https://docs.oracle.com/javaee/7/api/javax/persistence/EntityManager.html) (Interface)

A persistence context handles a set of entity instances in which for any persistent entity identity there is a unique entity instance. 

Each **EntityManager** instance is associated with a **PersistenceContext.** Within the persistence context, the entity instances and their lifecycle are ***managed***.

### 4. EntityManagerFactory

→ [javax.persistence.EntityManagerFactory](https://docs.oracle.com/javaee/7/api/javax/persistence/EntityManagerFactory.html) (Interface)

EntityManagerFactory is a factory for EntityManagers.

![https://kihoonkim.github.io/images/persistence-context.png](https://kihoonkim.github.io/images/persistence-context.png)

### 5. Persistence

→ [javax.persistence.Persistence](https://docs.oracle.com/javaee/7/api/javax/persistence/Persistence.html) (Class)

Persistence class contains java static methods to get EntityManagerFactory instances.

## 🪴 Spring Data JPA

Spring Data JPA simplifies the implementation of JPA-based repositories by providing a set of interfaces and classes that handle common CRUD operations and queries. In other words, it is built **as an abstraction layer over the JPA**. So, we have all the features of JPA plus the Spring ease of development.

When you define a repository interface and extend it with the one of the `Repository` interface,  it eliminates the need to write explicit DAO (Data Access Object) implementations for basic CRUD operations. 

In other words, **[Repository](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/Repository.html) interface (in Spring Data) and its subinterfaces in Spring Data JPA(ex. `JpaRepository`) provide a convenient way to define repositories and benefit from the automatic generation of repository implementations and standard CRUD operations.** Therefore, it allows you to focus more on defining the repository interfaces and writing business logic.

![https://suhwan.dev/images/jpa_hibernate_repository/overall_design.png](https://suhwan.dev/images/jpa_hibernate_repository/overall_design.png)

- [Difference Between JPA and Spring Data JPA](https://www.baeldung.com/spring-data-jpa-vs-jpa)

### `JpaRepository` interface

The most commonly used subinterface of **`Repository`** in Spring Data JPA is **[JpaRepository](https://docs.spring.io/spring-data/data-jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html)**. 

The **`JpaRepository`** interface extends **`PagingAndSortingRepository`**, which, in turn, extends **`CrudRepository`**. And **`CrudRepository`** extends the base **`Repository`** interface. The **`PagingAndSortingRepository`** interface adds support for paging and sorting operations on query results. **`JpaRepository`** provides additional methods specifically for JPA-based repositories.

```java
 public interface MemberRepository extends JpaRepository<Member, Long>{
}
```

1.  **`JpaRepository` interface provides these methods.**
    - **`save(entity)`**: Saves the given entity (inserts or updates) and returns the saved entity.
    - **`findById(id)`**: Retrieves an entity by its ID.
    - **`findAll()`**: Retrieves all entities.
    - **`delete(entity)`**: Deletes the given entity.
    - **`deleteById(id)`**: Deletes the entity with the given ID.
    - **`count()`**: Returns the total number of entities.
    
    In addition to these basic methods, **`JpaRepository`** also supports **sorting, paging, and custom query methods**. You can define custom query methods 1) by following Spring Data's method naming conventions or 2) by using the **`@Query`** annotation to write JPQL or SQL queries.
    

2. **`JpaRepository` interface is relying on EntityManager internally. → No need to manage EntityManager manually 🤩**
    
    ```java
    // JpaRepository.java
    import java.util.List;
    
    import jakarta.persistence.EntityManager;
    
    import org.springframework.data.domain.Example;
    import org.springframework.data.domain.Sort;
    import org.springframework.data.repository.ListCrudRepository;
    import org.springframework.data.repository.ListPagingAndSortingRepository;
    import org.springframework.data.repository.NoRepositoryBean;
    import org.springframework.data.repository.query.QueryByExampleExecutor;
    
    /**
     * JPA specific extension of {@link org.springframework.data.repository.Repository}. 
     */
    @NoRepositoryBean
    public interface JpaRepository<T, ID> extends ListCrudRepository<T, ID>, ListPagingAndSortingRepository<T, ID>, QueryByExampleExecutor<T> {
    // ...
    }
    ```
    
    Under the hood, the **`JpaRepository`** interface provides default implementations for all the methods defined in its parent interfaces. These default implementations utilize the **`EntityManager`** to execute the underlying JPA operations.
    
    For example, when you call the **`save(entity)`** method on a **`JpaRepository`** instance, the implementation uses the **`EntityManager`** to persist or update the given entity in the database. Similarly, when you call **`findById(id)`**, the **`EntityManager`** is used to retrieve the entity with the specified ID.
    
    By relying on the **`EntityManager`** internally, the **`JpaRepository`** interface abstracts away the complexities of working directly with JPA and provides a simplified and convenient way to perform common database operations.
    
    Note that the **`EntityManager`** is typically managed by the underlying Spring container when using Spring Data JPA. The container injects the **`EntityManager`** instance into the **`JpaRepository`** implementation behind the scenes, allowing you to use it seamlessly without explicitly dealing with its instantiation or configuration.