This project was made as a learning process of DDD (tactical design) and Nestjs.

## Uses Cases
This project was designed do cover the following use cases and requirements:

+ A Customer could register a new Checking Account using its personal details.
+ Allow a customer to deposit funds into an existing account.
+ Allow the customer to withdraw funds from an existing account.
+ Allow the customer to close a Checking Account only if the balance is zero.
+ Do not allow the Customer to Withdraw more than the existing funds.
+ Allow to get the account details.
+ Allow to get the customer details.

`Copy from https://github.com/ivanpaulovich/ddd-tdd-rich-domain-model-dojo-kata`

## Project Structure (Modules)
```
 .
 |-- src               
 |   |-- api            --> Module for the delivery mechanism
 |   `-- core           --> Module for the use cases, domain and repositories
 `-- test
     |-- api_test       --> Acceptant tests
     `-- core_test      --> Unit tests
```


```
 .
 |-- src
 |   |-- api
 |   `-- core
 |       |-- account
 |       |   |-- application        --> (what it does) here are the applications services/uses cases/actions.
 |       |   |-- domain             --> (what is about) here are the entities and value objectes.
 |       |   `-- infrastructure     --> Repository implementations and classes related to frameworks or libraries.
 |       |-- customer
 |       `-- shared
 |
 `-- test
     |-- api_test
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

