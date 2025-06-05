import React from 'react'

export default function Hystory() {
  return (
    <div className="history-track flex-col">
        <div className="no-history">There is no feedback</div>
        <div className="trackHistory flex-col">
          <div className="hd flex-row">
            <h6 className="request-title">Request Name</h6>
           
          </div>
          <div className="description">
            <strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aperiam sint unde magni accusamus harum assumenda esse cupiditate vel omnis perferendis...
          </div>
        </div>

      </div>

  )
}
