import './Footer.scss'
import React from 'react'
import imgFooter from '../../img/logoFooter.png'

function Footer() {
  return (
    <div className='footer'>
      <div className='logo'>
        <img src={imgFooter} />
        <p>
          Interactive lessons, "on-the-go"
          practice, peer support.
        </p>
      </div>

      <div className='menu'>
        <ul>
          <li>Home</li>
          <li>Features</li>
          <li>Courses</li>
          <li>Blog</li>
        </ul>
        <ul>
          <li>Contact</li>
          <li>Terms of Use</li>
          <li>FAQ</li>
        </ul>
      </div>

      <div className='contact'>
        <i className="fa-brands fa-facebook-messenger fa-2x"></i>
        <i className="fa-solid fa-phone fa-2x"></i>
        <i className="fa-solid fa-envelope fa-2x"></i>
        <p>facebook.com/tuyen.dung.haposoft</p>
      </div>
    </div>
  )
}

export default Footer

