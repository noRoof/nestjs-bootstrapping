<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://noroofdevelopment.com/" target="blank"><img src="https://noroofdevelopment.com/assets/img/logo.png" height="120" alt="noRoof Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository, with some added features by noRoof. These features are common ones in most server applications.

### Features

- Docker environment (dev and prod)
- Logger
- Logger endpoint for client applications usage
- Configuration
- TypeORM integration
- Users CRUD
- Swagger Documentation
- Add oauth2, local, jwt passport strategy
- Add Client and User Authorization for endpoints

### Next steps

Next features to be added:

- Add role based security to endpoints
- Add unit tests
- Verify user email
- Update password endpoint
- Get current user endpoint

## Installation
Make a copy of the sample.env file, and rename it to .env file, then add your own configuration values.

### Dockerized
This repo has a Dockerfile and a docker-compose.yml included that has all the required steps and dependencies to run the project (a node image for the server and a postgreSQL for the database). If you have docker installed you only have to run:
```bash
$ docker-compose up
```
It will install all the required dependencies and run the application in dev mode.
(remember to update the configuration in the .env file)

### Local
```bash
$ npm install
```
Install PostgreSQL and add the configuration in the .env file

## Running the app (only for local installation)

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
(If you are using docker you have to enter to the docker container)

## Stay in touch

- Website - [https://noroofdevelopment.com](https://noroofdevelopment.com/)
- Twitter - [@noroofdev](https://twitter.com/noroofdev)
