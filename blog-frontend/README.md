# 📝 Blog Application

A full-stack blog application built with **React** for the frontend and **Django (DRF)** for the backend. It features user authentication via JWT using Djoser, blog CRUD operations, and a styled, responsive UI.

---

## 🚀 Features

- 🔐 User authentication with JWT (Djoser)
- 🧑‍💻 Register, Login, Logout functionality
- 📄 Create, Read, Update, Delete blog posts
- 🎨 Styled navigation bar with conditional rendering
- 📌 Home page listing blogs with metadata (author, created date)
- 📂 Backend API endpoints for blogs, users
- 🌐 Background image with transparent overlay

---


---

## 🛠️ Setup Instructions

### 📌 Backend (Django)

1. ## Navigate to backend directory:
   ```bash
   cd backend


2. ## Create a virtual environment & activate it:
python -m venv env
source env/bin/activate

3. ## Install dependencies:
pip install -r requirements.txt

4. ## Run migrations:
python manage.py migrate

5. ## Start the Server:
python manage.py runserver

### 📌 Frontend (React)

## Navigate to frontend:
cd frontend

## Install dependencies:
npm install

## Start the React app:
npm start

### 🔐 Authentication

-Uses JWT tokens via Djoser
-Endpoints:
   -POST /auth/jwt/create/ (login)

   -POST /auth/users/ (register)

   -GET /auth/users/me/ (profile)

   -POST /auth/jwt/refresh/ (refresh token)


### 🔗 API Endpoints

Endpoint	         Method	      Description
/api/blogs/	       GET	      List all blog posts
/api/blogs/:id/	 GET	      Retrieve a single post
/api/blogs/	       POST	      Create a new blog post
/api/blogs/:id/	 PUT	      Update an existing post
/api/blogs/:id/	 DELETE	   Delete a blog post


### 📜 License

This project is licensed under the MIT License.

---

All set now! Let me know if you want me to help with the screenshots section or a live deployment badge too 😎
