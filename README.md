# To-Do List App

This is a simple To-Do List app built using NextJs, Prisma, tRPC and Shadcn UI. The app allows users to add and delete tasks, sort tasks by date and completion status, and filter tasks by their completion status.

## Features

- **Add Task**: Users can add new tasks with a title and a due date.
- **Delete Task**: Users can delete existing tasks.
- **Sort Tasks**: Tasks are automatically sorted by their due date and completion status.
- **Filter Tasks**: Users can filter tasks to show only completed or uncompleted tasks.
- **Responsive design**

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
- PostgreSQL (or any other database supported by Prisma)

## Tech Stack
- Next.js: React framework for server-side rendering and static site generation, providing a powerful toolkit for building performant web applications.
- Prisma: Next-generation ORM for database access, making it easy to work with databases in a type-safe manner.
- tRPC: End-to-end typesafe APIs, allowing you to create robust and type-safe API layers between your client and server.
- TypeScript: Static type-checking, enhancing code quality and developer productivity with types and interfaces.
- Shadcn UI: A modern UI component library for React, offering a set of customizable and accessible components to speed up the development of beautiful and responsive user interfaces.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Filbert88/To-do-app.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd to-do-app
    ```
3. **setup .env file and add your database URL**:
    ```bash
   DATABASE_URL="postgresql://JohnDoe:password@localhost:5432/defaultdb"
    ```
4. **Generate Prisma Client**:
    ```bash
   npm run postinstall
    ```
5. **Migrate the database**:
    ```bash
   npm run db:generate
    ```
6. **Run the server**:
    ```bash
   npm run dev
    ```

## Try the app
you can try the app that already hosted on vercel in https://to-do-app-ez.vercel.app/ 

## Deployment
This project is deployed on vercel. Before deploying, remember to add your database url on the environment variables. To learn more about vercel, you can view the documentation at [Vercel](https://create.t3.gg/en/deployment/vercel)

## Links
- Repository : https://github.com/Filbert88/To-do-app
- Website Link : https://to-do-app-ez.vercel.app/

