# Task Management System

A full-stack task management system built with NestJS, Vue 3, Prisma ORM, MongoDB, and Tailwind CSS.

## Features
- **User authentication** (Register/Login) with JWT.
- **Project CRUD** operations.
- **Task CRUD** operations (linked to projects).
- Search, filtering, sorting, and pagination for tasks.
- Dashboard with project and task statistics.
- Responsive UI.

## Local Setup Instructions

1. Clone the repository.
2. Ensure you have Docker and Docker Compose installed.
3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
4. Start the application locally using Docker:
   ```bash
   docker-compose up -d --build
   ```
   *Note: In a local environment, Nginx may fail if Let's Encrypt certificates are not set up. For local development, it is recommended to run the frontend and backend directly using `npm run dev` and `npm run start:dev` respectively, while only using docker for MongoDB.*
5. To run the backend and frontend without Docker locally:
   - **Backend**:
     ```bash
     cd backend
     npm install
     npx prisma generate
     npx prisma db push
     npm run seed
     npm run start:dev
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

## Production Deployment

This project uses **GitHub Actions** for CI/CD and **Docker Compose** on the server. The domain is `test1.pavicontech.com`.

### 1. GitHub Secrets Configuration
To enable the CI/CD pipeline, add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `DOCKERHUB_USERNAME`: `sydneymutanyi`
- `DOCKERHUB_TOKEN`: Your Docker Hub access token
- `SERVER_IP`: `172.236.154.189`
- `SERVER_USERNAME`: `sydney`
- `SERVER_PASSWORD`: `V7!qN4#zR8@pL2$xM9` (It is recommended to use SSH keys instead of passwords if possible, but the password is provided here).

### 2. Initial Server Setup
SSH into your server and run the initial Let's Encrypt script to generate certificates:
```bash
# Clone the repository onto the server first
git clone <your-repo-url> task-management
cd task-management

# Make the initialization script executable
chmod +x init-letsencrypt.sh

# Run the script to fetch the initial certificates
sudo ./init-letsencrypt.sh
```

### 3. Deploy
Once the initial server setup is complete, any push to the `main` branch will automatically trigger the GitHub Actions workflow. The workflow will build the images, push them to Docker Hub, and deploy them on the server using `docker-compose`.

## API Documentation
The API is documented using Swagger. Once the backend is running, you can access the Swagger UI at `/api` (or `http://localhost:3000/api` locally).
