import React, { useEffect, useState} from 'react'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import supabase from './supabase'
import { useDispatch} from 'react-redux';
import { setUser } from './slices/userSlice'




const App = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);//handles loginmodal
  const getUser = async ()=>{
    const {data,error} = await supabase.auth.getSession()
    dispatch(setUser(data.session?.user || null))
    if(error){
      console.log(error.message)
    }
  }
  useEffect(()=>{
    getUser()
  })
  return ( 
      <BrowserRouter>
        <Navbar 
          isOpen = {isOpen}
          setIsOpen = {setIsOpen}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/productdetails/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart 
            setIsOpen = {setIsOpen}
          />} />
        </Routes>
    </BrowserRouter>  
  )
}

export default App