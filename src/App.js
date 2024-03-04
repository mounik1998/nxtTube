import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ThemeAndVideoContext from './context/ThemeAndVideoContext'

// Replace your code here
class App extends Component {
  state = {
    savedVideos: [],
    activeTab: 'Home',
    isDarkTheme: false,
  }

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  changeTheme = () => {
    this.setState(prevVal => ({isDarkTheme: !prevVal.isDarkTheme}))
  }

  addVideo = video => {
    const {savedVideos} = this.state
    console.log(savedVideos)
    const index = savedVideos.findIndex(item => item.id === video.id)

    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, video]})
    } else {
      savedVideos.splice(index, 1)
      this.setState(savedVideos)
    }
  }

  removeVideo = id => {
    const {savedVideos} = this.state
    const updatedVideos = savedVideos.filter(item => item.id !== id)
    this.setState({savedVideos: updatedVideos})
  }

  render() {
    const {savedVideos, isDarkTheme, activeTab} = this.state
    return (
      <ThemeAndVideoContext.Provider
        value={{
          isDarkTheme,
          savedVideos,
          activeTab,
          changeTheme: this.changeTheme,
          changeTab: this.changeTab,
          addVideo: this.addVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeAndVideoContext.Provider>
    )
  }
}

export default App
