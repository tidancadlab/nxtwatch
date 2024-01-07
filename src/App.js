import { Component } from 'react';
import Login from './components/Login';
import Home from './components/Home/index.js';
import './App.css';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = { theme: false }

  render() {
    return (
      <Switch>
        < Route exact path="/login" component={Login} />
        < Route exact path="/" component={Home} />
      </Switch>
    )
  }
}

export default App;
