# Rendering Methods (CSR, SSR, SSG)

## 1. Static Website VS Dynamic Website

A static website is built out of one or more HTML pages pre-rendered using specific layouts cached and delivered through a content delivery network (CDN).

A dynamic website processes these requests and get information from an external database or a content management system (CMS). This type of website requires the execution of JavaScript code within the browser in order to render.

To sum up, a static website is pre-rendered(pre-built, rendered at build time), whereas a dynamic website is rendered at runtime.

### 1-1. Comparsion

1. Content storage

Content on a static site is stored on a server or a CDN and published instantly to the server. Dynamic site content is stored on a database or CMS until it is ready to be used.

2. Changes in content

Content on a static site never changes after the site has been published. On the other hand, content changes depending on user behavior with dynamic sites. If you want a visitor to see something different based on their location or specific input, it can be changed accordingly.

3. Updating content

Updating content on a static site is more challenging as it needs to be done manually, page by page. Changes made to a page on a dynamic site can automatically be made across any number of changes.

4. Setup and maintenance

Static sites can be quickly set up and launched by someone with the right technical expertise but can be difficult to maintain as they grow in complexity. Dynamic sites initially take longer to set up but can be easily maintained and quickly updated.

5. Speed

Because they are pre-rendered and come directly from the server, they’ll load very fast and appear the same way every time for all the visitors. On the other hand, dynamic sites can suffer from performance issues as there is more data that needs to be processed.

## 2. Rendering Techniques (Method)

| Rendering Techniques  | Where the site is rendered | Suitable to… |
| --- | --- | --- |
| SSG (Static Site Generation, pre-rendering) | The web pages are generated at **build-time**, and will be reused on each request. | static content |
| CSR (Client Side Rendering) | The web pages are dynamically generated **on client-side at runtime**. | dynamic content |
| SSR (Server Side Rendering) | The web pages are dynamically generated **on server-side at runtime**. (generated on each request) | dynamic content |
- If you are making highly static content, you can use SSG.
- If you are making highly dynamic web application, you can use either CSR or SSR. (depending on scenarios.)

