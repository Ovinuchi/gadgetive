import React from 'react'
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>© 2022 Gadgets Xtreme All rights reserved</p>
      <p className='social-icons'>
        <span className='icon'><AiFillFacebook /></span>
        <span className='icon'><AiFillInstagram /></span>
        <span className='icon'><AiOutlineTwitter /></span>
      </p>
    </div>
  )
}

export default Footer
