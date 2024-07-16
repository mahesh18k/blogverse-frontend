import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const BlogCard = ({ title, author, date_uploaded, thumbnail, upvotes, downvotes, view_count, onClick }) => {
  return (
    <>
    <Card style={{ width: '18rem', margin: '1rem' }} onClick={onClick}>
      <Card.Img variant="top" src={thumbnail} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Card.Text>
          <div>Author: {author.first_name} {author.last_name}</div>
          <div>Uploaded: {new Date(date_uploaded).toLocaleDateString()}</div>
        <Row>
          <Col>
            <div>Upvotes: {upvotes}</div>
          </Col>
          <Col>
            <div>Downvotes: {downvotes}</div>
          </Col>
        </Row>
        <div>Views: {view_count}</div>
        </Card.Text>

        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
    </>
  );
};

export default BlogCard;
