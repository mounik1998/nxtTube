import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import NavBar from '../NavBar'
import {
  BottomCon,
  VideosCon,
  ThumbnailImage,
  ProfileImage,
  ProfileAndDescriptionCon,
  VideoItemCard,
  VideosList,
  Title,
  ViewsAndPublishedAt,
  ChannelName,
  TitleCard,
  BannerCon,
} from './styledComponents'
import './index.css'

class Home extends Component {
  state = {
    homeVideosList: [],
    apiStatus: 'Loading',
    searchQ: '',
    bannerDisplay: true,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {searchQ} = this.state
    console.log(searchQ)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchQ}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const newVideosList = data.videos.map(item => ({
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

      this.setState({apiStatus: 'Success', homeVideosList: newVideosList})
    } else {
      this.setState({apiStatus: 'Failure'})
    }
  }

  retry = () => {
    this.getHomeVideos()
  }

  getSearch = e => {
    this.setState({searchQ: e.target.value})
  }

  getSearchInList = () => {
    this.getHomeVideos()
  }

  onCloseBanner = () => {
    this.setState({bannerDisplay: false})
  }

  renderLoading = () => (
    <div className="loader-container loader-con" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

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
    const {homeVideosList} = this.state
    return (
      <div>
        {homeVideosList.length === 0 && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button type="button" onClick={this.retry}>
              Retry
            </button>
          </div>
        )}
        {homeVideosList.length > 0 && (
          <VideosList>
            {homeVideosList.map(item => (
              <VideoItemCard key={item.id}>
                <Link className="link-styling" to={`/videos/${item.id}`}>
                  <ThumbnailImage
                    src={item.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <ProfileAndDescriptionCon>
                    <ProfileImage
                      src={item.channel.profileImageUrl}
                      alt="channel logo"
                    />
                    <TitleCard>
                      <Title>{item.title}</Title>
                      <ChannelName>{item.channel.name}</ChannelName>
                      <ViewsAndPublishedAt>
                        <p>
                          {item.viewCount} views . {item.publishedAt}
                        </p>
                      </ViewsAndPublishedAt>
                    </TitleCard>
                  </ProfileAndDescriptionCon>
                </Link>
              </VideoItemCard>
            ))}
          </VideosList>
        )}
      </div>
    )
  }

  renderHomeVideos = () => {
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
    const {searchQ, bannerDisplay} = this.state
    console.log(searchQ)
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
            {bannerDisplay && (
              <BannerCon data-testid="banner">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                  />
                  <p>
                    Buy Nxt Watch Premium prepaid plans with <br /> UPI
                  </p>
                  <button className="premiumButton" type="button">
                    GET IT NOW
                  </button>
                  <button
                    className="premiumButton"
                    data-testid="close"
                    type="button"
                    onClick={this.onCloseBanner}
                  >
                    Close
                  </button>
                </div>
              </BannerCon>
            )}

            <div>
              <input
                placeholder="Search"
                type="search"
                value={searchQ}
                onChange={this.getSearch}
              />
              <button
                data-testid="searchButton"
                type="button"
                onClick={this.getSearchInList}
              >
                Search
              </button>
            </div>

            <div className="videos-align">{this.renderHomeVideos()}</div>
          </VideosCon>
        </BottomCon>
      </div>
    )
  }
}

export default Home
