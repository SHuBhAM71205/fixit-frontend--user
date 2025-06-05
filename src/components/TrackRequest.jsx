import React from 'react'
import '../css/trackRequest.css'

export default function TrackRequest() {
  
  return (
    <div className="request-track flex-col">
  <div className="no-request" /* onLoad is not valid in React, handle differently */>
    There is no service request to show
  </div>

  <div className="track-request flex-col">
    <h6 className="request-title">Request Name</h6>

    <div className="description">
      <strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sint unde magni accusamus harum assumenda esse cupiditate vel omnis perferendis nesciunt, culpa illo, sapiente tempora tempore voluptatum, atque eius accusantium!
    </div>

    <fieldset className="progress-bar-container">
      <legend><h6>Progress Bar</h6></legend>
      <div className="progress-bar"></div>
    </fieldset>
  </div>
</div>

  )
}
