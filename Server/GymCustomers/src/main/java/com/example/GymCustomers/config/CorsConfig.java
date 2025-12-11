package com.example.GymCustomers.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Global CORS configuration for the application.
 * Allows frontend (React) to communicate with the backend API.
 * Supports both production and preview deployments on Vercel.
 */
@Configuration
public class CorsConfig {

    @Bean
    public OncePerRequestFilter corsFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, 
                                          HttpServletResponse response, 
                                          FilterChain filterChain) throws ServletException, IOException {
                String origin = request.getHeader("Origin");
                
                // Allow localhost and all vercel.app domains
                if (origin != null && (origin.equals("http://localhost:3000") 
                        || origin.contains(".vercel.app"))) {
                    response.setHeader("Access-Control-Allow-Origin", origin);
                    response.setHeader("Access-Control-Allow-Credentials", "true");
                    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                    response.setHeader("Access-Control-Allow-Headers", "*");
                    response.setHeader("Access-Control-Max-Age", "3600");
                }
                
                // Handle preflight requests
                if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    return;
                }
                
                filterChain.doFilter(request, response);
            }
        };
    }
}
