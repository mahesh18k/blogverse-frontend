import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import BlogCard from '../../Components/BlogCard';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blog/user/${userId}`);
        setUserBlogs(response.data);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    fetchProfileData();
    fetchUserBlogs();
  }, [userId]);

  if (!profileData) return <div>Loading...</div>;

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Header as="h5">User Profile</Card.Header>
            <Card.Body>
              <Card.Title>{profileData.username}</Card.Title>
              <Card.Text>
                No. of Blogs Posted: {profileData.total_blogs}
              </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Total Views: {profileData.total_views}</ListGroupItem>
                <ListGroupItem>Total Upvotes: {profileData.total_upvotes}</ListGroupItem>
                <ListGroupItem>Total Downvotes: {profileData.total_downvotes}</ListGroupItem>
              </ListGroup>
              <Button variant="primary" href="/create-blog">Create New Blog</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h3>My Blogs</h3>
          <Row>
            {userBlogs.map(blog => (
              <Col key={blog._id} md={6}>
                <BlogCard
                  title={blog.title}
                  author={blog.author}
                  date_uploaded={blog.date_uploaded}
                  thumbnail={blog.thumbnail}
                  upvotes={blog.upvotes}
                  downvotes={blog.downvotes}
                  view_count={blog.view_count}
                  onClick={() => console.log(`Navigate to blog ${blog._id}`)}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;