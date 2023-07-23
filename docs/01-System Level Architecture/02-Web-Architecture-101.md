# Web Architecture 101

![https://miro.medium.com/v2/resize:fit:1330/format:webp/1*K6M-x-6e39jMq_c-2xqZIQ.png](https://miro.medium.com/v2/resize:fit:1330/format:webp/1*K6M-x-6e39jMq_c-2xqZIQ.png)

## 1. DNS

DNS stands for “Domain Name System” and it’s a backbone technology that makes the world wide web possible. At the most basic level DNS provides a key/value lookup from a domain name (e.g., google.com) to an IP address (e.g., 85.129.83.120), which is required in order for your computer to route a request to the appropriate server.

## 2. Load Balancer

They’re the magic sauce that **makes scaling horizontally possible.** They route incoming requests to one of many application servers (that are typically clones / mirror images of each other) and send the response from the app server back to the client. Any one of them should process the request the same way so it’s just a matter of distributing the requests across the set of servers so none of them are overloaded.

- Horizontal vs. Vertical application scaling
    - Horizontal scaling means that you scale by adding more machines into your pool of resources whereas “vertical” scaling means that you scale by adding more power (e.g., CPU, RAM) to an existing machine.
    - In web development, you (almost) always want to scale horizontally because, to keep it simple, stuff breaks. Servers crash randomly. Networks degrade. Entire data centers occasionally go offline. Having more than one server allows you to plan for outages so that your application continues running. Also, It would be challenging to provide that entire compute power via vertical scaling.

## 3. Web Application Servers

Web application servers execute the core business logic that **handles a user’s request and sends back HTML to the user’s browser.** To do their job, they typically communicate with a variety of backend infrastructure such as databases, caching layers, job queues, search services, other microservices, data/logging queues, and more. 

As mentioned above, you typically have at least two and often times many more, plugged into a load balancer in order to process user requests.

You should know that app server implementations require choosing a specific language (Node.js, Ruby, PHP, Scala, Java, C# .NET, etc.) and a web MVC framework for that language (Express for Node.js, Ruby on Rails, Play for Scala, Laravel for PHP, etc.).

## 4. Database Servers

Every modern web application leverages one or more databases to store information. 

Databases provide ways of defining your data structures, inserting new data, finding existing data, updating or deleting existing data, performing computations across the data, and more. In most cases the web app servers communicate directly to one database server. 

Additionally, each backend service may have it’s own database that’s isolated from the rest of the application.

## 5. Caching Service

A caching service provides **a simple key/value data store that makes it possible to save and lookup information in close to O(1) time**. Applications typically leverage caching services to save the results of expensive computations so that it’s possible to retrieve the results from the cache instead of recomputing them the next time they’re needed. An application might cache results from a database query, calls to external services, HTML for a given URL, and many more.

The two most widespread caching server technologies are Redis and Memcache.

## 6. Job Queue & Servers

Most web applications need to do some work asynchronously behind the scenes that’s not directly associated with responding to a user’s request. For instance, Google needs to crawl and index the entire internet in order to return search results. It does not do this every time you search. Instead, it crawls the web asynchronously, updating the search indexes along the way.

While there are different architectures that **enable asynchronous work to be done**, the most ubiquitous is what I’ll call the “job queue” architecture. It consists of two components: a queue of “jobs” that need to be run and one or more job servers (often called “workers”) that run the jobs in the queue.

Job queues store a list of jobs that need to be run asynchronously. The simplest are **first-in-first-out (FIFO) queues** though most applications end up needing some sort of **priority queuing** system. Whenever the app needs a job to be run, either on some sort of regular schedule or as determined by user actions, it simply adds the appropriate job to the queue.

Storyblocks, for instance, leverages a job queue to power a lot of the behind-the-scenes work required to support our marketplaces. We run jobs to encode videos and photos, process CSVs for metadata tagging, aggregate user statistics, send password reset emails, and more. We started with a simple FIFO queue though we upgraded to a priority queue to ensure that time-sensitive operations like sending password reset emails were completed ASAP.

## 7. Full-text Search Service

Most web apps support some sort of search feature where a user provides a text input (often called a “query”) and the app returns the most “relevant” results. 

The technology powering this functionality is typically referred to as “[full-text search](https://en.wikipedia.org/wiki/Full-text_search)”, which leverages an [inverted index](https://en.wikipedia.org/wiki/Inverted_index) to quickly look up documents that contain the query keywords.

![https://miro.medium.com/v2/resize:fit:1122/format:webp/1*gun_BpdDH9KrNna1NnaocA.png](https://miro.medium.com/v2/resize:fit:1122/format:webp/1*gun_BpdDH9KrNna1NnaocA.png)

While it’s possible to do full-text search directly from some databases (e.g., [MySQL supports full-text search](https://dev.mysql.com/doc/refman/5.7/en/fulltext-search.html)), **it’s typical to run a separate “search service”** that computes and stores the `inverted index` and provides a query interface. 

The most popular full-text search platform today is [Elasticsearch](https://www.elastic.co/products/elasticsearch) though there are other options such as [Sphinx](http://sphinxsearch.com/) or [Apache Solr](http://lucene.apache.org/solr/features.html).

## 8. Services

Once an app reaches a certain scale, there will likely be certain “services” that are carved out to run as separate applications. **They’re not exposed to the external world but the app and other services interact with them.** 

Storyblocks, for example, has several operational and planned services:

- **Account service** stores user data across all our sites, which allows us to easily offer cross-sell opportunities and create a more unified user experience
- **Content service** stores metadata for all of our video, audio, and image content. It also provides interfaces for downloading the content and viewing download history.
- **Payment service** provides an interface for billing customer credit cards.
- **HTML → PDF service** provides a simple interface that accepts HTML and returns a corresponding PDF document.

## 9. Data

Almost every app these days, once it reaches a certain scale, leverages a data pipeline to ensure that data can be collected, stored, and analyzed. A typical pipeline has three main stages:

1. **Data firehose** : The app sends data, typically events about user interactions, to the data “**firehose**” which provides a streaming interface to ingest and process the data. Often times the raw data is transformed or augmented and passed to another firehose. AWS Kinesis and Kafka are the two most common technologies for this purpose.
2. **Cloud storage** : The raw data as well as the final transformed/augmented data are saved to **cloud storage**. AWS Kinesis provides a setting called “firehose” that makes saving the raw data to it’s cloud storage (S3) extremely easy to configure.
3. **Data warehouse (for analysis) ** : The transformed/augmented data is often loaded into a **data warehouse** for analysis. We use AWS Redshift, as does a large and growing portion of the startup world, though larger companies will often use Oracle or other proprietary warehouse technologies. If the data sets are large enough, a Hadoop-like NoSQL MapReduce technology may be required for analysis.

Another step that’s not pictured in the architecture diagram: loading data from the app and services’ operational databases into the data warehouse. 

For example at Storyblocks we load our VideoBlocks, AudioBlocks, Storyblocks, account service, and contributor portal databases into Redshift every night. This provides our analysts a holistic dataset by co-locating the core business data alongside our user interaction event data.

## 10. Cloud storage

“Cloud storage is a simple and scalable way to store, access, and share data over the Internet” [according to AWS](https://aws.amazon.com/what-is-cloud-storage/). You can use it to store and access more or less anything you’d store on a local file system with the benefits of being able to interact with it via a RESTful API over HTTP.

## 11. CDN

In general, a web app should always use a CDN to serve CSS, Javascript, images, videos and any other assets.

CDN stands for “Content Delivery Network” and the technology provides a way of **serving assets such as static HTML, CSS, Javascript, and images over the web much faster than serving them from a single origin server.** It works by distributing the content across many “edge” servers around the world so that users end up downloading assets from the “edge” servers instead of the origin server. 

![https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZkC_5865Hx-Cgph3iPJghw.png](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZkC_5865Hx-Cgph3iPJghw.png)

For instance in the image above, a user in Spain requests a web page from a site with origin servers in NYC, but the static assets for the page are loaded from a CDN “edge” server in England, preventing many slow cross-Atlantic HTTP requests.



---

## 🥞 Scenario

1. A user searches on Google for “Strong Beautiful Fog And Sunbeams In The Forest”. The [first result](https://www.graphicstock.com/stock-image/strong-beautiful-fog-and-sunbeams-in-the-forest-246703) happens to be from Storyblocks, our leading stock photo and vectors site. The user clicks the result which redirects their browser to the image details page. Underneath the hood the user’s browser sends a request to a **DNS server** to lookup how to contact Storyblocks, and then sends the request.
2. The request hits our **load balancer,** which randomly chooses one of the 10 or so web servers we have running the site at the time to process the request. 
3. The web server looks up some information about the image from our **caching service** and fetches the remaining data about it from the database. 
4. We notice that the color profile for the image has not been computed yet, so we send a “color profile” job to our **job queue**, which our job servers will process **asynchronously**, updating the database appropriately with the results.
5. Next, we attempt to find similar photos by sending a request to our **full text search service** using the title of the photo as input. 
6. The user happens to be a logged into Storyblocks as a member so we look up his account information from our **account service**. 
7. Finally, we fire off a page view event to our **data firehose** to be recorded on our cloud storage system and eventually loaded into our **data warehouse**, which analysts use to help answer questions about the business.
8. The server now renders the view as HTML and sends it back to the user’s browser, passing first through the **load balancer**. The page contains Javascript and CSS assets that we load into our **cloud storage system**, which is connected to our **CDN**, so the user’s browser contacts the CDN to retrieve the content. Lastly, the browser visibly renders the page for the user to see.


---

Reference.
https://medium.com/storyblocks-engineering/web-architecture-101-a3224e126947
