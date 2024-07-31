import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap';
import NavigationBar from '../../Components/NavigationBar';
import BlogCard from '../../Components/BlogCard';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import './Home.css';

const Home = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [topRatedBlogs, setTopRatedBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const trendingTopics = ["Technology", "AI"];

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

        setTrendingBlogs(filteredTrendingBlogs);
        setTopRatedBlogs(sortedTopRatedBlogs);
        setAllBlogs(blogs);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (input.trim() !== '') {
      const filtered = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs([]);
    }
  };

  const handleBlogClick = (id) => {
    window.location.href = `/blog/${id}`;
  };

  const renderSearchResults = () => {
    if (filteredBlogs.length === 0) {
      return null;
    }

    return (
      <div className="search-results-dropdown">
        {filteredBlogs.map(blog => (
          <div key={blog._id} className="search-result-item" onClick={() => handleBlogClick(blog._id)}>
            {blog.title}
          </div>
        ))}
      </div>
    );
  };

  const CarouselWithControls = ({ items, title }) => {
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
      <>
        <h1 className="mt-5">{title}</h1>
        <div className="position-relative">
          <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
            {items.map((blog, idx) => (
              <Carousel.Item key={blog._id} interval={3000}>
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
                          <BlogCard {...items[blogIndex]} onClick={() => handleBlogClick(items[blogIndex]._id)} />
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
            className="position-absolute top-50 start-0 translate-middle-y"
            onClick={prev}
            style={{ zIndex: 1 }}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="light"
            className="position-absolute top-50 end-0 translate-middle-y"
            onClick={next}
            style={{ zIndex: 1 }}
          >
            <ChevronRight />
          </Button>
        </div>
      </>
    );
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
                  type="text"
                  placeholder="Search blogs"
                  className="mr-2"
                  value={searchInput}
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
                <Button variant="primary">Search</Button>
              </motion.div>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <CarouselWithControls items={trendingBlogs} title="Trending Blogs" />
        <CarouselWithControls items={topRatedBlogs} title="Top Rated Blogs" />
      </Container>
    </>
  );
};

export default Home;
