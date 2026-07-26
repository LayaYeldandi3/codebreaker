package com.codebreaker.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) // Integrates with WebConfig CORS
            .csrf(csrf -> csrf.disable())      // Disables CSRF for REST endpoints
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Allows all requests without login

        return http.build();
    }
}