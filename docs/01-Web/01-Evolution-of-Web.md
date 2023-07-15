# Evolution of Web System

## 1. Early Web Systems

In the early days, web systems were simple and primarily focused on displaying static pages that consisted of textual content. These pages were delivered to web browsers, offering a basic browsing experience.
![image1](https://velog.velcdn.com/images%2Feclat12450%2Fpost%2F8a098875-17b0-492b-a46a-ba60a3d74b58%2Fimage.png)

## 2. Addition of Dynamic Functionality

As web services became more complex, user interaction became increasingly important. This led to the rise of JavaScript, a programming language that could be executed within web browsers. JavaScript played a crucial role in introducing dynamic functionality to web systems.

One significant advancement during this period was the emergence of **AJAX** (Asynchronous JavaScript and XML), a technology that allowed the implementation of dynamic user interactions. With AJAX, web servers could transmit not only HTML but also JavaScript code responsible for dynamic features to web browsers. This enabled the processing of user inputs and the provision of real-time data updates without the need to reload the entire page.

However, the concept of widely used APIs as we know them today was not prevalent during this period. HTML, JavaScript, and data (such as XML, a markup language for data transmission) were still sent from the same server to the web browser or client.

![image2](https://velog.velcdn.com/images%2Feclat12450%2Fpost%2F2e1134d2-cf2d-4ac7-8fee-6ca9c93cc198%2Fimage.png)

## 3. Introduction of API Server Concept & the Distinction between Backend and Frontend

As dynamic services gained significance and web services continued to advance, the influence of JavaScript grew. Frontend development gained popularity with the advent of Single Page Application (SPA) architecture. SPA allowed the dynamic implementation of all pages through JavaScript on a single page, shifting the focus towards data transmission, creation, and modification.

In this structure, the JavaScript code required for rendering the website's pages was received in a single communication, enabling subsequent interactions to primarily involve data exchange with the server. Consequently, frontend and backend servers naturally emerged:

- Frontend servers were responsible for delivering HTML and JavaScript files required for page rendering.
- Backend servers handled the generation and transmission of data needed by the pages.

Therefore, frontend engineers primarily focused on implementing the UI and UX aspects of the system, while backend engineers were responsible for implementing functionality that facilitated real-time communication between the frontend system and data. Backend developers aimed to build systems capable of processing a high volume of requests in real-time and with maximum efficiency.

![image3](https://velog.velcdn.com/images%2Feclat12450%2Fpost%2Fa0f03b7e-7510-46c7-a71d-1937125bdf97%2Fimage.png)

## 4. API Server Segmentation & MSA ⇒ Modern Web System Architecture!

As web systems continued to grow in scale and faced challenges related to handling a high volume of simultaneous requests and managing complex API systems, new architectural concepts like Microservice Architecture (MSA) emerged. These architectural approaches led to the segmentation and scaling of API servers to accommodate the increased complexity.

In the modern era, the role of backend developers has expanded. They are involved in various aspects, including developing backend API systems, data pipeline systems, machine learning systems, and big data analysis systems. Backend developers now handle real-time, large-scale data collection, analysis, and processing.

![image4](https://velog.velcdn.com/images%2Feclat12450%2Fpost%2F22d66a6b-3ebd-4dbe-8e4c-ffc90af7b4d3%2Fimage.png)