const DataLoader=require('dataloader');
const Event=require('../../models/event');
const User=require('../../models/user');
const {dateToString} = require('../../helpers/date');


const eventLoader=new DataLoader(eventIds=>{
    return events(eventIds);
});

const userLoader=new DataLoader(userIds=>{
    return User.find({_id:{$in:userIds}});
});

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
        //use dataloader as cache to store data of previous request to reduce request to ther server
        const event=await eventLoader.load(eventId.toString());
        return event;
        //const event = await Event.findById(eventId);
        //return transformEvent(event);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

//sue async style
const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id, //user.id is processed by mongoose to stringfy id object
            createdEvents:()=>eventLoader.loadMany(user._doc.createdEvents)
            //createdEvents: events.bind(this, user._doc.createdEvents)
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