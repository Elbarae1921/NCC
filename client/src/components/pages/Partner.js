// import modules and components
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import InputGroup from '../pagesComponents/common/InputGroup';
import Login from '../pagesComponents/partner/Login';
import Register from '../pagesComponents/partner/Register';
import Logo from '../pagesComponents/common/Logo';

export class Partner extends Component {

    // set the state
    state = { // these properties are used to switch between registration mode and login mode
        result: "",
        error: "",
        login: true,
        switch: "registration"
    }

    error = err => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({result: this.state.result, error: err, login: this.state.login, switch: this.state.switch});
    }

    unError = () => {
        // clear errors
        this.setState({result: "", error: "", login: this.state.login, switch: this.state.switch});
    }

    result = res => {
        // if the login was successful, show a result
        this.setState({result: res, error: this.state.error, login: this.state.login, switch: this.state.switch});
    }

    changeMode = () => {
        // change mode from login to register or vice versa
        this.unError();
        this.setState({result: this.state.result, error: this.state.error, login: !this.state.login, switch: this.state.login ? "login" : "registration"});
    }

    login = e => {
        // submit post request to login
        e.preventDefault();
        // clear errors
        this.unError();
        // POST => http://localhost:5000/organization/login
        axios.post('/api/organization/login', $(e.target).serialize())
            .then(res => {
                if(!res.data.errors) { // if everything went fine show the key
                    this.result(`Here is your key : ${res.data.key}. Please make sure to keep it safe and secret.`);
                }
                else { // else show the error
                    this.error(res.data.errors[0].msg);
                }
            })
            .catch(() => { // in case of a network or http error
                this.error("It seems there was a problem with the server. Please try again");
            });
    }

    register = e => {
        // submit a request to register
        e.preventDefault();
        // clear errors
        this.unError();
        // POST => http://localhost:5000/organization/register
        axios.post('/api/organization/register', $(e.target).serialize())
            .then(res => {
                if(!res.data.errors) { // if everything went fine show the key
                    this.result(`Here is your key : ${res.data.key}. Please make sure to keep it safe and secret.`);
                }
                else { // else show the error
                    this.error(res.data.errors[0].msg);
                }
            })
            .catch(() => { // in case of a network or http error
                this.error("It seems there was a problem with the server. Please try again");
            });
    }

    render() {
        return (
            <div className="background-image partner">
                <div className="box-container partner">
                    <div className="back">
                        {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                        <Link to="/"> {'<'} </Link>
                    </div>
                    {/* Logo component */}
                    <Logo class="pages" />
                    <div className="box partner">
                        <div className="form">
                            <h3>Get a key</h3>
                            {
                                this.state.login ? 
                                (
                                    // Login component, but it's just a form
                                    <Login submit={this.login} />
                                )
                                :
                                (
                                    // same goes for this one too
                                    <Register submit={this.register} />
                                )
                            }
                            <p className="error">{this.state.error}</p>
                            <p className="key">{(this.state.result)}</p>
                            {/* button to switch between login and register, note that the text is dynamic, and changes whenever the state is changed */}
                            <InputGroup class="switch" type="button" text={`Swicth to ${this.state.switch}`}  onClick={this.changeMode} />  
                        </div>
                        {/* some fancy text */}
                        <div className="text">
                            <h3>What it means to become a partner</h3>

                            <p>
                                If you're an organization that helps unite victims of natural/man-made disasters with their families and loved ones, you can have unlimited access to our api, which would further the efforts in disaster prevention, and contribute to the pool of data to analyse.
                            </p>
                            <p>
                                <pre className="method get">GET</pre> <pre className="url">https://centrenationaldescatastrophes.herokuapp.com/api/person?firstName=Ben{'&'}familyName=Kenobi{'&'}city=Tatooine</pre>
                            </p>
                            <p style={{marginBottom: "0"}}>
                                <pre className="method post">POST</pre> <pre className="url">curl -H "Authorization: Bearer <key>{'{YOUR_KEY}'}</key>" https://centrenationaldescatastrophes.herokuapp.com/api/organization/checkin</pre>
                            </p>
                            <p style={{fontSize: "8px", margin: "0"}}>
                                For more information on how to use the API, visit <a href="https://centrenationaldescatastrophes.herokuapp.com/api/">/api/howto</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Partner
