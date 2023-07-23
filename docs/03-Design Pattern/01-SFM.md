# Static Factory Method Pattern

> Effective Java - by Joshua Block 

## What is **Static Method?**

Static methods are the methods in Java that can be called without creating an object of class. They are associated with the class in which they reside i.e. they are called without creating an instance of the class i.e **ClassName.methodName(args)**.

**When to use static methods?**

- They are designed with the aim to be shared among all objects created from the same class. When you have code that can be shared across all instances of the same class, put that portion of code into static method.
- They are basically used to access static field(s) of the class.

**Instance method vs Static method**

- Instance method can access the instance methods and instance variables directly.
- Instance method can access static variables and static methods directly.
- Static methods can access the static variables and static methods directly.
- Static methods can’t access instance methods and instance variables directly. They must use reference to object. And static method can’t use **[this](https://www.geeksforgeeks.org/this-reference-in-java/)** keyword as there is no instance for ‘this’ to refer to.

### Advantages of Static Method

1. No need to create an object before invoking the method (especially beneficial when objects need to be created repeatedly).
2. Can be used as **static factory methods** in order to create objects.

### Disadvantages of Static Method

1. It's not very object-oriented:
    - **Static methods violate the principle of `message passing`** in object-oriented programming. In object-oriented programming, objects establish relationships, exchange information through messages, and return results. Executing static methods does not instruct objects or establish relationships with other objects. It is more like a function call in procedural programming.
    - **Static methods violate the principle of `polymorphism`** in object-oriented programming because **overriding and dynamic binding are not possible in static methods.**
2. Object Lifetime:
    - Static variables have a lifetime that matches the entire runtime of the program. This means that even after you have finished using your class, the memory occupied by static variables cannot be freed by garbage collection.

## 👩‍🏭 **Static Factory Method**

> **"Consider Using Static Factory Method instead of Constructors" - Effective Java**

We can provide an instance of a class either through Constructor (normally) or through public static factory method. static factory method is a public static method of a class that returns a new instance object of that class.

The Static Factory Method pattern is a design pattern where **objects are created indirectly through a static method**, which serves as a separate "factory" for creating objects. Instead of directly invoking a constructor to instantiate an object, developers use a class method that acts as a factory to create the object indirectly. This approach is commonly referred to as the Static Factory Method pattern.

Plus, it's important to note that the Static Factory Method pattern mentioned here is different from the **Factory Method pattern** described in the book "Design Patterns: Elements of Reusable Object-Oriented Software" by the Gang of Four (GoF). Although the names may sound similar, they refer to different patterns. Joshua Bloch, the author of "Effective Java," also emphasizes that the **Static Factory Method pattern discussed in his book is not aligned with any specific pattern described in the GoF book.**

```jsx
class Book {
    private String title;
    
    // Make the constructor private 
    private Book(String title) { this.title = title; }
    
    // Static Factory Method
    public static Book titleOf(String title) {
        return new Book(title); 
    }
}
```

```jsx
public static void main(String[] args) { 
    Book book1 = Book.titleOf("어린왕자");  // get instance through static factory method
}
```

**Make the constructor private!**

When designing static factory methods, it is often recommended to make the constructor private to prevent external instantiation using the **`new`** keyword.  By making the constructor private, you enforce that the only way to create an instance of the class is through the static factory methods. This gives you control over the object creation process and allows you to implement additional logic or customization.


## 👍 **Advantages of Static Factory Method**

### 1. It has a distinguished name as opposed to constructor

Constructor functions need to have the same name as the class name which means that you as the class designer have no way of providing a descriptive name for the constructor. 

However, Static factory methods lets you give meaningful names to your construction methods allowing the consumers of your class to have a better experience.

### 2. It doesn’t require creating a new object each time they’re invoked.

Static factory method has the choice of reusing an existing instance or creating a new instance based on the state of the system. However, Constructors have no such choice and would always be expected to create an instance.

This means, static factory methods don’t require creating a new object each time they’re invoked. Static factory methods **provides same object** (removes unnecessary duplicate object) and allows immutable classes to use preconstructed instances. Hence, instance-controlled.


**Use cases of instance-control**

1. **In cases where only one instance of an object is created and reused**
   
   A classic example is the **Singleton design pattern**, where a static factory method **`getInstance()`** is used to ensure that only one object is returned and reused, thus saving memory. By using a static factory method, the object can be managed and reused efficiently.
    
    ```jsx
    class Singleton {
        private static Singleton instance;
    
        private Singleton() {}
    
        // Static Factory Method
        public static synchronized Singleton getInstance() {
            if (instance == null) {
                instance = new Singleton();
            }
            return instance;
        }
    }
    ```
    
2. **In cases where instances are internally cached and managed** 
   
   When it has cache internally, static factory methods are really useful. It helps to check if the object is already cached, and if it is, return the cached object; otherwise, create a new object and cache it. By caching instances, only the necessary instances are retrieved and reused, resulting in memory savings.
    
    ```jsx
    class Day {
        private String day;
    
        public Day(String day) { this.day = day; }
    
        public String getDay() { return day; }
    }
    
    class DayFactory {
    
        private static final Map<String, Day> cache = new HashMap<>();
    	
        static { 
        	cache.put("Monday", new Day("Monday")); 
            cache.put("Tuesday", new Day("Tuesday")); 
            cache.put("Wednesday", new Day("Wednesday")); 
        }
    
        // Static Factory Method
        public static Day from(String day) {
    
            if(cache.containsKey(day)) {
                System.out.println("Already cached");
                return cache.get(day); // return existing object
            } else {
                System.out.println("Not cached, created new one.");
                Day d = new Day(day);
                cache.put(day, d);
                return d; // return new object
            }
        }
    }
    ```
    

+) **Java Internal Caching in Wrapper Classes**

