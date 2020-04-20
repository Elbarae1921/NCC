import React, { Component } from 'react';
import InputGroup from './../common/InputGroup';

export class Register extends Component {
    render() {
        // Register component, also a form
        return (
            <form onSubmit={this.props.submit} className="login">
                <InputGroup type="email" text="email..." name="email" />
                <InputGroup type="text" text="Organisation..." name="name" />
                <InputGroup type="text" text="Phone number..." name="phone" />
                <InputGroup type="password" text="Password..." name="password" />
                <InputGroup type="submit" text="Submit"  onClick={() => {}} />        
            </form>
        )
    }
}

export default Register
