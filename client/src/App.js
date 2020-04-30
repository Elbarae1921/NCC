//imort all necessary modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//import components
import { CheckIn, CheckInConfirmation, Index, Find, Partner, FindResults, Weather, WeatherResults, About, Contact, Staff, NotFound } from './components/pages';


class App extends React.Component {
  
  render() {
    return (
      <Router>
        <div className="App">
          {/*Set the routes for the app */}
          {/* Switch component to avoid having two routes at the same time */}
          <Switch>
              {/* Home route must be exact to avoid overlapsing with other routes */}
              <Route exact path="/" component={Index} />
              <Route path="/checkin" component={CheckIn} />
              <Route path="/confirmation" component={CheckInConfirmation} />
              <Route path="/partner" component={Partner} />
              <Route path="/find" component={Find} />
              <Route path="/results" component={FindResults} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/weather" component={Weather} />
              <Route path="/weather-results" component={WeatherResults} />
              <Route path="/staff" component={Staff} />
              {/* 404 not found page */}
              <Route path="/404" component={NotFound} />
              {/* Redirect every oder route to /404 route */}
              <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
