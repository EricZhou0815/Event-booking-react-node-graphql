import React, {Component} from 'react';

import Modal from '../components/modal/Modal';
import Backdrop from '../components/backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import './Events.css';

import api from '../services/api';

class EventsPage extends Component {
    state = {
        creating: false,
        events:[]
    };

    static contextType=AuthContext;

    constructor(props) {
        super(props);
        this.titleElRef = React.createRef();
        this.priceElRef = React.createRef();
        this.dateElRef = React.createRef();
        this.descriptionElRef = React.createRef();
    }

    componentDidMount(){
        this.fetchEvents();
    }

    /*async componentDidMount(){
        const result=await api.call('post','graphql',{
            query: `
                mutation{
                    createEvents(eventInput:{title:"${title}",description:"${description}",price:${price},date:"${date}"}){
                        _id
                        title
                        price
                        description
                        date
                        creator{
                            _id
                            email
                        }
                    }
                }`
        });

        console.log(result);
    }
    */

    startCreateEventHandler = () => {
        this.setState({creating: true});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const title = this.titleElRef.current.value;
        const price = this.priceElRef.current.value;
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;
        const event={title,price,date,description};

        if (title.trim().length===0 || price<=0 || date.trim().length===0 || description.trim().length===0) {
            return;
        }
        console.log(event);

        const requestBody = {
                query: `
                mutation{
                    createEvents(eventInput:{title:"${title}",description:"${description}",price:${price},date:"${date}"}){
                        _id
                        title
                        price
                        description
                        date
                        creator{
                            _id
                            email
                        }
                    }
                }`
            };

        const token=this.context.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                return res.json()
            })
            .then(resData => {
                this.fetchEvents();
            })
            .catch(err => {
                console.log(err);
            });
    };

    fetchEvents(){
        const requestBody = {
            query: `
            query {
                events {
                    _id
                    title
                    price
                    description
                    date

                }
            }`
        };

    fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json()
        })
        .then(resData => {
            const events=resData.data.events;
            this.setState({events:events});
        })
        .catch(err => {
            console.log(err);
        });
    }

    modalCancelHandler = () => {
        this.setState({creating: false});
    }

    render() {
        const eventList=this.state.events.map(event=>{
            return (<li key={event._id} className="events__list-item">{event.title}</li>);
        });

        return (
            <React.Fragment>
                {this.state.creating && <Backdrop/>}
                {
                    this.state.creating && <Modal
                            title="Add Event"
                            canCancel="canCancel"
                            canConfirm="canConfirm"
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmHandler}>
                            <form>
                                <div className="form-control">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" ref={this.titleElRef} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" id="price" ref={this.priceElRef} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="date">Date</label>
                                    <input type="datetime-local" id="date" ref={this.dateElRef} />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" rows="4" ref={this.descriptionElRef} />
                                </div>
                            </form>
                        </Modal>
                }

                {this.context.token && (                <div className="events-control">
                    <p>Share your excitment!</p>
                    <button className="btn" onClick={this.startCreateEventHandler}>Create Event</button>
                </div>)}
                <ul className="events__list">
                  {eventList}
                </ul>
                
            </React.Fragment>
        );
    }
}

export default EventsPage;