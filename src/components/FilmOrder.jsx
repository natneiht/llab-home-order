import React, { PureComponent } from 'react'
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
  withGoogleReCaptcha
} from 'react-google-recaptcha-v3'
import { formatCurrency } from '../functions'
import PropTypes from 'prop-types'
import { withAuthContext } from '../authContext'

class FilmOrder extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      info: '',
      phone: '',
      reCaptcha_v3_token: null,
      shippingRateId: null,
      cityList: [],
      districtList: [],
      currentCity: '',
      currentDistrict: '',
      shippingPrice: 0
    }
  }

  componentDidMount = () => {
    const { shippingRate } = this.props
    // Filter city in list
    const cityArray = shippingRate.map(item => item['city'])
    const cityList = Array.from(new Set(cityArray))

    // Get
    const districtList = shippingRate.filter(item => item.city == cityList[0])
    if (cityList.length != 0 && districtList.length != 0) {
      this.setState({
        currentCity: cityList[0],
        cityList,
        currentDistrict: districtList[0]['name'],
        districtList,
        shippingPrice: districtList[0]['price']
      })
      // this.handleChangeDistrict(districtList[0]['name'])
    }
  }

  handleChangeDistrict = dName => {
    const { shippingRate } = this.props
    const dIndex = shippingRate.findIndex(item => item['name'] == dName)
    if (dIndex != -1) {
      const shippingRateItem = shippingRate[dIndex]
      this.setState({
        currentDistrict: dName,
        shippingPrice: shippingRateItem['price'],
        shippingRateId: shippingRateItem['id']
      })
    }
  }

  render () {
    const { userDetail, shippingRate, createFilmOder } = this.props
    const {
      address,
      phone,
      info,
      shippingRateId,
      currentCity,
      currentDistrict,
      shippingPrice,
      cityList,
      districtList
    } = this.state
    let fullName

    if (userDetail) {
      fullName = userDetail.full_name
      if (!phone)
        this.setState({
          phone: userDetail.phone
        })
    }

    return (
      <div className='container main-wrapper'>
        <div className='client-form'>
          <div className='form-group'>
            <label htmlFor='clientName'>Tên khách hàng / Client's name:</label>
            <input
              type='text'
              className='form-control'
              id='clientName'
              aria-describedby='clientName'
              value={`${fullName}`}
              disabled='true'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='clientAddress'>Địa chỉ/ Address:</label>
            <input
              type='text'
              className='form-control'
              id='clientAddress'
              placeholder='VD: 365F Trần Hưng Đạo'
              value={address}
              onChange={e => this.setState({ address: e.target.value })}
            />
            <small id='clientAddressHelp' className='form-text text-muted'>
              Ghi rõ địa chỉ cụ thể.
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='clientAddress'>Thành phố/ City:</label>
            <select
              className='custom-select form-control'
              value={currentCity}
              onChange={e =>
                this.setState({
                  currentCity: e.target.value
                })
              }
            >
              {cityList.map(district => (
                <option value={district} key={district}>
                  {district}
                </option>
              ))}
            </select>
            {/* {shippingPrice > 0 && (
              <small id='shippingPrice' className='form-text text-muted'>
                {`Phí vận chuyển: ${formatCurrency(shippingPrice)}`}
              </small>
            )} */}
          </div>

          <div className='form-group'>
            <label htmlFor='clientAddress'>Khu vực/ District:</label>
            <select
              className='custom-select form-control'
              value={currentDistrict}
              onChange={e => {
                this.setState({
                  currentDistrict: e.target.value
                })
                this.handleChangeDistrict(e.target.value)
              }}
            >
              {districtList.length == 0 && (
                <option value='loading'>Loading...</option>
              )}
              {districtList.length != 0 &&
                districtList.map(district => (
                  <option value={district['name']} key={district['id']}>
                    {district['name']}
                  </option>
                ))}
            </select>
            {shippingPrice > 0 && (
              <small id='shippingPrice' className='form-text text-muted'>
                {`Phí vận chuyển: ${formatCurrency(shippingPrice)}`}
              </small>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='clientPhoneNumber'>
              Số điện thoại/ Phone's number:
            </label>
            <input
              type='text'
              className='form-control'
              id='clientPhoneNumber'
              placeholder='VD: 0909123456'
              value={phone}
              onChange={e => this.setState({ phone: e.target.value })}
            />
            <small id='clientPhoneNumber' className='form-text text-muted'>
              Ghi rõ số điện thoại để nhân viên liên hệ.
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='clientPhoneNumber'>
              Thông tin đơn hàng/ Order's information:
            </label>
            <input
              type='text'
              className='form-control'
              id='orderInfo'
              placeholder='VD: 02 cuộn Kodak Ultramax 400'
              value={info}
              onChange={e => this.setState({ info: e.target.value })}
            />
            <small id='orderInfo' className='form-text text-muted'>
              Thông tin đơn hàng.
            </small>
          </div>

          {/* <GoogleReCaptchaProvider reCaptchaKey='6Le4xrcZAAAAAHuHK5-XOhWd2PrG6cV9bQdAnfOq'>
            <GoogleReCaptcha
              onVerify={token => this.setState({ captchaOK: true })}
            />
          </GoogleReCaptchaProvider> */}

          <button
            className='btn btn-primary'
            style={{ marginTop: '5px' }}
            onClick={() => this.submitOrder()}
            // disabled={captchaOK ? false : true}
          >
            Đồng ý
          </button>
        </div>
      </div>
    )
  }
}

FilmOrder.propTypes = {}

export default withAuthContext(FilmOrder)
