# Idaman Backend API - Technical Test

This is a REST API Backend built with **NestJS** and **TypeScript**, addressing the technical test requirements for the Backend Engineer Intern position.

## Project Description
A simplified application featuring two related entities: `User` and `Penangkaran` (Breeding Facility). The API implements robust authentication using JWT tokens and requires users to be authenticated before accessing the `Penangkaran` endpoints.

## Features Met
- **TypeScript & NestJS**: Built entirely with TypeScript on the NestJS framework.
- **Relational Database**: Uses PostgreSQL for robust, structured data storage.
- **CRUD Operations**: Complete CRUD for `User` and `Penangkaran` entities, linked by a One-to-Many relationship.
- **JWT Authentication**: Secure login and token generation. Protected routes require a valid Bearer token.
- **E2E Testing**: Includes E2E tests specifically for the authentication flow (`/auth/register`, `/auth/login`, and token verification).
- **Design Patterns**: Implements standard, enterprise-ready patterns (see below).
- **API Documentation**: [Dokumentasi API Postman](https://documenter.getpostman.com/view/51010779/2sBXwsLqEi)

## Running the Application

### 1. Database Setup
This project uses PostgreSQL. A `docker-compose.yml` file is provided for your convenience.
```bash
# Start the PostgreSQL database
docker-compose up -d
```

### 2. Installation
```bash
# Install dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (or use the provided one):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=<MASUKKAN_PASSWORD_DB_ANDA>
DB_NAME=idaman_nestjs
JWT_SECRET=<MASUKKAN_JWT_SECRET_ACAK_ANDA>
```

### 4. Running the App
```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod
```

### 5. Running Tests
```bash
# Run End-to-End tests
npm run test:e2e
```

## Design Patterns Used

NestJS enforces several software design patterns natively. Here are the key patterns utilized in this application and why:

1. **Dependency Injection (DI) Pattern**
   - **Where**: Everywhere. `UsersService`, `AuthService`, etc., are injected into controllers and other services via constructors.
   - **Why**: It decouples object creation from object usage. This makes the code highly modular, testable (via mocking), and easier to maintain.

2. **Repository Pattern (via TypeORM)**
   - **Where**: Services interact with the database using injected `Repository<Entity>` instances (e.g., `this.usersRepository.find()`).
   - **Why**: It abstracts the data layer. The business logic inside services doesn't need to know if the underlying database is PostgreSQL, MySQL, or MongoDB. It only interacts with the generic Repository interface, making database swaps or testing much easier.

3. **Decorator Pattern**
   - **Where**: `@Controller()`, `@Injectable()`, `@Get()`, `@UseGuards(JwtAuthGuard)`.
   - **Why**: It allows adding behavior to classes or methods dynamically and declaratively without modifying their code directly. This keeps the code clean and focused on business logic rather than wiring.

4. **Module Pattern**
   - **Where**: `AppModule`, `UsersModule`, `AuthModule`.
   - **Why**: NestJS groups related features into encapsulated modules. This ensures high cohesion and low coupling across the application, adhering to the Single Responsibility Principle on an architectural level.
