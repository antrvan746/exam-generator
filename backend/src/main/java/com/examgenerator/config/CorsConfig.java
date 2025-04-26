package com.examgenerator.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow frontend domain
        config.addAllowedOrigin("http://localhost:3000"); // React default port
        // Add your production domain when ready
        // config.addAllowedOrigin("https://your-production-domain.com");

        // Allow credentials (cookies)
        config.setAllowCredentials(true);

        // Allow necessary headers
        config.addAllowedHeader("*");

        // Allow necessary methods
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");

        // Expose necessary headers
        config.addExposedHeader("Set-Cookie");
        config.addExposedHeader("Authorization");

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}