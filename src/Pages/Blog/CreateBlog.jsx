import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [topicTags, setTopicTags] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);

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
      author: localStorage.getItem('userId'),
      content,
      images
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/blog`, blogData);
      alert('Blog created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Create a New Blog</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter the blog title"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Topic Tags (comma separated)</Form.Label>
          <Form.Control
            type="text"
            value={topicTags}
            onChange={e => setTopicTags(e.target.value)}
            placeholder="e.g. Artificial Intelligence, Technology, Innovation"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control
            type="text"
            value={thumbnail}
            onChange={e => setThumbnail(e.target.value)}
            placeholder="Enter the thumbnail URL"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <ReactQuill value={content} onChange={setContent} />
        </Form.Group>
        <Button variant="primary" onClick={handleShow}>
          Add Image
        </Button>
        <Button variant="success" className="mt-3" onClick={handleSubmit}>
          Create Blog
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
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateBlog;