import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';
import Logo from '../../pagesComponents/common/Logo';
import InputGroup from '../../pagesComponents/common/InputGroup';
import Auth from './Auth';

export class StaffContacts extends Component {

    state = {
        contacts: [],
        error: ""
    }

    error = (err) => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({contacts: this.state.contacts, error: err});
    }

    unError = () => {
        // clear errors
        this.setState({contacts: this.state.contacts, error: ""});
    }

    getContacts = e => {
        this.unError(); //clear errors
        const url = e.target.value.trim() ? `/api/staff/contact?match=${e.target.value.trim()}` : '/api/staff/contact'; //make api call
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${Auth.getToken}` //send login token
            }
        }).then(res => {
            if(!res.data.errors) {
                this.setState({contacts: res.data.contacts, error: ""}); //get data
            }
            else {
                this.error("There was an error with the server.") //in case of error
            }
        }).catch(err => {
            if(err.response.status === 403) { //if Forbidden it means the token is invalid
                Auth.logout(() => {
                    this.props.history.push("/staff/login"); //redirect to login
                });
            }
        })
    }

    deleteContact = e => { //contact delete event
        const id = e.target.id || ''; //get the contact id from the button
        axios.delete('/api/staff/contact', {data: querystring.stringify({id}), headers: { //make an http delete request
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': `Bearer ${Auth.getToken}` //send login token
        }})
        .then(res => {
            if(!res.data.errors) { //if the contacts was deleted successfully or was not found, remove it from the list
                this.setState({error: this.state.error, contacts: this.state.contacts.filter(contact => contact.id !== id)});
            }
            else { //if there was an error, make an alert
                alert(res.data.errors[0].msg);
            }
        })
        .catch(err => { //catch network errors and http response codes that fall outside 2xx

            if(err.response.status === 403) { //if the request was forbidden, redirect to login
                Auth.logout(() => {
                    this.props.history.push("/staff/login");
                });
            }
            else { //if there was a network or server error
                alert("It seems there was an error with the server.");
            }
        });
    }

    render() {
        if(!Auth.isLoggedIn) {
            return <Redirect to="/staff/login" />
        }
        return (
            <div className="background-image checkin">
                <div className="box-container">
                    <div className="back">
                        {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                        <Link to="/staff"> {'<'} </Link>
                    </div>
                    {/* Logo component */}
                    <Logo class="pages" />
                    <div>
                        <h1>CONTACTS</h1>
                        <InputGroup  type="text" text="Email or Name..." name="match" onchange={this.getContacts} />
                        <p className="error">{this.state.error}</p>
                    </div>
                    <div className="box confirmation">
                        {
                            // maps every contact in the contacts array into JSX result (updates with the state)
                            this.state.contacts.map(contact => {
                                return (
                                    <div key={contact.id} className="conf-container result">
                                        <div className="result-title">
                                            <h4 className="name">{contact.name}</h4>
                                            <h5 style={{textAlign: "left", fontFamily: "Roboto Mono"}} className="name">{contact.email}</h5>
                                        </div>
                                        <div className="available">
                                            <p style={{textAlign: "left", wordBreak: "break-all", padding: "5px", fontFamily: "Roboto Mono"}}>{contact.message}</p>
                                        </div>
                                        <InputGroup  type="button" text="Delete" name="delete" id={contact.id} onClick={this.deleteContact} />
                                    </div>
                                )
                            })
                        }                        
                    </div>
                </div>
            </div>
        )
    }
}

export default StaffContacts
