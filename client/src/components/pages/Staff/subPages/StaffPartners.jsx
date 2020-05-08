import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';
import { InputGroup, Logo } from '../../../others';
import Auth from '../Auth';

const StaffPartners = props => {


    const [error, setError] = useState("");
    const [partners, setPartners] = useState([]);


    useEffect(() => {
        const url = '/api/staff/partner'; //make api call
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${Auth.getToken}` //send login token
            }
        }).then(res => {
            if (!res.data.errors) {
                setPartners(res.data.partners); //get data
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
        });
    }, []);



    const getPartners = e => {
        setError(""); //clear errors
        const url = e.target.value.trim() ? `/api/staff/partner?match=${e.target.value.trim()}` : '/api/staff/partner'; //make api call
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${Auth.getToken}` //send login token
            }
        }).then(res => {
            if (!res.data.errors) {
                setPartners(res.data.partners); //get data
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
        });
    }

    
    const deletePartner = e => { //checkin delete event
        const id = e.target.id || ''; //get the checkin id from the button
        axios.delete('/api/staff/partner', {
            data: querystring.stringify({ id }), headers: { //make an http delete request
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': `Bearer ${Auth.getToken}` //send login token
            }
        })
            .then(res => {
                if (!res.data.errors) { //if the checkin was deleted successfully or was not found, remove it from the list
                    setPartners(partners.filter(partner => partner.id !== id));
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


    // maps every partner in the partners array into JSX result (updates with the state)
    const renderPartners = partners.map(partner => {
        return (
            <div key={partner.id} className="conf-container result">
                <div className="result-title">
                    <h3 className="name">{partner.name}</h3>
                </div>
                <div className="available">
                    <p style={{ color: "gray" }}>email : <color style={{ color: "white" }}>{partner.email}</color></p>
                    <p style={{ color: "gray" }}>phone : <color style={{ color: "white" }}>{partner.phone}</color></p>
                    <p style={{ color: "gray" }}>key : <color style={{ color: "white" }}>{partner.id}</color></p>
                </div>
                <InputGroup type="button" text="Delete" name="delete" id={partner.id} onClick={deletePartner} />
            </div>
        )
    });



    if (!Auth.isLoggedIn)
        return <Redirect to="/staff/login" />

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
                    <h1>PARTNERS</h1>
                    <InputGroup type="text" text="Email, Phone, or Org Name..." name="match" onchange={getPartners} />
                    <p className="error">{error}</p>
                </div>
                <div className="box confirmation">
                    {
                        renderPartners
                    }
                </div>
            </div>
        </div>
    )
}

export default StaffPartners
