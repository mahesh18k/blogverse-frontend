import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import NavigationBar from '../../Components/NavigationBar';
import { toast } from 'react-toastify';

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
    if (!imageURL.trim()) {
      toast.error('Please enter a valid image URL.');
      return;
    }
    const imgTag = `[IMAGE]`;
    setContent(prevContent => `${prevContent}\n\n${imgTag}\n\n`);
    setImages([...images, imageURL]);
    setImageURL('');
    toast.info('Image added to your blog content.');
    handleClose();
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      toast.error('Please enter a blog title.');
      return;
    }
    if (!topicTags.trim()) {
      toast.error('Please enter topic tags.');
      return;
    }
    if (!thumbnail.trim()) {
      toast.error('Please enter a thumbnail URL.');
      return;
    }
    if (!content.trim()) {
      toast.error('Please add content to your blog.');
      return;
    }

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
              toast.success('Blog created successfully! Your amazing content is now live.');
      
      // Reset form
      setTitle('');
      setTopicTags('');
      setThumbnail('');
      setContent('');
      setImages([]);
    } catch (error) {
      console.error('Error creating blog:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create blog. Please try again.';
              toast.error(errorMessage);
    }
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
      <h1 className='py-4'>Create a New Blog</h1>
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
          <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} />
        </Form.Group>
        <Button variant="primary" className="mt-3 mx-2" onClick={handleShow}>
          Add Image
        </Button>
        <Button variant="success" className="mt-3 mx-2" onClick={handleSubmit}>
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