:::tip
This video will help you a lot to understand the difference among them. [Check here](https://www.youtube.com/watch?v=mWytwmxLKmo)
:::

### 2-1. Client-side Rendering (CSR)

**In CSR, web pages are generated dynamically on the client-side using JavaScript.** When the user requests a page, the server returns a blank HTML page and then the JavaScript code running in the user’s browser requests the data from the server and updates the page dynamically.  Simply put, Using CSR allows you to render sites in the browser using JavaScript, which means that rather than having a different HTML page per route, you're able to build each route dynamically on the browser.

1. The user sends a request to a website (usually via a browser).
2. Instead of a server, a CDN (Content Delivery Network) can be used to serve static HTML, CSS, and supporting files to the user.
3. The browser downloads the HTML and then the JS. Meanwhile, the user sees a loading symbol.
4. After the browser fetches the JS, it makes API requests via AJAX to fetch the dynamic content and processes it to render the final content.
5. After the server responds, the final content is rendered using DOM processing in the client's browser.

- Application:
    
    **CSR is the most straight-forward and suitable way to build a SPA** (single page app). React uses this approach out of the box. Also, applications with lot of user interactions (e.g Games) and highly dynamic content such as forms, and chat applications.
    
- Advantages:
    
    Pages using CSR are high in performance because they generate on-demand HTML on the same page & when you navigate between pages, it doesn’t refresh the page. Instead, it pretends to load a separate page & data, so server requests are drastically reduced.
    
- Disadvantages:
    
    However, due to this, it struggles with search engine optimization (SEO), as the web crawlers of search engines like Google are accustomed to server-side rendered HTML.
    

### 2-2. Server-side Rendering (SSR)

As the name suggests, **SSR  pages are generated dynamically on the server-side in response to user requests.** In server-side rendering, it generates pages on the server in response to user requests. the server generates the HTML, CSS, and JavaScript for each page and sends it to the client as a fully-formed HTML page. 

1. The user sends a request to a website (usually via a browser)
2. The server checks the resource, compiles and prepares the HTML content after traversing through server-side scripts lying within the page.
3. This compiled HTML is sent to the client’s browser for further rendering and display.
4. The browser downloads the HTML and makes the site visible to the end-user
5. The browser then downloads the Javascript (JS) and as it executes the JS, it makes the page interactive
- Application:
    
    Most traditional Web 1.0 and 2.0 applications including WordPress use SSR for delivering dynamic content. WordPress is open-source CMS paired with a MySQL or MariaDB database.
    
- Advantages:
    
    There are some major advantages of using SSR such as better SEO, caching, and superior security. Since these pages are generated on the server, web crawlers can easily digest these sites for data and index them, hence better search rankings. You can easily use environment variables and perform sensitive operations such as database queries to populate the HTML files with data on the server.
    
- Disadvantages:
    
    However, SSR is not perfect to a fault, as it demands more performance from your servers to generate HTML, and the number of server requests is way higher compared to CSR mode as every page is generated from scratch.
    

### 2-3. Static Site Generation (SSG)

If it’s just creating static sites, there is no need to load pages based on user requests. **With SSG, the web pages are generated at build-time, before the user requests them.**While SSR and CSR refer to techniques for rendering web pages on the server-side and client-side, respectively, SSG is a technique for **generating static HTML pages at build-time.**

The main difference between these sites and server-rendered sites is that there is no server code involved to serve SSG pages. Data is bundled with HTML pages at build time and served from a CDN. You can even use bucket storage such as AWS’s S3 to serve these sites! 

1. SSG generates all static files at build time, on a build server.
2. The static files are deployed to a Content Delivery Network (CDN), which caches the content and delivers it to users from the server closest to them. 
3. When a user requests the website, the CDN delivers the static files directly to the user's browser, without the need for a server to generate or process the content on the fly. 
- Advantages:
    
    These static sites are generated during the build time itself and are comparatively faster than other methods of rendering. Hence, these sites work well with SEO. Also, it’s more secure since there is no server-side processing or database queries
    
- Disadvantages:
    
    However, having too many pages generated at the build time can increase the project size and also the build time.
    

### 🥳 SSG Revolution : Build an API driven static-site with headless CMS!

Using a SSG usually involves storing Markdown files locally in the code repository. This would involve using a code editor to write content and a GIT workflow to publish - which works fine for small sites or developers. However, it's not ideal for professional publishers that need to scale. This is where a headless CMS comes in!

A headless CMS typically consists of two main components:

1. Content Management Backend: This is the administrative interface where content editors and administrators can create, manage, and organize content. It allows users to define content structures, create and edit content entries, manage media files, and apply various workflows and permissions.
2. Content Delivery API: The headless CMS exposes a content delivery API that enables developers to retrieve content from the CMS and integrate it into various front-end applications or platforms. The API allows developers to query and fetch specific content items or collections based on their requirements.

You can use headless CMS for authoring (Writers have their preferred editor & content management) while using SSG. For example, you can use Contentful API, WordPress API, Ghost API as headless CMS, and build out your front-end in Gatsby to pull content from that headless CMS. 

Building sites in this way has become known as the [JAMstack](https://jamstack.org/?ref=gatsby.ghost.io) - (as in **J**avaScript, **A**PIs, **M**arkup).

### 2-4. JAMstack

A JAMstack application that uses static site generation (SSG) often combines a headless CMS for content management and a CDN for content delivery. (SSG + headless CMS + CDN)

The Jamstack architecture is based on the three components that make up the “JAM” in its name — client-side JavaScript, reusable APIs, and Markups pre-rendered at build time. Instead of using traditional content management systems (CMSes) or website builders, Jamstack brings its three core components together to provide a holistic website development solution that is more robust and powerful than other conventional approaches. 

JAMstack applications are static, with APIs used for any backend functionality. A website is delivered statically, such as serving HTML from static hosting or CDN (content delivery network), but providing dynamic content and an interactive experience through JavaScript. **With that siade, the main idea behind using Jamstack is shifting the workload from servers to clients!**

- The “J” of Jamstack can be any form of JavaScript, from pure JavaScript to even front-end languages such as React.js. But the role that it plays in Jamstack is that it handles responses and requests from your front-end code on the client side. This, in turn, allows you to build fast, scalable applications with excellent performance and user experience to match.

- Next up is the “A” of Jamstack, API, or an application programming interface. APIs are a set of rules that allow the software to communicate with one another. You can integrate other applications with your website through APIs to provide uniquely enriching digital experiences for your customers.

- Lastly, the “M” in Jamstack refers to the HTML Markup, which is pre-rendered. This essentially means that the code is prebuilt and ready for consumption, but it’s up to JavaScript (or other APIs) if they want to access it or not. This is different from the traditional style of front-end coding, which is still commonly used in many web applications.

The core components of Jamstack turn it into a formidable web development technology. To summarise, by implementing Jamstack architecture, you can expect benefits such as pre-rendering of pages, supercharging with JavaScript, seamless integration with other platforms, fast and secure performance, and smooth scalability.

![https://www.partech.nl/publication-image/%7B5B10137E-B906-4AC5-B266-F64BC6530701%7D](https://www.partech.nl/publication-image/%7B5B10137E-B906-4AC5-B266-F64BC6530701%7D)
![https://images.contentful.com/fo9twyrwpveg/7Gi0UfqwrdPCCENrCXIfHU/cfa689da2b9b7c2b6a5b3008135437bf/Jamstack_Workflow_Hero.png](https://images.contentful.com/fo9twyrwpveg/7Gi0UfqwrdPCCENrCXIfHU/cfa689da2b9b7c2b6a5b3008135437bf/Jamstack_Workflow_Hero.png)

---

Reference.

[https://www.locofy.ai/blog/what-the-heck-is-web-rendering](https://www.locofy.ai/blog/what-the-heck-is-web-rendering)

[https://www.contentful.com/r/knowledgebase/jamstack-cms/](https://www.contentful.com/r/knowledgebase/jamstack-cms/)

[https://jamstack.org/headless-cms/](https://jamstack.org/headless-cms/)

[https://blog.logrocket.com/jamstack-in-2021-past-present-and-future/](https://blog.logrocket.com/jamstack-in-2021-past-present-and-future/)

[https://www.youtube.com/watch?v=mWytwmxLKmo](https://www.youtube.com/watch?v=mWytwmxLKmo)

[What the Heck Is Web Rendering, and Why Should You Care?](https://www.locofy.ai/blog/what-the-heck-is-web-rendering)

[https://webo.digital/blog/which-is-better-vercel-or-cloudflare/](https://webo.digital/blog/which-is-better-vercel-or-cloudflare/)