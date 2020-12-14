import React, { PureComponent } from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { logginAction, signOut } from '../functions'
import { Link } from 'react-router-dom'
import './Login.css'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      loginInfo: ''
    }
  }

  render () {
    const { userName, password, loginInfo } = this.state
    const { doLoginAction, isLogin, userDetail } = this.props
    // console.log(this.props);
    // console.log(loginInfo);
    return (
      <div>
        <Header />
        <div className='container login-wrapper'>
          {isLogin && (
            <Link to='/admin'>Đã đăng nhập, chuyển đến trang Admin!</Link>
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
                onClick={() => {
                  doLoginAction(userName, password)
                    .then(result => {
                      this.setState({ loginInfo: result })
                    })
                    .catch(err => alert(err['message']))
                  //   console.log(loginResult);
                }}
              >
                Đồng ý
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
