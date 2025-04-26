# Exam Generator

A full-stack web application for generating and managing exams, built with Next.js (frontend), Spring Boot (backend), and PostgreSQL (database).

## Project Structure

- **frontend/**: Next.js 14, React, TypeScript, Tailwind CSS
- **backend/**: Spring Boot 3, Java 17, Maven
- **docker-compose.yml**: Orchestrates frontend, backend, and database services

## Features
- User-friendly interface for creating and managing exams
- Secure backend with JWT authentication
- RESTful API
- PostgreSQL database
- Dockerized for easy deployment

## Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/exam-generator.git
   cd exam-generator
   ```

2. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)
   - Database: localhost:5432 (user: postgres, password: postgres)

## Development

- **Frontend:**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **Backend:**
  ```bash
  cd backend
  ./mvnw spring-boot:run
  ```

## License

This project is licensed under the MIT License. 