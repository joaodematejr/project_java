package com.joaodematejr.api.services;

import java.util.List;

import com.joaodematejr.api.documents.People;

public interface PeopleService {
	
	//LISTAGEM GERAL
	List<People> listAll();
	
	//LISTAR POR ID
	People listById(String id);
	
	//CADASTRAR
	People register(People people);
	
	//ATUALIZAR
	People update(People people);
	
	//REMOVER
	void remove(String id);
	

}
