import { Inter } from 'next/font/google'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [code, setCode] = useState('')
  const [current, setCurrent] = useState('')
  //console.log(current)
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      setCurrent(localStorage.getItem("current"))
    }
  }, [])

  const createRoom = (e) => {
    e.preventDefault
    if(!username) {
      setError("Enter Username")
      return;
    }
    let id = Math.floor(Date.now() * Math.random())
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("username", username);
      localStorage.setItem("current", id)
    }
    router.push(`/room/${id}`)
  }

  const joinRoom = (e) => {
    e.preventDefault()
    if(!username || !code) {
      setError("Enter Username & Code")
      return;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("username", username);
      localStorage.setItem("current", code)
    }
    router.push(`/room/${code}`)
  }

  return (
    <>
    <div className='flex-1 gap-2 sm:gap-4 text-xs sm:text-sm flex flex-col justify-center items-center'>
        <h1 className=' font-extrabold select-none text-2xl sm:text-4xl uppercase'>on your mark...  🚀</h1>
        {error && <div className='w-full max-w-[40ch] border-solid border text-center border-rose-300 text-rose-300 py-2'>{error}</div>}
        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username' className='duration-300 border-b-2 border-solid border-white dark:focus:border-red-300 focus:border-cyan-300 outline-none text-slate-900 p-1 w-full max-w-[40ch]'/>
        <input type="text" onChange={(e) => setCode(e.target.value)} value={code} placeholder='Code' className='duration-300 border-b-2 border-solid border-white dark:focus:border-red-300 focus:border-cyan-300 outline-none text-slate-900 p-1 w-full max-w-[40ch]'/>
        <button onClick={joinRoom} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 dark:hover:bg-red-500 dark:hover:text-black hover:bg-sky-300 hover:text-white'>JOIN ROOM</button>
        <button onClick={createRoom} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 dark:hover:bg-red-500 dark:hover:text-black hover:bg-sky-300 hover:text-white'>CREATE ROOM</button>
        {current && <button onClick={() => router.push(`/room/${current}`)} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 dark:hover:bg-red-500 dark:hover:text-black hover:bg-sky-300 hover:text-white'>REJOIN</button>}
    </div>
    </>
  )
}
