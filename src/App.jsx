import React , {useState,useEffect} from 'react'
import { useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import { login,logout } from './Store/authSlice'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
     authService.currentUser()
     .then((userData)=>{
      if(userData){
          dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
     }
     ).catch((error) => {
      console.error('Error fetching current user:', error);
      dispatch(logout())})
     .finally(()=> setLoading(false))
     },[dispatch]);

  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-[#FDF6F6] '>
      <div className='w-full block'>
        <Header/>
        <main className='w-full block pt-20'>
          <Outlet></Outlet>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App
