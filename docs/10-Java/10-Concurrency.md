# Java Concurrency: Concurrency and Parallelism

## 🤔 Concurrency VS Parallelism

### Concurrency

*Concurrency* means that an application is making progress on more than one task - at the same time or at least ‘seemingly’ at the same time (concurrently). If the computer only has one CPU the application may not make progress on more than one task at *exactly the same time*, but more than one task is in progress at a time inside the application. To make progress on more than one task concurrently the CPU switches between the different tasks during execution.

+) **Concurrently and Simultaneously is different.** In Concurrency, the threads are running ‘concurrently’, not actually ‘simultaneously’. 

![img](https://jenkov.com/images/java-concurrency/concurrency-vs-parallelism-1.png)

### Parallelism

The term *parallelism* means that an application splits its tasks up into smaller subtasks which can be processed in parallel, for instance on multiple CPUs at the exact same time. 

Parallel execution is when a computer has more than one CPU or CPU core, and makes progress on more than one task simultaneously.

![img](https://jenkov.com/images/java-concurrency/concurrency-vs-parallelism-2.png)

The diagram below illustrates a bigger task which is being split up into 4 subtasks. These 4 subtasks are being executed by 4 different threads, which run on 2 different CPUs. This means, that parts of these subtasks are executed **concurrently** (those executed on the same CPU), and parts are executed in **parallel** (those executed on different CPUs).

![img](https://jenkov.com/images/java-concurrency/concurrency-vs-parallelism-4.png)

**Concurrency** : 

- Even though previous task isn’t completed yet, the next task is split up and executed in parallel.
- Executed on the same CPU
- Executed concurrently

**Parallelism** :

- Tasks can be completed in parallel.
- Executed on the different CPU
- Executed simultaneously

> To recap, *concurrency* refers to how **a single CPU** can make progress on multiple tasks seemingly at the same time (AKA concurrently). *Parallelism* on the other hand, is related to how an application can **parallelize** the execution of a single task - typically by splitting the task up into subtasks which can be completed in parallel.


## 💥 What is Java Concurrency?

Java *Concurrency* is a term that covers multithreading, concurrency and parallelism on the Java platform.

1. The first Java *concurrency model* assumed that multiple threads executing within the same application would also share objects. This type of concurrency model is typically referred to as a "shared state concurrency model". A lot of the concurrency language constructs and utilities are designed to support this concurrency model. However, the shared state concurrency model causes a lot of concurrency problems which can be hard to solve elegantly. 
2. Therefore, an alternative concurrency model referred to as "shared nothing" or "separate state" has gained popularity. (Yes, `synchronized` mechanism was Java's first mechanism for synchronizing access to objects shared by multiple threads.) In the separate state concurrency model the threads do not share any objects or data. This avoids a lot of the concurrent access problems of the shared state concurrency model.
3. Later, another new currency algorithm have been published and still in progress.

+) [This article](https://dzone.com/articles/java-concurrency-evolution) is about the main milestones for the evolution of thread/concurrency handling in Java. 


Therefore, **with a Java concurrency model, you can work with multiple threads without facing concurrency problems** that you would otherwise encounter. Depending on the situation, it is necessary to consider which concurrency issues could occur in your situation. 

## 👻 Concurrency Issues needed to solve

1. **The Hardware Memory Architecture**

![img](https://jenkov.com/images/java-concurrency/java-memory-model-4.png)

A modern computer often has 2 or more CPUs in it. Each CPU may also have a CPU cache memory layer. In fact, most modern CPUs have a cache memory layer of some size. The CPU can access its cache memory much faster than main memory. 

Modern computers come **with multi core CPUs, and even with multiple CPUs** too. This means that **separate threads can be executed by separate cores or CPUs simultaneously.**

2. **The Java Memory Model**

![img](https://jenkov.com/images/java-concurrency/java-memory-model-5.png)

As you know, in JVM Memory structure, threads share Method area(Static area), and Heap area. In other words, threads have their own call stack, but can also access shared data. 

The Java memory model and the hardware memory architecture are different. The hardware memory architecture does not distinguish between thread stacks and heap. **On the hardware, both the thread stack and the heap are located in main memory.** Parts of the thread stacks and heap may sometimes be present in CPU caches and in internal CPU registers. 

Therefore, **When two or more threads are sharing an object, it can be stored in various different memory areas in the computer. It may occur two problems, visibility and access problems.**

- A visibility problem : occurs if thread A reads shared data which is later changed by thread B and thread A is unaware of this change.
- A race condition (Mutual Exclusion, atomic problem, access problem) : occurs if several threads access and change the same shared data at the same time.

### 1. Visibility problem

If two or more threads are sharing an object, updates to the shared object made by one thread may not be visible to other threads.

![img](https://jenkov.com/images/java-concurrency/java-memory-model-6.png)

Imagine that the shared object is initially stored in main memory. A thread running on CPU one then reads the shared object into its CPU cache. There it makes a change to the shared object. As long as the CPU cache has not been flushed back to main memory, the changed version of the shared object is not visible to threads running on other CPUs.

One thread running on the left CPU copies the shared object into its CPU cache, and changes its `count` variable to 2. This change is not visible to other threads running on the right CPU, because the update to `count` has not been flushed back to main memory yet.

#### Solution : volatile keyword

To solve this problem you can use **[Java's volatile keyword](https://jenkov.com/tutorials/java-concurrency/volatile.html)**. The `volatile` keyword guarantees more than just that volatile variables are **written to and read directly from “main memory”, not cache memory.** In other words, it guarantees that any thread that reads the field will see the most recently written value.

**volatile is Not Always Enough**

However, volatile keyword doesn’t solve every problems related to concurrency. There is still ‘race condition’ problem. As soon as a thread needs to first read the value of a `volatile` variable, and based on that value generate a new value for the shared `volatile` variable, a `volatile` variable is no longer enough to guarantee correct visibility. The short time gap in between the reading of the `volatile` variable and the writing of its new value, creates an **[race condition](https://jenkov.com/tutorials/java-concurrency/race-conditions-and-critical-sections.html)** where multiple threads might read the same value of the `volatile` variable.

In case only one thread is writing the shared variable (and other threads only is reading), then using the **volatile keyword** for that is enough. However, if two threads are both reading and writing to a shared variable, then you need to use a **synchronized keyword** in that case to guarantee that the reading and writing of the variable is atomic. 

⇒ Depending on the situation, it is necessary to consider whether it can be solved if **visibility** is guaranteed or whether **atomicity** should be also guaranteed.

### 2. Race condition (Atomic problem)

If two or more threads share an object, and more than one thread updates variables in that shared object, **race conditions** may occur.

Imagine if thread A reads the variable `count` of a shared object into its CPU cache. Imagine too, that thread B does the same, but into a different CPU cache. Now thread A adds one to `count`, and thread B does the same. Now `var1` has been incremented two times, once in each CPU cache. If these increments had been carried out sequentially, the variable `count` would be been incremented twice and had the original value + 2 written back to main memory.

However, the two increments have been carried out concurrently without proper synchronization. Regardless of which of thread A and B that writes its updated version of `count` back to main memory, the updated value will only be 1 higher than the original value, despite the two increments.

#### Solution : Synchronized Block

To solve this problem you can use a **[Java synchronized block](https://jenkov.com/tutorials/java-concurrency/synchronized.html)**. A synchronized block guarantees that only one thread can enter a given critical section of the code at any given time. 

Synchronized blocks also guarantee that all variables accessed inside the synchronized block will be read in from main memory, and when the thread exits the synchronized block, all updated variables will be flushed back to main memory again.

![img](https://jenkov.com/images/java-concurrency/java-memory-model-7.png)

If threads are both writing to a shared variable often, **synchronized keyword** can let you avoid race condition which means ensure atomicity. Java’s synchronized keyword guarantees both visibility and atomicity, at the cost of application performance.

The `synchronized` mechanism was Java's first mechanism for synchronizing access to objects shared by multiple threads.

#### Solution : Atomic class

As it is mentioned above, the synchronized keyword is used to implement a lock-based(blocking) algorithm. However, the disadvantage of it is that waiting time of thread. Because at a time only one thread can operate on object so other threads have to wait.

That’s where atomic class comes in. Atomic class is an alternative to a synchronized block which means both of them can solve the atomicity problem. The difference is that synchronized keyword uses blocking, whereas atomic class doesn’t use blocking. 


## ✍🏻 Summary

To sum up, there are three ways that Java provides to avoid the concurrency issues. 

1. Using `Volatile` keyword
    
    Reading and writing of volatile variables causes the variable to be read or written to main memory. Reading from and writing to main memory is more expensive than accessing the CPU cache. Accessing volatile variables also prevent instruction reordering which is a normal performance enhancement technique. Thus, you should only use volatile variables when you really need to enforce visibility of variables.
    
2. Using `Synchronized` keyword (blocking)
    
    A simple way to make a block of Java code atomic is to mark it using the `synchronized` Java keyword. However, blocking of the thread is expensive.
    
3. Using Atomic class (non-blocking)
    
    As an alternative to a synchronized block, atomic class is also for ensuring atomicity, but it uses Compared And Swap(CAS) algorithm, not blocking. The atomic classes provide a lock-free(non-blocking) and thread-safe(concurrent) environment or programming on a single variable.
    
    Java 5 provides java.util.concurrent package, and in that package, you can use one of the many atomic data types.
    

| what | how |
| --- | --- |
| volatile | solve the visibility problem |
| synchronized | solve the visibility & atomicity problem (blocking) |
| atomic class | solve the visibility & atomicity problem (non-blocking) |

Depending on the situation, it is necessary to consider whether the problem can be solved by ensuring **visibility** alone, or whether **atomicity** must also be guaranteed. 

- If you have to desire both **visibility** and **atomicity**, you need to use `synchronized` keyword or atomic class. If you solve the atomicity problem with `synchronized` or atomic class, visibility problem is solved automatically.
- In some cases, we may only desire **visibility** and not atomicity. The use of `synchronized` in such a situation is overkill and may cause scalability problems.


---
Reference.
https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html
https://www.baeldung.com/java-concurrency
https://jenkov.com/tutorials/java-concurrency/index.html 
https://jenkov.com/tutorials/java-concurrency/concurrency-vs-parallelism.html
https://jenkov.com/tutorials/java-concurrency/java-memory-model.html