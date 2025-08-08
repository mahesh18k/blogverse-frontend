import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../../Components/BlogCard';
import NavigationBar from '../../Components/NavigationBar';
import AdvancedSearch from '../../Components/AdvancedSearch';
import Pagination from '../../Components/Pagination';


const BlogListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortOption, setSortOption] = useState('upvotes');
  const [loading, setLoading] = useState(true);
  const [searchResultsCount, setSearchResultsCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt(searchParams.get('page'));
    return page > 0 ? page : 1;
  });

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const items = parseInt(searchParams.get('per_page'));
    return [6, 12, 24, 48].includes(items) ? items : 12;
  });

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

  // Calculate paginated blogs
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBlogs.slice(startIndex, endIndex);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  const handleFilteredResults = useCallback((filtered) => {
    setFilteredBlogs(filtered);
    setSearchResultsCount(filtered.length);

    // Only reset to first page if the current page would be out of bounds
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', '1');
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams, currentPage, itemsPerPage]);

  const handleSortChange = useCallback((newSort) => {
    setSortOption(newSort);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearchParams]);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('per_page', newItemsPerPage.toString());
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

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
        <div className="mb-4">
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
          <>
            {/* Blog Grid */}
            <Row className="mb-4 blog-grid-container">
              {paginatedBlogs.map((blog) => (
                <Col key={blog._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <BlogCard {...blog} onClick={() => window.location.href = `/blog/${blog._id}`} />
                </Col>
              ))}
            </Row>

            {/* Pagination Component */}
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalItems={searchResultsCount}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                showInfo={true}
                showItemsPerPage={true}
              />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default BlogListPage;