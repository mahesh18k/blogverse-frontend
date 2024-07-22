// src/pages/BlogDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blog/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status"> </Spinner>
      </Container>
    );
  }

  if (!blog) {
    return <Container className="text-center">Blog not found</Container>;
  }

  const renderContent = () => {
    const contentParts = blog.content_id.content.split('[IMAGE]');
    return contentParts.map((part, index) => (
      <React.Fragment key={index}>
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(part) }} />
        {index < blog.images.length && (
          <div className="mt-4 text-center">
            <img width={'700px'} height={'400px'} src={blog.images[index]} alt={`Blog ${index + 1}`} />
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Container className="mt-5">
      <h1>{blog.title}</h1>
      <p>By {blog.author.first_name} {blog.author.last_name}</p>
      <p>Uploaded on {new Date(blog.date_uploaded).toLocaleDateString('en-IN')}</p>
      <Row>
        <Col>
          <div>Upvotes: {blog.upvotes}</div>
        </Col>
        <Col>
          <div>Downvotes: {blog.downvotes}</div>
        </Col>
      </Row>
      <div className="mt-4">
        {renderContent()}
      </div>
    </Container>
  );
};

export default BlogDetailsPage;
