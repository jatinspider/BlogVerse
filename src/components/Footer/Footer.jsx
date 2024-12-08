import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../container/Container'

function Footer() {
  return (
    <footer className='bg-[#002C54] text-white py-6'>
    <Container>
      <div className='flex flex-col md:flex-row justify-between'>
        {/* About Section */}
        <div className='mb-6 md:mb-0'>
          <h2 className='text-lg font-semibold mb-2'>About Us</h2>
          {/* <p className='text-sm '>
            We are committed to providing the best content and user experience. Follow us to stay updated with the latest posts and news.
          </p> */}
          <p className="text-sm leading-relaxed max-w-4xl">
    Welcome to Blogverse, a creative platform for sharing photos, blogs, articles, and art. 
    We celebrate creativity and self-expression, bringing together a vibrant community of storytellers and artists. 
    Join us to share your voice and explore inspiring content from around the world!
  </p>
        </div>

        {/* Navigation Links */}
        <div className='mb-6 md:mb-0'>
          <h2 className='text-lg font-semibold mb-2'>Quick Links</h2>
          <ul className='space-y-2'>
            <li><Link to="/" className='hover:text-gray-400'>Home</Link></li>
            <li><Link to="/all-posts" className='hover:text-gray-400'>All Posts</Link></li>
            <li><Link to="/add-post" className='hover:text-gray-400'>Add Post</Link></li>
            <li><Link to="/login" className='hover:text-gray-400'>Login</Link></li>
            <li><Link to="/signup" className='hover:text-gray-400'>Signup</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className='text-lg font-semibold mb-2'>Contact Us</h2>
          <p className='text-sm'>
            Email: <a href="mailto:info@example.com" className='hover:text-gray-400'>blogverse@gmail.com</a>
          </p>
          <p className='text-sm'>
            Phone: <a href="tel:+1234567890" className='hover:text-gray-400'>+123 456 7890</a>
          </p>
        </div>
      </div>
      <div className='text-center mt-6'>
        <p className='text-xs'>
          &copy; {new Date().getFullYear()} Blogverse. All rights reserved.
        </p>
        <p className='text-xs'>Crafted with care by  Jatin Bhaliya</p>
      </div>
    </Container>
  </footer>
)
}  

export default Footer


