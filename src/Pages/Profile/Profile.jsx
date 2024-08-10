import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { faUser, faBlog, faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import BlogCard from '../../Components/BlogCard';
import NavigationBar from '../../Components/NavigationBar';
import { Link } from 'react-router-dom';
import './Profile.css';


const Profile = () => {
  const [userName, setUserName] = useState('Unknown User');
  const [profileData, setProfileData] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/username/${userId}`);
          if (response.status === 200) {
            setUserName(response.data.userName);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserName();
    fetchProfileData();
  }, [userId]);

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/blog/${blogId}`);
      window.location.reload(); // Refresh the page to display changes
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <>
      <NavigationBar />
      <Container fluid className="profile-container mt-5">
        <Row>
          <Col md={4} className="profile-section">
            <Card className="profile-card">
              <Card.Header as="h5">
                <FontAwesomeIcon icon={faUser} /> User Profile
              </Card.Header>
              <Card.Body>
                <Card.Title>{userName}</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem><FontAwesomeIcon icon={faBlog} /> Blogs Posted: {profileData.total_blogs.length}</ListGroupItem>
                  <ListGroupItem><FontAwesomeIcon icon={faEye} /> Total Views: {profileData.total_views}</ListGroupItem>
                  <ListGroupItem><FontAwesomeIcon icon={faThumbsUp} /> Total Upvotes: {profileData.total_upvotes}</ListGroupItem>
                  <ListGroupItem><FontAwesomeIcon icon={faThumbsDown} /> Total Downvotes: {profileData.total_downvotes}</ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8} className="blog-section-profile">
            <h3 className="my-4">My Blogs</h3>
            <Row className="blog-grid">
              {profileData.total_blogs.length === 0 ? (
                <Col>
                  <p className="my-4 fs-5">No Blogs are Posted</p>
                </Col>
              ) : (
                profileData.total_blogs.map((blog, index) => (
                  <Col key={index} xs={12} sm={6} md={6} lg={6} xl={6} className="mb-4">
                    <BlogCard {...blog} onClick={() => window.location.href = `/blog/${blog._id}`} />
                    <div className="d-flex justify-content-center mt-2">
                      <Link to={`/editblog/${blog._id}`}>
                        <Button variant="secondary" className="me-2">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => handleDeleteBlog(blog._id)}>
                        Delete
                      </Button>
                    </div>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
