import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import BlogCard from '../../Components/BlogCard';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortOption, setSortOption] = useState('upvotes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/blog');
        const blogsData = response.data.map(blog => ({
          ...blog,
          author: blog.author || { first_name: 'Unknown', last_name: 'Author' },
        }));
        setBlogs(blogsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const sortedBlogs = blogs.sort((a, b) => {
    if (sortOption === 'upvotes') return b.upvotes - a.upvotes;
    if (sortOption === 'views') return b.view_count - a.view_count;
    if (sortOption === 'date') return new Date(b.date_uploaded) - new Date(a.date_uploaded);
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
            <option value="upvotes">Upvotes</option>
            <option value="views">View Count</option>
            <option value="date">Most Recent</option>
          </Form.Control>
        </Form.Group>
      </Form>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
        <Row>
          {sortedBlogs.map((blog) => (
            <Col key={blog._id} md={4}>
              <BlogCard {...blog} onClick={() => window.location.href = `/blog/${blog._id}`} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default BlogListPage;