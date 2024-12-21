import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth , AuthProvider} from '../context/auth.js';
import { token } from 'morgan';
import '../../App.css';

const Header = () => {
 // console.log(AuthProvider);
 
const{ auth, setAuth } = useAuth();
//console.log(auth);

   const handleLogout = () =>{
    setAuth({
      ...auth, user : null, token: ''
    })
    localStorage.removeItem('auth.token');

   
   }
   
   
  return (
  <>
 <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <NavLink to="/"
        className="navbar-brand"  
        href="#">
          Hidden Brand
        </NavLink>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
      
       {
        !auth.user ?
        (
          <>
             <li class="nav-item">
         <NavLink to="/"
         className="nav-link"  
         href="#">
         Register
        </NavLink>
        </li>

         <li class="nav-item">
         <NavLink to="/login"
         className="nav-link"  
         href="#">
         Login
        </NavLink>
        </li>
          </>
        )
        :
       (  
      
      <>
        <li class="nav-item">
        <NavLink
        to="/homepage"
        className="nav-link active"
        aria-current="page"
        href="#"
        >
            Home
        </NavLink>
        </li>
         <li class="nav-item">
         <NavLink to="/category"
         className="nav-link"  
         href="#">
         Category
        </NavLink>
        </li>
          
     <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" 
  href="#" 
  id="navbarDropdown" 
  role="button" 
  data-bs-toggle="dropdown" 
  aria-haspopup="true" 
  aria-expanded="false">
   
   {auth?.user?.role === 1 ? 'Admin': auth.user.name}
  </NavLink>
 
  <ul className='dropdown-menu'>
    
        <li>
           <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin': 'user'}`}
         className="dropdown-item" >
         Dashboard
        </NavLink>
       

        </li>
        
         <NavLink to="/login"
         className="dropdown-item" 
         onClick={handleLogout} >
         Logout
        </NavLink>
  </ul>
       
 
</li>
      </>
 
        )
       }

          <li class="nav-item">
         <NavLink to="/"
         className="nav-link"  
         href="#">
         Cart(0)
        </NavLink>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
  </>
  )
      }

export default Header
