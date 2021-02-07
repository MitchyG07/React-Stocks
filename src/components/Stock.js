import React from 'react'

const Stock = (props) => (
  <div>


    <div onClick={() => props.clickEvent(props.deets)} className="card">
      <div className="card-body">
        <h5 className="card-title">{
            props.deets.name
          }</h5>
        <p className="card-text">
          {props.deets.ticker}: {props.deets.price}
          </p>
      </div>
    </div>
    

  </div>
);

export default Stock
