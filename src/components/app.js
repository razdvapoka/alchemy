import {h, Component} from 'preact';
import {Router} from 'preact-router';

// Code-splitting is automated for routes
import Home from '../routes/home';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Router>
          <Home path="/" />
        </Router>
      </div>
    );
  }
}
