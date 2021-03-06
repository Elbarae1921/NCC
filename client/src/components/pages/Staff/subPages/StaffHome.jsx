import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Auth from '../Auth';

const StaffHome = props => {

    const out = () => {
        Auth.logout(() => {
            props.history.push("/");
        });
    }


    if(!Auth.isLoggedIn) {
        return <Redirect to="/staff/login" />
    }
    else {
        return (
            <div className="background-image partner staff">
                <div className="box-container">
                    <div className="staff-container">
                        <div className="box staff">
                            <div className="staff-menu"><span><Link to="/staff/checkins">CHECK INS</Link></span></div>
                            <div className="staff-menu"><span><Link to="/staff/contacts">CONTACTS</Link></span></div>
                            <div className="staff-menu"><span><Link to="/staff/account">ACCOUNT</Link></span></div>
                            <div className="staff-menu"><span><Link to="/staff/partners">PARTNERS</Link></span></div>
                        </div>
                    </div>
                </div>
                <div class="logout">
                    <button onClick={out} className="btn">Logout</button>
                </div>
            </div>
        )
    }
}

export default StaffHome
