package com.lambdaschool.coffeebean.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
    // testing signup url
    public static final String SIGN_UP_URL = "/signup";
    public static final String SHOP_URL = "/shop";

    @Resource(name = "userService")
    private UserDetailsService userDetailsService;

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception
    {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void globalUserDetails(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(encoder());
    }

    // Original with no access without token and no bcrypt
//    @Override
//    protected void configure(HttpSecurity http) throws Exception
//    {
//        http
//                .csrf().disable()
//                .anonymous().disable()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS).permitAll()
//                .antMatchers("/api-docs/**").permitAll()
//                ;
//    }

    // access with token but no bcrypt
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
//                .antMatchers(HttpMethod.GET, SHOP_URL).permitAll()
//                // What do the below 2 do?
//                .antMatchers(HttpMethod.OPTIONS).permitAll()
//                .antMatchers("/api-docs/**").permitAll()
//                .anyRequest().authenticated();
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http
                .authorizeRequests()
                .antMatchers("/swagger-ui.html").permitAll()
                .antMatchers("/api-docs/**").permitAll()
                .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
                .antMatchers(HttpMethod.GET, SHOP_URL).permitAll();
        http.csrf().disable();
        http.headers().frameOptions().disable();
    }

    @Bean
    public TokenStore tokenStore()
    {
        return new InMemoryTokenStore();
    }

    // no bcrypt
//    @Bean
//    public NoOpPasswordEncoder encoder()
//    {
//        return new NoOpPasswordEncoder();
//    }

    @Bean
    public PasswordEncoder encoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public FilterRegistrationBean corsFilter2()
    {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}