import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from '../supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';

const LoginModel = ({ isOpen, setIsOpen, logType, setLogType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const dispatch = useDispatch();

  const signup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    setLoading(false);
    if (error) {
      setError(error.message);
      setEmail('')
      setPassword('')
      setError('')
      return
    } else {
      setError("Account created successfully, please verify your mail");
    }
    setTimeout(()=>{
      setEmail('')
      setPassword('')
      setError('')
    },500)
   
    dispatch(setUser(data.user))
  };

  const signin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    setLoading(false);
    if (error) {
      setError(error.message);
      return
    } else {
      setError("Sign in successfully");
    }
    setTimeout(()=>{
      setEmail('')
      setPassword('')
      setError('')
    },500)
   
    dispatch(setUser(data.user))
  };

  return isOpen ? (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30 mt-[70px] z-50">
        <div className='bg-white w-4/6 h-4/5 flex shadow-2xl'>
          <div className="bg-[#2874F0] p-8 w-2/6 h-full flex flex-col">
            {logType ? (
              <>
                <h2 className="text-2xl text-white font-bold">Login</h2>
                <p className="mt-2 text-slate-300 text-lg">Get access to your Orders, Wishlist, and Recommendations</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl text-white font-bold">Looks like you're new here!</h2>
                <p className="mt-2 text-slate-300 text-lg">Sign up here to get started...</p>
              </>
            )}
            <img src='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png' alt='flipkart' className='mt-auto p-4' />
          </div>
          <div className='h-full w-4/6 flex p-8'>
            <form className='flex flex-col mt-10 gap-8 w-full'>
              <div className='relative'>
                <IoCloseOutline className='absolute text-white -right-20 -top-16 font-thin cursor-pointer text-5xl' onClick={() => setIsOpen(false)} />
                <input 
                  id='email'
                  type='text'
                  placeholder=' '
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='peer focus:outline-none border-b border-gray-300 focus:border-blue-600 transition-colors w-full'
                />
                <label
                  htmlFor='email'
                  className={`absolute text-gray-600 left-0 cursor-text transition-all duration-300 ease-in-out peer-focus:-top-4 peer-focus:text-xs ${email ? '-top-4 text-xs' : 'text-base'}`}
                >
                  Enter Email Id
                </label>
              </div>
              
              <div className='relative'>
                {showPwd ? (
                  <FaEyeSlash className='absolute right-5 cursor-pointer hover:text-[#FB641B]' onClick={() => setShowPwd(false)} />
                ) : (
                  <FaEye className='absolute right-5 cursor-pointer hover:text-[#FB641B]' onClick={() => setShowPwd(true)} />
                )}
                <input 
                  id='password'
                  type={showPwd ? 'text' : 'password'}
                  placeholder=' '
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='peer focus:outline-none border-b border-gray-300 focus:border-blue-600 transition-colors w-full'
                  autoComplete='off'
                />
                <label
                  htmlFor='password'
                  className={`absolute text-gray-600 left-0 cursor-text transition-all duration-300 ease-in-out peer-focus:-top-4 peer-focus:text-xs ${password ? '-top-4 text-xs' : 'text-base'}`}
                >
                  Enter the Password
                </label>
              </div>

              {error && <p className={`${error.includes('success')? 'text-green-600':'text-red-500'}`}>{error}</p>}
              <p className='text-xs text-gray-600'>By continuing, you agree to Flipkart's <span className='text-blue-600 ml-1 mr-1'>Terms of Use</span> and <span className='text-blue-600 ml-1'>Privacy Policy.</span></p>

              {logType ? (
                <>
                  <button type='submit' className='bg-[#FB641B] p-4 text-white font-bold' onClick={signin} disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                  <p className='text-sm text-gray-600 mt-auto text-center'>New to Flipkart? <span className='underline text-blue-600 cursor-pointer' onClick={() => setLogType(false)}>Create an account</span></p>
                </>
              ) : (
                <>
                  <button type='submit' className='bg-[#FB641B] p-4 text-white font-bold' onClick={signup} disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign up'}
                  </button>
                  <p className='text-sm text-gray-600 mt-auto text-center'>Already have an account? <span className='underline text-blue-600 cursor-pointer' onClick={() => setLogType(true)}>Login to an account</span></p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default LoginModel;
