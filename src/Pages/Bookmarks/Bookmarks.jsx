import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { Search, BookmarkFill, SortDown, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../../Context/BookmarkContext';
import NavigationBar from '../../Components/NavigationBar';
import BlogCard from '../../Components/BlogCard';
import './Bookmarks.css';

const Bookmarks = () => {
  const navigate = useNavigate();

  const {
    bookmarks,
    loading,
    clearAllBookmarks,
    getBookmarksCount
  } = useBookmarks();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter and sort bookmarks
  const filteredAndSortedBookmarks = useMemo(() => {
    // Filter bookmarks by search query
    let filtered = bookmarks;
    if (searchQuery && searchQuery.trim() !== '') {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(lowercaseQuery) ||
        bookmark.author?.first_name?.toLowerCase().includes(lowercaseQuery) ||
        bookmark.author?.last_name?.toLowerCase().includes(lowercaseQuery) ||
        bookmark.topic_tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    // Sort the filtered bookmarks
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.bookmarked_at) - new Date(a.bookmarked_at);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          const authorA = `${a.author?.first_name || ''} ${a.author?.last_name || ''}`;
          const authorB = `${b.author?.first_name || ''} ${b.author?.last_name || ''}`;
          return authorA.localeCompare(authorB);
        case 'upvotes':
          return b.upvotes - a.upvotes;
        default:
          return new Date(b.bookmarked_at) - new Date(a.bookmarked_at);
      }
    });
  }, [searchQuery, sortBy, bookmarks]);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleClearAll = () => {
    if (showClearConfirm) {
      clearAllBookmarks();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 5000); // Auto-hide after 5 seconds
    }
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  if (loading) {
    return (
      <>
        <NavigationBar />
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading bookmarks...</span>
          </Spinner>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      <Container className="py-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="mt-5 mb-2" style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c3e50'
          }}>
            <BookmarkFill className="me-3" style={{ color: '#007bff' }} />
            My Bookmarks
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            {getBookmarksCount() === 0
              ? "You haven't bookmarked any blogs yet"
              : `You have ${getBookmarksCount()} bookmarked blog${getBookmarksCount() > 1 ? 's' : ''}`
            }
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <BookmarkFill size={64} className="text-muted mb-3" />
              <h3>No Bookmarks Yet</h3>
              <p className="text-muted mb-4">
                Start bookmarking blogs you love to see them here!
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/blog')}
              >
                Explore Blogs
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            {/* Search and Controls */}
            <Row className="mb-4">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search your bookmarks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text>
                    <SortDown />
                  </InputGroup.Text>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="date">📅 Recently Bookmarked</option>
                    <option value="title">🔤 Title A-Z</option>
                    <option value="author">👤 Author A-Z</option>
                    <option value="upvotes">👍 Most Upvoted</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col md={3}>
                <Button
                  variant={showClearConfirm ? "danger" : "outline-danger"}
                  className="w-100"
                  onClick={handleClearAll}
                  disabled={bookmarks.length === 0}
                >
                  <Trash className="me-2" />
                  {showClearConfirm ? "Confirm Clear All" : "Clear All"}
                </Button>
              </Col>
            </Row>

            {/* Results Info */}
            {searchQuery && (
              <div className="mb-3">
                <Alert variant="info" className="py-2">
                  {filteredAndSortedBookmarks.length === 0
                    ? `No bookmarks match "${searchQuery}"`
                    : `Found ${filteredAndSortedBookmarks.length} bookmark${filteredAndSortedBookmarks.length > 1 ? 's' : ''} matching "${searchQuery}"`
                  }
                </Alert>
              </div>
            )}

            {/* Bookmarks Grid */}
            {filteredAndSortedBookmarks.length === 0 && searchQuery ? (
              <Card className="text-center py-4">
                <Card.Body>
                  <Search size={48} className="text-muted mb-3" />
                  <h4>No Results Found</h4>
                  <p className="text-muted">
                    Try adjusting your search terms or clear the search to see all bookmarks.
                  </p>
                  <Button
                    variant="outline-primary"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row className="bookmark-grid">
                {filteredAndSortedBookmarks.map((bookmark) => (
                  <Col key={bookmark._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <div className="bookmark-item">
                      <BlogCard
                        {...bookmark}
                        onClick={() => handleBlogClick(bookmark._id)}
                      />
                      <div className="bookmark-date text-muted text-center mt-2">
                        <small>
                          Bookmarked: {new Date(bookmark.bookmarked_at).toLocaleDateString('en-IN')}
                        </small>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}

            {/* Footer Info */}
            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                💡 Tip: Click the bookmark icon on any blog card to remove it from your bookmarks
              </p>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Bookmarks;
