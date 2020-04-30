import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';
import Auth from '../Auth';
import { InputGroup, Logo } from '../../../others';

const StaffLogin = props => {

    // set the state
    const [error, setError] = useState("");


    const submit = e => {
        e.preventDefault();
        setError(""); //clear any previous errors
        Auth.login($(e.target).serialize(), err => { //do a login attempt

            if (err) { //check for errors during login
                setError(err); //display error
            }
            else { //if the login was succeful
                props.history.push("/staff"); //redirect to staff home
            }
        });
    }


    if (Auth.isLoggedIn) //if user is already logged in
        return <Redirect to="/staff/" />

    return (
        <div className="background-image partner">
            <div className="box-container">
                <div className="back">
                    {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                    <Link to="/"> {'<'} </Link>
                </div>
                {/* Logo comonent */}
                <Logo class="pages" />
                <div className="box">
                    <h3>Login</h3>
                    <form onSubmit={submit}>
                        <InputGroup type="email" text="email..." name="email" />
                        <InputGroup type="password" text="Password..." name="password" />
                        <InputGroup type="submit" text="Submit" onClick={() => { }} />
                        <p className="error">{error}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StaffLogin
