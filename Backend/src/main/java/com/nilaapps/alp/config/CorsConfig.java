package com.nilaapps.alp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Value("${frontend.url}")
	private String frontendUrl;

	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}

	public void addCorsMapping(CorsRegistry registry) {
		registry.addMapping("/api/**").allowedOrigins(frontendUrl)
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowedHeaders("*").allowCredentials(true);
	}
}
