# **BlogVerse**

<!-- ![BlogVerse Logo](path/to/logo.png) -->

### Live Demo: https://blogversewebapp.netlify.app/
### Frontend: https://github.com/MaheshKunchala18/blogverse-frontend
### Backend: https://github.com/MaheshKunchala18/blogverse-backend


## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [Contact](#contact)

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
- **React Router DOM**: Manages the navigation and routing in the application.
- **React Bootstrap**: Provides pre-styled components, enhancing UI design.
- **React Icons & React Bootstrap Icons**: Used for implementing scalable vector icons that can be customized easily.
- **React Quill**: A rich text editor component that enables content creation with formatting.
- **Framer Motion**: A powerful animation library used for adding animations and transitions.
- **Axios**: Handles HTTP requests to communicate with the backend API.
- **Dompurify**: Ensures that the rendered HTML is secure by sanitizing the user-generated content.
- **Font Awesome**: Provides a wide array of icons for enhancing UI.
- **Testing Library (React, Jest-DOM, User Event)**: Used for unit testing the components to ensure code quality.
- **Web Vitals**: Helps in measuring the core web vitals to monitor the performance of the web application.

### **Backend**

- **Node.js**: The runtime environment for running JavaScript on the server-side.
- **Express.js**: A minimal and flexible Node.js web application framework that provides robust features for building APIs.
- **MongoDB**: A NoSQL database used for storing blog posts, user data, and other related information.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Body-Parser**: A middleware to handle parsing of incoming request bodies in a middleware before your handlers, available under req.body.
- **Cors**: Middleware that can be used to enable CORS (Cross-Origin Resource Sharing) with various options.
- **Dotenv**: Module to load environment variables from a .env file into process.env.
- **Nodemon**: A utility that monitors for any changes in your source and automatically restarts your server.

#### Note: The backend uses the ESM module type, enabling the use of "import" statements instead of "require". This aligns the backend with the modern JavaScript syntax, similar to what is used in the React.js frontend.


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
│   ├── Controllers/
│   ├── Models/
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── vercel.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   ├── Blog/
│   │   │   ├── Home/
│   │   │   ├── Profile/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md




## **Contributing**

Contributions are welcome! Please fork this repository and submit a pull request for any features, fixes, or suggestions.


## **Contact**

For any inquiries or feedback, please contact:

**Mahesh Kunchala**
- LinkedIn: [Mahesh Kunchala](https://linkedin.com/in/mahesh-kunchala-23854624b/)  
- GitHub: [Mahesh Kunchala](https://github.com/maheshkunchala)

