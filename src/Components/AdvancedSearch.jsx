import React, { useState, useEffect, useMemo } from 'react';
import { Form, Row, Col, Button, Badge, InputGroup } from 'react-bootstrap';
import { Search, X, Filter, Calendar } from 'react-bootstrap-icons';

const AdvancedSearch = ({
  blogs,
  onFilteredResults,
  onSortChange,
  currentSort = 'upvotes'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState(currentSort);

  // Extract unique topics from all blogs
  const availableTopics = useMemo(() => {
    const topics = new Set();
    blogs.forEach(blog => {
      if (blog.topic_tags && Array.isArray(blog.topic_tags)) {
        blog.topic_tags.forEach(tag => topics.add(tag));
      }
    });
    return Array.from(topics).sort();
  }, [blogs]);

  // Debounced search with filters
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const filtered = blogs.filter(blog => {
        // Text search
        const matchesSearch = !searchTerm ||
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());

        // Topic filter
        const matchesTopics = selectedTopics.length === 0 ||
          (blog.topic_tags && blog.topic_tags.some(tag => selectedTopics.includes(tag)));

        // Date range filter
        const blogDate = new Date(blog.date_uploaded);
        const matchesDateRange = (!dateRange.start || blogDate >= new Date(dateRange.start)) &&
          (!dateRange.end || blogDate <= new Date(dateRange.end));

        return matchesSearch && matchesTopics && matchesDateRange;
      });

      // Apply sorting
      const sortedFiltered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'upvotes':
            return b.upvotes - a.upvotes;
          case 'views':
            return b.views - a.views;
          case 'date':
            return new Date(b.date_uploaded) - new Date(a.date_uploaded);
          case 'title':
            return a.title.localeCompare(b.title);
          case 'author':
            const authorA = `${a.author?.first_name || ''} ${a.author?.last_name || ''}`;
            const authorB = `${b.author?.first_name || ''} ${b.author?.last_name || ''}`;
            return authorA.localeCompare(authorB);
          default:
            return 0;
        }
      });

      onFilteredResults(sortedFiltered);
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedTopics, dateRange, sortBy, blogs, onFilteredResults]);

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    onSortChange(newSort);
  };

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTopics([]);
    setDateRange({ start: '', end: '' });
    setSortBy('upvotes');
  };

  const hasActiveFilters = searchTerm || selectedTopics.length > 0 || dateRange.start || dateRange.end;

  return (
    <div className="advanced-search-container mb-4">
      {/* Main Search Bar */}
      <Row className="mb-3">
        <Col>
          <InputGroup size="lg">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search blogs by title, author, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: '0',
                fontSize: '1.1rem',
                padding: '12px'
              }}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowAdvanced(!showAdvanced)}
              title="Advanced Filters"
            >
              <Filter /> {showAdvanced ? 'Hide' : 'Filters'}
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="advanced-filters p-3 border rounded bg-light">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold">
                  <Calendar className="me-2" />
                  Date Range
                </Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      placeholder="Start date"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      placeholder="End date"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-bold">Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{ padding: '8px 12px' }}
                >
                  <option value="upvotes">👍 Most Upvoted</option>
                  <option value="views">👁️ Most Viewed</option>
                  <option value="date">📅 Latest First</option>
                  <option value="title">🔤 Title A-Z</option>
                  <option value="author">👤 Author A-Z</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Topic Tags */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Topics</Form.Label>
            <div className="topic-tags-container">
              {availableTopics.map(topic => (
                <Badge
                  key={topic}
                  bg={selectedTopics.includes(topic) ? 'primary' : 'secondary'}
                  className="me-2 mb-2 topic-badge"
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    padding: '8px 12px'
                  }}
                  onClick={() => handleTopicToggle(topic)}
                >
                  {topic}
                  {selectedTopics.includes(topic) && (
                    <X className="ms-1" size={14} />
                  )}
                </Badge>
              ))}
            </div>
          </Form.Group>

          {/* Filter Actions */}
          <Row>
            <Col>
              {hasActiveFilters && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={clearFilters}
                >
                  <X className="me-1" />
                  Clear All Filters
                </Button>
              )}
            </Col>
            <Col className="text-end">
              <small className="text-muted">
                {hasActiveFilters ? 'Active filters applied' : 'No filters applied'}
              </small>
            </Col>
          </Row>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && !showAdvanced && (
        <Row className="mb-2">
          <Col>
            <div className="active-filters-summary">
              <small className="text-muted me-2">Active filters:</small>
              {searchTerm && (
                <Badge bg="info" className="me-1">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedTopics.map(topic => (
                <Badge key={topic} bg="primary" className="me-1">
                  {topic}
                  <X
                    className="ms-1"
                    size={12}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTopicToggle(topic)}
                  />
                </Badge>
              ))}
              {(dateRange.start || dateRange.end) && (
                <Badge bg="success" className="me-1">
                  Date Range
                </Badge>
              )}
              <Button
                variant="link"
                size="sm"
                className="p-0 ms-2"
                onClick={clearFilters}
                style={{ textDecoration: 'none' }}
              >
                Clear all
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdvancedSearch;