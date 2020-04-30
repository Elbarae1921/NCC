import React from 'react';
import { InputGroup } from '../../others';

const Login = props => {

    // Login component, just a form really
    return (
        <form onSubmit={props.submit} className="login">
            <InputGroup type="email" text="email..." name="email" />
            <InputGroup type="password" text="Password..." name="password" />
            <InputGroup type="submit" text="Submit" onClick={() => { }} />
        </form>
    )

}

export default Login
