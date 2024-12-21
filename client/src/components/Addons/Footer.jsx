import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
 <>
    <div className='bg-dark text-light p-3'>

    <p className='text-center'> All rights reserved &copy; PalakBatra</p>
    <p className='text-center mt-3'>
    <Link to="/about">About</Link> |  <Link to="/contact">Contact us</Link> | <Link to="/policy">Privacy policies</Link> 

    </p>

    </div>
 </>
  )
}

export default Footer;
