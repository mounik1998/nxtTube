import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'

import {
  HeaderCon,
  Logo,
  Profile,
  NavItems,
  LogoutButton,
  ModalContainer,
  ModalButtons,
} from './styledComponents'

const Header = props => {
  const {history} = props
  console.log(props)
  console.log(history)

  const logoutApp = () => {
    Cookies.remove('jwt_token')
  }

  return (
    <HeaderCon>
      <Link to="/">
        <Logo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
      </Link>

      <NavItems>
        <li type="button" key="profileButton">
          <Profile
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
        </li>
        <li key="logout">
          <Popup
            modal
            trigger={<LogoutButton type="button">Logout</LogoutButton>}
            className="popup-content"
          >
            {close => (
              <ModalContainer>
                <p>Are you sure, you want to logout?</p>
                <div>
                  <ModalButtons type="button" onClick={() => close()}>
                    Cancel
                  </ModalButtons>
                  <Link to="/login">
                    <ModalButtons type="button" onClick={logoutApp}>
                      Confirm
                    </ModalButtons>
                  </Link>
                </div>
              </ModalContainer>
            )}
          </Popup>
        </li>
      </NavItems>
    </HeaderCon>
  )
}
export default Header
