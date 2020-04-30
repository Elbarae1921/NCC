// importing modules and components
import React from 'react';

const InputGroup = props => {

    const getInside = () => {
        // if it's a normal input field (text, email, password)
        if(props.type !== "button" && props.type !== "submit") {
            if(props.type === 'text-area') {
                return (
                    <textarea name={props.name} type={props.type} className="input-area"  cols="5" placeholder={props.text}></textarea>
                )
            }
            if(props.onchange) { //if an onchange event was provided
                return(
                    <input name={props.name} type={props.type} className="input-text" placeholder={props.text} onChange={props.onchange}></input>
                )
            }
            else {
                return(
                    <input name={props.name} type={props.type} className="input-text" placeholder={props.text}></input>
                )
            }
        }
        else { // if it's a button (button, submit)
            return(
                <button onClick={props.onClick} type={props.type} className="btn" id={props.id || ''}>
                    <span>{props.text}</span>
                </button>
            )
        }
    }

    return (
        <div className={`input-group ${props.class}`}>
            {/* gets the input elements based on the props */}
            {getInside()}
        </div>
    )
}

export default InputGroup
