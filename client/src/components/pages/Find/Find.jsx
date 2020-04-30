//import models and components
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import {InputGroup, Logo} from '../../others';

export const Find = props => {

    // set the state
    const [error, setError] = useState("");


    const submit = e => {
        // submit post request to add a checkin
        e.preventDefault();
        // clear errors
        setError("");
        // GET => http://localhost:5000/api/person?firstName&familyName&city
        axios.get(`/api/checkin?${$(e.target).serialize()}`)
            .then(res => {
                if(!res.data.errors) { // if there are no errors
                    props.history.push({ // redirect to the results page
                        pathname: '/results',
                        state: res.data // send data to the results page/component as a state object
                    });
                }
                else { // if there are errors
                    setError(res.data.errors[0].msg); // show error
                }
            })
            .catch(() => { // if the http request failed
                setError("It seems there was a problem with the server. Please try again"); // show error
            })       
    }


    return (
        <div className="background-image find">
            <div className="box-container">
                <div className="back">
                    {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                    <Link to="/"> {'<'} </Link>
                </div>
                {/* Logo comonent */}
                <Logo class="pages" />
                <div className="box find">
                    <h3>Who are you looking for ?</h3>
                    {/* set onsubmit event */}
                    <form onSubmit={submit}>
                            {/* I set the InputGroup to take values like input elements, and it's just an input elemnt wrapped in a div*/}
                            <InputGroup type="text" text="Family Name..." name="familyName"  />
                            <InputGroup type="text" text="First Name..." name="firstName"  />
                            <InputGroup type="text" text="City..." name="city"  />
                            <InputGroup type="submit" text="Submit"  onClick={() => {}} />
                            {/* This pragaraph is bound with error property of the state object, and will change whenever it changes */}
                            <p className="error">{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
