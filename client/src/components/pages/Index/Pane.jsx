import React from 'react';
import {Link} from 'react-router-dom';

const Pane = props => {

    // This is the panes components, the one that makes the four squares in the home page
    return (
        <div className={`pane ${props.data.class}`}>
            <div className="button-container">
                <Link to={props.data.url} className="btn-main">
                    <span>{props.data.text}</span>
                </Link>
            </div>
        </div>
    )

}

export default Pane
