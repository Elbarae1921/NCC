import React from 'react';
import codeMap from './WeatherCodeMap';

const WeatherCard = props => {

    // The weather card component
    return (
        <div className="weather-card">
            <div className="weatherIcon">
                {/* this one gets the class that corrsponds the weatherCode from the codeMap map object, see WeatherCodeMap.js for more info */}
                <div className={codeMap.get(props.weather.hourly[0].weatherCode)}>
                    <div className="inner"></div>
                </div>
            </div>
            <h1>{props.weather.avgtempC}º</h1>
            <p>{props.city}</p>
            <pre>{props.weather.date}</pre>
        </div>
    )
}

export default WeatherCard
