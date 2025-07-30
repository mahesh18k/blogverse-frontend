import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import BlogCard from '../../Components/BlogCard';
import NavigationBar from '../../Components/NavigationBar';
import AdvancedSearch from '../../Components/AdvancedSearch';


const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOption, setSortOption] = useState('upvotes');
  const [loading, setLoading] = useState(true);
  const [searchResultsCount, setSearchResultsCount] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog`);
        const blogsData = response.data.map(blog => ({
          ...blog,
          author: blog.author || { first_name: 'Unknown', last_name: 'Author' },
        }));
        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
        setSearchResultsCount(blogsData.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleFilteredResults = (filtered) => {
    setFilteredBlogs(filtered);
    setSearchResultsCount(filtered.length);
  };

  const handleSortChange = (newSort) => {
    setSortOption(newSort);
  };

  return (
    <>
      <NavigationBar />
      <Container className="py-4">
        <div className="text-center mb-4">
          <h1 className="mt-5 mb-2" style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c3e50'
          }}>
            📚 Discover Amazing Blogs
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Search through {blogs.length} blogs and find exactly what you're looking for
          </p>
        </div>

        <AdvancedSearch
          blogs={blogs}
          onFilteredResults={handleFilteredResults}
          onSortChange={handleSortChange}
          currentSort={sortOption}
        />

        {/* Results Summary */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              {searchResultsCount === blogs.length
                ? `All Blogs (${searchResultsCount})`
                : `Search Results (${searchResultsCount} of ${blogs.length})`
              }
            </h5>
            {searchResultsCount !== blogs.length && (
              <small className="text-muted">
                Showing filtered results
              </small>
            )}
          </div>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" role="status" size="lg">
              <span className="visually-hidden">Loading blogs...</span>
            </Spinner>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <Alert variant="info" className="text-center py-5">
            <Alert.Heading>🔍 No blogs found</Alert.Heading>
            <p className="mb-0">
              Try adjusting your search criteria or clearing filters to see more results.
            </p>
          </Alert>
        ) : (
          <Row>
            {filteredBlogs.map((blog) => (
              <Col key={blog._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <BlogCard {...blog} onClick={() => window.location.href = `/blog/${blog._id}`} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default BlogListPage;