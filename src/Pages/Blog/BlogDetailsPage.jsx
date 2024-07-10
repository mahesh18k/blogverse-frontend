// src/pages/BlogDetailsPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const BlogDetailsPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');

    const [blog, setBlog] = useState({
        // Sample data
        id: 1,
        title: 'Blog 1',
        rating: 4.5,
        upvotes: 120,
        downvotes: 10,
        views: 100,
        author: 'Author 1',
        content: 'This is the full content of the blog.',
        image: 'image1.jpg',
    });

    // In a real app, you would fetch the blog details using the id

    useEffect(() => {
        // Fetch blog details including content_id
        axios.get(`/api/blogs/${id}`)
            .then(response => {
                setBlog(response.data);
                return axios.get(`/api/contents/${response.data.content_id}`);
            })
            .then(response => {
                // Sanitize the content before setting it in state
                const sanitizedContent = DOMPurify.sanitize(response.data.content);
                setContent(sanitizedContent);
            })
            .catch(error => {
                console.error("There was an error fetching the blog data!", error);
            });
    }, [id]);

    if (!blog) return <div>Loading...</div>;

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>{blog.title}</h1>
                    <p>by {blog.author}</p>
                    {/* <img src={blog.image} alt={blog.title} style={{ width: '100%' }} />
                    <p>{blog.content}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    <p>Upvotes: {blog.upvotes} | Downvotes: {blog.downvotes}</p>
                    <p>Views: {blog.views}</p>
                    <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogDetailsPage;
