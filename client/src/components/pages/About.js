import React, { Component } from 'react';
// import Link component since anchir tag's behaviour is not what you'd expect
import {Link} from 'react-router-dom';
import Logo from './../pagesComponents/common/Logo';

export class About extends Component {

    getYear = () => {
        let d = new Date();
        // return current year
        return d.getFullYear();
    }

    render() {
        return (
            <div className="background-image partner">
                <div className="box-container">
                    <div className="back">
                        <Link to="/"> {'<'} </Link>
                    </div>
                    <Logo class="pages" />
                    <div className="box about">
                        <h1>About us</h1>
                        <p>This application was created in order to help reassure people who are worried about their friends and families that got caught up in disasters or are out of reach of communication means through a system of check-ins.
By filling the form in the <Link to="/checkin">CHECK-IN</Link> page you confirm that you are safe, therefore your family, friends and loved ones can be relieved to know that you're safe after searching for you in the <Link to="/find">FIND SOMEONE</Link> page.</p>
                        
                        <p>If you're a specialized rescue organization, we highly suggest you become a partner, instant information is crucial and you can provide that. Head to the <Link to="/partner">PARTNERS</Link> page and fill in the form. By doing so you get a key that allows you to connect to our API using your own secure servers to help the people you rescued reunite with their loved ones nd reassure their families. Furthermore you are contribute to the data pool which would give more accuracy to the analytics that play an important role in preventing future disasters.</p>
                    
                        <p>If you have any questions or facing a technical problem with the website please make sure to <Link to="/contact">CONTACT US</Link>, we'll make sure to get back to you in a few hours.</p>
                    </div>
                    <p className="credits">&copy; {this.getYear()} - RGUIG - WAGUI</p>
                </div>
            </div>
        )
    }
}

export default About
