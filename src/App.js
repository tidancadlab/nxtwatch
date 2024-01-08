import { Component } from 'react';
import Login from './components/Login';
import Home from './components/Home/index.js';
import Trending from './components/Trending/index.js';
import Gaming from './components/Gaming/index.js';
import SaveVideo from './components/SaveVideo/index.js';
import PlayerPage from './components/PlayerPage';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/index.js';
import Store from './store.js';

class App extends Component {
  state = { theme: false }

  onChangeTheme = () => {
    this.setState(previous => ({ theme: !previous.theme }))
  }
  render() {
    const { onChangeTheme, state } = this
    return (
      <Store.Provider value={{ ...state, onChangeTheme }}>
        <Switch>
          < Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SaveVideo} />
          <ProtectedRoute exact path="/saved-videos/:id" component={PlayerPage} />
        </Switch>
      </Store.Provider>
    )
  }
}

export default App;
