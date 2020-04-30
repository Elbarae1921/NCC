// import modules and components
import React from 'react';

const Available = props => {

    const printOrg = () => {
        // if the person was rescued by an organization
        if(props.available.fromOrg) {
            return (
                <p>Organization : <color>{props.available.org}</color></p>                
            )
        }
        else {
            return;
        }
    }


    // if the familyMembers is not an array, make it an array :)
    const familyMembers = Array.isArray(props.available.familyMembers) ? props.available.familyMembers : [props.available.familyMembers];

    return (
        <div className="available">
            <p>First Name : <color>{props.available.firstName}</color></p>
            <p>Family Name : <color>{props.available.familyName}</color></p>
            {/* maps through family members if there are any */}
            {familyMembers.map(fm => {
                return (
                    <p key={familyMembers.indexOf(fm)+1}>Family Member {familyMembers.indexOf(fm)+1} : <color>{fm}</color></p>
                )
            })}
            <p>City (provided by the user) : <color>{props.available.city}</color></p>
            <p>Status : <color>{props.available.status}</color></p>
            {/* check if the user is from an organization */}
            {printOrg()}
        </div>
    )
}

export default Available
