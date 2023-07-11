# SSG/SSR Frameworks (Gatsby VS Next.js)


## Introduction

While I was planning to build my own blogging site, I was wondering what are the commonalities and differences between the two frameworks, Gatsby and Next.js. To solve this question, I looked at the official documents of the two frameworks to see principle of operation and their own features. This post is all about that research process. 

In this blog post, I will convey important points in Gatsby and Nextjs and compare them so that you can make an informed decision about which platform is right for you. Stay tuned! 🤓

## 1. What is Gatsby and Next.js?

Both Gatsby and Next.js are React framework which means they are built on top of React, allowing us using features like Sever-Side Rendering and Static Site Generation and more features that React doesn't natively support.

### 1-1. What is React and why does it need framework?

React has grown better faster, it’s not only used for just front-end web development anymore. Now it’s commonly used to develop:

- SPA (Single Page Apps)
- Simple browser-based games
- VR apps with React 360
- Desktop Apps using Electron.js
- Mobile apps using React-Native

[React](https://reactjs.org/) has drastically transformed the website development field by abstracting the Document Object Model (DOM) manipulation, promoting a more straightforward way to build dynamic front-end apps as well as a ton of flexibility in terms of libraries used for routing, data fetching, and state management. 

However, React is meant to be a library, not a framework; it is supposed to be lightweight and only concerned with rendering the UI, leaving developers to choose the rest of the front-end architecture. 

That’s where frameworks like [Next.js](https://nextjs.org/) and [Gatsby](https://www.gatsbyjs.com/) come in. Next.js and Gatsby are built on top of React and offer a more diverse set of features for an enhanced developer experience(DX), such as server-side rendering, image optimization, and plugins. Today, we will look at two of the most well-known React frameworks: Gatsby and Next.

## 2. Gatsby

Gatsby is a free and open-source web framework that allows developers to build websites and applications. It is based on React, GraphQL, and other modern web technologies.

Gatsby uses a static site generator approach, where the content is pre-built and served as static HTML, CSS, and JavaScript files. This approach provides several benefits, including faster page load times, better search engine optimization, and improved security.

Gatsby's modular architecture allows developers to easily add plugins and extensions to extend its functionality. It also has a rich ecosystem of pre-built themes and starters that developers can use to quickly build websites and applications.

### 2-1. Tools

- **Background tools that Gatsby uses under the hood** (You don’t have to install them.)
    - **React**: A code library (built with JavaScript) for building user interfaces. It’s the framework that Gatsby uses to build pages and structure content. With React, you can break down your UI into smaller, reusable pieces called **components.**
    - **GraphQL**: A query language that allows you to pull data into your website. It’s the interface that Gatsby uses for managing site data.

- **Required Tools to run Gatsby** (You have to install them.)
    - **Node.js** : Node.js is an environment that can run JavaScript code outside of a web browser. Gatsby is built with Node.js. To get up and running with Gatsby, you’ll need to have Node.js version 18 (or newer) installed on your computer.
        - One of the reasons why developers love Gatsby is that it is a react-based framework thus allowing them to use any package that is used with NPM.
        - [npm](https://docs.npmjs.com/getting-started/what-is-npm) is a package manager that comes bundled with Node.js. You’ll use the npm command line interface to add packages to your site (like Gatsby plugins) and to run command line tasks.
    - **Git** : When you create a new Gatsby site, Gatsby uses Git behind the scenes to download and install the required files for your new site. You will also use Git to push your code to the cloud, so that you can deploy your site on the internet for others to see.
        - You should create a new repository for your Gatsby website. You can make it public or private. (This only affects the visibility of your code on GitHub. Your site will still be visible to everyone once you deploy it with Cloud.)

### 2-2. How it works

1. First, you write the code for your Gatsby site from your computer. 
2. You push your changes from your computer to a remote repository on GitHub. GitHub is an online platform for storing code for your projects.
3. When you push a new commit to the `main` branch of the GitHub repository for your site, Gatsby Cloud will detect the changes, rebuild a new version of your site, and then redeploy it.
4. Gatsby Cloud hosts the finished version of your site at a unique URL, which users can use to access the latest version of your site.
    
    (+) Even though this Gatsby’s official tutorial show us how to deploy your site using Gatsby Cloud, it doesn’t have to be Gatsby Cloud. Since Netlify acquired Gatsby (February, 2023), using Netlify instead of Gatsby Cloud is recommended. 
    

![https://www.gatsbyjs.com/static/0fd27b745c1de708f034eaf97c4416e0/321ea/deployment-workflow.png](https://www.gatsbyjs.com/static/0fd27b745c1de708f034eaf97c4416e0/321ea/deployment-workflow.png)

> 💡 **Where does Gatsby recognize as the root folder?**
> 
> 
> Gatsby automatically creates pages for React components that are the default export of files in the `src/pages` directory. So, Pages created in the `src/pages` directory use the name of the file as the route for the page. For example, if you had a file called `src/pages/garden-gnomes.js`, you could access that page at `localhost:8000/garden-gnomes`
> 

### 2-3. Benefits

#### 1. **Built-in React Component**

Gatsby has lots of **pre-built** components that you can use in your site. You can import it and use it without knowing too much about how it works under the hood.

- Gatsby Head API

Gatsby provides the [Gatsby Head API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/) and lets you define a `<title>` and other [document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head). You have to export a component called `Head` from your page template to apply the metadata. Adding such metadata helps search engines like Google to better understand your site. Compared to [react-helmet](https://github.com/nfl/react-helmet) or other similar solutions, Gatsby Head is easier to use, more performant, has a smaller bundle size, and supports the latest React features.

Adding metadata to pages (such as a title or description) is key in helping search engines like Google understand your content, and decide when to surface it in search results

- Gatsby Link API

The Gatsby `Link` component provides a performance feature called **preloading**. This means that the resources for the linked page are requested when the link scrolls into view or when the mouse hovers on it. That way, when the user actually clicks on the link, the new page can load super quickly.

#### 2. **Style**

Gatsby isn’t strict about what styling approach you use. You can pick whatever system you’re most comfortable with. But, Gatsby is automatically configured to handle **CSS Modules** - no extra setup necessary(by default)! 

CSS Modules generate the classname in each component, so guarantee the classname to be unique across your site. That’s why it let you write CSS that’s scoped to your components, so you don’t have to worry about selector name collisions between components.

To define styles using CSS Modules, put your CSS in a file that ends with the file extension `.module.css`. This tells Gatsby that this CSS file should be processed as a CSS Module rather than plain CSS.

#### 3. **Plugin** 

It can be a lot of work to build new features for a website. Luckily, by using Gatsby plugins, you can quickly add new functionality to your site without needing to build it from scratch yourself. Gatsby’s plugin ecosystem has thousands of prebuilt packages for you to choose from.

You can think of a plugin as an accessory for your site. You don’t *need* to use plugins - you could build out the same functionality from scratch yourself - but they save you time. In Gatsby terms, a **plugin** is a separate npm package that you install to add extra features to your site. For example, you can use the `gatsby-plugin-image` plugin to add images to your site while maintaining high performance scores.

1. Use the [Gatsby Plugin Library](https://www.gatsbyjs.com/plugins) to browse all the available plugins.
2. Install the plugin using npm. `npm install plugin-name`
3. Configure the plugin in your site’s `gatsby-config.js` file. Your `gatsby-config.js` file contains information about your site, including configuration for plugins.
4. Use the plugin features in your site, as needed. The specifics of this step will be different based on what the plugin does. Check the plugin’s README for more details.

   
#### 4. **Themes**

**Gatsby themes** are a set of plugins that include a `gatsby-config.js` file and add pre-configured functionality, data sourcing, and/or UI code to Gatsby sites. If you’ve ever created a Gatsby site completely from scratch, you know that there are a number of decisions to be made. Gatsby themes are designed to be easy to create from an existing starter, since it allows you to reuse site configurations, sets of plugins, and components across multiple Gatsby sites.

- Nice themes that I found 🤩

  - [https://github.com/JaeYeopHan/JBEE.io](https://github.com/JaeYeopHan/JBEE.io)

  - [https://github.com/devHudi/gatsby-starter-hoodie](https://github.com/devHudi/gatsby-starter-hoodie)

  - [https://github.com/junhobaik/junhobaik.github.io](https://github.com/junhobaik/junhobaik.github.io)

  - [https://github.com/zoomKoding/zoomkoding-gatsby-blog](https://github.com/zoomKoding/zoomkoding-gatsby-blog)

   
#### 5. **Gatsby’s data layer : Combine data from anywhere**

You’ve been writing text and adding images directly in your React components. But often it’s easier to create and maintain data somewhere else - like a folder of Markdown files or a content management system (CMS) - and then pull it into your components as needed. That way, you can make updates to your content without affecting the code for your site.

Conveniently, Gatsby has a powerful feature called the **data layer** that you can use to pull data into your site from anywhere. It uses an innovative data layer built on GraphQL to combine data from different sources and render them alongside. Thus, enabling developers to integrate different content, APIs, and services into a single web.

![https://www.gatsbyjs.com/static/e45422900475b86807bc002fb6863b85/5df5d/data-layer.png](https://www.gatsbyjs.com/static/e45422900475b86807bc002fb6863b85/5df5d/data-layer.png)

- Sourcing data : A core feature of Gatsby is its ability to load data from anywhere -- CMSs, Markdown, other third-party systems, even spreadsheets. This allows teams to manage their content in nearly any backend they prefer.
    - How?
    - By adding a type of plugin to your site called a **source plugin**. Inside the data layer, information is stored in objects called **nodes**. A node is the smallest form unit of data in the data layer. Different source plugins create different types of nodes, each of which have their own properties.
        
- Querying data : Once data is pulled into Gatsby, your pages and components specify what data they access through GraphQL queries.
    - How?
    - You can write **GraphQL queries** inside of your components to pull out the data you want to use in your site. When you build your site, Gatsby will find all the GraphQL queries in your components, run them, and put the resulting data in your component.
    Gatsby’s data layer is powered by a technology called **GraphQL**. GraphQL is a query language with a special syntax that lets you ask for the data you need inside a component.
        
    

#### 6. **Rendering Option**

Gatsby provides a variety of rendering options(SSR, SSG, DSG) so that you can choose the one that works best for your use case. Use the default Static Site Generation to create pages at build time, or try Deferred Static Generation to build a page the first time a user requests it. Or try Server-Side Rendering, if you need to generate pages on the fly.

In order to improve performance and SEO, Gatsby uses page pre-rendering **by default**, preferring the static site generation (SSG) method. That means that the pages of a site built with the Gatsby SSG are pre-rendered to HTML, CSS, and JavaScript at build time and cached. 

Now although this SSG pre-rendering approach brings us some amazing benefits, it is a double-edged sword. Anytime there are any updates to the site, Gatsby has to go through the build process all over again to incorporate the changes. That makes Gatsby optimal for sites that don’t have many of those updates — **[static](https://hygraph.com/blog/what-is-a-static-website)** sites like blogs, landing pages, and company sites.

> 💡 **Note:** Gatsby supports both SSG and server rendering(SSR) as options for pre-rendering, but is optimized for use with SSG.
> 
> 
> [https://www.gatsbyjs.com/docs/how-to/rendering-options/](https://www.gatsbyjs.com/docs/how-to/rendering-options/)
> 

   
   
#### 7. **Deployment**

There are lots of tools for deployment, including Gatsby Cloud and Netlify. However, after Netlify acquired Gatsby at February 2023, a founder of Gatsby stated that “**Many Gatsby Cloud features will be incorporated into Netlify.”**

[https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/)



## 3. Next.js

Next.js is a free and open source web application framework based on React.js, Node.js, webpack and Babel.js for building SSR and/or SSG web applications using React.

Like Gatsby, Next.js pre-renders pages **by default** to enhance the performance of your application. By contrast, SSR re-builds the entire page on the server each time a request for a page is made. **Traditionally, server-side rendering was the preferred method in Next, however, it now recommends static-site generation** because the HTML from the prebuilt statically generated pages is cached by the CDN and reused with every browser request. Therefore, right now, **Next.js** leaves it totally up to us, meaning developers can create an architecture of their choice and fetch data in several ways (SSR, SSG, or pre-rendering).

> 💡 **Note:** Next.js released [Version 9.3](https://nextjs.org/blog/next-9-3) that introduced an hybrid approach. Hybrid means that you can choose between *server side rendering* (SSR) and *static site generation* (SSG) on a per page basis.)
> 

## 4. Gatsby VS Next.js

### 4-1. **Data Fetching**

Gatsby and Next.js offer entirely different ways of handling data.

Gatsby offers a [GraphQL data layer](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/) that you can write queries against to fetch data from APIs & markdown files, data fetching happens through GraphQL queries. For developers who are not familiar with GraphQL, getting started with Gatsby can involve a bit of a learning curve.

Similar to Gatsby, Next acts as the frontend for use with any type of API, database, or **[headless CMS](https://hygraph.com/nextjs-cms)**. However, Next doesn’t push GraphQL as heavily, so developers have a bit more flexibility and a little less help from the framework when it comes to data input.

### 4-2. **Site Rendering**

Gatsby is much more opinionated than Next.js when it comes to rendering and encourages developers to use SSG and DSG instead of the other methods. Contrastingly, Next.js not only offers support for all the methods but also provides its own implementation of [dynamically & lazily loading components via the ‘next/dynamic’ package.](https://nextjs.org/docs/advanced-features/dynamic-import)

Gatsby, on the other hand, [relies on React’s core features and workarounds](https://www.gatsbyjs.com/docs/using-client-side-only-packages/) to work with client-side-only packages. It also [supports SSR](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/), but the implementation is not as straightforward as that of Next.js.

If your project requires mixed usage of different rendering methods, Next.js should be your go-to choice, however, if you have a simple site that can work statically, there is no framework better than Gatsby for this purpose.

> 💡 **Note:** Search Engine Optimization
> 
> 
> Gatsby is configured to use SSG and due to this, Gatsby sites perform very well in terms of SEO. However, since Next.js gives freedom to developers to easily switch from one rendering method to another, developers have to make decisions during development to ensure that all the pages are statically or server-rendered.
> 
> **Therefore, for projects with SEO as the top priority, Gatsby is a safe bet.**
> 

### 4-3. **Templates & plugins**

Gatsby has amassed a huge collection of [templates](https://www.gatsbyjs.com/starters/) and [plugins](https://www.gatsbyjs.com/plugins) that work seamlessly with the framework to support rich use cases, which otherwise wouldn’t be possible with vanilla Gatsby. These plugins and templates can be a huge time saver and if the time to market is important to you, Gatsby can help in the rapid development of your projects.

Since Next.js is very unopinionated, it neither offers any templates in particular nor supports plugins. However, since the framework is well recognized among the huge community of React developers, you are more than likely to find a starter boilerplate Next.js file for most libraries.

### 4-4. **Community**

React has a huge community that’s alive and kicking. This entices more developers to use React instead of Vue or Angular to create projects. A larger community comes with a lot of benefits, such as getting resolutions to the issues you’ll run into as you build the app, as well as more libraries and boilerplates.

Since Next.js and Gatsby use React, you can freely use any of the React libraries. However, you may have to be careful about how you render the pages using them because many of these libraries can only be used in the user’s browser, which means you cannot render these sites on the server.

Next.js has a bigger developer base than Gatsby as it has over [93k stars on GitHub](https://github.com/vercel/next.js/) compared to the [53k stars of Gatsby](https://github.com/gatsbyjs/gatsby). The [StackOverflow Survey 2022](https://survey.stackoverflow.co/2022/#most-popular-technologies-webframe) echoes the same, with Next.js chosen by 13.5% of developers compared to about 3.5% of Gatsby.

Therefore, in terms of popularity and community support, Next.js takes the lead over Gatsby.

### 4-5. Hosting

Choosing a fast, versatile yet economical cloud provider is a crucial factor in the success of your app. Gatsby and Next.js teams offer their own cloud services as well, in the form of Netlify [](https://www.gatsbyjs.com/products/cloud/)and Vercel respectively. You can launch your sites on these platforms with little to no extra configuration. They offer cutting-edge features such as previews, cloud delivery networks, continuous integration, and deployments.

**But since these frameworks can be used to produce static sites as well, you can deploy them easily to not only cloud providers but also storage buckets such as AWS S3.**

- Partner Ecosystem (2023.05)

  - Jekyll + Github Pages (Deploy)

  - Gatsby + Netlify (Deploy)

  - Next.js + Vercel (Deploy)


## 5. Use Cases

In order to pick the best one between Gatsby and Next.js, we should take the decision. Let's have a look at how these two frameworks perform in certain use cases so that you know what to use when.

#### **Case 1. Simple, Static Websites**

Gatsby is the master of the realm of simple, static websites; it’s where Gatsby is optimized. A static website basically comprises a set of individual HTML pages, each of which represents a physical web page. A good example of this kind of website is a personal blog. The same content will be visible to different visitors with no real-time update.

In such cases, between Next JS vs Gatsby, **Gatsby is the best choice** since the content stays unchanged and there is a predictable number of pages on the website. It provides a broad range of databases, REST APIs, CMS systems, and GraphQL. As Gatsby is able to separate the website and the data, anyone from your team without programming knowledge can edit the web page data and compile it during the runtime.

> 🥳 Winner : Gatsby


#### **Case 2 : Large, Multi-User Websites**

If you are planning to develop a website with numerous users creating their own accounts and commenting on the page content, going for NextJS would be the supreme decision.

Creating a static website for these needs is almost impossible during runtime as this sort of website deals with a lot of visitors joining and using it at the same time. Thus, Gatsby’s build time makes it not a very wise choice for such products.

Moreover, large websites need you to display dynamic and unique content to registered users. SSR is one of those many Next JS advantages and **[best web development stacks](https://radixweb.com/blog/top-web-development-stacks)** you should consider to address multiple users based on authentication. Users can see the appropriate content as soon as they visit the website.

> 🥳 Winner : Next.js


#### Case 3 : Hybrid Web Apps

Next JS beats Gatsby when it comes to developing **[hybrid web apps](https://radixweb.com/services/hybrid-apps-development)** where you need to handle data to the CSR as well as render the UI using SSR.

A single web app consists of both CSR for logged-in users and SSR for new visitors. You have to optimize most of the website pages for SEO, and since the content has to be dynamic and publicly accessible in such web app pages, NextJS will definitely perform better than Gatsby.

> 🥳 Winner : Next.js


In summing up, NextJS is suitable for large, high-traffic apps, while Gatsby is preferable for small-scale and static websites.

## Summary

On the surface, you may find an overlap in many of the solutions offered by both frameworks. However, before choosing any of these frameworks, **you need to keep these two factors in mind: (1) flexibility and (2) project size.**

Gatsby favors static site generation and one of the challenges that come with it is scalability. As per their [documentation](https://www.gatsbyjs.com/docs/how-to/performance/resolving-out-of-memory-issues/#disable-cache-persistence), it can struggle with memory usage when the total number of pages is over 100K. This makes Gatsby suitable for small to medium-sized applications. It offers image optimization, templates, a GraphQL data layer, and SEO-friendly pages out-of-the-box.  Moreover, the incredible plugin library offered by Gatsby can come in handy to quickly spin up projects and plug third-party services without much hassle.

Next.js, on the other hand, is less opinionated and offers many rendering options, making it ideal for larger projects. Since the framework is also flexible and robust, enterprises such as Github, Netflix, and Uber use it for their front-end apps.That doesn’t mean Next.js cannot be useful for smaller applications. One of the downsides of Gatsby, besides the limit on the number of pages, is that it is not built for frequently changing data since it favors SSG. Next.js is an excellent option if your project has constantly changing data, relies on a REST API, or requires server-side rendering. You can also generate static sites and configure the rendering method on a per-page basis for ultimate flexibility.

Changing frameworks later down the line can be challenging and tedious, therefore it is wise to test both of these frameworks before you arrive at a conclusion.

---

Reference.


[https://www.gatsbyjs.com/docs/tutorial/getting-started/](https://www.gatsbyjs.com/docs/tutorial/getting-started/)

[https://hygraph.com/blog/gatsby-vs-nextjs](https://hygraph.com/blog/gatsby-vs-nextjs)

[https://shylog.com/which-is-better-nextjs-or-gatsbyjs/](https://shylog.com/which-is-better-nextjs-or-gatsbyjs/)

[https://radixweb.com/blog/next-js-vs-gatsby](https://radixweb.com/blog/next-js-vs-gatsby)