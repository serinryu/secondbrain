# Spring Security 

## Where does Spring Security work?

![https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-27-at-17.36.49.png](https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-27-at-17.36.49.png)

Spring Security comes into action here by adding filter classes before HTTP request hit the DispatcherServlet. This means any incoming request will visit these filter classes one by one. This way, I can check Authentication and Authorization states before the request hit DispatcherServlet and then controllers.

DispatcherServlet is a servlet delegates all these HTTP requests to your controller classes where you define your endpoints. This means if you protect DispatcherServlet, you protect your application.

## ⛓️Spring Security Filter Chain Order

Here you can see default order of filters in Spring Security. [The official Spring Security documentation](https://docs.spring.io/spring-security/site/docs/3.0.x/reference/security-filter-chain.html) recommends to use these filters in this order.

![https://backendstory.com/content/images/2022/01/Screenshot-2022-01-27-at-18.34.46.png](https://backendstory.com/content/images/2022/01/Screenshot-2022-01-27-at-18.34.46.png)

For instance, we will add our custom authentication filter(ex. JwtAuthenticationFilter) just before `UsernamePasswordAuthenticationFilter`, because authentication mechanism starts from that filter.

- [BasicAuthenticationFilter](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/basic.html): 
   - How does HTTP Basic Authentication work within Spring Security? 
   - As it says in the name, this filter tries to find **basic authentication** header and authenticate the user by calling authentication manager.
   - When the user submits their username and password, the `BasicAuthenticationFilter` creates a **UsernamePasswordAuthenticationToken**, which is a type of Authentication.
    
- [UsernamePasswordAuthenticationFilter](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html): 
   - How does form based authentication(username and password being provided through an HTML form) work within Spring Security?
   - This filter tries to find username and password from a request body, which HTTP method's is POST. This is a default filter designed for the default form login. It tries to authenticate by calling authentication manager.
   - When the user submits their username and password, the `UsernamePasswordAuthenticationFilter` creates a **UsernamePasswordAuthenticationToken**, which is a type of Authentication.

- AuthorizationFilter: 
  - Basically, this filter controls authorization in the application

## 👷‍♀️**Authentication Architecture**

![https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-25-at-19.51.48.png](https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-25-at-19.51.48.png)

---

![https://drek4537l1klr.cloudfront.net/spilca/Figures/CH05_F01_Spilca.png](https://drek4537l1klr.cloudfront.net/spilca/Figures/CH05_F01_Spilca.png)

---

![https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kdfpQR9jkiYbHID9kOfzIQ.jpeg](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*kdfpQR9jkiYbHID9kOfzIQ.jpeg)

---

![https://chathurangat.files.wordpress.com/2017/08/blogpost-spring-security-architecture.png](https://chathurangat.files.wordpress.com/2017/08/blogpost-spring-security-architecture.png)

When we have an authentication request, it goes to Spring Security Filter Chain. It visits all the filters one by one and finally hit the authentication filter. Authentication filter then calls Authentication Manager. Authentication Manager's responsibility is going through all these providers and try to get at least one success to authenticate the user. Authentication Provider fetches user by communicating with User Details service and returns success state if the user exists with given credentials. Otherwise, Authentication Provider is supposed to throw an exception. By this, Spring Security knows this specific Authentication Provider failed to find the user.

### Default classes for Spring Security Authentication flow

![https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-25-at-20.35.14.png](https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-25-at-20.35.14.png)

The new authentication request goes to Spring Security Filter Chain and get caught by `UsernamePasswordAuthenticationFilter`. This is a default filter designed for the default form login.

`UsernamePasswordAuthenticationFilter` will extract username and password from the authentication request and send them to Authentication Manager. 

Authentication Manager then send these username and password to `DaoAuthenticationProvider`, which is default provider. And this provider will go to `InMemoryUserDetailsManager`, which is default user details service, and check if user exists with given credentials.

![https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-25-at-19.34.56.png](https://backendstory.com/content/images/size/w1600/2022/01/Screenshot-2022-01-25-at-19.34.56.png)



## Scenario 1. Setting up **custom Filter, custom User Details Service**

So far we used default classes for securing our application. It is time to set our custom beans and prepare better application for production level. 

Let’s make JWT based authentication.

![https://backendstory.com/content/images/size/w1600/2022/02/5.-Scenario-3.1---Custom-Filter-and-UserDetailsService-1.png](https://backendstory.com/content/images/size/w1600/2022/02/5.-Scenario-3.1---Custom-Filter-and-UserDetailsService-1.png)

This new endpoint will send username and password to Authentication Manager by wrapping them with `UsernamePasswordAuthenticationToken` object.

When Authentication Manager does not throw an exception, it means that authentication is successful, so endpoint will return a new generated JWT token to the user. Thus, the user can make API calls other endpoints by using the token.

According to this controller, we are sending username and password directly to Authentication Manager. We know that Authentication Manager will call available Authentication Provider. In our scenario, we will not create a custom provider. It means Spring Security will pick up default provider, which is `DaoAuthenticationProvider`.

```jsx
/*
* This is Spring Security configuration step
*/
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    // Custom filter
    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    // Custom UserDetailsService
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public void configurePasswordEncoder(AuthenticationManagerBuilder builder) throws Exception {
        // adding custom UserDetailsService and encryption bean to Authentication Manager
        builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public AuthenticationManager getAuthenticationManager() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // disabling csrf since we won't use form login
                .csrf().disable()

                // giving every permission to every request for /login endpoint
                .authorizeRequests().antMatchers("/login").permitAll()
                // for everything else, the user has to be authenticated
                .anyRequest().authenticated()
                // setting stateless session, because we choose to implement Rest API
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // adding the custom filter before UsernamePasswordAuthenticationFilter in the filter chain
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

## Scenario 2. Adding up **custom Authentication Provider implementation**

If you are developing an enterprise application, sooner or later you will need to add custom authentication methods.  For instance, your main authentication method might be JWT token based. However, your company might want to support for another authentication flow. Then, you are supposed to extend the existing functionality. Before jumping to multiple authentication provider implementation, we need to understand implementing one custom authentication provider.

![https://backendstory.com/content/images/size/w1600/2022/02/6.-Scenario-4.1---Custom-AuthenticationProvider-1.png](https://backendstory.com/content/images/size/w1600/2022/02/6.-Scenario-4.1---Custom-AuthenticationProvider-1.png)

As you can see below, I am implementing JWT authentication provider by implementing AuthenticationProvider interface coming from Spring Security.

```jsx
@Component
class JwtAuthenticationProvider implements AuthenticationProvider {
    // Injecting available encryption bean
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Injecting our custom UserDetailsService implementation
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // In BasicController.login() method, we call authenticationManager.authenticate(token)
        // Then, Authentication Manager calls AuthenticationProvider's authenticate method.
        // Since JwtAuthenticationProvider is our custom authentication provider,
        // this method will be executed.
        String username = authentication.getName();
        String password = String.valueOf(authentication.getCredentials());

        // Fetching user as wrapped with UserDetails object
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // If user is not null, then we check if password matches
        if (userDetails != null){
            if (passwordEncoder.matches(password, userDetails.getPassword())){
                // if it matches, then we can initialize UsernamePasswordAuthenticationToken.
                // Attention! We used its 3 parameters constructor.
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
                return authenticationToken;
            }
        }
        throw new BadCredentialsException("Error!!");
    }

    // Authentication Manager checks if the token is supported by this filter
    // to avoid unnecessary checks.
    @Override
    public boolean supports(Class<?> authenticationType) {
        return UsernamePasswordAuthenticationToken.class.equals(authenticationType);
    }
}
```

Let's update configuration class as well. We add another authentication provider.

```jsx
/*
* This is Spring Security configuration step
*/
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

//    @Autowired
//    private UserDetailsService userDetailsService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Autowired
    JwtAuthenticationProvider customAuthenticationProvider;

    // we are not using default authentication provider,
    // so we do not need to set these here.
    // we set these things in the our custom authentication provider.
//    @Autowired
//    public void configurePasswordEncoder(AuthenticationManagerBuilder builder) throws Exception {
//        builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
//    }

    @Bean
    public AuthenticationManager getAuthenticationManager() throws Exception {
        return super.authenticationManagerBean();
    }

    // adding our custom authentication provider
    // authentication manager will call this customer provider's
    // authenticate method from now on.
    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(customAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // disabling csrf since we won't use form login
                .csrf().disable()

                // giving every permission to every request for /login endpoint
                .authorizeRequests().antMatchers("/login").permitAll()
                // for everything else, the user has to be authenticated
                .anyRequest().authenticated()
                // setting stateless session, because we choose to implement Rest API
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // adding the custom filter before UsernamePasswordAuthenticationFilter in the filter chain
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

## Scenario 3. Adding up multiple custom Authentication Providers implementations

Now, we know how to add custom authentication providers. Then, we can jump to a scenario that force us to implement multiple custom authentication providers.

Let's say our company decided to add Google Cloud as an authentication provider. We have a user database, yes. But new users will go to Google Cloud database and we need to check if a user either exists in our database or Google Cloud database. We have a very short deadline, so we can not move all the users to Google Cloud database. :)

![https://backendstory.com/content/images/size/w1600/2022/02/7.-Scenario-5.1---Multiple-Custom-AuthenticationProvider-1.png](https://backendstory.com/content/images/size/w1600/2022/02/7.-Scenario-5.1---Multiple-Custom-AuthenticationProvider-1.png)

Let's add imaginary Google Cloud Authentication Provider.

```jsx
@Component
class GoogleCloudAuthenticationProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = String.valueOf(authentication.getCredentials());

        // We fetch user from Google API "in theory"
        User user = getUserFromGoogleCloud(username, password);
        if (user != null) {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, password, user.getAuthorities());
            return authenticationToken;
        }
        throw new BadCredentialsException("Error!!");
    }

    // Let's assume Google API will return the user in this method.
    private User getUserFromGoogleCloud(String username, String password) {
        Map<String, String> users = new HashMap<>();
        users.put("martin", "123");
        if (users.get(username) != null){
            return new User(username, password, Collections.emptyList());
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> authenticationType) {
        return UsernamePasswordAuthenticationToken.class.equals(authenticationType);
    }

}
```

Let's update configuration class as well. We add another authentication provider the same way we did before.

```jsx
/*
* This is Spring Security configuration step
*/
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    // Injecting JWT custom authentication provider
    @Autowired
    JwtAuthenticationProvider customAuthenticationProvider;

    // Injecting Google custom authentication provider
    @Autowired
    GoogleCloudAuthenticationProvider googleCloudAuthenticationProvider;

    @Bean
    public AuthenticationManager getAuthenticationManager() throws Exception {
        return super.authenticationManagerBean();
    }

    // adding our custom authentication providers
    // authentication manager will call these custom provider's
    // authenticate methods from now on.
    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(customAuthenticationProvider)
                .authenticationProvider(googleCloudAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // disabling csrf since we won't use form login
                .csrf().disable()

                // giving every permission to every request for /login endpoint
                .authorizeRequests().antMatchers("/login").permitAll()
                // for everything else, the user has to be authenticated
                .anyRequest().authenticated()
                // setting stateless session, because we choose to implement Rest API
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // adding the custom filter before UsernamePasswordAuthenticationFilter in the filter chain
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
```

---

Reference.

[https://backendstory.com/spring-security-authentication-architecture-explained-in-depth/](https://backendstory.com/spring-security-authentication-architecture-explained-in-depth/)

[https://kasunprageethdissanayake.medium.com/spring-security-the-security-filter-chain-2e399a1cb8e3](https://kasunprageethdissanayake.medium.com/spring-security-the-security-filter-chain-2e399a1cb8e3)

[https://livebook.manning.com/book/spring-security-in-action/chapter-5/13](https://livebook.manning.com/book/spring-security-in-action/chapter-5/13)