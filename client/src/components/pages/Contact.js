import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import InputGroup from './../pagesComponents/common/InputGroup';
import Logo from './../pagesComponents/common/Logo';

export class Contact extends Component {

    state = {
        error: "",
        notif: ""
    }

    error = (err) => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({error: err});
    }

    unError = () => {
        // clear errors
        this.setState({error: ""});
    }

    notify = not => { //set notification if message was successfully sent
        //clear errors and set notification
        this.setState({error: "", notif: not});
    }

    submit = e => {
        // submit post request to send message
        e.preventDefault();
        // clear errors
        this.unError();
        // POST => http://localhost:5000/api/checkin
        axios.post('/api/contact', $(e.target).serialize())
            .then(res => {
                if(!res.data.errors) { // if there are no errors
                    this.notify("We recieved your message successfully, you'll recieve an email shortly.");
                }
                else { // if there are errors
                    this.error(res.data.errors[0].msg); // show error
                }
            })
            .catch(() => { // if the http request failed
                this.error("It seems there was a problem with the server. Please try again"); // show error
            });
    }


    render() {
        return (
            <div class="background-image partner">
                <div class="box-container partner">
                    <div className="back">
                        {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                        <Link to="/"> {'<'} </Link>
                    </div>
                    {/* Logo comonent */}
                    <Logo class="pages" />

                    <div class="box">
                        <h3>Please send your message, we'll make sure to respond</h3>
                        <form onSubmit={this.submit}>
                            <InputGroup type="text" text="Name..." name="name" />
                            <InputGroup type="email" text="Email..." name="email" />
                            <InputGroup type="text-area" text="Your message..." name="message" />
                            <InputGroup type="submit" text="Submit"  onClick={() => {}} />
                            <p className="error">{this.state.error}</p>
                            <p className="key">{this.state.notif}</p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
