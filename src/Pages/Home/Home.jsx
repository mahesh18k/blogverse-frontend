// // src/pages/HomePage.js
// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import BlogCard from './BlogCard';
// import NavigationBar from './NavigationBar';

// const HomePage = () => {
//   const trendingBlogs = [
//     // Sample data
//     { title: 'Blog 1', summary: 'This is the summary of blog 1', rating: 4.5, image: 'image1.jpg', id: 1 },
//     { title: 'Blog 2', summary: 'This is the summary of blog 2', rating: 4.0, image: 'image2.jpg', id: 2 },
//     // Add more blogs
//   ];

//   const topRatedBlogs = [
//     // Sample data
//     { title: 'Blog 3', summary: 'This is the summary of blog 3', rating: 5.0, image: 'image3.jpg', id: 3 },
//     { title: 'Blog 4', summary: 'This is the summary of blog 4', rating: 4.8, image: 'image4.jpg', id: 4 },
//     // Add more blogs
//   ];

//   const handleBlogClick = (id) => {
//     // Handle blog click, redirect to blog page
//   };

//   return (
//     <>
//       <NavigationBar />
//       <Container>
//         <h1 className="mt-5">Trending Blogs</h1>
//         <Row>
//           {trendingBlogs.map((blog) => (
//             <Col key={blog.id}>
//               <BlogCard {...blog} onClick={() => handleBlogClick(blog.id)} />
//             </Col>
//           ))}
//         </Row>
//         <h1 className="mt-5">Top Rated Blogs</h1>
//         <Row>
//           {topRatedBlogs.map((blog) => (
//             <Col key={blog.id}>
//               <BlogCard {...blog} onClick={() => handleBlogClick(blog.id)} />
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default HomePage;





// src/pages/HomePage.js
import React from 'react';
import { Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap';
import BlogCard from '../../Components/BlogCard';
import NavigationBar from '../../Components/NavigationBar';


const Home = () => {
  const trendingBlogs = [
    { title: 'Blog 1', summary: 'This is the summary of blog 1', rating: 4.5, image: 'image1.jpg', id: 1 },
    { title: 'Blog 2', summary: 'This is the summary of blog 2', rating: 4.0, image: 'image2.jpg', id: 2 },
  ];

  const topRatedBlogs = [
    { title: 'Blog 3', summary: 'This is the summary of blog 3', rating: 5.0, image: 'image3.jpg', id: 3 },
    { title: 'Blog 4', summary: 'This is the summary of blog 4', rating: 4.8, image: 'image4.jpg', id: 4 },
  ];

  const handleBlogClick = (id) => {
    // Handle blog click, redirect to blog page
  };

  return (
    <>
      <NavigationBar />
      <Container fluid className="hero-section text-center bg-dark text-white py-5">
        <h1>Welcome to Our Blog</h1>
        <p>Discover the latest articles, trends, and insights.</p>
        <Form inline className="justify-content-center mt-4">
          <Form.Control type="text" placeholder="Search blogs" className="mr-2" />
          <Button variant="primary">Search</Button>
        </Form>
      </Container>

      <Container>
        <h1 className="mt-5">Trending Blogs</h1>
        <Carousel>
          {trendingBlogs.map((blog) => (
            <Carousel.Item key={blog.id}>
              <BlogCard {...blog} onClick={() => handleBlogClick(blog.id)} />
            </Carousel.Item>
          ))}
        </Carousel>
        <h1 className="mt-5">Top Rated Blogs</h1>
        <Row>
          {topRatedBlogs.map((blog) => (
            <Col key={blog.id}>
              <BlogCard {...blog} onClick={() => handleBlogClick(blog.id)} />
            </Col>
          ))}
        </Row>
        <h1 className="mt-5">Subscribe to our Newsletter</h1>
        <Form className="mt-3">
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Control type="email" placeholder="Enter your email" />
            </Col>
            <Col xs="auto">
              <Button variant="primary">Subscribe</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default Home;
