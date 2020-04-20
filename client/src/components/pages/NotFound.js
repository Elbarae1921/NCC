// import modules and components
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from './../pagesComponents/common/Logo';

export class NotFound extends Component {
    render() {
        return (
            <div className="background-image notfound">
                <div className="box-container">                    
                    <div className="back">
                        {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                        <Link to="/"> {'<'} </Link>
                    </div>
                    {/* Logo comonent */}
                    <Logo class="pages" />
                    <h2 className="notfound">WHOOPS!</h2>
                    <h1 className="notfound">404</h1>
                    <h4 className="notfound">We couldn't find this page.</h4>
                    <div className="notfound">
                        {/* links (anchor tags), a navbar-like thing, for a better UX */}
                        <Link className="notfound" to="/" >Home</Link>
                        <Link className="notfound" to="/about" >About</Link>
                        <Link className="notfound" to="/checkin" >Check-in</Link>
                        <Link className="notfound" to="/find" >Find Someone</Link>
                        <Link className="notfound" to="/weather" >Weather</Link>
                        <Link className="notfound" to="/partner" >Become a partner</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound
