import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillLike, AiFillDislike, AiFillSave} from 'react-icons/ai'
import Header from '../Header'
import NavBar from '../NavBar'
import {BottomCon, VideosCon} from '../Home/styledComponents'
import {ProfileImage1, Button} from './styledComponents'
import {Title, ViewsAndPublishedAt} from '../Gaming/styledComponents'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import './index.css'
import SavedVideos from '../SavedVideos'

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: 'Loading',
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const {videoDetails} = this.state
      let isLiked
      let isDisLiked
      let isSaved
      if (videoDetails.length === 0) {
        isLiked = false
        isDisLiked = false
        isSaved = false
      } else {
        isLiked = videoDetails.isLiked
        isDisLiked = videoDetails.isDisLiked
        isSaved = videoDetails.isSaved
      }
      const newVideoData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        isLiked,
        isDisLiked,
        isSaved,
      }

      console.log(newVideoData)
      this.setState({videoDetails: newVideoData, apiStatus: 'Success'})
    } else {
      this.setState({apiStatus: 'Failure'})
    }
  }

  liked = () => {
    const {videoDetails} = this.state
    const updatedDetails = videoDetails
    updatedDetails.isLiked = true
    updatedDetails.isDisLiked = false
    this.setState({videoDetails: updatedDetails})
  }

  disLiked = () => {
    const {videoDetails} = this.state
    const updatedDetails = videoDetails
    updatedDetails.isLiked = false
    updatedDetails.isDisLiked = true
    this.setState({videoDetails: updatedDetails})
  }

  renderLoading = () => (
    <div className="loader-container loader-con" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  retry = () => {
    this.getVideoDetails()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {addVideo} = value
        const {videoDetails} = this.state
        const {isLiked, isDisLiked, isSaved} = videoDetails

        const likeColor = isLiked ? '#2563eb' : '#64748b'
        const disLikeColor = isDisLiked ? '#2563eb' : '#64748b'
        const savedColor = isSaved ? '#2563eb' : '#64748b'
        const savedText = isSaved ? 'saved' : 'save'

        this.saved = () => {
          addVideo(videoDetails)
          const updatedDetails = videoDetails
          updatedDetails.isSaved = !updatedDetails.isSaved
          this.setState({videoDetails: updatedDetails})
        }

        return (
          <div>
            <ReactPlayer url={videoDetails.videoUrl} />
            <Title>{videoDetails.title}</Title>
            <div className="align-buttons">
              <ViewsAndPublishedAt>
                {videoDetails.viewCount} views . {videoDetails.publishedAt}
              </ViewsAndPublishedAt>
              <div className="buttons">
                <Button
                  type="button"
                  className="button-react"
                  onClick={this.liked}
                  color={likeColor}
                >
                  <AiFillLike alt="like" />
                  <p>Like</p>
                </Button>
                <Button
                  type="button"
                  className="button-react"
                  onClick={this.disLiked}
                  color={disLikeColor}
                >
                  <AiFillDislike alt="dislike" />
                  <p>Dislike</p>
                </Button>
                <Button
                  type="button"
                  className="button-react"
                  onClick={this.saved}
                  color={savedColor}
                >
                  <AiFillSave alt="save" />
                  <p>{savedText}</p>
                </Button>
              </div>
            </div>
            <hr />
            <div className="page-profile">
              <ProfileImage1
                src={videoDetails.channel.profileImageUrl}
                alt="channel logo"
              />
              <div>
                <Title>{videoDetails.channel.name}</Title>
                <ViewsAndPublishedAt>
                  {videoDetails.channel.subscriberCount} subscribers
                </ViewsAndPublishedAt>
              </div>
            </div>
            <p>{videoDetails.description}</p>
          </div>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )

  renderVideo = () => {
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
          <VideosCon>{this.renderVideo()}</VideosCon>
        </BottomCon>
      </div>
    )
  }
}

export default VideoItemDetails
