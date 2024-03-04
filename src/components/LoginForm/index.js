import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Logo, MainCon, LoginButton} from './styledComponents'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showPassword: false}

  submitForm = e => {
    e.preventDefault()
  }

  setUsername = e => {
    this.setState({username: e.target.value})
  }

  setPassword = e => {
    this.setState({password: e.target.value})
  }

  showPassWordClick = () => {
    this.setState(prevVal => ({showPassword: !prevVal.showPassword}))
  }

  getLogin = async () => {
    const {username, password} = this.state

    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}

    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <MainCon>
        <Logo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <form onSubmit={this.submitForm}>
          <label htmlFor="userName">USERNAME</label>
          <br />
          <input
            id="userName"
            type="text"
            value={username}
            onChange={this.setUsername}
          />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <br />
          <input
            id="password"
            type={inputType}
            value={password}
            onChange={this.setPassword}
          />
          <br />
          <div>
            <input
              id="showPassword"
              type="checkbox"
              onChange={this.showPassWordClick}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <div>
            <LoginButton type="submit" onClick={this.getLogin}>
              Login
            </LoginButton>
          </div>
          <p>{errorMsg}</p>
        </form>
      </MainCon>
    )
  }
}

export default LoginForm
