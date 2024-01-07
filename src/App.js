import { Component } from 'react';
import Login from './components/Login';
import './App.css';

class App extends Component {
  state = { theme: false }

  render() {
    return (
      <Login />
    )
  }
}

export default App;
