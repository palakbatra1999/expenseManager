import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Addons/Layout.jsx';
import toast from 'react-hot-toast';



const Register = async() => {

    const navigate = useNavigate();

   // const toast = Toaster();

  const[Name,setName]=useState("");
  const[Email,setEmail]=useState("");
  const[Password,setPassword]=useState("");
  const[Address,setAddress]=useState("");
  const[Phone,setPhone]=useState("");
  const[answer,setAnswer]= useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const res = await axios.post('/api/v1/auth/register', {
        name: Name,
        email: Email,
        password: Password,
        address: Address,
        phone: Phone,
        question: answer
      });
  
      console.log("API response:", res);
      if (res.status === 200 || res.status === 201) {
        navigate('/login');
        toast.success('User registered successfully. Please login.');
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.error("Error during registration:", e);
      toast.error("Something went wrong!");
    }
  };
  



  return (
  <>
   <Layout>
     <div className='register'>

     <form onSubmit={handlesubmit}>
  <div className="mb-3">
   
    <input type="text" className="form-control" id="Name"  placeholder="Enter your name" 
      onChange={(e)=> setName(e.target.value)}  required value={Name}
    />
   
  </div>
  <div className="mb-3">
  
    <input type="email" className="form-control" id="Email" placeholder="Enter your email address"
     onChange={(e)=> setEmail(e.target.value)} required value={Email}/>
  </div>
   <div className="mb-3">
    
    <input type="password" className="form-control" id="Password" placeholder="Enter your email password"
     onChange={(e)=> setPassword(e.target.value)} required value={Password}/>
  </div>
   <div className="mb-3">
 
    <input type="text" className="form-control" id="Address" placeholder="Enter your Address" 
       onChange={(e)=> setAddress(e.target.value)} required  value={Address}
    />
  </div>
   <div className="mb-3">
 
    <input type="text" className="form-control" id="Answer" placeholder="What is your pet's name?" 
       onChange={(e)=> setAnswer(e.target.value)} required  value={answer}
    />
  </div>
   <div className="mb-3">
   
    <input type="text" className="form-control" id="Phone" placeholder="Enter your phone number"
     onChange={(e)=> setPhone(e.target.value)} required value={Phone}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Register</button>
</form>


     </div>

     </Layout>
  </>

  )
}

export default Register
