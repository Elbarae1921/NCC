// importing modules and components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class InputGroup extends Component {

    getInside = () => {
        // if it's a normal input field (text, email, password)
        if(this.props.type !== "button" && this.props.type !== "submit") {
            return(
                <input name={this.props.name} type={this.props.type} className="input-text" placeholder={this.props.text}></input>
            )
        }
        else { // if it's a button (button, submit)
            return(
                <button onClick={this.props.onClick} type={this.props.type} className="btn">
                    <span>{this.props.text}</span>
                </button>
            )
        }
    }

    render() {
        return (
            <div className={`input-group ${this.props.class}`}>
                {/* gets the input elements based on the props */}
                {this.getInside()}
            </div>
        )
    }
}

InputGroup.propTyped = {
    type: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,     
}

export default InputGroup
