import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import NavBar from '../NavBar'
import {BottomCon, VideosCon} from '../Home/styledComponents'
import './index.css'

import {
  MainContainer,
  ThumbnailImageTrending,
  Title1,
  ViewsAndPublishedAt1,
  ChannelName1,
  VideoCardTrending,
  TrendingHeading,
} from './styledComponents'

class Trending extends Component {
  state = {trendingList: [], apiStatus: 'Loading'}

  componentDidMount() {
    this.getTrendingVideosList()
  }

  getTrendingVideosList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const newTrendingListData = data.videos.map(item => ({
        channel: {
          name: item.channel.name,
          profileImageUrl: item.channel.profile_image_url,
        },
        id: item.id,
        publishedAt: item.published_at,
        thumbnailUrl: item.thumbnail_url,
        title: item.title,
        viewCount: item.view_count,
      }))

      this.setState({apiStatus: 'Success', trendingList: newTrendingListData})
    } else {
      this.setState({apiStatus: 'Failure'})
    }
  }

  renderLoading = () => (
    <div className="loader-container loader-con" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  retry = () => {
    this.getTrendingVideosList()
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

  renderSuccessView = () => {
    const {trendingList} = this.state

    return (
      <div>
        <TrendingHeading>Trending Videos</TrendingHeading>
        <ul>
          {trendingList.map(item => (
            <Link className="link-styling" to={`/videos/${item.id}`}>
              <VideoCardTrending key={item.id}>
                <MainContainer>
                  <ThumbnailImageTrending
                    src={item.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <div>
                    <Title1>{item.title}</Title1>
                    <ChannelName1>{item.channel.name}</ChannelName1>
                    <ViewsAndPublishedAt1>
                      {item.viewCount} . {item.publishedAt}
                    </ViewsAndPublishedAt1>
                  </div>
                </MainContainer>
              </VideoCardTrending>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderTrendingVideos = () => {
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
            <div>{this.renderTrendingVideos()}</div>
          </VideosCon>
        </BottomCon>
      </div>
    )
  }
}

export default Trending
