import React from 'react';
import { Route } from 'react-router-dom';

import { StaffHome, StaffLogin, StaffAccount, StaffCheckins, StaffContacts, StaffPartners} from './subPages';

const StaffRoutes = () => {
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

export default StaffRoutes;
