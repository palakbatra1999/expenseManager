import React, { useState } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import Login from './Login';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");

    const Namechangeform = (event) => {
        setName(event.target.value);

    }

    const Emailchangeform = (event) => {
        setEmail(event.target.value);

    }

    const Numberchangeform = (event) => {
        setNumber(event.target.value);

    }

    const Passwordchangeform = (event) => {
        setPassword(event.target.value);
    }


    const submit = () => {

        setPassword("");
        setEmail("");
        setNumber("");
        setName("");

    }

    const btnclick = () => {


    }

    return (
        <>
            <form onSubmit={submit}>

                <div className='form-control'>

                    <label htmlFor='text'>Full Name</label>
                    <input type='text' value={name} onChange={Namechangeform} placeholder='enter your name...' required />

                </div>

                <div className='form-control'>

                    <label htmlFor='text'>Email Address</label>
                    <input type='text' value={email} onChange={Emailchangeform} placeholder='Email Address' required />

                </div>

                <div className='form-control'>

                    <label htmlFor='text'>Password</label>
                    <input type='text' value={password} onChange={Passwordchangeform} placeholder='********' required />

                </div>

                <div className='form-control'>

                    <label htmlFor='text'>phone number</label>
                    <input type='text' value={number} onChange={Numberchangeform} placeholder='' required />

                </div>


                <div>
                    <NavLink className='btn' to={'/expenses'}>Register</NavLink>
                </div>

            </form>

            <div>
                <br />
                <label>Or login if you already have an account with us.</label>
                <NavLink className='btn' to={'/login'}>Sign in</NavLink>
            </div>
        </>
    )
}

export default Register
