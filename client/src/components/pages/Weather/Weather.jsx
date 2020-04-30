// import components and modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { InputGroup, Logo } from '../../others';

export const Weather = props => {

    // set the state
    const [error, setError] = useState("");


    const submit = e => {
        // submit post request to add a checkin
        e.preventDefault();
        // clear errors
        setError("");
        // GET => http://localhost:5000/api/weather?city=Winterfell
        axios.get(`/api/weather?${$(e.target).serialize()}`)
            .then(res => {
                if (!res.data.errors) { // if everything went fine send the data to the next page (/weather-results)
                    props.history.push({
                        pathname: '/weather-results',
                        state: res.data
                    });
                }
                else { //show error
                    setError(res.data.errors[0].msg);
                }
            })
            .catch(() => { // show network / http error
                setError("It seems there was a problem with the server. Please try again later.")
            });
    }


    return (
        <div className="background-image weather">
            <div className="box-container">
                <div className="back">
                    {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                    <Link to="/"> {'<'} </Link>
                </div>
                {/* Logo component */}
                <Logo class="pages" />
                <div className="box">
                    <form onSubmit={submit}>
                        <InputGroup type="text" text="City..." name="city" />
                        <InputGroup type="submit" text="Submit" onClick={() => { }} />
                        {/* error paragraph, which changes dynamically with the state */}
                        <p className="error">{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
