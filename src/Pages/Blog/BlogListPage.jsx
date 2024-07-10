// src/pages/BlogListPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import BlogCard from '../../Components/BlogCard'

const BlogListPage = () => {
  const [sortOption, setSortOption] = useState('rating');
  const blogs = [
    // Sample data
    { id: 1, title: 'Blog 1', summary: 'Summary of blog 1', rating: 4.5, views: 100, image: 'image1.jpg' },
    { id: 2, title: 'Blog 2', summary: 'Summary of blog 2', rating: 4.0, views: 150, image: 'image2.jpg' },
    // Add more blogs
  ];

  const sortedBlogs = blogs.sort((a, b) => {
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'views') return b.views - a.views;
    return 0;
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <Container>
      <h1 className="mt-5">All Blogs</h1>
      <Form className="mb-4">
        <Form.Group controlId="sortSelect">
          <Form.Label>Sort by</Form.Label>
          <Form.Control as="select" value={sortOption} onChange={handleSortChange}>
            <option value="rating">Rating</option>
            <option value="views">View Count</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Row>
        {sortedBlogs.map((blog) => (
          <Col key={blog.id}>
            <BlogCard {...blog} onClick={() => window.location.href = `/blog/${blog.id}`} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogListPage;
