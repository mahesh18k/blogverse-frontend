import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import NavigationBar from '../../Components/NavigationBar';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const quillRef = useRef(null);

    const [title, setTitle] = useState('');
    const [topicTags, setTopicTags] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/${id}`);
                const { title, topic_tags, thumbnail, content, images } = response.data;
                setTitle(title);
                setTopicTags(topic_tags.join(', '));
                setThumbnail(thumbnail);
                setContent(content); // Ensure content is set here
                setImages(images);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchBlogData();
    }, [id]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleImageInsert = () => {
        const imgTag = `[IMAGE]`;
        setContent(prevContent => `${prevContent}\n\n${imgTag}\n\n`);
        setImages([...images, imageURL]);
        setImageURL('');
        handleClose();
    };

    const handleSubmit = async () => {
        const topicTagsArray = topicTags.split(',').map(tag => tag.trim());

        const blogData = {
            thumbnail,
            title,
            topic_tags: topicTagsArray,
            content,
            images
        };

        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/blog/${id}`, blogData);
            alert('Blog updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean']
        ]
    };

    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'link', 'image', 'align'
    ];

    return (
        <Container className="mt-5">
            <NavigationBar />
            <h1 className='py-4'>Edit Blog</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter the blog title"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Topic Tags (comma separated) <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        value={topicTags}
                        onChange={e => setTopicTags(e.target.value)}
                        placeholder="e.g. Artificial Intelligence, Technology, Innovation"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Thumbnail URL <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        value={thumbnail}
                        onChange={e => setThumbnail(e.target.value)}
                        placeholder="Enter the thumbnail URL"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content <span style={{ color: 'red' }}>*</span></Form.Label>
                    <ReactQuill
                        ref={quillRef}
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                    />
                </Form.Group>
                <Button variant="primary" className="mt-3 mx-2" onClick={handleShow}>
                    Add Image
                </Button>
                <Button variant="success" className="mt-3 mx-2" onClick={handleSubmit}>
                    Update Blog
                </Button>
                <Button variant="secondary" className="mt-3 mx-2" onClick={handleCancel}>
                    Cancel
                </Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Image URL</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            value={imageURL}
                            onChange={e => setImageURL(e.target.value)}
                            placeholder="Enter image URL"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleImageInsert}>
                        Add Image
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default EditBlog;
