// src/Components/BlogCard.jsx

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const BlogCard = ({ title, author, date_uploaded, thumbnail, upvotes, view_count, onClick }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }} onClick={onClick}>
      <Card.Img variant="top" src={thumbnail} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Author: {author.first_name} {author.last_name}</Card.Text>
        <Card.Text>Uploaded: {new Date(date_uploaded).toLocaleDateString()}</Card.Text>
        <Card.Text>Upvotes: {upvotes}</Card.Text>
        <Card.Text>Views: {view_count}</Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
  );
};


export default BlogCard;