// importing modules and components
import React from 'react';

const EmbedMap = props => {

    return(
        // The embed map component which is just an <iframe> element that fetches a given location from google maps, with a little fancy mark on the given longitude and latitude
        <div className="mapContainer">
            <iframe title="map" className="map" height="250"
                src={`https://maps.google.com/maps?width=400&height=300&hl=en&q=${props.latitude}%2C%20${props.longitude}&output=embed`}
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
        </div>
    )
}

export default EmbedMap