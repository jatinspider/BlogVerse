import React from 'react'
import {Container,Logoutbtn,Logo} from "../index"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  
 return (
  <header className='bg-gray-800 py-4 shadow-lg'>
  <Container>
    <nav className='flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <Link to='/'>
          <Logo width='70px' />
        </Link>
        <ul className='hidden md:flex space-x-6'>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='text-white px-4 py-2 rounded-lg transition-transform transform hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </div>
      {authStatus && (
        <Logoutbtn className='text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors' />
      )}
    </nav>
  </Container>
</header>
)
}
export default Header