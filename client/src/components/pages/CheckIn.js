// importing modules and components
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import InputGroup from './../pagesComponents/common/InputGroup';
import Logo from './../pagesComponents/common/Logo';

export class CheckIn extends Component {
    // set the state
    state = {
        FamilyMembers: [],
        error: ""
    }

    addField = () => {
        // function to add another family member field
        // state has an array FamilyMembers, we push a new item into the array which would add a new FamilyMembers field since they are bound
        if(this.state.FamilyMembers.length < 4) { // max is 4
            this.setState({FamilyMembers: [...this.state.FamilyMembers, `Family Member ${this.state.FamilyMembers.length + 1}...`]});
        }
    }

    error = (err) => {
        // set error, which would appear in the <p class="error"> tag since it's bound with the state
        this.setState({FamilyMembers: this.state.FamilyMembers, error: err});
    }

    unError = () => {
        // clear errors
        this.setState({FamilyMembers: this.state.FamilyMembers, error: ""});
    }

    submit = e => {
        // submit post request to add a checkin
        e.preventDefault();
        // clear errors
        this.unError();
        // POST => http://localhost:5000/api/checkin
        axios.post('/api/checkin', $(e.target).serialize())
            .then(res => {
                if(!res.data.errors) { // if there are no errors
                    this.props.history.push({ // redirect to the confirmation page
                        pathname: '/confirmation', 
                        state: res.data // send data to the confirmation page/component as a state object
                    });
                }
                else { // if there are errors
                    this.error(res.data.errors[0].msg); // show error
                }
            })
            .catch(() => { // if the http request failed
                this.error("It seems there was a problem with the server. Please try again") // show error
            });
    }

    render() {
        return (
            <div className="background-image checkin">
                <div className="box-container">
                    <div className="back">
                        {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                        <Link to="/"> {'<'} </Link>
                    </div>
                    {/* Logo comonent */}
                    <Logo class="pages" />
                    <div className="box">
                        <h3>Please enter your information</h3>
                        {/* set onsubmit event */}
                        <form onSubmit={this.submit}>
                            {/* I set the InputGroup to take values like input elements, and it's just an input elemnt wrapped in a div*/}
                            <InputGroup type="text" text="Family Name..." name="familyName" />
                            <InputGroup type="text" text="First Name..." name="firstName" />
                            <InputGroup type="text" text="City..." name="city" />
                            {/* whenever the FamilyMembers array is changed, the number of fields is gonna change as well */}
                            {this.state.FamilyMembers.map(fm => {
                                return (
                                    <InputGroup key={fm} type="text" text={fm} name="familyMembers" />
                                )
                            })}

                            {/* set onclick event to add FamilyMembers field */}
                            <InputGroup type="button" text="Add Family Member" onClick={this.addField} />
                            {/* set placeholder for onclick event */}
                            <InputGroup type="submit" text="Submit"  onClick={() => {}} />
                            {/* This pragaraph is bound with error property of the state object, and will change whenever it changes */}
                            <p className="error">{this.state.error}</p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckIn
