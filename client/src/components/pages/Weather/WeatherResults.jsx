// import modules and components
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Logo } from '../../others';
import WeatherCard from './WeatherCard';

export const WeatherResults = props => {

    // if there was no data passed from the previous component, redirect to /weather
    if (props.location.state === undefined)
        return (<Redirect to="/weather" />);

    return (
        <div className="background-image weather">
            <div className="box-container">
                <div className="back">
                    {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                    <Link to="/"> {'<'} </Link>
                </div>
                {/* Logo component */}
                <Logo class="pages" />
                <h1 className="weather-title">{props.location.state.data.request[0].query}</h1>
                <div className="box weather">
                    {/* maps through the weather data array and returns a WeatherCard component, that takes the weather data and the city as props */}
                    {props.location.state.data.weather.map(w => {
                        return (
                            // the data is structured in a somewhat weird way, so there's no point in explaining this
                            <WeatherCard weather={w} city={props.location.state.data.request[0].query.split(',')[0]} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
