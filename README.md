# EvalEasy Frontend

This is the frontend application for EvalEasy, a platform for managing institutions, representatives, and instructors. The application is built using React and Material-UI.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Project Structure](#project-structure)
- [Features](#features)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/1javid/evaleasy-frontend.git
    ```

2. Navigate to the project directory:

    ```bash
    cd evaleasy-frontend/frontend
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

To run the application in development mode, use the following command:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

To create a production build, use the following command:

```bash
npm run build
```

Access the API at `http://localhost:3000/`

## Endpoints

- **Authentication**
    - `POST /api/auth/login/`: Log in a user.

- **Institutions**
    - `GET /api/auth/institutions/`: List all institutions.
    - `POST /api/auth/create/institution/`: Create a new institution.

- **Representatives**
    - `POST /api/auth/create/representative/`: Create a new representative.
    - `GET /api/auth/users/representatives/?institution_id=<institution_id>`: List representatives by institution ID.

- **Instructors**
    - `POST /api/auth/create/instructor/`: Create a new instructor.
    - `GET /api/auth/users/instructors/?institution_id=<institution_id>`: List instructors by institution ID.

- **Subjects**
    - `GET /api/test/subjects/list/`: List all subjects.
    - `POST /api/test/subjects/`: Create a new subject.

## Features

- **Authentication:** Users can log in and log out.
- **Role-Based Access Control:** Different dashboards for admins, representatives, and instructors.
- **Institution Management:** Admins can create and view institutions.
- **Representative Management:** Admins can create representatives for institutions.
- **Instructor Management:** Representatives can create instructors for their institution.