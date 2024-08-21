# **BlogVerse**

![BlogVerse Logo](path/to/logo.png)

[Live Demo](https://blogversewebapp.netlify.app/) | [GitHub Repository](https://github.com/MaheshKunchala18/blogverse-frontend)

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

## **Project Overview**

BlogVerse is a fully functional blog platform where users can create, view, and interact with blog posts. The application offers a dynamic home page featuring trending and top-rated blogs, personalized user experiences through authentication, and rich content management capabilities. It’s designed to be both user-friendly and scalable, catering to a wide audience while ensuring security and performance.

## **Features**

- **Dynamic Home Page**: Showcases trending and top-rated blog posts, driving user engagement.
- **User Authentication**: Secure signup, login, and profile management, offering personalized content.
- **CRUD Operations**: Users can create, read, update, and delete blog posts, with added features like rating and commenting.
- **Responsive Design**: Mobile-friendly design using React-Bootstrap, ensuring accessibility on all devices.
- **Image Management**: Integrated image upload and insertion in blog content for enhanced visual storytelling.
- **Admin Dashboard**: (Optional) Admin capabilities for managing users and content.

## **Tech Stack**

### **Frontend**

- **React.js**: A powerful JavaScript library for building user interfaces.
- **React-Bootstrap**: Used for responsive design and UI components, ensuring a consistent and mobile-friendly user interface.
- **React-Quill**: A rich text editor for managing and formatting blog content.
- **React Router DOM**: Facilitates seamless navigation and routing within the single-page application.
- **Axios**: Used for making HTTP requests to the backend API.
- **Framer Motion**: Handles animations and transitions, enhancing the visual experience.
- **FontAwesome**: Provides a comprehensive set of icons used throughout the application.

### **Backend**

- **Node.js**: JavaScript runtime used to build the server-side of the application.
- **Express.js**: A minimalist web framework for building robust APIs.
- **MongoDB**: A NoSQL database used for storing blog posts, user data, and other related information.
- **Dompurify**: Ensures content security by sanitizing HTML input and preventing XSS attacks.

### **Testing**

- **Jest & React Testing Library**: Used for unit and integration testing to ensure the application functions as expected.

## **Installation and Setup**

### **Prerequisites**

- Node.js (v14.x or higher)
- MongoDB (local instance or MongoDB Atlas)
- NPM or Yarn

### **Installation**

1. **Clone the repository:**
    ```bash
    git clone https://github.com/MaheshKunchala18/blogverse-frontend
    cd blogwebsite
    ```

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add your environment variables:
     ```bash
     MONGO_URI=your_mongodb_uri
     PORT=3001
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

4. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.

## **Usage**

1. **User Registration & Login:**
   - Create a new account or log in to your existing account.
   
2. **Creating & Managing Blogs:**
   - Once logged in, create new blog posts, edit existing ones, or delete them as needed.
   - Users can also interact with posts by rating and commenting.

3. **Viewing Blogs:**
   - Browse the home page for trending and top-rated blogs.
   - Click on any blog title to read the full content.

## **API Endpoints**

### **Authentication**
- **POST /signup**: Register a new user.
- **POST /login**: Authenticate user and start a session.

### **Blogs**
- **GET /blog**: Get all blog posts.
- **GET /blog/:id**: Get a single blog post by ID.
- **POST /blog**: Create a new blog post.
- **PUT /blog/:id**: Update a blog post by ID.
- **DELETE /blog/:id**: Delete a blog post by ID.
- **POST /blog/:id/upvote**: Upvote a blog post.
- **POST /blog/:id/downvote**: Downvote a blog post.

### **Profile**
- **GET /profile/:userId**: Get user profile data.

## **Folder Structure**

BlogVerse/
│
├── backend/
│ ├── Controllers/
│ ├── Models/
│ ├── node_modules/
│ ├── .env
│ ├── .gitignore
│ ├── package.json
│ ├── server.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── node_modules/
│ ├── .gitignore
│ ├── package.json
│ ├── README.md
│
└── README.md



## **Contributing**

Contributions are welcome! Please fork this repository and submit a pull request for any features, fixes, or suggestions.


## **Contact**

For any inquiries or feedback, please contact:

**Mahesh Kunchala**
- LinkedIn: [Mahesh Kunchala](https://linkedin.com/in/mahesh-kunchala-23854624b/)  
- GitHub: [Mahesh Kunchala](https://github.com/maheshkunchala)

