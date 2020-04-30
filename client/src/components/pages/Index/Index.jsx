// import modules and components
import React, { useEffect } from 'react'
import Pane from './Pane';
import { Logo } from '../../others';
import script from './script';

const Index = () => {

    // set the state
        // panes array (the four panels that show up on the home page are seperate components)
    const panes = [
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
        ];


    // run the front end script whenever the component is loaded
    useEffect(script);


    // maps through the panes array and renders JSX
    const renderPanes = panes.map(pane => {
        return(
            // pane component which takes pane data (href, title, picture), note that the key is necessary when mapping through an array in React
            <Pane key={pane.id} data={pane} />
        )});


    return (
        // all react components must be wrapped in one parent, if you don't want to add an additional div, you can use React.Fragment which is not a real element, but is just used to wrap all the elements in one virtual parent
        <React.Fragment>
            { renderPanes }
            {/* Logo comonent */}
            <Logo class="" />
        </React.Fragment>
    )
}

export default Index
