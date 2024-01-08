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
  state = {
    theme: false, likedVideoList: [],
    dislikedVideoList: [],
    savedVideoList: [],
    isBannerShow: true
  }

  onChangeTheme = () => {
    this.setState(previous => ({ theme: !previous.theme }))
  }

  onLike = id => {
    const { dislikedVideoList, likedVideoList } = this.state
    if (likedVideoList.includes(id)) {
      this.setState(previous => ({
        likedVideoList: previous.likedVideoList.filter(value => value !== id),
      }))
    } else {
      if (dislikedVideoList.includes(id)) {
        this.setState(previous => ({
          dislikedVideoList: previous.dislikedVideoList.filter(value => value !== id),
          likedVideoList: [...previous.likedVideoList, id]
        }))
      } else {
        this.setState(previous => ({
          likedVideoList: [...previous.likedVideoList, id]
        }))
      }
    }
  };

  onDislike = id => {
    const { dislikedVideoList, likedVideoList } = this.state
    if (dislikedVideoList.includes(id)) {
      this.setState(previous => ({
        dislikedVideoList: previous.dislikedVideoList.filter(value => value !== id),
      }))
    } else {
      if (likedVideoList.includes(id)) {
        this.setState(previous => ({
          likedVideoList: previous.likedVideoList.filter(value => value !== id),
          dislikedVideoList: [...previous.dislikedVideoList, id]
        }))
      } else {
        this.setState(previous => ({
          dislikedVideoList: [...previous.dislikedVideoList, id]
        }))
      }
    }
  };

  onSave = video => {
    const { savedVideoList } = this.state
    const isSaved = savedVideoList.filter(value => value.id === video.id)
    if (isSaved.length <= 0) {
      this.setState(previous => ({ savedVideoList: [...previous.savedVideoList, video] }))
    } else {
      this.setState(previous => ({ savedVideoList: previous.savedVideoList.filter(value => value.id !== video.id) }))
    }
  };

  onBannerClose = () => {
    this.setState({ isBannerShow: false })
  }

  render() {
    const { onChangeTheme, state, onLike, onDislike, onSave, onBannerClose } = this
    return (
      <Store.Provider value={{ ...state, onChangeTheme, onLike, onDislike, onSave, onBannerClose }}>
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
