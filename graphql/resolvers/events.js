const Event = require('../../models/event');
const User=require('../../models/user');
const {transformEvent}=require('./merge');


module.exports = {
    //get events
    events: async () => {
        try {
            //mongoose provide .populate to get the data along the relationship
            const events = await Event.find(); //.populate('creator')
            return events.map(event => {
                return transformEvent(event);
            });
        } catch (err) {
            throw err;
        };
    },
    //create event
    createEvent: async (args,req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId;
        });
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error('User not found.');
            }
            creator
                .createdEvents
                .push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        };
    },


}