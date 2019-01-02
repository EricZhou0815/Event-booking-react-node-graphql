const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

//use async style
const events = async eventIds => {
    try {
        const events = await Event.find({
            _id: {
                $in: eventIds
            }
        });
        events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
        });
    } catch (err) {
        throw err;
    };
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

module.exports = {
    events: async () => {
        try {
            //mongoose provide .populate to get the data along the relationship
            const events = await Event.find(); //.populate('creator')
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event
                        ._doc
                        ._id
                        .toString(),
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                    //{...event._doc.creator._doc,_id:event._doc.creator.id}
                }; //mongoDB stores id as ID object, we need to convert it to string
            });
        } catch (err) {
            throw err;
        };
    },
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c2c543189232a9fa9eb4a8c'
        });
        let createdEvent;
        try {
            const result = await event.save();

            createdEvent = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById('5c2c543189232a9fa9eb4a8c');
            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        };
    },
    createUser: async args => {
        try {
            //check if the email exists in the database
            const existingUser = await User.findOne({email: args.userInput.email});
            if (existingUser) {
                throw new Error('User exists already.')
            }
            //encrypt input password into hashedPassowrd add return here to make it async
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({email: args.userInput.email, password: hashedPassword});
            const result = await user.save();
            //return password as null for safety reason.
            return {
                ...result._doc,
                _id: result.id,
                password: null
            };
        } catch (err) {
            throw err;
        };

    }

}

/*
//usse promise style
const events = eventIds => {
    return Event
        .find({
            _id: {
                $in: eventIds
            }
        })
        .then(events => {
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator)
                };
            })
        })
        .catch(err => {
            throw err;
        });
}

const user = userId => {
    return User
        .findById(userId)
        .then(user => {
            return {
                ...user._doc,
                _id: user.id,
                createdEvents: events.bind(this, user._doc.reatedEvents)
            };
        })
        .catch(err => {
            throw err;
        });
}

module.exports = {
    events: () => {
        //mongoose provide .populate to get the data along the relationship
        return Event
            .find() //.populate('creator')
            .then(events => {
                return events.map(event => {
                    return {
                        ...event._doc,
                        _id: event
                            ._doc
                            ._id
                            .toString(),
                        date: new Date(event._doc.date).toISOString(),
                        creator: user.bind(this, event._doc.creator)
                        //{...event._doc.creator._doc,_id:event._doc.creator.id}
                    }; //mongoDB stores id as ID object, we need to convert it to string
                });
            })
            .catch(err => {
                throw err;
            });
    },
    createEvent: args => {
        // const event={    _id:Math.random().toString(), title:args.eventInput.title,
        // description:args.eventInput.description, price:+args.eventInput.price, date:
        // args.eventInput.date }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            //mongoDB needs an user id, mongoose can automatically convert id string into id
            creator: '5c2c540241374298a4b84342'
        });
        let createdEvent;
        return event
            .save()
            .then(result => {
                createdEvent = {
                    ...result._doc,
                    _id: result
                        ._doc
                        ._id
                        .toString(),
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, result.doc.creator)
                };
                return User.findById('5c2c540241374298a4b84342')
                //event.id is processed by mongoose to stringfy id object
            })
            .then(user => {
                if (!user) {
                    throw new Error('User not found.');
                }
                user
                    .createdEvents
                    .push(event);
                return user.save();
            })
            .then(result => {
                return createdEvent;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });

        //testing
        console.log(args);
        console.log(event);

        //push the input into created empty events object events.push(event);
        return event;

    },
    createUser: args => {
        //check if the email exists in the database
        return User
            .findOne({email: args.userInput.email})
            .then(user => {
                if (user) {
                    throw new Error('User exists already.')
                }
                //encrypt input password into hashedPassowrd add return here to make it async
                return bcrypt
                    .hash(args.userInput.password, 12)
                    .then(hashedPassword => {
                        const user = new User({email: args.userInput.email, password: hashedPassword});
                        return user.save();
                    })
                    .then(result => {
                        //return password as null for safety reason.
                        return {
                            ...result._doc,
                            _id: result.id,
                            password: null
                        };
                    })
                    .catch(err => {
                        throw err;
                    });
            });

    }

}

*/