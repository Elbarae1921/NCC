import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import Auth from './Auth';
import Logo from '../../pagesComponents/common/Logo';
import InputGroup from '../../pagesComponents/common/InputGroup';


export class StaffAccount extends Component {

    // set the state
    state = {
        error: "",
        notif: ""
    }


    error = (err) => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({error: err, notif: this.state.notif});
    }


    unError = () => {
        // clear errors
        this.setState({error: "", notif: this.state.notif});
    }


    notify = not => { //set notification if password change was successful
        //clear errors and set notification
        this.setState({error: "", notif: not});
    }


    submit = e => {
        e.preventDefault();
        this.unError(); //clear previous errors
        const url = '/api/staff/password'; //set the URL
        axios.post(url, $(e.target).serialize(), { //send http post request to change password
            headers: {
                "authorization": `Bearer ${Auth.getToken}` //set authorization header to authenticate
            }
        }).then(res => {
            if(!res.data.errors) { //if there were no errors
                //password change was successful
                //notify the user that password changed successfully
                this.notify("Password changed successfully. You will be redirected to log in.");
                //set a timeout before logging out
                setTimeout(() => {
                    Auth.logout(() => {
                        this.props.history.push("/staff/login");
                    });
                }, 2000); //2 seconds
            }
            else {
                this.error(res.data.errors[0].msg); //show error
            }
        }).catch(res => { //catch response codes that fall outside of the 2xx range
            if(res.response.status === 403) { //if the status code is 403 Forbidden, then the user must login again
                //notify the user that he must log in again
                this.error("You're not logged in, you will be redirected to log in.");
                //set a timeout before logging out
                setTimeout(() => {
                    Auth.logout(() => {
                        this.props.history.push("/staff/login");
                    });
                }, 2000); //2 seconds
            }
            else { //if there was an error with the server
                this.error("It seems there was something wrong with the server.");
            }
        })
    }


    render() {
        if(!Auth.isLoggedIn) {
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
                            <form onSubmit={this.submit}>
                                <InputGroup type="password" text="Old password..." name="oldpass" />
                                <InputGroup type="password" text="New password..." name="newpass" />
                                <InputGroup type="password" text="New password again..." name="confirmation" />
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

export default StaffAccount
