import React, { useEffect, useState } from 'react';
import '../css/feedback.css';

const backend = import.meta.env.VITE_backend;

export default function Feedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [pendid, setid] = useState([]);
  const [rating, setRating] = useState(0);
  const [selectedReqId, setSelectedReqId] = useState(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await fetch(`${backend}/api/user/pendingfeedback`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0MDA1M2I4MDdiNTI1MWU1NTRmN2ViIn0sImlhdCI6MTc0OTA1MzQ2M30.1_GSrZDEN11n4DQaxAdFv7OkCjeRIdhojXCypyFBTiU',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setid(data.pending); // Expecting [{ _id, description, tag, status, etc. }]
        } else {
          console.error('Error fetching requests:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPending();
  }, []);

  const openFeedback = (reqId) => {
    setSelectedReqId(reqId);
    setIsOpen(true);
  };

  const closeFeedbackForm = () => {
    setIsOpen(false);
    setFeedback('');
    setRating(0);
  };

  const submitFeedback = async () => {
    try {
      const res = await fetch(`${backend}/api/user/givefeedback/${selectedReqId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0MDA1M2I4MDdiNTI1MWU1NTRmN2ViIn0sImlhdCI6MTc0OTA1MzQ2M30.1_GSrZDEN11n4DQaxAdFv7OkCjeRIdhojXCypyFBTiU',
        },
        body: JSON.stringify({ "description":feedback, "star":rating }),
      });

      const data = await res.json();
      if (res.ok) {
        setid((prev) => prev.filter((req) => req._id !== selectedReqId));
        closeFeedbackForm();
      } else {
        console.error('Error submitting feedback:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <>
      <div className="history-track flex-col">
        {pendid.length === 0 ? (
          <div className="no-history">There is no pending feedback</div>
        ) : (
          pendid.map((req) => (
            <div className="trackHistory flex-col" key={req._id}>
              <div className="hd flex-row space-between">
                <h6 className="request-title">{req.tag?.name || 'Request'}</h6>
                <button className="feedback-btn" onClick={() => openFeedback(req._id)}>
                  Give Feedback
                </button>
              </div>

              <div className="description"><strong>Description:</strong> {req.description}</div>
              <div><strong>Area:</strong> {req.area?.name}</div>
              <div><strong>Status:</strong> {req.status?.name}</div>

              {req.oth_tag && <div><strong>Other Tag:</strong> {req.oth_tag.name}</div>}

              {req.document && (
                <div>
                  <strong>Document:</strong>{' '}
                  <a href={req.document.url} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </div>
              )}

              {req.photo && (
                <div>
                  <strong>Photo:</strong><br />
                  <img
                    src={req.photo.url}
                    alt="Request photo"
                    style={{ maxWidth: '200px', borderRadius: '8px', marginTop: '5px' }}
                  />
                </div>
              )}

              <div><strong>Created:</strong> {new Date(req.createdAt).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>

      {isOpen && (
        <div className="feedback-modal" id="feedbackModal">
          <div className="feedback-content">
            <span className="close-btn" onClick={closeFeedbackForm}>
              &times;
            </span>
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
