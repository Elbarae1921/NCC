import React from 'react';

const Spinner= ({show, size}) => {

    const display = show ? "block" : "none";

    const width = `${size}px`, height = `${size}px`;
    const borderWidth = `${(size/6.66)|0}px`;

    return (
        <div className="spinner" style={{display, width, height, borderWidth}}></div>
    )
}

export default Spinner;