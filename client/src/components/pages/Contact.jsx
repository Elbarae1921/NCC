import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { InputGroup, Logo } from '../others';

export const Contact = () => {

    const [error, setError] = useState("");
    const [notif, setNotif] = useState("");

    const submit = e => {
        // submit post request to send message
        e.preventDefault();
        // clear errors
        setError("");
        // POST => http://localhost:5000/api/checkin
        axios.post('/api/contact', $(e.target).serialize())
            .then(res => {
                if (!res.data.errors) { // if there are no errors
                    setNotif("We recieved your message successfully, you'll recieve an email shortly.");
                }
                else { // if there are errors
                    setError(res.data.errors[0].msg); // show error
                }
            })
            .catch(() => { // if the http request failed
                setError("It seems there was a problem with the server. Please try again"); // show error
            });
    }


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
                    <form onSubmit={submit}>
                        <InputGroup type="text" text="Name..." name="name" />
                        <InputGroup type="email" text="Email..." name="email" />
                        <InputGroup type="text-area" text="Your message..." name="message" />
                        <InputGroup type="submit" text="Submit" onClick={() => { }} />
                        <p className="error">{error}</p>
                        <p className="key">{notif}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
