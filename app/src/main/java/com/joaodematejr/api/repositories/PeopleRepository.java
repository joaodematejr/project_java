package com.joaodematejr.api.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.joaodematejr.api.documents.People;

public interface PeopleRepository extends MongoRepository<People, String> {

}
