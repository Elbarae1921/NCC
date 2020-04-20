import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';
import Logo from '../../pagesComponents/common/Logo';
import Available from '../../pagesComponents/common/Available';
import Location from '../../pagesComponents/common/Location';
import InputGroup from '../../pagesComponents/common/InputGroup';
import Auth from './Auth';

export class StaffCheckins extends Component {

    state = {
        persons: [],
        error: ""
    }

    error = (err) => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({persons: this.state.persons, error: err});
    }

    unError = () => {
        // clear errors
        this.setState({persons: this.state.persons, error: ""});
    }

    getCheckins = e => {
        this.unError(); //clear errors
        const url = e.target.value.trim() ? `/api/staff/checkin?match=${e.target.value.trim()}` : '/api/staff/checkins'; //make api call
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${Auth.getToken}` //send login token
            }
        }).then(res => {
            if(!res.data.errors) {
                this.setState({persons: res.data.persons, error: ""}); //get data
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

    deleteCheckin = e => { //checkin delete event
        const id = e.target.id || ''; //get the checkin id from the button
        axios.delete('/api/staff/checkin', {data: querystring.stringify({id}), headers: { //make an http delete request
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': `Bearer ${Auth.getToken}` //send login token
        }})
        .then(res => {
            if(!res.data.errors) { //if the checkin was deleted successfully or was not found, remove it from the list
                this.setState({error: this.state.error, persons: this.state.persons.filter(person => person.id !== id)});
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
                        <h1>CHECK-INS</h1>
                        <InputGroup  type="text" text="Family Name or First Name or City..." name="match" onchange={this.getCheckins} />
                        <p className="error">{this.state.error}</p>
                    </div>
                    <div className="box confirmation">
                        {
                            this.state.persons.map(person => {
                                return (
                                    <div key={person.id} className="conf-container result">
                                        <div className="result-title">
                                            <h3 className="name">ID: {person.id}</h3>
                                            <h3 className="name">{person.name}</h3>
                                        </div>
                                        {/* load the Available component and pass available information into it */}
                                        <Available available={person.available} />
                                        {/* load the Location component and pass location information into it */}
                                        <Location location={person.location} />
                                        <InputGroup  type="button" text="Delete" name="delete" id={person.id} onClick={this.deleteCheckin} />
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

export default StaffCheckins
