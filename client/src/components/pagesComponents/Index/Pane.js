import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Pane extends Component {
    render() {
        // This is the panes components, the one that makes the four squares in the home page
        return (
            <div className={`pane ${this.props.data.class}`}>
                <div className="button-container">
                    <Link to={this.props.data.url} className="btn-main">
                        <span>{this.props.data.text}</span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Pane
