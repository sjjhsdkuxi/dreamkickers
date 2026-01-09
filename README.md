# Taekwondo Player Management System

A web application for managing Taekwondo players' records including name, date of birth, file number, and contact information.

## Features

- **Player Management**: Add, view, edit, and delete player records
- **Player Information**: Store name, date of birth (DOB), file number, and contact number
- **Modern UI**: Clean and responsive user interface
- **RESTful API**: Backend API for all player operations

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: React with modern UI components
- **Database**: SQLite (can be easily migrated to PostgreSQL/MySQL)

## Project Structure

```
├── backend/          # Express.js API server
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   └── server.js     # Entry point
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```
The API will run on http://localhost:3001

2. Start the frontend development server:
```bash
cd frontend
npm start
```
The app will open in your browser at http://localhost:3000

## API Endpoints

- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get a specific player
- `POST /api/players` - Create a new player
- `PUT /api/players/:id` - Update a player
- `DELETE /api/players/:id` - Delete a player

## Player Data Model

```javascript
{
  id: Number,
  name: String,
  dob: Date,
  fileNumber: String,
  contactNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

## License

MIT
