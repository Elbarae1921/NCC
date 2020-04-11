// import models and components
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Available from '../pagesComponents/common/Available';
import Logo from './../pagesComponents/common/Logo';
import EmbedMap from './../pagesComponents/findResults/EmbedMap';

export class FindResults extends Component {
    render() {
        // if there was no data passed from the previous component, redirect to /checkin
        if(this.props.location.state === undefined)
            return (<Redirect to="/find" />);
        console.log(this.props.location.state);
        return (
            <div className="background-image find">
                <div className="box-container">                    
                    <div className="back">
                        {/* Link is just anchor tag for react, since anchor tag takes you to another page */}
                        <Link to="/"> {'<'} </Link>
                    </div>
                    {/* Logo component */}
                    <Logo class="pages" />
                    <h1 style={{margin: "10px auto", textAlign: "center", color: "white", fontFamily: "Roboto Mono"}}>We found <span style={{color: "green"}}>{this.props.location.state.persons.length}</span> match(es).</h1>
                    <div className="box result">
                        {/* will map through the persons found array and output information */}
                            {this.props.location.state.persons.map(person => {
                                return (
                                    <div key={this.props.location.state.persons.indexOf(person)} className="conf-container result">
                                        <div className="result-title">
                                            <h3 className="name">{person.name}</h3>
                                        </div>
                                        {/* passes the available information to the Available component */}
                                        <Available available={person.available} />
                                        {
                                            // check if location information are available
                                            person.location.latitude ? person.location.latitude !== "N/A" ? 
                                            (
                                                // if so it returns a EmbedMap component, which takes longitude and latitude as props, it's basically an <iframe> html element that gets an embed map from google maps
                                                <React.Fragment>
                                                    <h3>Please Note that location info might not be accurate.</h3>
                                                    <EmbedMap latitude={person.location.latitude} longitude={person.location.longitude} />
                                                </React.Fragment>
                                            )
                                            :
                                            (
                                                // if there's no location information available
                                                <h3>No location info available.</h3>
                                            )
                                            :
                                            (
                                                <h3>No location info available.</h3>
                                            )
                                        }
                                        
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        )
    }
}

export default FindResults
