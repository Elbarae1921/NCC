// import models and components
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Available, Location} from '../../others';

export const CheckInConfirmation = props => {

    // if there was no data passed from the previous component, redirect to /checkin
    if(props.location.state === undefined)
        return (<Redirect to="/checkin" />);
    
    return (
        <div className="background-image checkin">
            <div className="box-container">
                <div className="back">
                    {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                    <Link to="/"> {'<'} </Link>
                </div>
                <div className="box confirmation">
                    <div className="conf-container">
                        <h4>What your loved ones will know about you</h4>
                        {/* load the Available component and pass available information into it */}
                        <Available available={props.location.state.available} />
                        <h4>Location info we gathered about you (please note that this info might not be accurate)</h4>
                        {/* load the Location component and pass location information into it */}
                        <Location location={props.location.state.location} />
                    </div>
                </div>
            </div>
        </div>
    )
}
