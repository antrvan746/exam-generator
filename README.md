# Exam Generator

A full-stack web application for generating and managing exams, built with Next.js (frontend), Spring Boot (backend), and PostgreSQL (database).

## Project Structure

- **frontend/**: Next.js 14, React, TypeScript, Tailwind CSS
  - Modern UI components using shadcn/ui
  - Real-time chat functionality with WebSocket
  - Google OAuth2 authentication
  - Responsive design with Tailwind CSS
  - Type-safe development with TypeScript

- **backend/**: Spring Boot 3, Java 17, Maven
  - RESTful API endpoints
  - WebSocket support for real-time communication
  - JWT-based authentication with refresh tokens
  - Google OAuth2 integration
  - Spring AI integration for exam generation
  - PostgreSQL database integration

- **docker-compose.yml**: Orchestrates frontend, backend, and database services

## Features

- User Authentication
  - Local authentication with JWT
  - Google OAuth2 integration
  - Secure token management with HTTP-only cookies
  - Automatic token refresh

- Real-time Chat
  - WebSocket-based communication
  - Automatic reconnection with exponential backoff
  - Real-time message updates
  - Persistent chat history

- Security
  - JWT authentication
  - CORS configuration
  - Secure password handling
  - Protected API endpoints

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- Java 17 (for local development)
- Node.js 18+ (for local development)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/exam-generator.git
   cd exam-generator
   ```

2. **Environment Setup:**
   - Frontend (.env.local):
     ```
     NEXT_PUBLIC_API_URL=http://localhost:8080
     NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
     ```
   - Backend (application.properties):
     ```
     # Database configuration is handled by docker-compose
     # Google OAuth2 credentials need to be configured
     ```

3. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)
   - Database: localhost:5432 (user: postgres, password: postgres)

## Development

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

Key frontend dependencies:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- SockJS-client for WebSocket
- Zustand for state management

### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

Key backend dependencies:
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- Spring WebSocket
- Spring AI
- PostgreSQL
- JWT
- Lombok

## Git Workflow

We follow the Gitflow workflow:
- `main`: Production-ready code
- `develop`: Latest development changes
- `feature/*`: New features
- `release/*`: Release preparation
- `hotfix/*`: Urgent production fixes

Commit message format: `type(scope): description`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 