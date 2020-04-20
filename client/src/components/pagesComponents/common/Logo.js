// importing modules and components
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export class Logo extends Component {
    render() {
        return (
            // The logo component, nothing much to say
            <div className={`logo ${this.props.class}`}>
                <Link to="/about" className="abb">
                    <div>
                        <div id="abb">
                            CNC
                        </div>
                        <div id="title">
                            National Catastrophe Center
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

Logo.propTypes = {
    class: PropTypes.string.isRequired
}

export default Logo
