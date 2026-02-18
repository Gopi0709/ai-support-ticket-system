# AI Support Ticket System

A full-stack AI-powered Support Ticket Management System built using:

-   **Backend:** Django + Django REST Framework
-   **Frontend:** React (Vite)
-   **Database:** PostgreSQL
-   **AI Integration:** Google Gemini (Ticket Classification)
-   **Containerization:** Docker & Docker Compose

------------------------------------------------------------------------

## 🚀 Features

-   Create, update, delete support tickets
-   Filter tickets by category, priority, and status
-   Search tickets by title or description
-   Ticket statistics dashboard
-   AI-powered automatic ticket classification
-   Professional responsive UI
-   Fully Dockerized setup

------------------------------------------------------------------------

## 🏗️ Tech Stack

### Backend

-   Django
-   Django REST Framework
-   PostgreSQL
-   Google Gemini API

### Frontend

-   React (Vite)
-   React Router
-   Modern CSS styling

### DevOps

-   Docker
-   Docker Compose

------------------------------------------------------------------------

## 📦 Project Structure

ai-support-ticket-system/ 
# ├── backend/ 
# ├── frontend/ 
# ├──docker-compose.yml 
# ├── .gitignore 
# └── README.md

------------------------------------------------------------------------

## 🐳 How to Run the Project (Docker)

### 1️⃣ Clone the repository

git clone https://github.com/Gopi0709/ai-support-ticket-system.git cd
ai-support-ticket-system

### 2️⃣ Start Docker containers

docker-compose up --build

Backend runs at: http://localhost:8000

Frontend runs at: http://localhost:5173

------------------------------------------------------------------------

## 🔑 Important Note About API Key

The Google Gemini API key is configured directly inside Docker
environment variables in docker-compose.yml.

Make sure your API key is correctly set there before running the
project.

------------------------------------------------------------------------

## 📊 API Endpoints

### Tickets

## GET /api/tickets/ POST /api/tickets/ 
## GET /api/tickets/`<id>`{=html}/ 
## PUT /api/tickets/`<id>`{=html}/ 
## DELETE /api/tickets/`<id>`{=html}/

### AI Classification

POST /api/tickets/classify/

Body: { "description": "My internet is not working" }

### Statistics

GET /api/tickets/stats/

------------------------------------------------------------------------

## 🛡️ Security & Best Practices

-   Controlled CORS configuration
-   Dockerized environment
-   Production-ready settings
-   Clean separation of frontend and backend

------------------------------------------------------------------------

## 📌 Assessment Highlights

-   Full-stack architecture
-   AI integration with validation layer
-   Proper REST API design
-   Clean React component structure
-   Docker-based deployment
-   Professional UI with status badges & stats dashboard

------------------------------------------------------------------------

## 📬 Author

Gopichand Thammi Setty GitHub: https://github.com/Gopi0709

------------------------------------------------------------------------

## ✅ Status

Project completed as per assessment requirements.