In Java, the wrapper classes (`Integer`, `Long`, `Boolean`, etc.) provide a mechanism for caching commonly used objects within a certain range. When we create a new wrapper object for a primitive value within a certain range (e.g., `Integer` objects for values between -128 and 127), Java will reuse an existing object from an internal cache instead of creating a new one. This behavior is known as "autoboxing" and "auto-unboxing".

For example, the **`valueOf()`** method of the **`Integer`** class is a static factory method that utilizes caching when the input value is within the range of -128 to 127. In this case, if the number is already cached, the **`valueOf()`** method retrieves the pre-created object from an array instead of creating a new object.

```jsx
// Integer Wrapper class
public static Integer valueOf(int i){
	if(i >= IntegerCache.low && i <= IntegerCache.high)
		return IntegerCache.cache[i + (-IntegerCache.low)]; // return existing object
	return new Integer(i); // return new object
}
```

### 3. It can return different objects based on the input arguments.

```jsx
interface SmarPhone {
    public static SmarPhone getPhone(int price) {
        if(price > 100000) {
            return new IPhone();
        }

        if(price > 50000) {
            return new Galaxy();
        }

        return new Huawei();
    }
}
```

Since methods can accept parameters, you can use conditional statements within the method block to branch and return instances of different child types. This allows for flexible configurations where the static factory method can return different instances based on the provided arguments.

### 4. It helps encapsulate the object creation

It helps **encapsulate** the object creation and helps **remove** **boiler** **plate** **code** (clean code) to create new instance by calling constructor each time from code. In addition, it helps **decoupling** the **instantiation** of object from code where it is used.

```jsx
public static void main(String[] args) {
    String jeff_score = GradeCalculator.of(36).toText();
    String herryPorter_score = GradeCalculator.of(99).toText();

    System.out.println(jeff_score); // F
    System.out.println(herryPorter_score); // A
}
```

```jsx
class GradeCalculator {
	// Static Factory Method
    public static Grade of(int score) {
        if (score >= 90) {
            return new A();
        } else if (score >= 80) {
            return new B();
        } else if (score >= 70) {
            return new C();
        } else if (score >= 60) {
            return new D();
        } else {
            return new F();
        }
    }
}
```

```jsx
interface Grade {
    String toText();
}

class A implements Grade {
    @Override
    public String toText() {return "A";}
}

class B implements Grade {
    @Override
    public String toText() {return "B";}
}

class C implements Grade {
    @Override
    public String toText() {return "C";}
}

class D implements Grade {
    @Override
    public String toText() {return "D";}
}

class F implements Grade {
    @Override
    public String toText() {return "F";}
}
```

## 👎 **Disadvantages of Static Factory Method**

### 1. Note that a class without a public or protected constructor cannot be sub-classed

By making the constructor private, you enforce that the only way to create an instance of the class is through the static factory methods. This gives you control over the object creation process and allows you to implement additional logic or customization.

However, a class without a public or protected constructor cannot be sub-classed, which means it cannot be inherited.

### 2. Static factory methods are hard to find in API documentation

Constructors “stand out” in API documentation and are easy to spot, but factory methods on the other hand can be hard to find. There are some **naming conventions** laid out in [effective java](https://www.amazon.com/Effective-Java-3rd-Joshua-Bloch/dp/0134685997) that can reduce this problem and make the factory methods easier to find in an IDE.



## Static Factory Method Naming Conventions

- **from (Type conversion) :** A type-conversion method which converts from the argument that is passed in to the particular type in which the method is present.
- **of(Aggregation) :** Aggregation method to create a bunch of instances.
- **valueOf :** Verbose alternative to “**of”** and “**from”**.
- **instance or getInstance :** Return an instance of the particular type as described by the passed in argument.
- **create or newInstance :** Similar to instance/getInstance except that this method would ensure that a new instance would always get created. The argument describes what kind of instance needs to be created.

---

Reference.

Effective Java by Joshua Block (Creating and Destroying Objects / Item 1: [Consider static factory methods instead of constructors.](https://medium.com/@biratkirat/learning-effective-java-item-1-57f85b93c254))

[https://inpa.tistory.com/entry/GOF-💠-정적-팩토리-메서드-생성자-대신-사용하자](https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%EC%A0%95%EC%A0%81-%ED%8C%A9%ED%86%A0%EB%A6%AC-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%83%9D%EC%84%B1%EC%9E%90-%EB%8C%80%EC%8B%A0-%EC%82%AC%EC%9A%A9%ED%95%98%EC%9E%90)

[https://stackoverflow.com/questions/7026507/why-are-static-variables-considered-evil"](https://stackoverflow.com/questions/7026507/why-are-static-variables-considered-evil%22)

[https://tecoble.techcourse.co.kr/post/2020-07-16-static-method/](https://tecoble.techcourse.co.kr/post/2020-07-16-static-method/)

[https://tecoble.techcourse.co.kr/post/2020-05-26-static-factory-method/](https://tecoble.techcourse.co.kr/post/2020-05-26-static-factory-method/)

[https://www.geeksforgeeks.org/difference-between-constructor-and-static-factory-method-in-java/](https://www.geeksforgeeks.org/difference-between-constructor-and-static-factory-method-in-java/)