import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import NavBar from '../NavBar'
import {BottomCon, VideosCon} from '../Home/styledComponents'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  MainContainer,
  ThumbnailImageTrending,
  Title1,
  ViewsAndPublishedAt1,
  ChannelName1,
  VideoCardTrending,
} from '../Trending/styledComponents'

class SavedVideos extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideos} = value

          return (
            <div>
              <Header />
              <BottomCon>
                <NavBar className="nav-bar" />
                <VideosCon>
                  <h1>Saved Videos</h1>
                  {savedVideos.length === 0 && (
                    <div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                      />
                      <h1>No saved videos found</h1>
                      <p>You can save your videos while watching them</p>
                    </div>
                  )}

                  {savedVideos.length > 0 && (
                    <ul>
                      {savedVideos.map(item => (
                        <Link
                          className="link-styling"
                          to={`/videos/${item.id}`}
                        >
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
                  )}
                </VideosCon>
              </BottomCon>
            </div>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default SavedVideos
