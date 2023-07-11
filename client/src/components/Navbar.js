import { useTheme } from '@/context/ThemeProvider'
import React,{useState} from 'react'
import styles from './nav.module.css'
import Image from 'next/image'
import {useRouter} from 'next/router'

const Navbar = () => {
    const router = useRouter()
    const {toggle} = useTheme();
    const [side, setSide] = useState('left')

    const changeMode = (e) => {
        e.preventDefault()
        toggle();
        setSide(prev => (prev == 'left' ? 'right' : 'left'))
    }
  return (
    <div className='bg-yellow-300 border-b-2 border-blue-500 dark:border-purple-500 dark:bg-rose-700 p-2 w-full flex justify-between items-center'>
        <div onClick={() => router.push('/')} className='duration-300 hover:scale-110 cursor-pointer flex items-center'>{/*<Image src={''} width={100} height={100}/>*/}<h1 className='text-5xl'>Tale</h1></div>
        <div onClick={changeMode} className='bg-sky-400 dark:bg-black rounded-2xl px-3 flex gap-x-2 items-center'>
            <p className='text-2xl'>☀️</p>
            <p className='text-xl'>🌙</p>
            <p className={`absolute hover:cursor-pointer text-2xl select-none right-4 ${side == 'left' ? styles.fadeout : styles.fadein}`}>⚪️</p>
            <p className={`absolute hover:cursor-pointer text-2xl select-none ${side == 'left' ? styles.fadein : styles.fadeout}`}>⚪️</p>
        </div>
    </div>
  )
}

export default Navbar