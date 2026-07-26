package com.codebreaker.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // 👈 Disable CSRF for REST APIs
            .cors(cors -> {})             // 👈 Enable CORS processing in Spring Security
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // 👈 Allow public access to all game endpoints
            );
        return http.build();
    }
}