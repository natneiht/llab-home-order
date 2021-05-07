import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { userGetProfile, getShippingRates, formatCurrency } from '../functions'
import Footer from '../components/Footer'
import Header from '../components/Header'
import './HomePage.css'
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
  withGoogleReCaptcha
} from 'react-google-recaptcha-v3'
import { cityList } from '../config'
import FilmOrder from '../components/FilmOrder'

class HomePage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      userInfo: null,
      shippingRate: []
    }
  }

  async componentDidMount () {
    const { userDetail, setUserDetail, isLogin, token } = this.props
    console.log(this.props)
    if (!isLogin) {
      window.location = '/login'
    } else {
      if (userDetail) {
        this.setState({ userInfo: userDetail })
      } else {
      }
    }
    // Get user profile
    const userProfileRespone = await userGetProfile(token)
    const shippingResponse = await getShippingRates(token)

    this.setState({
      userInfo: userProfileRespone,
      shippingRate: shippingResponse
    })
  }

  render () {
    const { userInfo, shippingRate } = this.state

    return (
      <div>
        <Header />
        <FilmOrder userDetail={userInfo} shippingRate={shippingRate} />
        <Footer />
      </div>
    )
  }
}

HomePage.propTypes = {}

export default withGoogleReCaptcha(HomePage)
