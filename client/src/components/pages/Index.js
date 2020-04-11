// import modules and components
import React, { Component } from 'react'
import Pane from './../pagesComponents/Index/Pane';
import Logo from './../pagesComponents/common/Logo';

export class Index extends Component {

    // set the state
    state = {
        // panes array (the four panels that show up on the home page are seperate components)
        panes: [
            {
                id: 1,
                class: 'checkin',
                text: 'CHECK IN',
                url: '/checkin'
            },
            {
                id: 2,
                class: 'find',
                text: 'FIND SOMEONE',
                url: '/find'
            },
            {
                id: 3,
                class: 'weather',
                text: 'WEATHER STATS',
                url: '/weather'
            },
            {
                id: 4,
                class: 'partner',
                text: 'BECOME A PARTNER',
                url: '/partner'
            }
        ]
    }

    componentDidMount() { // whenever the component is mounted, it will re-run the script in script.js
        const script = document.createElement("script");
        script.src = "/script.js";
        script.defer = true;
        document.body.appendChild(script);
    }

    componentDidUpdate() { // whenever the component is mounted, it will re-run the script in script.js
        const script = document.createElement("script");
        script.src = "/script.js";
        script.defer = true;
        document.body.appendChild(script);
    }


    render() {
        return (
            // all react components must be wrapped in one parent, if you don't want to add an additional div, you can use React.Fragment which is not a real element, but is just used to wrap all the elements in one virtual parent
            <React.Fragment>
                {this.state.panes.map(pane => {
                    return(
                        // pane component which takes pane data (href, title, picture), note that the key is necessary when mapping through an array in React
                        <Pane key={pane.id} data={pane} />
                )})}
                {/* Logo comonent */}
                <Logo class="" />
            </React.Fragment>
        )
    }
}

export default Index
