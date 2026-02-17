# Task Management

A full-stack Task Management with secure authentication and task CRUD operations. Built using React.js, Node.js, Express, and MongoDB.

This project was developed as part of assignment.

---

## Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Dashboard Routes

### Dashboard
- Welcome message with username
- Task statistics (Total, Completed, Pending)
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Search tasks

### Profile Management
- View profile details
- Update name and email

### Security
- Password hashing using bcrypt
- JWT token authentication
- Protected backend routes
- Environment variables secured using .env

---

## Tech Stack

Frontend
- React.js
- TailwindCSS
- Axios

Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- bcrypt

---

## Project Structure

Task-Management/

Backend/
- models/
- routes/
- middleware/
- server.js

frontend/
- src/
- public/
- package.json


---

## Installation Guide

### Backend

cd Backend
npm install
npm start


### Frontend

cd frontend
npm install
npm start


---


## Environment Variables

Create a .env file in Backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
