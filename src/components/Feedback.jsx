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
        body: JSON.stringify({ "description": feedback, "star": rating }),
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

  if(pendid.length===0){
    return(
    <div className="flex justify-center ml-auto mr-auto mt-4 p-20 bg-gray-300 w-3/4 h- rounded-xl">
            There is no pending feedback
          </div>)
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4">
        
          {pendid.map((req) => (
            <div
              className="flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md border-l-4 border-yellow-400"
              key={req._id}
            >
              <div className="flex justify-between items-center">
                <h6 className="text-xl font-semibold text-gray-800">{req.tag?.name || 'Request'}</h6>
                <button
                  onClick={() => openFeedback(req._id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                >
                  Give Feedback
                </button>
              </div>

              <div className="text-gray-700"><strong>Description:</strong> {req.description}</div>
              <div className="text-gray-700"><strong>Area:</strong> {req.area?.name}</div>
              <div className="text-gray-700"><strong>Status:</strong> {req.status?.name}</div>

              {req.oth_tag && (
                <div className="text-gray-700"><strong>Other Tag:</strong> {req.oth_tag.name}</div>
              )}

              {req.document && (
                <div className="text-gray-700">
                  <strong>Document:</strong>{' '}
                  <a
                    href={req.document.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                </div>
              )}

              {req.photo && (
                <div>
                  <strong className="text-gray-700">Photo:</strong><br />
                  <img
                    src={req.photo.url}
                    alt="Request photo"
                    className="max-w-xs mt-2 rounded"
                  />
                </div>
              )}

              <div className="text-gray-600 text-sm">
                <strong>Created:</strong> {new Date(req.createdAt).toLocaleString()}
              </div>
            </div>))}
        
      </div>
    </>
  )
}
