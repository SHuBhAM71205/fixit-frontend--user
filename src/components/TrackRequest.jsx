import React, { useEffect, useState } from 'react';
import '../css/trackRequest.css';
import { useContext } from 'react';
import RequestContext from '../context/requestContext';

const backend = import.meta.env.VITE_backend; // Make sure this is defined in .env

export default function TrackRequest() {
  
  const [loading, setLoading] = useState(true);

  const context = useContext(RequestContext)
  const{getpendingreq,request}=context;
  // Fetch user requests
  useEffect(() => {
    getpendingreq();
    setLoading(false)
  }, []);

  // Helper to map status to progress %
  const getProgressPercent = (statusName) => {
    const map = {
      'Pending': 10,
      'Approved': 40,
      'Assigned': 70,
      'inactive': 100
    };
    return map[statusName] || 0;
  };

  if (loading) {
    return <div className="request-track">Loading your requests...</div>;
  }

  if (!request) {
    return (
      <div className="request-track flex-col">
        <div className="no-request">There is no service request to show</div>
      </div>
    );
  }

  return (
    <div className="request-track flex-col">
      {request
        .filter((req) => req.status?.name === 'inactive')
      .map((req) => (
        <div className="track-request flex-col" key={req. _id}>
          <h6 className="request-title">Request</h6>

          <div className="description">
            <strong>Description:</strong> {req.description}
          </div>

          <div><strong>Area:</strong> {req.area?.name}</div>
          <div><strong>Maintenance Type:</strong> {req.tag?.name}</div>
          <div><strong>Status:</strong> {req.status?.name=='inactive'?'pending':'completed'}</div>
          {req.taskmaster && (
            <div><strong>Assigned To:</strong> {req.taskmaster?.name}</div>
          )}

          <fieldset className="progress-bar-container">
            <legend><h6>Progress</h6></legend>
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar"
                style={{ width: `${getProgressPercent(req.status?.name)}%` }}
              ></div>
            </div>
          </fieldset>
        </div>
      ))}
    </div>
  );
}
