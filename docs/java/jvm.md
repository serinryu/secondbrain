---
sidebar_position: 1
---

# JVM

Understanding JVM can help optimize the performance of Java applications.

## 📠 What is JVM?

**Java Virtual Machine(JVM)** is an engine that provides a run time environment to drive the java code in platform-independent environment. It converts the java byte code into machine language. Therefore, regardless of what operating system or hardware is actually present, the JVM creates a predictable environment for programs to run within. 

- **Technical definition**: The JVM is the specification for a software program that executes code and provides the runtime environment for that code.
- **Everyday definition**: The JVM is how we run our Java programs. We configure the settings and then rely on the JVM to manage program resources during execution. **When developers talk about the JVM, we usually mean the process running on a machine, especially a server.**

The JVM has two primary functions. They are:

1. It allows java programs to **run on any device or OS to fulfill WORA** (Write Once Run Anywhere) principle.
2. It manages and optimizes **program memory**. (Automatic memory management with GC)

![https://beginnersbook.com/wp-content/uploads/2013/05/JVM.jpg](https://beginnersbook.com/wp-content/uploads/2013/05/JVM.jpg)


## 📠 JVM Architecture

1. Class Loader
2. Execution Engine
3. Runtime Data Area (JVM Memory)

![https://www.javainterviewpoint.com/wp-content/uploads/2016/01/JVM-Architecture.png](https://www.javainterviewpoint.com/wp-content/uploads/2016/01/JVM-Architecture.png)


## 1. Class Loader

Everything in Java is a class, and all Java applications are built from classes. An application could consist of one class or thousands. In order to run a Java application, a JVM must load compiled .class files into a context, such as a server, where they can be accessed. A JVM depends on its class loader to perform this function.

In short, it loads classes into memory and makes them available for execution. Class loaders use techniques like lazy-loading and caching to make class loading as efficient as it can be.

## 2. Execution Engine

Once the class loader has done its work of loading classes, the JVM begins executing the code in each class. The execution engine is the JVM component that handles this function. It is essential to the running JVM.  

It includes..
 - Interpreter
 - Just-in-Time
 - Garbage collector

### 2.1 Garbage collector(GC)

The most common interaction with a running JVM is to check the memory usage. Before Java, all program memory was managed by the programmer. In Java, program memory is managed automatically, by the GC running in JVM. 

The main objective of Garbage Collection is to free **Heap memory** by destroying the objects that don’t contain a reference. When there are no references to an object, it is assumed to be dead and no longer needed.

## 3. **Runtime Data Area (JVM Memory)**

To execute the java program, it requires a certain amount of memory to store the data and instructions it needs to operate. This memory is divided into various areas.

> - Shared Data Areas : Method area(Static area), Heap area
> - Per-thread Data Areas (store specific data for each thread) : Stack area, PC Register, Native Method stack

![https://www.programcreek.com/wp-content/uploads/2013/04/JVM-runtime-data-area.jpg?ezimgfmt=ng%3Awebp%2Fngcb13%2Frs%3Adevice%2Frscb13-1](https://www.programcreek.com/wp-content/uploads/2013/04/JVM-runtime-data-area.jpg?ezimgfmt=ng%3Awebp%2Fngcb13%2Frs%3Adevice%2Frscb13-1)

### 3.1 Method Area (Static Area)

- Concretely, the [class loader](https://www.baeldung.com/java-classloaders) loads the bytecode of the class and passes it to the JVM. The JVM then creates an internal representation of the class. This internal representation gathers information about the fields, methods, and constructors of the classes and interfaces. The JVM stores these structure for each and every class. 
- It is created when the JVM starts, and it is destroyed only when the JVM exits. Additionally, let's point out that the Method Area is a logical concept.
- If the available space in the Method Area is not enough to load a new class, the JVM throws an **OutOfMemory** error.

:::tip
Method Area : It stores per-class structures such as the run-time constant pool, field and method data, and the code for methods and constructors.
:::

    
### 3.2 Stack Area
    
- For every thread, JVM creates one run-time stack. Stack area contains **primitive values** that are specific to a method and **references** to objects referred from the method that are in a heap. JVM creates the stack area whenever it creates a new thread. This memory is threadsafe, as each thread operates in its own stack.
- Access to this memory is in Last-In-First-Out (LIFO) order. Whenever we call a new method, a new block is created on top of the stack which contains values specific to that method, like primitive variables and references to objects. (Call Stack)
- If there is no space for creating the new objects, it throws the **java.lang.StackOverFlowError.**
  
:::tip
Stack Area : It stores the references(address) to objects created in Heap area, if it’s reference values. It stores primitive values(data) itself, if it’s primitive type variable.
:::
    
### 3.3 Heap Area

- Heap space is used for the **dynamic memory allocation of Java objects** and JRE classes at runtime. ‘New’ objects are always created in heap space, and the references to these objects are stored in stack memory.
- The Heap's creation occurs at the JVM start-up, and its destruction happens at the exit. Unlike stack, a heap isn't threadsafe and needs to be guarded by properly synchronizing the code.
- For managing the memory automatically, Java provides the **garbage collector** that deletes the objects which are no longer being used. Garbage Collection runs on the heap memory to free the memory used by objects that don't have any reference.
- If the heap space is full, it throws the **java.lang.OutOfMemoryError.**
- We can break this memory model down into smaller parts, called generations, which are:
  1. **Young Generation –** this is where all new objects are allocated and aged. A minor Garbage collection occurs when this fills up.
  2. **Old or Tenured Generation –** this is where long surviving objects are stored. When objects are stored in the Young Generation, a threshold for the object's age is set, and when that threshold is reached, the object is moved to the old generation.
  3. **Permanent Generation –** this consists of JVM metadata for the runtime classes and application methods.

:::tip
Heap Area : It stores objects.
:::
    
### 3.4 PC Registers: 
- It stores address of current execution instruction of a thread. Obviously, each thread has separate PC Registers.
    
### 3.5 Native method stacks:
- It stores native method information. Each thread has separate Native method stacks.


## **Example of Memory allocation**

To put it simple, memory allocation in java is usually considered to divide into two ways, **stack and heap space**. Stack memory size is very less when compared to heap memory. Because of simplicity in memory allocation (LIFO), stack memory is very fast when compared to heap memory.

Then, Let’s see how memory allocation occurs in real program. (We will see the process of stack and heap, only.)

![https://www.baeldung.com/wp-content/uploads/2018/07/java-heap-stack-diagram.png](https://www.baeldung.com/wp-content/uploads/2018/07/java-heap-stack-diagram.png)

```java
class Person {
    int id;
    String name;

    public Person(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

public class PersonBuilder {
    private static Person buildPerson(int id, String name) {
        return new Person(id, name);
    }

    public static void main(String[] args) {
        int id = 23;
        String name = "John";
        Person person = null;
        person = buildPerson(id, name);
    }
}
```

1. When we enter the *main()* method, Java Runtime creates stack memory to be used by main() method thread.
   - Primitive type variable : Stack memory directly stores the primitive value of integer *id.*
   - Reference type variable : The reference variable *person* of type *Person* will also be created in stack memory, which will point to the actual object in the heap.
2. The call to the parameterized constructor *Person(int, String)* from *main()* will allocate further memory on top of the previous stack. This will store:
   - The *this* object reference of the calling object in stack memory
   - The primitive value *id* in the stack memory
   - The reference variable of *String* argument *name,* which will point to the actual string from string pool in heap memory
3. The *main* method is further calling the *buildPerson()* static method, for which further allocation will take place in stack memory on top of the previous one. This will again store variables in the manner described above.
4. However, heap memory will store all instance variables for the newly created object *person* of type *Person.*

---

Reference.

[Chapter 2. The Structure of the Java Virtual Machine](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html)

[What is the JVM? Introducing the Java virtual machine](https://www.infoworld.com/article/3272244/what-is-the-jvm-introducing-the-java-virtual-machine.html)

[The JVM Run-Time Data Areas | Baeldung](https://www.baeldung.com/java-jvm-run-time-data-areas)

[Stack Memory and Heap Space in Java | Baeldung](https://www.baeldung.com/java-stack-heap)