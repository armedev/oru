## Hosted Endpoints

- server: https://oru-epiratesdev.b4a.run
- client: https://mobilicis-oru.netlify.app

## Server

The server has been hosted on the [back4app](https://containers.back4app.com) container services using docker container

- the server uses MongoDb Atlas free services to store the data
- the server uses Redis cloud caching service to cache the data with a limited free space.
- The server uses JWT authentication to manage user login and signup process
- The server uses cookies as refresh tokens to provide authorization token for the user on page loads and signs them out if the token is invalid

> [!important]
> libs: express, mongodb, redis, bcrypt, jsonwebtoken etc

## Client

The Client has been hosted on [netlify](https://www.netlify.com/) to provide single page hosting

- The client uses custom scss and responsive design and is a SPA
- The client uses proxy using axios to communicate with server

## Local usage

- server: use the command:

```bash
docker compose up --build
```

- client: use the command:

```bash
yarn dev
```

> [!warning]
> Kindly verify and debug the env and cors options
