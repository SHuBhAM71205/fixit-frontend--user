import React, { useState } from 'react';
import '../css/feedback.css';

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);


  const openFeedback = () => {
    setIsOpen(true);
  };

  const closeFeedbackForm = () => {
    setIsOpen(false);
  };

  const submitFeedback = () => {
    console.log('Submitted Feedback:', { rating, feedback });
    setIsOpen(false); // optionally close modal after submission
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <>
      <div className="history-track flex-col">
        <div className="no-history">There is no feedback</div>
        <div className="trackHistory flex-col">
  <div className="hd flex-row">
    <h6 className="request-title">Request Name</h6>
    <button
      className="feedback-btn"
      onClick={openFeedback}
      aria-label="Open Feedback Form"
    >
      Give Feedback
    </button>
  </div>
  <div className="description">
    <strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Aperiam sint unde magni accusamus harum assumenda esse cupiditate vel omnis perferendis...
  </div>
</div>

      </div>

      {isOpen && (
        <div className="feedback-modal" id="feedbackModal">
          <div className="feedback-content">
            <span className="close-btn" onClick={closeFeedbackForm}>&times;</span>
            <h3>Submit Feedback</h3>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((val) => (
                <span
                  key={val}
                  className={`star ${val <= rating ? 'selected' : ''}`}
                  onClick={() => handleStarClick(val)}
                >
                  &#9733;
                </span>
              ))}
            </div>

            <textarea
              id="feedbackText"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button onClick={submitFeedback}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
}
