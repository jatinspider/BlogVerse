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
    <button onClick={logoutHandler} className='text-white px-4 py-2 rounded-lg transition-transform transform hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>logout</button>
  )
}

export default Logoutbtn