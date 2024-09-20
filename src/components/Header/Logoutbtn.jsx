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
    <button onClick={logoutHandler}  className='text-[#C5001A] p-2 w-full transition-transform  transform hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-start'>logout</button>
  )
}
     
export default Logoutbtn