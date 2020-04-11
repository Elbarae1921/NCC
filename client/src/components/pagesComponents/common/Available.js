// import modules and components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Available extends Component {

    printOrg = () => {
        // if the person was rescued by an organization
        if(this.props.available.fromOrg) {
            return (
                <p>Organization : <color>{this.props.available.org}</color></p>                
            )
        }
        else {
            return;
        }
    }


    render() {
        // if the familyMembers is not an array, make it an array :)
        const familyMembers = Array.isArray(this.props.available.familyMembers) ? this.props.available.familyMembers : [this.props.available.familyMembers];
        return (
            <div className="available">
                <p>First Name : <color>{this.props.available.firstName}</color></p>
                <p>Family Name : <color>{this.props.available.familyName}</color></p>
                {/* maps through family members if there are any */}
                {familyMembers.map(fm => {
                    return (
                        <p key={familyMembers.indexOf(fm)+1}>Family Member {familyMembers.indexOf(fm)+1} : <color>{fm}</color></p>
                    )
                })}
                <p>City (provided by the user) : <color>{this.props.available.city}</color></p>
                <p>Status : <color>{this.props.available.status}</color></p>
                {/* check if the user is from an organization */}
                {this.printOrg()}
            </div>
        )
    }
}

// setting and verifying the props, which is mandatory but suggested as best practice (I clearly didn't do it)
Available.propTypes = {
    available: PropTypes.object.isRequired
}

export default Available
