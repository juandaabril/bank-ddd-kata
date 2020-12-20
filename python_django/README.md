# python_django [bank-ddd-kata]
This project was made as a learning process of DDD and TDD and python with django.

## Folder Structure
```
|-- amqp        --> Module for listen AMQP events (Django Command Pika)
|-- api         --> Module for the delivery mechanism (Django HTTP)
|-- core        --> Module for the use cases, domain and repositories
|-- core_test   --> Unit tests
```

## Installation
1. Rename the file `.env.template` for `.env`
2. Complete the environment variables inside the `.env` file
3. Execute the pip requirements command `pip install -r requirements.txt`
4. Running the infrastructure (postgres and rabbitmq) `docker-compose up`
5. Running the migrations `python manage.py migrate`

## Running the app
* Running the infrastructure (postgres and rabbitmq)
```bash
$ docker-compose up
```
* Running the http-api
```bash
$ python manage.py runserver
```
* Running the amqp-listener
```bash
$ python manage.py listen_events
```
## Unit Test (CORE)
```bash
$ python manage.py test 
```