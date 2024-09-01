import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/authSlice'
import authService from '../../appwrite/auth'


function Logoutbtn() {
    const dispatch = useDispatch()
    const logoutHandler = ()=>
    {
        authService.logout().then(()=> dispatch(logout())) 
    }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duation-200 hover:bg-blue-100 rounded-full'>logout</button>
  )
}

export default Logoutbtn