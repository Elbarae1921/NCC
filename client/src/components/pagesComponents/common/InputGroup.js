// importing modules and components
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class InputGroup extends Component {

    getInside = () => {
        // if it's a normal input field (text, email, password)
        if(this.props.type !== "button" && this.props.type !== "submit") {
            if(this.props.type === 'text-area') {
                return (
                    <textarea name={this.props.name} type={this.props.type} className="input-area"  cols="5" placeholder={this.props.text}></textarea>
                )
            }
            if(this.props.onchange) { //if an onchange event was provided
                return(
                    <input name={this.props.name} type={this.props.type} className="input-text" placeholder={this.props.text} onChange={this.props.onchange}></input>
                )
            }
            else {
                return(
                    <input name={this.props.name} type={this.props.type} className="input-text" placeholder={this.props.text}></input>
                )
            }
        }
        else { // if it's a button (button, submit)
            return(
                <button onClick={this.props.onClick} type={this.props.type} className="btn" id={this.props.id || ''}>
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
