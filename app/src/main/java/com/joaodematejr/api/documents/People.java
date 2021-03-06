package com.joaodematejr.api.documents;

import javax.persistence.Column;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class People {

	@Id
	private String id;
	private String name;
	private String sex;
	private String email;
	private String birthDate;
	private String naturalness;
	private String nationality;
	private String cpf;
	private String registrationDate;
	private String updateData; 
	
	public People() {
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@NotEmpty(message = "Aviso !!! O Campo do nome está vazio.")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	@Email(message = "Aviso !!! E-mail Invalido.")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@NotEmpty(message = "Aviso !!! O Campo de Data de Nascimento está vazia.")
	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getNaturalness() {
		return naturalness;
	}

	public void setNaturalness(String naturalness) {
		this.naturalness = naturalness;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	@NotEmpty(message = "Aviso !!! O Campo do CPF está vazio.")
	@CPF(message = "Aviso !!! CPF inválido.")
	@Column(unique=true)
	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(String registrationDate) {
		this.registrationDate = registrationDate;
	}

	public String getUpdateData() {
		return updateData;
	}

	public void setUpdateData(String updateData) {
		this.updateData = updateData;
	}
	
	
	
}
