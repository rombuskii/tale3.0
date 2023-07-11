import { useTheme } from '@/context/ThemeProvider'
import React from 'react'
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}) => {
    const {darkMode} = useTheme();
  return (
    <div className={darkMode ? 'dark' : null}>
        <div className='duration-1000 flex flex-col min-h-screen relative bg-orange-200 text-sky-400 dark:bg-black dark:text-white'>
        <Navbar/>
        <main className='flex-1 flex flex-col p-4'>
            {children}
        </main>
        <Footer/>
        </div>
    </div>
  )
}

export default Layout