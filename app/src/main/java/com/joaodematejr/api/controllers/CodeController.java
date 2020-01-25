package com.joaodematejr.api.controllers;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@EnableWebSecurity
@Configuration
@RequestMapping(path = "/api/")
public class CodeController {
	
	@RequestMapping(value = "sourcecode")
	  public String sourceCode() {
	    return "Link do Repositorio: https://github.com/joaodematejr/project_java";
	  }

}
