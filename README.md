# Easy Media

## Description
Easy Media is a social network that seeks to provide a space for users to express
your ideas online. Users will be able to register and with an account started they will be able to publish, view
messages from other users and from themselves.

This project have two folders, one for the backend and another for the frontend.

## Installation
To install this project you need to clone the repository and install the dependencies of each folder.

### Requirements

* Node.js v18+
* npm v9+
* redis

### Optional requirements

If you want to run the project in a local way, you need to install the bellow requirements, also you cloud use your favorite package manager, in this case I'm using pnpm:

* MongoDB
* Install pnpm

  ```bash
  npm install -g pnpm
  ```
## Setup Locally

1. Clone the repository.

```bash
 git clone https://github.com/johandrydev/easy-media
```

### Back

1. Install the dependencies:

  ```bash
  pnpm install
  ```
2. Run the server
  ```bash
  pnpm start
  ```
In case of development porpuses you could use the following command
  ```bash
  pnpm run dev
  ```

## Setup to run with Docker and Docker Compose
If you have docker I have created a docker-compose file to run the project with redis and the server. With this you don't need to install anything else in your machine. Just need to run the following command:
```bash
docker compose up -d
```
This command will create the containers and run the server in the port `3001`.

## Front

To run the front end you need to install the dependencies and run the server previously.

1. Install the dependencies:

  ```bash
  pnpm install
  ```
2. Run the server
  ```bash
  pnpm run dev
  ```