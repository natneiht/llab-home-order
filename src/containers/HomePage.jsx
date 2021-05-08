import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Footer from '../components/Footer'
import Header from '../components/Header'
import './HomePage.css'
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
  withGoogleReCaptcha
} from 'react-google-recaptcha-v3'
import FilmOrder from '../components/FilmOrder'
import { withAuthContext } from '../authContext'

class HomePage extends PureComponent {
  async componentDidMount () {
    const {
      userDetail,
      isLogin,
      shippingRate,
      checkShippingRate,
      checkUserNotification
    } = this.props
    if (!isLogin) {
      window.location = '/login'
    }
    if (!userDetail) {
      checkUserNotification()
    }
    if (shippingRate.length == 0) {
      checkShippingRate()
    }
  }

  render () {
    return (
      <div>
        <Header />
        <FilmOrder />
        <Footer />
      </div>
    )
  }
}

HomePage.propTypes = {}

export default withAuthContext(HomePage)
