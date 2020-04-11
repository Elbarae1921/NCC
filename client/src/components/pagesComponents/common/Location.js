// importing modules and components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Location extends Component {
    render() {
        // this is pretty self-explanatory i guess
        return (
            <div className="location">
                <p>IP : <color>{this.props.location.ip}</color></p>
                <p>Timezone : <color>{this.props.location.timezone}</color></p>
                <p>Country : <color>{this.props.location.country}</color></p>
                <p>City : <color>{this.props.location.city}</color></p>
                <p>Region : <color>{this.props.location.region}</color></p>
                <p>Latitude : <color>{this.props.location.latitude}</color></p>
                <p>Longitude : <color>{this.props.location.longitude}</color></p>
            </div>
        )
    }
}

Location.propTypes = {
    location: PropTypes.object.isRequired
}

export default Location
