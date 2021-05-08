import React, { PureComponent } from 'react'
// import firebase from 'firebase'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { userLogin, getGuestToken, getOldSession } from '../functions'
import { API_URL } from '../config'
import { Link, Redirect } from 'react-router-dom'
import './Login.css'
import { withAuthContext } from '../authContext'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      processingLogin: false,
      // guestToken: null,
      userName: '',
      password: '',
      loginInfo: ''
    }
  }

  async doLoginAction (user, password) {
    this.setState({ processingLogin: true })
    const guestToken = await getGuestToken()

    if (guestToken) {
      try {
        const userLoginResponse = await userLogin(user, password, guestToken)
        if (userLoginResponse && userLoginResponse.hasOwnProperty('data')) {
          const userToken = userLoginResponse.data.data.token
          this.props.setLoginStatus(true, userToken, false)
        }
      } catch (error) {
        console.log(error.message)
        this.props.setLoginStatus(false, null, true)
      }
      this.setState({ processingLogin: false })
    }
  }

  render () {
    const { userName, password, loginInfo, processingLogin } = this.state
    const { doLoginAction, isLogin, userDetail } = this.props
    return (
      <div>
        <Header />
        <div className='container login-wrapper'>
          {isLogin && (
            <Link to='/'>Bạn đã đăng nhập, chuyển về trang chủ!</Link>
          )}
          {!isLogin && (
            <div>
              <div>
                <label htmlFor='userName'>Username:</label>
                <input
                  type='text'
                  className='form-control'
                  id='userName'
                  value={userName}
                  onChange={e => this.setState({ userName: e.target.value })}
                />
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
              <button
                style={{ marginTop: '25px' }}
                className='btn btn-primary'
                disabled={processingLogin ? 'true' : ''}
                onClick={() => {
                  this.doLoginAction(userName, password).catch(err =>
                    alert(err['message'])
                  )
                }}
              >
                {processingLogin ? 'Processing...' : 'Login'}
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

Login.propTypes = {}

export default withAuthContext(Login)
