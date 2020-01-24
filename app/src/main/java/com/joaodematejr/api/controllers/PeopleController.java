package com.joaodematejr.api.controllers;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joaodematejr.api.documents.People;
import com.joaodematejr.api.responses.Response;
import com.joaodematejr.api.services.PeopleService;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping(path = "/api/people")
public class PeopleController {

	@Autowired
	private PeopleService peopleService;

	// LISTAR TODOS
	@GetMapping
	public ResponseEntity<Response<List<People>>> listAll() {
		return ResponseEntity.ok(new Response<List<People>>(this.peopleService.listAll()));
	}

	// LISTAR POR ID
	@GetMapping(path = "/{id}")
	public ResponseEntity<Response<People>> listById(@PathVariable(name = "id") String id) {
		return ResponseEntity.ok(new Response<People>(this.peopleService.listById(id)));
	}

	// CADASTRAR
	@PostMapping
	public ResponseEntity<Response<People>> register(@Valid @RequestBody People people, BindingResult result) {
		if (result.hasErrors()) {
			List<String> errs = new ArrayList<String>();
			result.getAllErrors().forEach(err -> errs.add(err.getDefaultMessage()));
			return ResponseEntity.badRequest().body(new Response<People>(errs));
		}
		people.setRegistrationDate(Calendar.getInstance());
		return ResponseEntity.ok(new Response<People>(this.peopleService.register(people)));

	}

	// ATUALIZAR
	@PutMapping(path = "/{id}")
	public ResponseEntity<Response<People>> update(@PathVariable(name = "id") String id,
			@Valid @RequestBody People people, BindingResult result) {
		if (result.hasErrors()) {
			List<String> errs = new ArrayList<String>();
			result.getAllErrors().forEach(err -> errs.add(err.getDefaultMessage()));
			return ResponseEntity.badRequest().body(new Response<People>(errs));
		}
		people.setId(id);

		people.setUpdateData(Calendar.getInstance());
		people.setRegistrationDate(people.getRegistrationDate());
		return ResponseEntity.ok(new Response<People>(this.peopleService.update(people)));

	}

	// REMOVER
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<Response<Integer>> remove(@PathVariable(name = "id") String id) {
		this.peopleService.remove(id);
		return ResponseEntity.ok(new Response<Integer>(1));
	}

}
