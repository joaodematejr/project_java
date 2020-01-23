package com.joaodematejr.api.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joaodematejr.api.documents.People;
import com.joaodematejr.api.repositories.PeopleRepository;
import com.joaodematejr.api.services.PeopleService;

@Service
public class PeopleServiceImpl implements PeopleService {
	
	@Autowired
	private PeopleRepository peopleRepository;

	@Override
	public List<People> listAll() {
		// TODO Auto-generated method stub
		return this.peopleRepository.findAll();
	}

	@Override
	public People listById(String id) {
		// TODO Auto-generated method stub
		return this.peopleRepository.findOne(id);
	}

	@Override
	public People register(People people) {
		// TODO Auto-generated method stub
		return this.peopleRepository.save(people);
	}

	@Override
	public People update(People people) {
		// TODO Auto-generated method stub
		return this.peopleRepository.save(people);
	}

	@Override
	public void remove(String id) {
		this.peopleRepository.delete(id);

	}

}
