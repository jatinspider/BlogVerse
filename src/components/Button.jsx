import React from 'react'

function Button({children ,type='button',bgColor= 'bg-gradient-to-br from-purple-600 to-blue-500',textcolor='text-white',
className = "",
...props
}) {
  return (
    <button className={`px-4 py-2  hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center me-2 mb-2 ${bgColor} ${textcolor} ${className}`} {...props}>{children}</button>
  )
}

export default Button