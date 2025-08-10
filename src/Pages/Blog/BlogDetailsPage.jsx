import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BookmarkFill, Bookmark, Share } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios';
import NavigationBar from '../../Components/NavigationBar';
import LazyImage from '../../Components/LazyImage';
import { useBookmarks } from '../../Context/BookmarkContext';
import { toast } from 'react-toastify';


const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isBookmarked, toggleBookmark, loading: bookmarkLoading } = useBookmarks();


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
      toast.success('👍 Thanks for your upvote! Your support means a lot.');
    } catch (error) {
      console.error('Error upvoting blog:', error);
      toast.error('❌ Unable to upvote. Please try again later.');
    }
  };

  const handleDownvote = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/blog/${id}/downvote`);
      setBlog(prevBlog => ({ ...prevBlog, downvotes: prevBlog.downvotes + 1 }));
      toast.success('👎 Feedback noted. Thanks for helping improve content quality.');
    } catch (error) {
      console.error('Error downvoting blog:', error);
      toast.error('❌ Unable to downvote. Please try again later.');
    }
  };

  const handleBookmarkToggle = () => {
    if (blog) {
      toggleBookmark(blog);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: blog?.title || 'Check out this blog!',
      text: `Read "${blog?.title}" on BlogVerse`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('📤 Blog shared successfully!');
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('🔗 Blog link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing blog:', error);
      // Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('🔗 Blog link copied to clipboard!');
      } catch (clipboardError) {
        toast.error('❌ Unable to share blog. Please try again.');
      }
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
            <div style={{
              maxWidth: '700px',
              height: '400px',
              margin: '0 auto',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <LazyImage
                src={blog.images[index]}
                alt={`Blog content image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%'
                }}
                className="img-fluid"
                skeletonVariant="banner"
              />
            </div>
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
          <Col xs={6} md={3}>
            <Button variant="success" onClick={handleUpvote} className="w-100">
              <FontAwesomeIcon icon={faArrowUp} /> Upvote
            </Button>
          </Col>
          <Col xs={6} md={3}>
            <Button variant="danger" onClick={handleDownvote} className="w-100">
              <FontAwesomeIcon icon={faArrowDown} /> Downvote
            </Button>
          </Col>
          <Col xs={6} md={3}>
            <Button
              variant={isBookmarked(id) ? "primary" : "outline-primary"}
              onClick={handleBookmarkToggle}
              disabled={bookmarkLoading}
              className="w-100"
            >
              {isBookmarked(id) ? <BookmarkFill /> : <Bookmark />}
              {' '}
              {isBookmarked(id) ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </Col>
          <Col xs={6} md={3}>
            <Button variant="outline-secondary" onClick={handleShare} className="w-100">
              <Share /> Share
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogDetailsPage;
