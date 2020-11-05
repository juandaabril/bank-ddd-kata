This project was made as a learning process of DDD (tactical design) and Nestjs.

## Project Structure (Modules)
```
 .
 |-- src
 |   |-- http           --> Module for the delivery mechanism
 |   `-- core           --> Module for the use cases, domain and repositories
 `-- test
     |-- http_test      --> Acceptant tests
     `-- core_test      --> Unit tests
```


```
 .
 |-- src
 |   |-- http
 |   `-- core
 |       |-- account
 |       |   |-- application        --> (what it does) here are the applications services/uses cases/actions.
 |       |   |-- domain             --> (what is about) here are the entities and value objectes.
 |       |   `-- infrastructure     --> Repository implementations and classes related to frameworks or libraries.
 |       |-- customer
 |       `-- shared
 |
 `-- test
     |-- http_test
     `-- core_test
```

## Development

### Scripts
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stack
* This project was bootstrapped with [Nest](https://github.com/nestjs/nest).

