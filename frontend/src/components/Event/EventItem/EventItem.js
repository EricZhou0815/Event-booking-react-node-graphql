import React from 'react';

import './EventItem.css';

const eventItem = props => (
    <li key={props._id} className="event__list-item">
    <div>
      <p>{props.title}</p>
      <p>{props.description}</p>
      <p>${props.price}</p>
      <p>{props.date}</p>
      </div>
      <div>
          <button className="btn">Details</button>
      </div>
    </li>
);

export default eventItem;