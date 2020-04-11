import React, { Component } from 'react';
import codeMap from './WeatherCodeMap';

export class WeatherCard extends Component {
    render() {
        // The weather card component
        return (
            <div className="weather-card">
                <div className="weatherIcon">
                    {/* this one gets the class that corrsponds the weatherCode from the codeMap map object, see WeatherCodeMap.js for more info */}
                    <div className={codeMap.get(this.props.weather.hourly[0].weatherCode)}>
                        <div className="inner"></div>
                    </div>
                </div>
                <h1>{this.props.weather.avgtempC}º</h1>
                <p>{this.props.city}</p>
                <pre>{this.props.weather.date}</pre>
            </div>
        )
    }
}

export default WeatherCard
