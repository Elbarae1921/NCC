//imort all necessary modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import components
import Index from './components/pages/Index';
import CheckIn from './components/pages/CheckIn';
import CheckInConfirmation from './components/pages/CheckInConfirmation';
import Find from './components/pages/Find';
import Partner from './components/pages/Partner';
import FindResults from './components/pages/FindResults';
import Weather from './components/pages/Weather';
import WeatherResults from './components/pages/WeatherResults';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

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
              <Route path="/weather" component={Weather} />
              <Route path="/weather-results" component={WeatherResults} />
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
