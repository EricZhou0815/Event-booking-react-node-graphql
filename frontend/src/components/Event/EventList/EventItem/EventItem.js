import React from 'react';
import './EventItem.css';

const eventItem = props => (
    <li key={props.eventId} className="events__list-item">
     <div>
         <h1>{props.title}</h1>
         <h3>${props.price} - {new Date(props.date).toLocaleDateString()}</h3>
 
     </div>
    <div>
        {props.userId===props.creatorId? (<p>You are the owner</p>) : (<button className='btn' onClick={props.onDetail.bind(this,props.eventId)}>Details</button>)}
    </div>
    </li>
);

export default eventItem;