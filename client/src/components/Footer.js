import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center gap-5 py-3'>
        <a href={'https://instagram.com/'}><i className="fa-brands text-lg sm:text-2xl fa-instagram duration-300 hover:text-white dark:hover:text-rose-700 hover:scale-110 cursor-pointer"></i></a>
        <a href={'https://github.com/ekedayen-e'}><i className="fa-brands text-lg sm:text-2xl fa-github hover:scale-110 hover:text-white dark:hover:text-rose-700 cursor-pointer"></i></a>
        <a href={'https://www.linkedin.com/in/ekedayen-e/'}> <i className="fa-brands text-lg sm:text-2xl fa-linkedin hover:text-white dark:hover:text-rose-700 hover:scale-110 cursor-pointer"></i></a>
    </div>
  )
}

export default Footer