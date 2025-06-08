import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleNewFeedback = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <FeedbackForm onNewFeedback={handleNewFeedback} />
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </div>
    </div>
  );
}

export default App;