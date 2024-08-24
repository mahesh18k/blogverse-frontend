# 🖋️ **BlogVerse**

A dynamic blogging platform built with the MERN stack, offering users the ability to create, manage, and interact with blog posts seamlessly. It features user authentication, CRUD operations and ratings for an engaging blogging experience.

<!-- ![BlogVerse Logo](path/to/logo.png) -->

## Links
<a href="https://blogversewebapp.netlify.app/" target="_blank"> Live Demo </a> 🌐 |
<a href="https://github.com/MaheshKunchala18/blogverse-frontend" target="_blank"> Frontend Repository </a> <img src="https://img.icons8.com/material-outlined/24/000000/github.png" /> |
<a href="https://github.com/MaheshKunchala18/blogverse-backend" target="_blank"> Backend Repository </a> <img src="https://img.icons8.com/material-outlined/24/000000/github.png" />


## **Table of Contents 📋**

1. [🎯 Project Overview](#project-overview)
2. [✨ Features](#features)
3. [🛠 Tech Stack](#tech-stack)
4. [⚙️ Installation and Setup](#️installation)
5. [🚀 Usage](#usage)
6. [🔗 API Endpoints](#api-endpoints)
7. [📂 Folder Structure](#folder-structure)
8. [🤝 Contributing](#contributing)
9. [📬 Contact](#contact)


<h2 id="project-overview"> <strong>🎯 Project Overview</strong> </h2>

BlogVerse is a fully functional blog platform where users can create, view, and interact with blog posts. The application offers a dynamic home page featuring trending and top-rated blogs, personalized user experiences through authentication, and rich content management capabilities. It’s designed to be both user-friendly and scalable, catering to a wide audience while ensuring security and performance.


<h2 id="features"> <strong>✨ Features</strong> </h2>

- **Dynamic Home Page**: Showcases trending and top-rated blog posts, driving user engagement.
- **User Authentication**: Secure signup, login, and profile management, offering personalized content.
- **CRUD Operations**: Users can create, read, update, and delete blog posts, with added features like view count and rating(upvote/downvote).
- **Responsive Design**: Mobile-friendly design using React-Bootstrap, ensuring accessibility on all devices.
- **Image Management**: Integrated image upload and insertion in blog content for enhanced visual storytelling.
- **Admin Dashboard**: (Optional) Admin capabilities for managing users and content.


<h2 id="tech-stack"> <strong>🛠 Tech Stack</strong> </h2>

### Frontend

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

### Backend

- **Node.js**: The runtime environment for running JavaScript on the server-side.
- **Express.js**: A minimal and flexible Node.js web application framework that provides robust features for building APIs.
- **MongoDB**: A NoSQL database used for storing blog posts, user data, and other related information.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Body-Parser**: A middleware to handle parsing of incoming request bodies in a middleware before your handlers, available under req.body.
- **Cors**: Middleware that can be used to enable CORS (Cross-Origin Resource Sharing) with various options.
- **Dotenv**: Module to load environment variables from a .env file into process.env.
- **Nodemon**: A utility that monitors for any changes in your source and automatically restarts your server.

**Note**: The backend uses the ESM module type, enabling the use of "import" statements instead of "require". This aligns the backend with the modern JavaScript syntax, similar to what is used in the React.js frontend.

### Testing

- **Jest & React Testing Library**: Used for unit and integration testing to ensure the application functions as expected.


<h2 id="️installation"> <strong> ⚙️ Installation and Setup</strong> </h2>

### **Prerequisites**

- Node.js (v14.x or higher)
- MongoDB (local instance or MongoDB Atlas)
- NPM or Yarn

### **Installation**

1. **Backend Setup:**
   - Clone the repository:
     ```bash
     git clone https://github.com/MaheshKunchala18/blogverse-backend
     ```
   - Navigate to the backend directory:
     ```bash
     cd blogverse-backend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory and add your environment variables. Depending on your setup, you can use either MongoDB Atlas or a local MongoDB instance:
      - **For MongoDB Atlas:**
        ```bash
        MONGODB_URI=your_mongodb_uri
        PORT=3001
        ```
      - **For Local MongoDB (Compass):**
        ```bash
        MONGODB_URI=mongodb://localhost:27017/your_database_name
        PORT=3001
        ```
   - Start the backend server:
     ```bash
     npm start
     ```

2. **Frontend Setup:**
   - Clone the repository:
     ```bash
     git clone https://github.com/MaheshKunchala18/blogverse-frontend
     ```
   - Navigate to the frontend directory:
     ```bash
     cd blogverse-frontend
     ```
   - Install the dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the frontend directory and add your environment variables. Depending on whether your backend is deployed or running locally, you can specify the backend URL accordingly:
      - **If the backend is deployed:**
        ```bash
        REACT_APP_BACKEND_URL=your_backend_url
        ```
      - **If the backend is running locally:**
        ```bash
        REACT_APP_BACKEND_URL=http://localhost:3001
        ```
   - Start the frontend server:
     ```bash
     npm start
     ```

3. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.


<h2 id="usage"> <strong>🚀 Usage</strong> </h2>

1. **User Registration & Login:**
   - Create a new account or log in to your existing account.
   
2. **Creating & Managing Blogs:**
   - Once logged in, create new blog posts, edit existing ones, or delete them as needed.
   - Users can also interact with posts by rating(upvote/downvote).

3. **Viewing Blogs:**
   - Browse the home page for trending and top-rated blogs.
   - Click on any blog title to read the full content.


<h2 id="api-endpoints"> <strong>🔗 API Endpoints</strong> </h2>

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


<h2 id="folder-structure"> <strong>📂 Folder Structure</strong> </h2>

```bash
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
```



<h2 id="contributing"> <strong> 🤝 Contributing</strong> </h2>

Contributions are welcome! Please fork this repository and submit a pull request for any features, fixes, or suggestions.


<h2 id="contact"> <strong>📬 Contact</strong> </h2>

For any inquiries or feedback, please contact:

**Mahesh Kunchala**
- LinkedIn: [Mahesh Kunchala](https://linkedin.com/in/mahesh-kunchala-23854624b/)  
- GitHub: [Mahesh Kunchala](https://github.com/MaheshKunchala18)

