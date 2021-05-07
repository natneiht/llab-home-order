import React, { PureComponent } from 'react'
// import firebase from 'firebase'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { userLogin, getGuestToken, getOldSession } from '../functions'
import { API_URL } from '../config'
import { Link, Redirect } from 'react-router-dom'
import './Login.css'

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

  // async generateGuestToken () {
  //   // const oldGuestToken = getOldSession()
  //   // console.log(oldGuestToken)
  //   // if (!oldGuestToken) {
  //   // const newGuestToken = await getGuestToken()
  //   // return newGuestToken
  //   const guestToken = await getGuestToken()
  //   console.log(guestToken)
  //   if (guestToken) {
  //     this.setState({
  //       guestToken,
  //       guestTokenLoading: false
  //     })
  //   } else {
  //     this.setState({
  //       guestToken: null,
  //       guestTokenLoading: false
  //     })
  //   }
  // }

  async doLoginAction (user, password) {
    this.setState({ processingLogin: true })
    const guestToken = await getGuestToken()

    if (guestToken) {
      try {
        const userLoginResponse = await userLogin(user, password, guestToken)
        // console.log(userLoginResponse)
        if (userLoginResponse && userLoginResponse.hasOwnProperty('data')) {
          const userToken = userLoginResponse.data.data.token
          this.props.setLoginStatus(
            true,
            userToken,
            false
            // loginResponse.data.data
          )
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
    // console.log('Login state:', this.state)
    // console.log(this.props);
    // console.log(loginInfo);
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
                  this.doLoginAction(userName, password)
                    // .then(result => {
                    //   console.log(result)
                    // this.setState({ loginInfo: result })
                    // })
                    .catch(err => alert(err['message']))
                  //   console.log(loginResult);
                }}
              >
                {processingLogin ? 'Processing...' : 'Login'}
              </button>
              {/* <button
                className="btn btn-primary"
                onClick={() => {
                  signOut();
                  //   this.setState({ loginInfo: loginResult });
                }}
              >
                Logout
              </button>
              <Link to="/admin">Admin</Link> */}
            </div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

Login.propTypes = {}

export default Login
