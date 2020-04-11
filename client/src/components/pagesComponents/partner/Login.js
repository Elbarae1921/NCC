import React, { Component } from 'react';
import InputGroup from './../common/InputGroup';

export class Login extends Component {
    render() {
        // Login component, just a form really
        return (
            <form onSubmit={this.props.submit} className="login">
                <InputGroup type="email" text="email..." name="email" />
                <InputGroup type="password" text="Password..." name="password" />
                <InputGroup type="submit" text="Submit"  onClick={() => {}} />        
            </form>
        )
    }
}

export default Login
