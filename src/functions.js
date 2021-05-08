import Axios from "axios";
import { API_URL } from './config'

export function formatCurrency(num) {
  if (num == null) num = 0;
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VNĐ";
}

//------------------------------
export async function getOldSession() {
  // Get local token
  const localToken = localStorage.getItem("_tk")
  // Get shipping rates for checking local token
  // const shippingRatesResponse = await getShippingRates()
  if (localToken) {
    return localToken
  }
  else {
    localStorage.removeItem('_tk')
    return false
  }
}

export async function getGuestToken () {
  const localGuestToken = localStorage.getItem("_gtk")

  if(localGuestToken)
  {
    return localGuestToken
  }
  else {
    console.log('Token experied. Get new token.')
    const newGuestToken = await getNewGuestToken()
    return newGuestToken
  }
}

export async function getNewGuestToken () {
  const guestTokenResponse = await Axios.post(API_URL.GUEST_LOGIN)
    if (guestTokenResponse.hasOwnProperty('data')){
    if (guestTokenResponse && guestTokenResponse.data.data.can_login) {
      const guestToken = guestTokenResponse.data.data.token
      localStorage.setItem('_gtk', guestToken)
      return guestToken
    }
  }
}

export async function userLogin (user, password, guestToken) {
    try {
      if (guestToken) {
        const rawData = {
          email: user,
          password: password
        }

        const loginResult = await Axios.post(API_URL.USER_LOGIN, rawData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: guestToken
          }
        })
        if (loginResult && loginResult.hasOwnProperty('data')) {
          const userToken = loginResult.data.data.token
          localStorage.setItem('_tk', userToken)
          localStorage.setItem('_isLg', '1')
          return userToken
        }
      }
    } catch (error) {
      if (error.response) {
        const errorResponse = error.response.data
        if (errorResponse.code === 'EMAIL_NOT_VERIFIED') {
          alert('Email chưa xác thực.')
          console.log('EMAIL_NOT_VERIFIED')
          // this.setState({
          //   isLogin: false,
          //   isVerified: false,
          //   processingLogin: false,
          //   isError: true,
          //   errorDetail: errorResponse
          // })
        } else if (errorResponse.code === 'INVALID_PASSWORD') {
          alert('Sai tên đăng nhập hoặc mật khẩu.')
          // this.setState({
          //   isLogin: false,
          //   processingLogin: false,
          //   isError: true,
          //   errorDetail: error,
          //   userName: '',
          //   userPassword: ''
          // })
        } else {
          alert(error.response['message'])
          // this.setState({
          //   isLogin: false,
          //   processingLogin: false,
          //   isError: true,
          //   errorDetail: error
          // })
        }
      }
    }
  }
export  async function userLogout  () {
    const token = localStorage.getItem('_tk')
    if (token) {
      const logoutResponse = await Axios.post(API_URL.USER_LOGOUT, '', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      if (logoutResponse) {
        // this.setState({ isLogin: false })
        localStorage.removeItem('_tk')
        localStorage.setItem('_isLg', '0')
      }
    }
  }

  export  async function userGetProfile  (token) {
    if (token) {
      const getProfileResponse = await Axios.get(API_URL.USER_GET_PROFILE, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          'Access-Control-Allow-Origin': '*'
        }
      })
      if(getProfileResponse && getProfileResponse.hasOwnProperty('data')){
        return getProfileResponse.data
      }
      else {
        return null
      }
    }
    
  }

    export  async function getShippingRates  (token) {
    if (token) {
      // const defaultLimit = 10;
      // const firstParam = `?limit=${defaultLimit}&page=0` // For checking total pages
      const shippingResponse = await Axios.get(API_URL.SHIPPING_RATES, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          'Access-Control-Allow-Origin': '*'

        }
      })
      // console.log(shippingResponse)
      if(shippingResponse && shippingResponse.hasOwnProperty('data')){
        // const totalPage = shippingResponse.data.total;
        // if(totalPage > defaultLimit) {
        //   const getCount = Math.ceil(totalPage/defaultLimit)
        // }
        // else {
          return shippingResponse.data.data.items
        // }
      }
      else {
        return null
      }
    }
    
  }

  export  async function createOrder  (orderDetail, token) {
    if (token) {
      try {
      const body = {
					"mode": "raw",
					"raw": JSON.stringify( orderDetail),
					"options": {
						"raw": {
							"language": "json"
						}
					}
      }
      const createOderResponse = await Axios.post(API_URL.SHIPPING_RATES, body,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          'Access-Control-Allow-Origin': '*'
        }
      })
      if(createOderResponse){
          alert('Đơn hàng được khởi tạo thành công!')
      }
      else {
          alert('Có lỗi xảy ra trong quá trình khởi tạo đơn hàng.')

      }
    }
    catch (error) {
      console.log(error)
    }
    }
    
  }