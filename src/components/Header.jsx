import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Header.css'
import { Link } from 'react-router-dom'

class Header extends PureComponent {
  render () {
    const navBarLink = [
      { text: 'GIỚI THIỆU', link: 'https://llab.vn/gioi-thieu/' },
      { text: 'TRÁNG & SCAN', link: 'https://llab.vn/dich-vu/' },
      { text: 'IN ẢNH', link: 'https://llab.vn/printing/' },
      { text: 'MUA FILM', link: 'https://filmstore.vn/' },
      { text: 'TRACKING', link: 'https://tracking.llab.vn/' },
      { text: 'ORDER', link: 'https://order.llab.vn/', active: true },
      { text: 'THANH TOÁN', link: 'https://llab.vn/lien-he/' },
      {
        text: 'ĐỊA CHỈ SỬA MÁY ẢNH',
        link: 'https://llab.vn/dia-chi-sua-may-anh/'
      },
      { text: 'TUYỂN DỤNG', link: 'https://llab.vn/tuyen-dung/' }
    ]
    return (
      <div className='container'>
        <header className='header-wrap'>
          <div className='header-logo'>
            <a href='https://llab.vn' className='text-center'>
              <img
                src='https://llab.vn/wp-content/themes/llab-premium-services/assets/images/logo.png'
                alt=''
                className='mauto hvr-grow'
                width='112'
              />
            </a>
          </div>
          <div className='row'>
            <div className='col-xs-12 col-sm-11'>
              <div className='header-menu'>
                <ul id='menu-ok-ok' className='menu'>
                  {navBarLink.map((item, index) => (
                    <li
                      id={`menu-item-${index}`}
                      key={index}
                      className={`menu-item menu-item-type-post_type menu-item-object-page menu-item ${
                        item['active'] == true
                          ? 'current-menu-item page-item page-item current-page-item'
                          : ''
                      }`}
                    >
                      <a href={item.link}>{item.text}</a>
                    </li>
                  ))}

                  <li
                    id='menu-item-2629-en'
                    className='lang-item lang-item-56 lang-item-en lang-item-first menu-item menu-item-type-custom menu-item-object-custom menu-item-2629-en'
                  >
                    <a href='https://llab.vn/en/printing/' lang='en-US'>
                      <img
                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHzSURBVHjaYkxOP8IAB//+Mfz7w8Dwi4HhP5CcJb/n/7evb16/APL/gRFQDiAAw3JuAgAIBEDQ/iswEERjGzBQLEru97ll0g0+3HvqMn1SpqlqGsZMsZsIe0SICA5gt5a/AGIEarCPtFh+6N/ffwxA9OvP/7//QYwff/6fZahmePeB4dNHhi+fGb59Y4zyvHHmCEAAAW3YDzQYaJJ93a+vX79aVf58//69fvEPlpIfnz59+vDhw7t37968efP3b/SXL59OnjwIEEAsDP+YgY53b2b89++/awvLn98MDi2cVxl+/vl6mituCtBghi9f/v/48e/XL86krj9XzwEEEENy8g6gu22rfn78+NGs5Ofr16+ZC58+fvyYwX8rxOxXr169fPny+fPn1//93bJlBUAAsQADZMEBxj9/GBxb2P/9+S/R8u3vzxuyaX8ZHv3j8/YGms3w8ycQARmi2eE37t4ACCDGR4/uSkrKAS35B3TT////wADOgLOBIaXIyjBlwxKAAGKRXjCB0SOEaeu+/y9fMnz4AHQxCP348R/o+l+//sMZQBNLEvif3AcIIMZbty7Ly6t9ZmXl+fXj/38GoHH/UcGfP79//BBiYHjy9+8/oUkNAAHEwt1V/vI/KBY/QSISFqM/GBg+MzB8A6PfYC5EFiDAABqgW776MP0rAAAAAElFTkSuQmCC'
                        title='English'
                        alt='English'
                        width='16'
                        height='11'
                      />
                      <span style={{ marginLeft: '0.3em' }}>English</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className=''>
              <div className='header-tools'>
                <div className='header-socials' style={{ marginRight: 0 }}>
                  <a href='https://www.facebook.com/llabvn/' target='_blank'>
                    <i className='fa fa-facebook-square' />
                  </a>

                  <a href='https://www.instagram.com/llab.vn/' target='_blank'>
                    <i className='fa fa-instagram' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}

Header.propTypes = {}

export default Header
