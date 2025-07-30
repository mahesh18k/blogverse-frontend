import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Form, Button, Spinner } from 'react-bootstrap';
import NavigationBar from '../../Components/NavigationBar';
import BlogCard from '../../Components/BlogCard';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import './Home.css';


// CarouselWithControls Component
const CarouselWithControls = React.memo(({ items, title, loading }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 3) % items.length);
  };

  const prev = () => {
    setIndex((prevIndex) => (prevIndex - 3 + items.length) % items.length);
  };

  return (
    <div className="blog-section">
      <h1 className="mt-5 mx-5">{title}</h1>

      <div className="position-relative">
        {loading ? (
          <Spinner animation="border" role="status" className="m-auto spinner-container">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Button
              variant="light"
              className="position-absolute top-50 start-0 translate-middle-y"
              onClick={prev}
              style={{ zIndex: 1 }}
            >
              <ChevronLeft />
            </Button>

            <Carousel className="carousel" activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
              {items.map((blog, idx) => (
                <Carousel.Item key={blog._id} interval={10000}>
                  <Row>
                    {[0, 1, 2].map((offset) => {
                      const blogIndex = (idx + offset) % items.length;
                      return (
                        <Col key={blogIndex}>
                          <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                          >
                            <BlogCard {...items[blogIndex]} onClick={() => window.location.href = `/blog/${items[blogIndex]._id}`} />
                          </motion.div>
                        </Col>
                      );
                    })}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>

            <Button
              variant="light"
              className="position-absolute top-50 end-0 translate-middle-y"
              onClick={next}
              style={{ zIndex: 1 }}
            >
              <ChevronRight />
            </Button>
          </>
        )}
      </div>
    </div>
  );
});



const Home = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [topRatedBlogs, setTopRatedBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog`)
      .then(response => {
        const blogs = response.data;

        const filteredTrendingBlogs = blogs.filter(blog =>
          blog.topic_tags.some(tag => trendingTopics.includes(tag))
        );

        const sortedTopRatedBlogs = [...blogs]
          .sort((a, b) => b.upvotes - a.upvotes)
          .slice(0, 10);

        setTrendingTopics(["Technology", "AI"]);
        setTrendingBlogs(filteredTrendingBlogs);
        setTopRatedBlogs(sortedTopRatedBlogs);
        setAllBlogs(blogs);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [trendingTopics]);

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (input.trim() !== '') {
      const filtered = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.author?.first_name?.toLowerCase().includes(input.toLowerCase()) ||
        blog.author?.last_name?.toLowerCase().includes(input.toLowerCase()) ||
        (blog.topic_tags && blog.topic_tags.some(tag =>
          tag.toLowerCase().includes(input.toLowerCase())
        ))
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs([]);
    }
  };

  const renderSearchResults = () => {
    if (filteredBlogs.length === 0) {
      return null;
    }

    return (
      <div className="search-results-dropdown">
        {filteredBlogs.slice(0, 30).map((blog, index) => (
          <div key={blog._id} className="search-result-item" onClick={() => handleBlogClick(blog._id)}>
            {blog.title}
          </div>
        ))}
      </div>
    );
  };

  const handleBlogClick = (id) => {
    window.location.href = `/blog/${id}`;
  };

  return (
    <>
      <NavigationBar />
      <Container fluid className="hero-section text-center bg-dark text-white py-5">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>Welcome to BlogVerse</h1>
          <p>Discover the latest articles, trends, and insights.</p>
        </motion.div>
        <Form className="justify-content-center mt-4 position-relative">
          <Row className="align-items-center justify-content-center">
            <Col xs="auto" className="position-relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Form.Control
                  id="search"
                  type="text"
                  placeholder="Search blogs by title, author, or topics..."
                  className="mr-2"
                  value={searchInput}
                  style={{
                    width: '25rem',
                    borderRadius: '25px',
                    padding: '12px 20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    fontSize: '1rem'
                  }}
                  onChange={handleSearchChange}
                />
                {renderSearchResults()}
              </motion.div>
            </Col>
            <Col xs="auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Button
                  variant="primary"
                  style={{
                    borderRadius: '25px',
                    padding: '12px 24px',
                    fontWeight: '600',
                    border: 'none',
                    backgroundColor: '#007bff',
                    fontSize: '1rem'
                  }}
                  onClick={() => {
                    window.location.href = '/blog';
                  }}
                >
                  Search
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container fluid>
        <CarouselWithControls items={trendingBlogs} title="Trending Blogs" loading={loading} />
        <CarouselWithControls items={topRatedBlogs} title="Top Rated Blogs" loading={loading} />
      </Container>
    </>
  );
};

export default Home;