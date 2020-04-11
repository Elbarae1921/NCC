// import components and modules
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import Logo from './../pagesComponents/common/Logo';
import InputGroup from './../pagesComponents/common/InputGroup';

export class Weather extends Component {

    // set the state
    state = {
        error: ""
    }

    error = err => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({error: err});
    }

    unError = () => {
        // clear errors
        this.setState({error: ""});
    }


    submit = e => {
        // submit post request to add a checkin
        e.preventDefault();
        // clear errors
        this.unError();
        // GET => http://localhost:5000/api/weather?city=Winterfell
        axios.get(`/api/weather?${$(e.target).serialize()}`)
            .then(res => {
                if(!res.data.errors) { // if everything went fine send the data to the next page (/weather-results)
                    this.props.history.push({
                        pathname: '/weather-results',
                        state: res.data
                    });
                }
                else { //show error
                    this.error(res.data.errors[0].msg);
                }
            })
            .catch(() => { // show network / http error
                this.error("It seems there was a problem with the server. Please try again later.")
            });
    }

    render() {
        return (
            <div className="background-image weather">
                <div className="box-container">                    
                    <div className="back">
                        {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                        <Link to="/"> {'<'} </Link>
                    </div>
                    {/* Logo component */}
                    <Logo class="pages" />
                    <div className="box">
                        <form onSubmit={this.submit}>
                            <InputGroup type="text" text="City..." name="city"  />
                            <InputGroup type="submit" text="Submit"  onClick={() => {}} />
                            {/* error paragraph, which changes dynamically with the state */}
                            <p className="error">{this.state.error}</p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather
