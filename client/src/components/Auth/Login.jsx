import React, { useContext, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useAuth, AuthProvider } from '../context/auth.js';
import { useNavigate , useLocation } from 'react-router-dom';
import Layout from '../Addons/Layout';
import toast from 'react-hot-toast';

const Login = () => {

   const {auth,setAuth}= useAuth({
       user:null,
       token:''
       });

    const [mailadd, setEmail] = useState("");
    const [passadd, setPassword] = useState();
    const location = useLocation();
   

        const navigate = useNavigate();



    const Emailaddchange = (event) => {
        setEmail(event.target.value);
    }

    const Passaddchange = (event) => {
        setPassword(event.target.value);
    }

    const handlesubmit = async(e) =>{
    e.preventDefault();

    
       try{
      const res= await axios.post('http://localhost:5000/api/v1/auth/login', {"email": mailadd,"password": passadd});
      console.log(res.status);
      if(res && res.status === 200){

        await  setAuth({
          ...auth,
          user : res.data.user,
          token : res.data.token
        })
        console.log(auth);
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success('Login successful');
     
        console.log(res.data);
      
        navigate(location.state ||'/');
        
      }
      else{
        toast.error(res.data.message);
      }
      } 
      catch(e)
      {
        console.log(e);
        toast.error("something went wrong !");
      }
    
    }
    return (
        <>
         
         <Layout>
               <form  onSubmit={handlesubmit} >

                <div className='form-control'>
                    <label htmlFor='text'>Email Address</label>
                    <input type='text' value={mailadd} onChange={Emailaddchange} placeholder='Enter your email address' />


                </div>

                <div className='form-control'>
                    <label htmlFor='Password'>Password</label>
                    <input type='text' value={passadd} onChange={Passaddchange} placeholder='*******' />
                </div>

                <div>
                    <NavLink className='btn' type="submit" onClick={handlesubmit}>Login</NavLink>

                </div>

            </form>
            <div>
                <br />
                <label>Or Register if you are new.</label>
                <NavLink className='btn' to={'/register'}>Sign up</NavLink>
            </div>

         </Layout>
                 </>
    )
}

export default Login
