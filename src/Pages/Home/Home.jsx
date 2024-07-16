// src/pages/HomePage.jsx
import React from 'react';
import { Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap';
import NavigationBar from '../../Components/NavigationBar';
import BlogCard from '../../Components/BlogCard';

const Home = () => {
  const trendingBlogs = [
    { title: 'Blog 1', author: { first_name: 'Author', last_name: 'One' }, date_uploaded: '2023-07-07T12:00:00Z', thumbnail: 'image1.jpg', upvotes: 120, downvotes: 10, view_count: 300, id: 1 },
    { title: 'Blog 2', author: { first_name: 'Author', last_name: 'Two' }, date_uploaded: '2023-07-07T12:00:00Z', thumbnail: 'image2.jpg', upvotes: 90, downvotes: 5, view_count: 200, id: 2 },
  ];

  const topRatedBlogs = [
    { title: 'Blog 3', author: { first_name: 'Author', last_name: 'Three' }, date_uploaded: '2023-07-07T12:00:00Z', thumbnail: 'image3.jpg', upvotes: 150, downvotes: 8, view_count: 350, id: 3 },
    { title: 'Blog 4', author: { first_name: 'Author', last_name: 'Four' }, date_uploaded: '2023-07-07T12:00:00Z', thumbnail: 'image4.jpg', upvotes: 130, downvotes: 6, view_count: 250, id: 4 },
  ];

  const handleBlogClick = (id) => {
    window.location.href = `/blog/${id}`;
  };

  return (
    <>
      <NavigationBar />
      <Container fluid className="hero-section text-center bg-dark text-white py-5">
        <h1>Welcome to Our Blog</h1>
        <p>Discover the latest articles, trends, and insights.</p>
        <Form className="justify-content-center mt-4">
          <Row className="align-items-center justify-content-center">
            <Col xs="auto">
              <Form.Control type="text" placeholder="Search blogs" className="mr-2" />
            </Col>
            <Col xs="auto">
              <Button variant="primary">Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <h1 className="mt-5">Trending Blogs</h1>
        <Carousel>
          {trendingBlogs.map((blog) => (
            <Carousel.Item key={blog.id}>
              <div>
                <BlogCard {...blog} onClick={() => handleBlogClick(blog.id)} />
              </div>
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