import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [token, setToken] = useState('');
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const navigate = useNavigate()

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[ token ])

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignIn) {
        const response = await axios.post(BACKEND_URL + "/api/user/login",{email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token) 
         
        }else{
          toast.error(response.data.message)
        }

      } else {
        const response = await axios.post(BACKEND_URL + "/api/user/register",{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token) 
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
      
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{isSignIn ? "Login" : "SignUp"}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {!isSignIn && (
        <input
          onChange={(e)=>setName(e.target.value)}  value={name}
          className="w-full px-3 py-2 border border-gray-600 outline-none"
          type="text"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e)=>setEmail(e.target.value)}  value={email}
        className="w-full px-3 py-2 border border-gray-600 outline-none"
        type="email"
        placeholder="Email"
        required
      />
      <input
        onChange={(e)=>setPassword(e.target.value)}  value={password}
        className="w-full px-3 py-2 border border-gray-600 outline-none"
        type="password"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {isSignIn ? (
          <p className="cursor-pointer">Forgot Your Password</p>
        ) : (
          <p className="cursor-pointer">Already Registered</p>
        )}
        {isSignIn ? (
          <p className="cursor-pointer text-blue-500 " onClick={toggleSignIn}>
            <span className="text-black">New User?</span>Create Account
          </p>
        ) : (
          <p className="cursor-pointer  text-blue-500" onClick={toggleSignIn}>
            SignIn
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-2">
        {isSignIn ? "Login" : "SignUp"}
      </button>
    </form>
  );
};

export default Login;
