// src/components/BlogCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const BlogCard = ({ title, summary, rating, image, onClick }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }} onClick={onClick}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{summary}</Card.Text>
        <div>Rating: {rating}</div>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
