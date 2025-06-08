import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const FeedbackForm = ({ onNewFeedback }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/feedback', formData);
      onNewFeedback(response.data);
      setFormData({ name: '', email: '', message: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit feedback');
    }
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">Submit Feedback</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Feedback submitted successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Enter your feedback"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;