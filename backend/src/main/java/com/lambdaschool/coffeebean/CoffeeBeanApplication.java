package com.lambdaschool.coffeebean;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CoffeeBeanApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoffeeBeanApplication.class, args);
    }

    // Trying Cors
    // @Bean
    // public WebMvcConfigurer corsConfigurer() {
    // return new WebMvcConfigurerAdapter() {
    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    // registry
    // .addMapping("/**")
    // .allowedOrigins("*");
    // }
    // };
    // }

}
