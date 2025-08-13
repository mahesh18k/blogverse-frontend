import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { BookmarkFill, Bookmark } from 'react-bootstrap-icons';
import { useBookmarks } from '../Context/BookmarkContext';
import LazyImage from './LazyImage';

const BlogCard = ({ _id, title, author, date_uploaded, topic_tags, thumbnail, upvotes, downvotes, views, onClick }) => {
  const { isBookmarked, toggleBookmark, loading } = useBookmarks();
  
  // Ensure all required fields are present
  if (!_id) {
    console.warn('BlogCard: Missing _id prop', { _id, title });
    return null;
  }
  
  const blogData = {
    _id, title, author, date_uploaded, topic_tags, thumbnail, upvotes, downvotes, views
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent card click when bookmark is clicked
    toggleBookmark(blogData);
  };

  return (
    <>
      <Card style={{ width: '18rem', margin: '1rem', position: 'relative' }}>
        {/* Bookmark Button */}
        <Button
          variant="light"
          size="sm"
          onClick={handleBookmarkClick}
          disabled={loading}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          title={isBookmarked(_id) ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked(_id) ? (
            <BookmarkFill style={{ color: '#007bff', fontSize: '16px' }} />
          ) : (
            <Bookmark style={{ color: '#6c757d', fontSize: '16px' }} />
          )}
        </Button>

        <div style={{ height: '200px', overflow: 'hidden' }} onClick={onClick}>
          <LazyImage
            src={thumbnail}
            alt={`${title} thumbnail`}
            style={{ height: '200px' }}
            className="card-img-top"
            skeletonVariant="card"
          />
        </div>
        <Card.Body onClick={onClick}>
          <Card.Title>{title}</Card.Title>

          <Card.Text as="div">
            <div>Author: {author.first_name} {author.last_name}</div>
            <div>Uploaded: {new Date(date_uploaded).toLocaleDateString('en-IN')}</div>
            <div>Topics: {topic_tags[0]}{topic_tags.length > 1 ? ', ...' : ''} </div>
          </Card.Text>

          <div>Views: {views}</div>

          <Row>
            <Col>
              <div>Upvotes: {upvotes}</div>
            </Col>
            <Col>
              <div>Downvotes: {downvotes}</div>
            </Col>
          </Row>

          <Button variant="primary" className="mt-2">Read More</Button>
        </Card.Body>
      </Card>
    </>
  );
};


export default BlogCard;
