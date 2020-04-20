import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StaffLogin from './StaffLogin';
import StaffHome from './StaffHome';
import StaffCheckins from './StaffCheckins';
import StaffAccount from './StaffAccount';
import StaffPartners from './StaffPartners';
import StaffContacts from './StaffContacts';

export class StaffRoutes extends Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/staff/checkins" component={StaffCheckins} />
                <Route path="/staff/partners" component={StaffPartners} />
                <Route path="/staff/contacts" component={StaffContacts} />
                <Route path="/staff/account" component={StaffAccount} />
                <Route path="/staff/login" component={StaffLogin} />
                <Route exact path="/staff/" component={StaffHome} />
            </React.Fragment>
        )
    }
}

export default StaffRoutes
