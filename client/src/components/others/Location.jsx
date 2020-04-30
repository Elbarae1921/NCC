// importing modules and components
import React from 'react';

const Location = props => {

    // this is pretty self-explanatory i guess
    return (
        <div className="location">
            <p>IP : <color> { props.location.ip } </color></p>
            <p>Timezone : <color> { props.location.timezone } </color></p>
            <p>Country : <color> { props.location.country } </color></p>
            <p>City : <color> { props.location.city } </color></p>
            <p>Region : <color> { props.location.region } </color></p>
            <p>Latitude : <color> { props.location.latitude } </color></p>
            <p>Longitude : <color> { props.location.longitude } </color></p>
        </div>
    )

}

export default Location
