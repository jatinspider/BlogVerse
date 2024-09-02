import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className='bg-gray-800 text-white py-6'>
    <Container>
      <div className='flex flex-col md:flex-row justify-between'>
        {/* About Section */}
        <div className='mb-6 md:mb-0'>
          <h2 className='text-lg font-semibold mb-2'>About Us</h2>
          <p className='text-sm'>
            We are committed to providing the best content and user experience. Follow us to stay updated with the latest posts and news.
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
        <p className='text-xs'>Crafted with care by Bhaliya</p>
      </div>
    </Container>
  </footer>
)
}  // another footer

// function Footer() {
//     return (
//       <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//               <div className="relative z-10 mx-auto max-w-7xl px-4">
//                   <div className="-m-6 flex flex-wrap">
//                       <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                           <div className="flex h-full flex-col justify-between">
//                               <div className="mb-4 inline-flex items-center">
//                                   <Logo width="100px" />
//                               </div>
//                               <div>
//                                   <p className="text-sm text-gray-600">
//                                       &copy; Copyright 2023. All Rights Reserved by DevUI.
//                                   </p>
//                               </div>
//                           </div>
//                       </div>
//                       <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                           <div className="h-full">
//                               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                   Company
//                               </h3>
//                               <ul>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Features
//                                       </Link>
//                                   </li>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Pricing
//                                       </Link>
//                                   </li>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Affiliate Program
//                                       </Link>
//                                   </li>
//                                   <li>
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Press Kit
//                                       </Link>
//                                   </li>
//                               </ul>
//                           </div>
//                       </div>
//                       <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                           <div className="h-full">
//                               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                   Support
//                               </h3>
//                               <ul>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Account
//                                       </Link>
//                                   </li>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Help
//                                       </Link>
//                                   </li>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Contact Us
//                                       </Link>
//                                   </li>
//                                   <li>
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Customer Support
//                                       </Link>
//                                   </li>
//                               </ul>
//                           </div>
//                       </div>
//                       <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//                           <div className="h-full">
//                               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                   Legals
//                               </h3>
//                               <ul>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Terms &amp; Conditions
//                                       </Link>
//                                   </li>
//                                   <li className="mb-4">
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Privacy Policy
//                                       </Link>
//                                   </li>
//                                   <li>
//                                       <Link
//                                           className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                           to="/"
//                                       >
//                                           Licensing
//                                       </Link>
//                                   </li>
//                               </ul>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </section>
//     )
//   }
export default Footer