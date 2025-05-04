# Virtual Pet Adoption Center
A simple yet visually appealing Virtual Pet Adoption Center where users can manage pets available for adoption. Users can create, read, update, and delete pet profiles, as well as "adopt" pets (mark them as adopted). Pets have dynamic moods that change based on how long they've been in the system.

## Features
- **Backend (Node.js)**: RESTful API to manage pets, including adding, updating, adopting, and deleting pets.
- **Frontend (React.js)**: Interface to interact with the backend API and manage pet profiles.
- **Database (MongoDB)**: Stores pet data, including mood and adoption status.

## Technology Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB

## Prerequisites
Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (for both backend and frontend)
- [MongoDB](https://www.mongodb.com/) (for the database)
- [npm](https://www.npmjs.com/) (for package management)

## Setup and Installation
### Backend (Node.js)
1. Clone the repositories:
   ```bash
   # Clone backend repository
   git clone https://github.com/Khemz-Developer/virtual-pet-adoption-backend.git
   
   # Clone frontend repository
   git clone https://github.com/Khemz-Developer/virtual-pet-adoption-frontend.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd virtual-pet-adoption-backend
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```
   
   The server will be running on http://localhost:5000

### Frontend (React.js)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd virtual-pet-adoption-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   
   The frontend will be accessible at http://localhost:3000

## API Documentation

### Pet Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /pets | Get all pets |
| GET | /pets/:id | Get a specific pet by ID |
| POST | /pets | Create a new pet |
| PUT | /pets/:id | Update a pet's information |
| PATCH | /pets/:id/adopt | Mark a pet as adopted |
| DELETE | /pets/:id | Delete a pet |
| GET | /pets/filter?mood=<mood> | Filter pets by mood |

### Request and Response Examples

#### Add a New Pet
- **Request**: POST /pets
  ```json
  {
    "name": "Fluffy",
    "species": "Dog",
    "age": 2,
    "personality": "Friendly"
  }
  ```
- **Response**: Created pet with ID

#### Adopt a Pet
- **Request**: PATCH /pets/:id/adopt
- **Response**: Updated pet object with adoption status and date

## Mood Logic
Pets' moods change based on how long they've been in the system:
- Less than 1 day: Happy
- 1-3 days: Excited
- More than 3 days: Sad

## Project Structure
```
virtual-pet-adoption-backend/
├── backend/                # Node.js server
│   ├── app.js             # Main application file
│   ├── server.js          # Server setup
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── models/            # Data models
│   ├── services/          # Service layer
│   └── utils/             # Utility functions

virtual-pet-adoption-frontend/  # React.js client
├── public/                # Static assets
└── src/
    ├── components/        # Reusable components
    ├── pages/             # Page components
    ├── services/          # API services
    ├── styles/            # CSS/styling files
    └── utils/             # Helper functions
```

## Author
Jalitha Kheminda
