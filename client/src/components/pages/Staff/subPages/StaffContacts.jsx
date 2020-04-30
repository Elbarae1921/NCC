import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';
import { InputGroup, Logo } from '../../../others';
import Auth from '../Auth';

const StaffContacts = props => {

    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState("");


    const getContacts = e => {
        setError(""); //clear errors
        const url = e.target.value.trim() ? `/api/staff/contact?match=${e.target.value.trim()}` : '/api/staff/contact'; //make api call
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${Auth.getToken}` //send login token
            }
        }).then(res => {
            if (!res.data.errors) {
                setContacts(res.data.contacts); //get data
            }
            else {
                setError("There was an error with the server.") //in case of error
            }
        }).catch(err => {
            if (err.response.status === 403) { //if Forbidden it means the token is invalid
                Auth.logout(() => {
                    props.history.push("/staff/login"); //redirect to login
                });
            }
        })
    }

    const deleteContact = e => { //contact delete event
        const id = e.target.id || ''; //get the contact id from the button
        axios.delete('/api/staff/contact', {
            data: querystring.stringify({ id }), headers: { //make an http delete request
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${Auth.getToken}` //send login token
            }
        })
            .then(res => {
                if (!res.data.errors) { //if the contacts was deleted successfully or was not found, remove it from the list
                    setContacts(contacts.filter(contact => contact.id !== id))
                }
                else { //if there was an error, make an alert
                    alert(res.data.errors[0].msg);
                }
            })
            .catch(err => { //catch network errors and http response codes that fall outside 2xx

                if (err.response.status === 403) { //if the request was forbidden, redirect to login
                    Auth.logout(() => {
                        props.history.push("/staff/login");
                    });
                }
                else { //if there was a network or server error
                    alert("It seems there was an error with the server.");
                }
            });
    }


    // maps every contact in the contacts array into JSX result (updates with the state)
    const renderContacts = contacts.map(contact => {
        return (
            <div key={contact.id} className="conf-container result">
                <div className="result-title">
                    <h4 className="name">{contact.name}</h4>
                    <h5 style={{ textAlign: "left", fontFamily: "Roboto Mono" }} className="name">{contact.email}</h5>
                </div>
                <div className="available">
                    <p style={{ textAlign: "left", wordBreak: "break-all", padding: "5px", fontFamily: "Roboto Mono" }}>{contact.message}</p>
                </div>
                <InputGroup type="button" text="Delete" name="delete" id={contact.id} onClick={deleteContact} />
            </div>
        )
    });


    if (!Auth.isLoggedIn) {
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
                    <InputGroup type="text" text="Email or Name..." name="match" onchange={getContacts} />
                    <p className="error">{error}</p>
                </div>
                <div className="box confirmation">
                    {
                        renderContacts
                    }
                </div>
            </div>
        </div>
    )
}

export default StaffContacts
