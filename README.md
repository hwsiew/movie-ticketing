# Movie Ticket Booking App

This project create a functional movie ticket booking application with backend in Spring Boot and frontend in ReactJS. For simplicity, authentication is simulated using sessionStorage. 

## Design
- [System Architecture](https://www.figma.com/file/k6w6xsXvHI0KxARSJziDqo/OCBC-Hack-It?node-id=0%3A1)
- [Database Structure](https://www.figma.com/file/kvmMxz46M5LuWjaeevcLYA/OCBC-hack-it?node-id=0%3A1)

## Tech Stacks
- Frontend
	- create-react-app - to bootstrap project
	- react-router-dom - in app navigation
	- tailwindcss      - utility CSS framework
	- redux            - state management
- Backend/microserviece
	- Spring boot      - backend framework
	- MongoDB          - data storage
	- MongoDB atlas    - database as a service

## How To Start Local Development Environment
1. Navigate to `./clients/web` and run `npm run start` to start frontend.
2. Navigate to `./services/ticketing` and run `./gradlew bootRun --args='--spring.profiles.active=development'` to start backend.
3. Browse `http://localhost:3000` 

## Deployment Strategies 
1. Using docker-compose
	- run `docker-compose up -d`
	- this will set up 2 containers 
		1. hack-it-frontend - Nginx proxy to fronted react app at `localhost`
		2. hack-it-backend  - Java container to run Spring boot app at `localhost:8080`
2. Building individual docker image from root directory. This should create individual images(frontend/backend) for deployment.
	- Frontend : run `docker build -t hack-it-frontend -f Dockerfile.web --build-arg ROOT_DIR=./clients/web .` 
	- Backend  : run `docker build -t hack-it-backend -f Dockerfile.ticketing.service --build-arg ROOT_DIR=./services/ticketing .`

## WARNING 
For simplicity sake, MongoDB atlas (database-as-a-service) is used for data storage in this project. Two environments have been setup, namely development and production. However, this may have side effect if two or more enviroments of the same kind(development/production) are running concurrently. Although, it should not crash the application, data can be overridden in database. The solution is to setup a MongoDB containers using docker. Because, transaction for concurrency is used for Mongodb. It is required to set up a replica set of MongoDB containers. For details information, please refer [here](https://gist.github.com/harveyconnor/518e088bad23a273cae6ba7fc4643549).