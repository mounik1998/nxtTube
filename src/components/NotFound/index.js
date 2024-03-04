import Header from '../Header'
import NavBar from '../NavBar'
import {BottomCon, VideosCon} from '../Home/styledComponents'

const NotFound = () => (
  <div>
    <Header />
    <BottomCon>
      <NavBar className="nav-bar" />
      <VideosCon>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
          />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      </VideosCon>
    </BottomCon>
  </div>
)

export default NotFound
