
import usrModel from '../models/usrModel.js';
import dotenv from "dotenv";
import {comparePassword, hashPassword} from '../helpers/authHelper.js';
import jwt from 'jsonwebtoken';


export const registerController = async(req,res) => {
 
    try{
        const {namE,email,password,phone,address} = req.body;

       console.log(req.body);

        if(!namE)
        {
           return  res.send("Name is required");
        }
         if(!email)
        {
           return  res.send("Email is required");
        }
         if(!password)
        {
           return  res.send("Password is required");
        }
         if(!phone)
        {
           return  res.send("Phone is required");
        }
         if(!address)
        {
           return  res.send("Address is required");
        }

        //check for existing user
        const existinguser = await usrModel.findOne({email})

        if(existinguser)
        {
            return res.status(200).send({
                success : true,
                message : "User already exists. Please login"
            })
        }

        const hashedPassword = await hashPassword(password);
        const user= await new usrModel({namE,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            succes:true,
            message : "User registered successfully",
            user

        })


    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in registration',

        })
    }


}

export const loginController = async(req,res) =>{

    dotenv.config();

    try{

        const{email,password} = req.body;

          if(!email || !password)
        {
           return res.status(404).send({
            succes: false,
            message : 'Invalid username or Password'
           })
        }

        const user = await usrModel.findOne({email});

        if(!user)
        {
          return res.status(404).send({
            succes: false,
            message : 'This user doesnt exist, Please sign up'
           })
        }

        const match = await comparePassword(password, user.password);
        if( ! match)
        {
             return res.status(200).send({
            succes: false,
            message : 'Invalid Password'
           })
        }

        const token =  jwt.sign({_id:user._id},process.env.JWT_SECRET, { expiresIn : "74d" });


         res.status(200).send({
            success : true,
            message : "login successfully",
            user : {
                name : user.namE,
                email : user.email,
                phone : user.phone,
                address : user.address,
               
            }
        ,token})
        
        

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in Log in',

        })
    }

}




