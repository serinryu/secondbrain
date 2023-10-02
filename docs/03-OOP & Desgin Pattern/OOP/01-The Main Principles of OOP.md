# The Main Principles of OOP

## What is OOP?

Object-oriented programming (OOP) is a computer programming paradigm based on the concept of ‘objects’. It organizes software design around **data, or objects**, rather than functions and logic. The object is a data field that has unique attributes and behavior.

OOP is well-suited for large, complex, and actively updated programs. Also, it is more beneficial to collaborative development. 

1. Re-usability
2. Data Reduncancy
3. Code Maintance
4. Easy Troubleshooting
5. Efficiency

## The Main Principles of OOP

OOP is based on the following principles : Encapsulation, Abstraction, Inheritance, Polymorphism.


### 1. Encapsulation 

Encapsulation describes bundling data and methods that work on that data within one unit, like a class in Java. We often often use this concept to hide an object’s internal representation or state from the outside, which is called **information hiding.**

It includes the practice of keeping fields within a class `private`, and providing access to those fields via `public` methods called getter/setters, to allow limited access to internal data.

Encapsulation allows the user to hide specific information and control access to the object’s internal state. This characteristic of data hiding provides greater program security and avoids unintended data corruption.


### 2. Inheritance 

Classes can reuse code from other classes. Relationships and subclasses between objects can be assigned. It enables developers to reuse common logic while still maintaining a unique hierarchy.

Unlike some other OOP languages like C++, **Java doesn’t provide support for multiple inheritances** in classes because it can lead to diamond problem. Therefore, in Java, it’s impossible to have more than one parent and if you need, you can use multiple Interfaces.

#### Inheritance vs Composition

There are two main types of relationships between classes, which are inheritance and composition. The premise of inheritance is an "is-a" relationship, and if it is a "has-a" relationship, it should be implemented as a composition relationship rather than inheritance. Composition means declaring another class as a member variable in one class.

```jsx
// Police has a gun -> OK
public class Police {
	  private Gun gun = new Gun()
}

// Police is a gun -> No....
public class Police extends Gun{
}
```


### 3. Abstraction

Abstraction is that handling complexity by hiding unnecessary details from the user. Objects only reveal internal mechanisms that are relevant for the use of other objects, hiding any unnecessary implementation code. It enables the user to implement more complex logic on top of the provided abstraction without understanding all the hidden complexity.

### 4. Polymorphism 

Polymorphism means "**many forms**", and it occurs when we have many classes that are related to each other by **inheritance**. Inheritance lets us inherit attributes and methods from another class. Polymorphism uses those methods to perform a single action in different ways.

Polymorphism describes a pattern in object oriented programming in which classes have different functionality while sharing a common interface.

You can perform Polymorphism in Java via two different methods:

**1. Method Overloading**

In a Java class, we can create methods with the same name if they differ in parameters. Here, the same method will perform different operations based on the parameter.

```jsx
void func() { ... }
void func(int a) { ... }
float func(double a) { ... }
float func(int a, float b) { ... }
```

**2. Method Overriding**

During **inheritance** in Java, if the same method is present in both the superclass and the subclass. Then, the method in the subclass overrides the same method in the superclass. This is called method overriding. In this case, the same method will perform one operation in the superclass and another operation in the subclass.


### The Use of Polymorphism

Again, being **polymorphic** means that they can handle objects of multiple different types as long as they have a common parent type. Therefore, the use of polymorphic are :

- In a **method**, you can pass any subtype of a parameter's type

```jsx
public void example_method(Book b){..}
// example_method(Novel)
// example_method(SF)
```

- In a **array**, you can store any subtype as array’s elements

```jsx
Book book[] = new Book[2];
book[0] = new Novel("소설", "소설출판사");
book[1] = new SF("메타버스", "SF출판사");
```

### Advantages of Polymorphism

1. It provides **reusability** to the code. The classes that are written, tested and implemented can be reused multiple times. Furthermore, it saves a lot of time for the coder. Also, the one can change the code without affecting the original code.
   
2. A single variable can be used to store multiple data values. The value of a variable you inherit from the superclass into the subclass can be changed without changing that variable’s value in the superclass; or any other subclasses.

3. With lesser lines of code, it becomes easier for the programmer to **debug** the code.


### Check the type of the instance with.. `instanceof`

Due to this polymorphism, there is a need to check the type of the instance that the reference variable is actually referring to at runtime. In Java, the instanceof operator is provided to allow us to check the actual type of the instance that the reference variable is referring to.

```jsx
if(c instanceof SF){
    c.print();  //true
}
if(b instanceof Novel){
    b.print();  //true
}
```

### Example of performing Polymorphism using Method Overriding

**1) Create a parent class (Inheritance)**

```jsx
class Book{
    public String name;
    public String publisher; 
    Book(){
    	this.name = "";
        this.publisher = "";
    }
    Book(String name, String publisher){
        this.name = name;
        this.publisher = publisher;
    }
    void print(){
        System.out.println("print : Book");
    }; 
}
```

**2) Create a child class and override methods**

Method overriding is the process when the subclass or a child class has the same method as declared in the parent class.

```jsx
class Novel extends Book{
    public String name;
    public String publisher; 
    Novel(String name, String publisher){
        super(name, publisher);
    }
    @Override
    void print(){
        System.out.println("print : Novel");
    }
}
class SF extends Book{
    public String name;
    public String publisher; 
    SF(String name, String publisher){
        super(name, publisher);
    }
    @Override
    void print(){
        System.out.println("print : SF");
    }
}
```

**3) Cast a child object to a parent object (Upcasting)** 

A polymorphic Variable is a variable that can reference more than one type of object. This relies on **Upcasting.**

Upcasting is the **typecasting of a child object to a parent object**. Upcasting gives us the flexibility to access the parent class members but it is not possible to access all the child class members using this feature. Instead of all the members, we can access some specified members of the child class. For instance, we can access the overridden methods.

Make sure that in Java, casting a parent to a child which is known as **downcasting** may not possible. Because a parent may or may not inherits the every child’s properties. The compiler will throw a **[ClassCastException](https://www.geeksforgeeks.org/built-exceptions-java-examples/).**


```jsx
Book b = new Novel("메타버스 소설","출판사(IT)");
//Book b = (Book) new Novel("메타버스 소설","출판사(IT)");

Book c = new SF("메타버스", "SF출판사");
//Book c = (Book) new SF("메타버스", "SF출판사");
```


```jsx
class Parent { ... }
class Child extends Parent { ... }

Parent pc = new Child();  // upcasting. -> OK
Child cp = new Parent();  // downcasting. -> Error ❌ 
```


**4) Call child class method from parent class object** 

Because of **dynamic binding**, the member function of the child class is called, not the function of parent class.

- What is Dynamic binding? : Dynamic binding is **determining the method to invoke at runtime instead of at compile time**. It allows us to ignore the type differences by providing us with the flexibility in choosing which type of function we need at that instant of runtime.

```jsx
//Book b = new Novel("소설","소설출판사");
b.print();

//Book c = new SF("메타버스", "SF출판사");
c.print();

//print : Novel
//print : SF
```

