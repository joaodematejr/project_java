# DESAFIO TÉCNICO

# API RESTful
API RESTful com Spring Boot, Java 8, MongoDB, Spring Security e React no Frontend

### Como executar a aplicação
Certifique-se de ter o Maven instalado e adicionado ao PATH de seu sistema operacional, assim como o Git.
```
git clone https://github.com/joaodematejr/project_java
cd project_java
mvn spring-boot:run
Acesse http://localhost:8080/api/people
Utilize o usuário "admin" e a senha "admin" para autenticar.
```
### APIs Endpoints
GET http://localhost:8080/api/people [Lista todas as pessoas cadastrada no banco]  
GET http://localhost:8080/api/people/{id} [Lista uma pessoa por ID]  
POST http://localhost:8080/api/people [Cadastra uma nova pessoa]  
PUT http://localhost:8080/api/people/{id} [Atualizar os dados de uma pessoa]  
DELETE http://localhost:8080/api/people/{id} [remove uma pessoa por ID]  

Exemplo de corpo para realização da requisição post da funcionalidade cadastrar

```
{
  "name": "João Dematé",
  "sex": "string",
  "email": "joaodematejr@gmail.com",
  "birthDate": "01/01/1993",
  "naturalness": "string",
  "nationality": "string",
  "cpf": "string",
  "registrationDate": "01/01/2020",
  "updateData": "01/20/2020",
}
```

GET http://localhost:8080/source [Retorna link do repositorio no github] [não precisa de autenticação] 

### Importando o projeto no Eclipse ou STS
No terminal, execute a seguinte operação:
```
mvn eclipse:eclipse
```
No Eclipse/STS, importe o projeto como projeto Maven.

### Como executar frontend
Certifique-se de ter o Node instalado em seu sistema operacional.
```
git clone https://github.com/joaodematejr/project_java
cd frontend
npm install && npm start ou [precisar ter o yarn instalado] yarn && yarn start
Acesse http://localhost:3000/
Utilize o usuário "admin" e a senha "admin" para autenticar.  
```
