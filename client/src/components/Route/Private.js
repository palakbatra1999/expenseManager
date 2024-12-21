import React from 'react';
import { useEffect,useState } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

const Privateroute = () => {

    const[ok,setOk] = useState(false);
    const[auth,setAuth] = useAuth(
    )

    useEffect(()=>{
      const authcheck  = async() =>{
        const res = await axios.get('/api/v1/auth/user-auth',
        {
            headers : {
                "Authorization" : auth?.token
            }
        })
        if(res.data.ok)
        {
            setOk(true);
            
        }
      }
      if(auth?.token) authcheck();

    },[]);
  return ok ? <Outlet/> : <Spinner/>;
}

export default Privateroute;
