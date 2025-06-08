import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div>
      <h2 className="mb-4">Feedback Received</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        feedbacks.map((feedback) => (
          <Card key={feedback._id} className="mb-3">
            <Card.Header>
              <strong>{feedback.name}</strong> - {feedback.email}
              <Badge bg="secondary" className="ms-2">
                {new Date(feedback.createdAt).toLocaleString()}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Card.Text>{feedback.message}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default FeedbackList;