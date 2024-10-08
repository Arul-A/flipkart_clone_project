import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { AiTwotoneShop } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiGift } from "react-icons/ci";
import { MdOutlineCardGiftcard } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import LoginModel from './LoginModel';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../slices/userSlice';
import supabase from '../supabase';


const Navbar = ({isOpen,setIsOpen}) => {
    const [showOpt, setShowOpt] = useState(false);//handles login options
    const [dotsOpt, setDotsOpt] = useState(false);//handles three dots options
    const [logType, setLogType] = useState(true);
    const user = useSelector((state)=>state.userData.user);
    const cartItems = useSelector((state)=>state.cartData.cart)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(user){
            setTimeout(()=>setIsOpen(false),500)
        }
    },[user])
    const logout = async()=>{
        try{
            await supabase.auth.signOut();
            dispatch(removeUser())
        }catch(error){
            console.log(error.message)
        }
    }
    
  return (
    <>
        <div className='fixed flex justify-between items-center p-3 z-50 left-0 right-0 top-0 bg-[#fff]'>
            <div className='grow-[1]'>
                <Link to="/">
                    <img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg' alt='flipkart logo' title='Flipkart'></img>
                </Link>
            </div>
            <div className="relative grow-[3] flex items-center ml-5">
                <input
                    type="text"
                    placeholder="Search for Products, Brands, and More"
                    className="border-none focus:outline-none bg-[#F0F5FF] text-lg p-2 pl-12 rounded-lg w-full"
                    title="Search for Products, Brands, and More"
                />
                <button className="absolute left-2 text-3xl text-slate-400">
                    <IoIosSearch title="Search Icon" />
                </button>
            </div>
            <div className='ml-3 grow-[1] relative'>
                {user ? (
                <div className='flex w-3/4 gap-3 items-center hover:bg-blue-600 p-2 rounded-lg hover:text-white relative cursor-pointer' onMouseEnter={()=>setShowOpt(true)} onMouseLeave={()=>setShowOpt(false)}> 
                    <IoPersonCircleSharp title='Login' className='text-3xl'/>
                    <p title='user'>{user.email.split('@')[0]}</p>
                    <IoIosArrowDown className={`transition-transform duration-300 ease-out ${showOpt ? 'rotate-180' : 'rotate-0'}`}/>
                </div>
                ):(
                <div className='flex w-3/4 gap-3 items-center hover:bg-blue-600 p-2 rounded-lg hover:text-white relative cursor-pointer' onMouseEnter={()=>setShowOpt(true)} onMouseLeave={()=>setShowOpt(false)} onClick={()=>{setIsOpen(true);setShowOpt(true);setLogType(true)}}> 
                    <IoPersonCircleSharp title='Login' className='text-3xl'/>
                    <p title='Login'>Login</p>
                    <IoIosArrowDown className={`transition-transform duration-300 ease-out ${showOpt ? 'rotate-180' : 'rotate-0'}`}/>
                </div>
                )
            }
            { showOpt &&
                <div className='absolute flex flex-col w-[250px] bg-white shadow-2xl rounded-t-none rounded-b-xl' onMouseEnter={()=>setShowOpt(true)} onMouseLeave={()=>setShowOpt(false)}>
                    <div className='flex justify-between items-center p-3 border-b-2'>
                        <h2>{user ? 'Click here to Logout':'New customer?'}</h2>
                    {user ? (
                        <h2 className='text-blue-600 font-extrabold hover:underline cursor-pointer' title='Logout' onClick={logout}>Logout</h2>
                        ):(
                        <h2 className='text-blue-600 font-extrabold hover:underline cursor-pointer' onClick={()=>{setIsOpen(true);setLogType(false)}}>Sign Up</h2>
                        )
                    }
                    </div>
                    <div>
                        <div className='flex gap-4 p-2 items-center'>
                            <IoPersonCircleSharp />
                            <p>My Profile</p>
                        </div>
                        <div className='flex gap-4 p-2 items-center'>
                            <FaPlusSquare />
                            <p>Flipkart Plus Zone</p>
                        </div>
                        <div className='flex gap-4  p-2 items-center'>
                            <CiBookmark />
                            <p>Orders</p>
                        </div>
                        <div className='flex gap-4 p-2 items-center'>
                            <CiHeart />
                            <p>Wish List</p>
                        </div>
                        <div className='flex gap-4 p-2 items-center'>
                            <CiGift />
                            <p>Rewards</p>
                        </div>
                        <div className='flex gap-4 p-2 items-center'>
                            <MdOutlineCardGiftcard />
                            <p>Gift Cards</p>
                        </div>
                    </div>
                </div>
            }
            </div>
            
            <div className='flex grow-[1] gap-3 items-center relative'>
                <Link to="/cart"><IoCartOutline title='Cart' className='text-3xl'/></Link>
                <Link to="/cart"><p title='Cart'>Cart</p></Link>
                {cartItems.length > 0 && 
                <p className='absolute left-4 -top-[2px] text-[#fff] px-[4px] text-xs rounded-full bg-red-500'>{cartItems.length}</p>}
            </div>
            <div className='flex grow-[1] gap-3 items-center'>
                <AiTwotoneShop title='Become a Seller' className='text-3xl'/>
                <p title='Become a Seller'>Become a Seller</p>
            </div>
            <div className='relative flex flex-col grow-[1]' onMouseEnter={()=>setDotsOpt(true)} onMouseLeave={()=>setDotsOpt(false)}>
                <div className='p-2 w-1/2 border border-transparent hover:border-gray-300 rounded-lg'>
                    <BsThreeDotsVertical className='text-xl' title='Dropdown with more help links'/>
                </div>
                { dotsOpt &&
                    <div className='border w-[230px] bg-white shadow-2xl  absolute top-full right-10 rounded-t-none rounded-b-lg'>
                        <div className='flex items-center gap-2 p-2'>
                            <IoIosNotificationsOutline className='text-2xl' />
                            <p>Notification Preferences</p>
                        </div>
                        <div className='flex items-center gap-3 p-2'>
                            <RiCustomerService2Fill />
                            <p>24x7 Customer Care</p>
                        </div>
                        <div className='flex items-center gap-3 p-2'>
                            <FaArrowTrendUp />
                            <p>Advertise</p>
                        </div>
                        <div className='flex items-center gap-3 p-2'>
                            <FaDownload />
                            <p>Download App</p>
                        </div>
                    </div>
                }   
            </div>
        </div>
        <LoginModel 
        isOpen = {isOpen}
        setIsOpen = {setIsOpen}
        logType = {logType}
        setLogType = {setLogType}
        />
    </>
  )
}

export default Navbar