# [API Security] API Authentication

When you are building API Server, you should consider that access to API should be controlled. There are some common ways to authenticate your API as a way to protect your routes from users that shouldn't access them. 🚫

## Authorization VS Authentication

To securely access an API service, a client must go through a two-step process:

- *Authorization*: The resource owner grants the client access to the API service, usually in the form of **a API key or a API token.** ⇒ Refers to proving correct identity.
- *Authentication*: The client passes the key or the token to the API service, which verifies its validity and responds accordingly. ⇒ Refers to allowing a certain action.

If helpful, think of authorization as government issuing your ID card and authentication as airport security verifying your ID card.

Authorization and authentication are two separate processes. Government cares very little about where and how you use your ID card (well, terms and conditions may apply); the document single-handedly proves your identity (and your level of access). On the other hand, airport has no idea where and how you acquire your ID card; officers will let you through as long as your ID card is valid and/or registered in the system. In a similar manner, API services cares little about authorization process; its sole responsibility is to authenticate clients, certifying that they have the clearance to access the resources via the API service.

![https://s3.us-west-1.wasabisys.com/idbwmedia.com/images/api/nonref_authentication.svg](https://s3.us-west-1.wasabisys.com/idbwmedia.com/images/api/nonref_authentication.svg)

## Consequences if an API lacks security

Why do APIs even need authentication? **For read-only APIs, sometimes users don’t need keys.** But most commercial APIs do require authorization in the form of API keys or other methods. If you *didn’t* have any security with your API, users could make unlimited amounts of API calls without any kind of registration. Allowing unrestricted requests would make a revenue model for your API difficult.

Additionally, without authentication, there wouldn’t be an easy way to associate requests with specific user data. And there wouldn’t be a way to protect against requests from malicious users that might delete another user’s data (such as by making DELETE requests on another’s account). Finally, you couldn’t track who is using your API, or what endpoints are most used.

Overall, authentication and authorization with APIs serves the following purposes:

- Authenticate calls to the API to registered users only
- Track who is making the requests
- Track usage of the API
- Block or throttle any requester who exceeds the [rate limits](https://idratherbewriting.com/learnapidoc/docapis_rate_limiting_and_thresholds.html)
- Apply **different permission levels to different users** (for example, free versus pro tiers) → Determine how many requests you can make or the types of information you can access

Therefore, in most cases, you should never build an API service without setting up authorization and authentication flows.  

## **🔑API Authentication method**

API authentication is a critical aspect of securing APIs, and both API keys and API tokens offer ways to accomplish this. API keys are straightforward and provide basic access control, while API tokens offer enhanced security and fine-grained access permissions. Consider your specific requirements, security needs, and integration complexity when choosing between these two methods. Ultimately, the right authentication approach depends on the nature of your API and the level of control and security you desire.

👉 **Choosing the right authentication method for your API use case!**

### 1. API Keys

Most APIs require you to sign up for an API key in order to use the API. The API key is a long string that you usually include either in the request URL or request header. The API key mainly functions as a way to identify the person making the API call (authenticating you to use the API). The API key might also be associated with a specific app that you register.

APIs might give you both a public and private key. The public key is usually included in the request, while the private key is treated more like a password and used only in server-to-server communication.

![https://s3.us-west-1.wasabisys.com/idbwmedia.com/images/api/nonref-docs-preso_apikey.svg](https://s3.us-west-1.wasabisys.com/idbwmedia.com/images/api/nonref-docs-preso_apikey.svg)

Here are some key features of API keys:

1. Simplicity: API keys are relatively simple to implement and use, making them a popular choice for many APIs. They are often provided as a long string of characters.
2. Security: While API keys provide a level of security by acting as a form of authentication, they are susceptible to theft or unauthorized use if not handled carefully. Developers should treat API keys as sensitive information and employ secure practices, such as storing them securely and transmitting them over encrypted connections (HTTPS).
3. Limited access control: API keys usually provide all-or-nothing access to the API resources. They are not granular in terms of access permissions, meaning that once a client has an API key, they can access all the resources associated with that key.

### 2. API Tokens

API tokens, also known as access tokens, are similar to API keys in that they authenticate API requests. However, tokens typically **carry additional information and offer more flexibility.** 

![https://cdn.ttgtmedia.com/rms/onlineimages/general_token_usage_process-f.png](https://cdn.ttgtmedia.com/rms/onlineimages/general_token_usage_process-f.png)

![https://developer.okta.com/assets-jekyll/blog/node-token-auth/token-authentication-flow-69804c12334715c597128cd9273bca5e32ed516b62987902310efc54d1840a40.png](https://developer.okta.com/assets-jekyll/blog/node-token-auth/token-authentication-flow-69804c12334715c597128cd9273bca5e32ed516b62987902310efc54d1840a40.png)

Let's delve into the characteristics of API tokens:

1. Enhanced security: API tokens are often generated with more sophisticated encryption algorithms and can be designed to have a limited lifespan. This enhances security by reducing the window of opportunity for malicious actors to abuse stolen tokens.
2. Granular access control: Access tokens not only provide authentication for the requester but also define the permissions of how the user can use the API (ex. free vs paid). Additionally, access tokens usually expire after a period of time and require the user to log in again.
3. OAuth 2.0: API tokens are frequently used in conjunction with OAuth 2.0, a widely adopted authorization framework for securing APIs. OAuth enables delegated access, where a client can obtain a token from ***an authorization server*** and use it to access protected resources on behalf of the end user.
    
    1) First, the consumer application sends over an application key and secret to a login page at the ***authentication server***. If authenticated, the authentication server responds to the user with an access token.
    
    2) The access token is packaged into a query parameter in a response redirect (302) to the request. The redirect points the user’s request back to the ***resource server (the API server).***
    
    3) The user then makes a request to the ***resource server (API server)***. The access token gets added to the header of the API request with the word `Bearer` followed by the token string. The API server checks the access token in the user’s request and decides whether to authenticate the user.
    

![https://s3.us-west-1.wasabisys.com/idbwmedia.com/images/api/restapi_oauth.svg](https://s3.us-west-1.wasabisys.com/idbwmedia.com/images/api/restapi_oauth.svg)



---
Reference.

[https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express](https://developer.okta.com/blog/2019/02/14/modern-token-authentication-in-node-with-express)

[https://idratherbewriting.com/learnapidoc/docapis_more_about_authorization.html](https://idratherbewriting.com/learnapidoc/docapis_more_about_authorization.html)

[https://backend-intro.vlpt.us/4/](https://backend-intro.vlpt.us/4/)

[https://bcho.tistory.com/955](https://bcho.tistory.com/955)

[https://dongwooklee96.github.io/post/2021/03/28/rest-api-보안-및-인증-방식.html](https://dongwooklee96.github.io/post/2021/03/28/rest-api-%EB%B3%B4%EC%95%88-%EB%B0%8F-%EC%9D%B8%EC%A6%9D-%EB%B0%A9%EC%8B%9D.html)

[https://cloud.google.com/blog/products/api-management/5-ways-to-implement-rest-api-authentication](https://cloud.google.com/blog/products/api-management/5-ways-to-implement-rest-api-authentication)

[https://cornswrold.tistory.com/290](https://cornswrold.tistory.com/290)

[https://www.daleseo.com/js-passport-bearer/](https://www.daleseo.com/js-passport-bearer/)

[https://medium.com/@ratrosy/authorization-and-authentication-in-api-services-9b4db295a35b](https://medium.com/@ratrosy/authorization-and-authentication-in-api-services-9b4db295a35b)