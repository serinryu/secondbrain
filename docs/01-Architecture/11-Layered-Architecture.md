# Layered Architecture

> **"Architectures have the same objective — the separation of concerns. They all achieve it by dividing the software into layers." — Uncle Bob**

## What is **Layered Architecture**?

Layered architecture is an architectural pattern that organizes the components of a system into horizontal layers, where each layer has a specific responsibility and interacts with adjacent layers in a predefined manner. Typically, the layers are arranged in a hierarchical structure, with higher layers depending on lower layers. This design approach promotes modularity, separation of concerns, and ease of maintenance.

## 🥞 Composition of Layers

Normally, many developers uses 3 Layer architecture which has **Controller, Service, and Repository**. The request seems to be received by the `Controller`, handled by the `Service`, and then brought via the `Repository`. By tradition or inertia, business logic is written at the `Service`.

![img1](https://miro.medium.com/v2/resize:fit:720/format:webp/1*3BVoxBRWlgLAlvVNpJz-dQ.png)

**However, what if the business logic we encounter is so complicated? **

The `service layer` would end up having an excessive amount of knowledge about the specific implementation technology and logic. This form becomes a stumbling block at some point when trying to maintain and expand the software for a long time. 😭

- Service Layer : Detail implementation logic + Business logic 👻

In order to avoid issues like these, the `implementation layer` uses the `data access layer` to solve detailed implementation logic, and the `business layer` uses the `implementation layer` to solve business logic. It keeps the **detail implementation technology or logic** a hidden from the area in charge of the business. 

- Implementation Layer : Detail implementation logic
- Business Layer : ONLY business logic

> *✍🏻 Make sure that even if you are unaware of the specific implementation logic, the business flow need to be clear.*

![Untitled](https://miro.medium.com/v2/resize:fit:720/format:webp/1*AR9_PT_fkeTEMmdwU_luPA.png)

1. **The Presentation Layer is a very externally dependent and change-sensitive area.**This layer also includes the request and response classes as well as the code in charge of managing the external area.
2. **The business layer is where business logic is projected.** Naturally, you construct layers higher up if the code keeps expanding and the business logic becomes too much or has to be consolidated.
3. **The Implement Layer contains classes with thorough implementation logic**, as a tool to accomplish the business logic shown in the preceding example, Because it contains the most classes and is in charge of implementation logic, this core layer is highly reusable.
4. **Data Access Layer is layer that offers tools for intricate implementation logic to access numerous resources.** Its feature separates technological dependencies and gives implementation logic a clear interface. (They are often given as distinct modules to optimize this.)

## 🚩 How to Control and Isolate the Layers : **Follow proper direction of reference between layers!**

Control is necessary to create sustainable software. This is because the layers must be controlled through appropriate constraints to interact organically between layers.

Like we try to stick to SOLID principle for OOP programming, we should follow these rules for better interaction between layers, for sustainable software.

### 1. Rule one : When referring to layers, one must always do it in the forward manner, moving down from the top.

![Untitled](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Zzmctw7Vq7-zF9ltPPe4Tg.png)

### 2. Rule two : A layer’s direction of reference cannot flow backward.

![Untitled](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*dkd9iQj2yyUhe6VZ5CYF1w.png)

### 3. **Rule three :** Layer references must not skip lower layers.

![Untitled](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*AHqdVs_ddB2uLI_UCycenA.png)

The rule states that the **UserReader** must not be aware of the **UserService** if there is a **UserService** in the **business layer** and a class named UserReader in the **implementation layer**.

### 4. Rule four : The same layer must not refer to each other.

(The exception being that **implementation layers** may refer to one another.)

![Untitled](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*u_SBXY-fTZHX0GXl_Lq80Q.png)

This rule enables the development of more comprehensive, collaborative tool classes while increasing the reusability of **implement layer classes.**

Additionally, it features a rule to encourage the reuse of well-made implementations and to avoid the tainting of **business logic**.

## 🚫 Always be careful of `Circular Reference`

`Circular reference`, also known as circular dependencies, occur when **two or more components or classes depend on each other directly or indirectly.**  

If A references B, and B also references A, it creates a `circular reference` problem. This is because it's unclear which one should be created first. (In the case of Spring, it can be described as a situation where it is not possible to determine which Spring bean should be created first.)

```jsx
/* Circular reference occurs, this program doesn't work */

@Component
public class A {
    private B b;

    public A(B b){ // B 에 의존 (A 생성하기 위해서 B가 생성되어야함)
        this.b = b;
    }
}

@Component
public class B {
    private A a;

    public B(A a){ // A 에 의존 (B 생성하기 위해서 A가 생성되어야함)
        this.a = a;
    }
}
```

This can occur not only in the class, but also between the layers in layered architecture. 

`Circular reference` in a layered architecture happen when two or more layers depend on each other directly or indirectly, forming a loop in the dependency graph. If the dependencies between layers are not carefully managed, `circular references` can occur. 

![img0](https://i.ibb.co/g9Cqt7m/Screenshot-2023-07-17-at-3-27-48-PM.png)

By being aware of the relationship between layered architecture and circular reference issues and applying appropriate design principles, you can create a more maintainable and scalable software system. Therefore, it is important to have a clear understanding of circular dependencies and design systems to avoid circular dependencies.

### How to avoid circular references

👉 Re-think the dependencies on your architecture. It is essential to establish clear dependencies and adhere to good design principles. Here are a few strategies to mitigate circular references:

1. **Dependency Inversion Principle (DIP):** Apply the DIP, which states that high-level modules should not depend on low-level modules directly but instead depend on abstractions. This promotes loose coupling and allows for easier management of dependencies.
2. **Dependency injection (DI):** Use dependency injection frameworks or patterns to manage the creation and injection of dependencies. DI helps break circular dependencies by delegating the responsibility of creating and managing dependencies to a separate component.
3. **Dependency analysis and refactoring:** Regularly analyze the dependencies between layers and identify any circular references. Refactor the code to eliminate or break the circular references by introducing interfaces or abstract classes, introducing new layers, or reorganizing the responsibilities of existing layers.


---

Reference.

[https://catsbi.oopy.io/4d728131-93cd-4814-994c-65e372f2aef5](https://catsbi.oopy.io/4d728131-93cd-4814-994c-65e372f2aef5)

[https://geminikim.medium.com/how-to-design-software-that-is-sustainable-9411dc999ecf](https://geminikim.medium.com/how-to-design-software-that-is-sustainable-9411dc999ecf)