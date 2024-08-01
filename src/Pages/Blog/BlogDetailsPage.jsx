import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';
import NavigationBar from '../../Components/NavigationBar';


const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/${id}`);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);


  const handleUpvote = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/blog/${id}/upvote`);
      setBlog(prevBlog => ({ ...prevBlog, upvotes: prevBlog.upvotes + 1 }));
    } catch (error) {
      console.error('Error upvoting blog:', error);
    }
  };

  const handleDownvote = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/blog/${id}/downvote`);
      setBlog(prevBlog => ({ ...prevBlog, downvotes: prevBlog.downvotes + 1 }));
    } catch (error) {
      console.error('Error downvoting blog:', error);
    }
  };


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
    <>
      <NavigationBar />
      <Container className="my-4 pt-5">
        <h1>{blog.title}</h1>
        <p className="my-1 fs-5">By {blog.author.first_name} {blog.author.last_name}</p>
        <p className="my-1 fs-5">Uploaded on {new Date(blog.date_uploaded).toLocaleDateString('en-IN')}</p>
        <p className="my-1 fs-5">Topics: {blog.topic_tags.join(", ")}</p>
        <Row className="mt-3 pb-4 fs-5">
          <Col>
            <div> <FontAwesomeIcon icon={faEye} /> Views: {blog.views}</div>
          </Col>
          <Col>
            <div> <FontAwesomeIcon icon={faArrowUp} /> Upvotes: {blog.upvotes}</div>
          </Col>
          <Col>
            <div> <FontAwesomeIcon icon={faArrowDown} /> Downvotes: {blog.downvotes}</div>
          </Col>
        </Row>

        <div className="mt-4">
          {renderContent()}
        </div>

        <Row className="my-4">
          <Col>
            <Button variant="success" onClick={handleUpvote}>
              <FontAwesomeIcon icon={faArrowUp} /> Upvote
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={handleDownvote}>
              <FontAwesomeIcon icon={faArrowDown} /> Downvote
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogDetailsPage;
