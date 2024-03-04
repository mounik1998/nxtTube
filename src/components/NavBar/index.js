import {Link} from 'react-router-dom'
import {FaFire, FaRegFolderOpen} from 'react-icons/fa'
import {IoMdHome} from 'react-icons/io'

import {SiYoutubegaming} from 'react-icons/si'
import './index.css'

const NavBar = () => (
  <div className="nav-bar">
    <ul>
      <Link className="link-styling" to="/">
        <li key="home">
          <div className="nav-con">
            <IoMdHome className="logo" />
            <p>Home</p>
          </div>
        </li>
      </Link>
      <Link className="link-styling" to="/trending">
        <li key="trending">
          <div className="nav-con">
            <FaFire className="logo" />
            <p>Trending</p>
          </div>
        </li>
      </Link>
      <Link className="link-styling" to="/gaming">
        <li key="gaming">
          <div className="nav-con">
            <SiYoutubegaming className="logo" />
            <p>Gaming</p>
          </div>
        </li>
      </Link>
      <Link className="link-styling" to="/saved-videos">
        <li key="saved">
          <div className="nav-con">
            <FaRegFolderOpen className="logo" />
            <p>Saved Videos</p>
          </div>
        </li>
      </Link>
    </ul>
    <div className="contactContainer">
      <p>CONTACT US</p>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="socialNetworkImages"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="socialNetworkImages"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="socialNetworkImages"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)
export default NavBar
