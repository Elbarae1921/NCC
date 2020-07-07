import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import Auth from '../Auth';
import { InputGroup, Logo, Spinner } from '../../../others';


const StaffAccount = props => {

    // set the state
    const [error, setError] = useState("");
    const [notif, setNotif] = useState("");
    const [spin, setSpin] = useState(false);


    const submit = e => {
        e.preventDefault();
        setError(""); //clear previous errors
        setSpin(true);
        const url = '/api/staff/password'; //set the URL
        axios.post(url, $(e.target).serialize(), { //send http post request to change password
            headers: {
                "authorization": `Bearer ${Auth.getToken}` //set authorization header to authenticate
            }
        }).then(res => {
            if (!res.data.errors) { //if there were no errors
                //password change was successful
                //notify the user that password changed successfully
                setNotif("Password changed successfully. You will be redirected to log in.");
                //set a timeout before logging out
                setTimeout(() => {
                    Auth.logout(() => {
                        props.history.push("/staff/login");
                    });
                }, 2000); //2 seconds
            }
            else {
                setError(res.data.errors[0].msg); //show error
            }
        }).catch(res => { //catch response codes that fall outside of the 2xx range
            if (res.response.status === 403) { //if the status code is 403 Forbidden, then the user must login again
                //notify the user that he must log in again
                setError("You're not logged in, you will be redirected to log in.");
                //set a timeout before logging out
                setTimeout(() => {
                    Auth.logout(() => {
                        props.history.push("/staff/login");
                    });
                }, 2000); //2 seconds
            }
            else { //if there was an error with the server
                setError("It seems there was something wrong with the server.");
            }
        })
        .finally(() => setSpin(false));
    }


    if (!Auth.isLoggedIn) {
        return <Redirect to="/staff/login" />
    }
    return (
        <div className="background-image partner">
            <div className="box-container">
                <div className="back">
                    {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                    <Link to="/staff"> {'<'} </Link>
                </div>
                {/* Logo comonent */}
                <Logo class="pages" />
                <div className="box">
                    <h3>Change password</h3>
                    <form onSubmit={submit}>
                        <InputGroup type="password" text="Old password..." name="oldpass" />
                        <InputGroup type="password" text="New password..." name="newpass" />
                        <InputGroup type="password" text="New password again..." name="confirmation" />
                        <InputGroup type="submit" text="Submit" onClick={() => { }} />
                        <div className="spinnerContainer">
                            <Spinner show={spin} size={20}/>
                        </div>
                        <p className="error">{error}</p>
                        <p className="key">{notif}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StaffAccount
