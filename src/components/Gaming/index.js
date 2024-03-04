import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import NavBar from '../NavBar'
import {BottomCon, VideosCon} from '../Home/styledComponents'
import {
  GameVideoCard,
  ThumbnailImg,
  GamingList,
  Title,
  ViewsAndPublishedAt,
} from './styledComponents'
import './index.css'

class Gaming extends Component {
  state = {gamingVideosList: [], apiStatus: 'Loading'}

  componentDidMount() {
    this.getGamingVideosList()
  }

  getGamingVideosList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const newGamingVideosList = data.videos.map(item => ({
        id: item.id,
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))

      console.log(newGamingVideosList)
      this.setState({
        gamingVideosList: newGamingVideosList,
        apiStatus: 'Success',
      })
    } else {
      this.setState({apiStatus: 'Failure'})
    }
  }

  renderSuccessView = () => {
    const {gamingVideosList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    return (
      <div>
        <h1>Gaming</h1>
        <GamingList>
          {gamingVideosList.map(item => (
            <GameVideoCard key={item.id}>
              <Link className="link-styling" to={`/videos/${item.id}`}>
                <ThumbnailImg src={item.thumbnailUrl} alt="video thumbnail" />
                <div>
                  <Title>{item.title}</Title>
                  <ViewsAndPublishedAt>
                    {item.viewCount} Watching Worldwide
                  </ViewsAndPublishedAt>
                </div>
              </Link>
            </GameVideoCard>
          ))}
        </GamingList>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container loader-con" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  retry = () => {
    this.getGamingVideosList()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderGamingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'Loading':
        return this.renderLoading()
      case 'Success':
        return this.renderSuccessView()
      case 'Failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <BottomCon>
          <NavBar className="nav-bar" />
          <VideosCon>
            <div>{this.renderGamingVideos()}</div>
          </VideosCon>
        </BottomCon>
      </div>
    )
  }
}

export default Gaming
