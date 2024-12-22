import React from 'react'
import { Link } from 'react-router-dom';
import '../../App.css'

const Footer = () => {
  return (
 <>
    <footer className='bg-dark text-light p-3'>

    <p className='text-center'> All rights reserved &copy; PalakBatra</p>
    <p className='text-center mt-3'>
    <Link to="/about" aria-label="Learn more about us">About</Link> |
<Link to="/contact" aria-label="Get in touch with us">Contact us</Link> |
<Link to="/policy" aria-label="Read our privacy policies">Privacy policies</Link>
 

    </p>

    </footer>
 </>
  )
}

export default Footer;
