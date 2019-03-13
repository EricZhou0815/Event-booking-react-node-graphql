import React from 'react';
import EventItem from './EventItem/EventItem';

import './EventList.css';

const eventList = props => {
    const events = props
        .events
        .map(event => {
            return <EventItem
                key={event._id}
                eventId={event._id}
                title={event.title}
                description={event.description}
                price={event.price}
                date={event.date} 
                creator={event.creator._id}
                authUserId={props.authUserId}/>;
        });

    return <ul className="event__list">{events}</ul>;

}

export default eventList;

