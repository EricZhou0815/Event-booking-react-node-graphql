const Event=require('../../models/event');
const User=require('../../models/user');
const {dateToString} = require('../../helpers/date');


//use async style
const events = async eventIds => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIds
            }
        });
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    };
}

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//sue async style
const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id, //user.id is processed by mongoose to stringfy id object
            createdEvents: events.bind(this, user._doc.reatedEvents)
        };
    } catch (err) {
        throw err;
    };
}

// transform attributes of event to string format for display mongoDB date type
// need to convert to string for display mongoDB stores id as ID object, we need
// to convert it to string
const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    };
}

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.event),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    };
}

exports.transformEvent=transformEvent;
exports.transformBooking=transformBooking;