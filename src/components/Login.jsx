import React, { useContext, useState } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

const Login = () => {

    const [mailadd, setEmail] = useState("");
    const [passadd, setPassword] = useState();



    const Emailaddchange = (event) => {
        setEmail(event.target.value);
    }

    const Passaddchange = (event) => {
        setPassword(event.target.value);
    }

    const isValid = (Mail, Pass) => {

        if (Mail === "palak1999" && Pass === "12345")
            return true;
        else return false;
    }
    return (
        <>
            <form >

                <div className='form-control'>
                    <label htmlFor='text'>Email Address</label>
                    <input type='text' value={mailadd} onChange={Emailaddchange} placeholder='Enter your email address' />


                </div>

                <div className='form-control'>
                    <label htmlFor='Password'>Password</label>
                    <input type='text' value={passadd} onChange={Passaddchange} placeholder='*******' />
                </div>

                <div>
                    <NavLink className='btn' to={isValid(mailadd, passadd) ? '/expenses' : '/'}>Login</NavLink>

                </div>

            </form>
            <div>
                <br />
                <label>Or Register if you are new.</label>
                <NavLink className='btn' to={'/register'}>Sign in</NavLink>
            </div>
        </>
    )
}

export default Login
