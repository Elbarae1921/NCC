// importing modules and components
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = props => {

    return (
        // The logo component, nothing much to say
        <div className={`logo ${props.class}`}>
            <Link to="/about" className="abb">
                <div>
                    <div id="abb">
                        NCC
                    </div>
                    <div id="title">
                        National Catastrophe Center
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default Logo
