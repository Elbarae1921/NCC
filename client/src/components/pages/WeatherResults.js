// import modules and components
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Logo from './../pagesComponents/common/Logo';
import WeatherCard from './../pagesComponents/weather/WeatherCard';

export class WeatherResults extends Component {
    render() {
        // if there was no data passed from the previous component, redirect to /weather
        if(this.props.location.state === undefined)
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
                    <h1 className="weather-title">{this.props.location.state.data.request[0].query}</h1>
                    <div className="box weather">
                        {/* maps through the weather data array and returns a WeatherCard component, that takes the weather data and the city as props */}
                        {this.props.location.state.data.weather.map(w => {
                            console.log(w.hourly[0].weatherCode);
                            return (
                                // the data is structured in a somewhat weird way, so there's no point in explaining this
                                <WeatherCard weather={w} city={this.props.location.state.data.request[0].query.split(',')[0]} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherResults
