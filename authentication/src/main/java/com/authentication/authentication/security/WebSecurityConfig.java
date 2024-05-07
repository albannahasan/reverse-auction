package com.authentication.authentication.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;

import com.authentication.authentication.security.manager.CustomAuthenticationManager;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    private CustomAuthenticationManager customAuthenticationManager;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(customAuthenticationManager, null);
        http.
            authorizeHttpRequests((requests) -> requests.requestMatchers("/register").permitAll()
            .anyRequest().authenticated()
            )
    }
}
