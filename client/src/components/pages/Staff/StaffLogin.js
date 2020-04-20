import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import $ from 'jquery';
import Auth from './Auth';
import Logo from '../../pagesComponents/common/Logo';
import InputGroup from '../../pagesComponents/common/InputGroup';

export class StaffLogin extends Component {

    // set the state
    state = {
        error: ""
    }


    error = (err) => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({error: err});
    }


    unError = () => {
        // clear errors
        this.setState({error: ""});
    }


    submit = e => {
        e.preventDefault();
        this.unError(); //clear any previous errors
        Auth.login($(e.target).serialize(), err => { //do a login attempt

            if(err) { //check for errors during login
                this.error(err); //display error
            }
            else { //if the login was succeful
                this.props.history.push("/staff"); //redirect to staff home
            }
        });
    }

    render() {
        if(Auth.isLoggedIn) {
            return <Redirect to="/staff/" />
        }
        else {
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
                            <form onSubmit={this.submit}>
                                <InputGroup type="email" text="email..." name="email" />
                                <InputGroup type="password" text="Password..." name="password" />
                                <InputGroup type="submit" text="Submit"  onClick={() => {}} />   
                                <p className="error">{this.state.error}</p>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default StaffLogin
