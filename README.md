# Auto Sale App

## Project Description

The Auto Sale app is a full-stack application designed for selling cars, providing a platform similar to [AUTO.RIA](https://auto.ria.com/uk/). The project is structured with a client-side application and a server-side API. At the moment Docker is utilized for managing the PostgreSQL database and Redis.

## Technologies Used

### Server (Express.js)

-   **Database**: PostgreSQL
-   **Cache**: Redis
-   **Authentication**: JSON Web Tokens (JWT), Passport.js (Google OAuth 2.0)
-   **Image Processing**: Sharp
-   **ORM**: TypeORM
-   **Email Sending**: Nodemailer
-   **Validation**: Express Validator
-   **Middleware**: Cookie Parser, CORS
-   **Security**: Bcrypt, Password Validator
-   **Dev Tools**: TypeScript, Nodemon, Concurrently

### Client (Next.js)

-   **UI Components**: Radix UI, shadcn, React Icons, Lucide React, Tailwind CSS
-   **State Management**: Zustand
-   **Form Handling**: React Hook Form
-   **HTTP Requests**: Axios
-   **UI Libraries**: Swiper
-   **Dev Tools**: TypeScript

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

-   [Docker](https://www.docker.com/get-started)
-   [Node.js](https://nodejs.org/)

## How to Run the Project

1. Clone the repository:

    ```bash
    git clone https://github.com/vladyslavgeyna/auto-sale.git
    cd auto-sale
    ```

2. Set up environment variables:

    Create a `.env` file in the `server` directory and initialize environment variables.

3. Build and run the Docker containers:

    ```bash
    docker-compose --env-file server/.env up -d
    ```

4. Install dependencies and start the server:

    ```bash
    cd server
    npm install
    npm run dev
    ```

5. Install dependencies and start the client:

    ```bash
    cd ../client
    npm install
    npm run dev
    ```

Visit `http://localhost:3000` in your web browser to access the Auto Sale app.

## Docker Compose Commands

-   **Build Containers:**

    ```bash
    docker-compose --env-file server/.env build
    ```

-   **Stop Containers:**
    ```bash
    docker-compose down
    ```

Feel free to customize the instructions and details based on your specific setup and requirements.

## License

This project is intended for personal learning purposes and is not licensed for distribution or commercial use. Feel free to explore, modify, and learn from the codebase.
