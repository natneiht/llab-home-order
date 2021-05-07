export const cityList = [ "TP. Hồ Chí Minh", "Hà Nội"]

export const API_URL= {
    GUEST_LOGIN : "https://api.llab.vn/v1/g/user/login",
    USER_LOGIN : "https://api.llab.vn/v1/p/user/login",
    PASSWORD_RESET : "https://api.llab.vn/v1/g/user/forgot-password",
    USER_LOGOUT : "https://api.llab.vn/v1/p/user/logout",
    USER_GET_PROFILE: 'https://api.dev.llab.vn/v1/p/user/me',
    CREATE_ORDER:  "http://api.dev.llab.vn/v1/p/pickup-order", // method: post
    SHIPPING_RATES: 'https://api.dev.llab.vn/v1/p/shipping-rates' // params: ?limit=10&page=0
}