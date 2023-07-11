import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import io from 'socket.io-client'
import Image from '../../components/Image'
let socket = null;

const ChatRoom = () => {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')
  const [file, setFile] = useState(null)
  const id = router.query.id
  let username;
  if (typeof window !== "undefined" && window.localStorage) {
    username = localStorage.getItem("username");
  }



  const socketInitializer = async() => {
    if (!socket) {
    const socketRootUrl = "/api/socket"
    fetch(socketRootUrl)
    
    socket = io('https://tale-tcz3.onrender.com');
    

    socket.on('connect', () => {
        console.log('Connected client')
        
    })
    

    socket.on('receive-message', (msg) => {
        console.log('I received the message')
        setMessages((prev) => {
            return [
                ...prev,
                msg
            ]
        });
        console.log("Received message is: " + msg)
    })
}
return () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
  }
}
const selectFile = (e) => {
  e.preventDefault();
  setMsg(e.target.files[0].name)
  setFile(e.target.files[0])

}


const send = async(e) => {
  e.preventDefault()
  if(file) {
    let item = {file, sender: username}
    socket?.emit("send-message", item)
    setMessages((prev) => {
      return [
        ...prev,
        item
      ]
    })
    setFile()
    setMsg('')
    return;
  }
  const value = `${username}: ${msg}`
  const me = `Me : ${msg}`
  console.log(value)
  socket?.emit("send-message", value)
  setMessages((prev) => {
    return [
      ...prev,
      me
    ]
  })
  setMsg('')
}

  useEffect(() => {
    socketInitializer()
}, [])


  return (
    <div>
      <div className='w-full h-screen overflow-auto'>
      <i onClick={() => router.push('/')} className=" duration-300 fa-solid fa-circle-left text-3xl sm:text-5xl hover:scale-110 hover:translate-x-1 hover:opacity-40 cursor-pointer"></i>
        {messages?.map((msg, i) => {
          if(typeof msg === 'object') {
            const blob = new Blob([msg.file], {type: "file"})
            if(msg.sender != username) {
              console.log(msg.sender)
            return (
              <div className='my-5 flex justify-start items-center gap-x-5'>
                {msg.sender + ": "}
              <Image blob={blob}/>
              </div>
            )
          } else {
            return (
              <div className='my-5 flex justify-end items-center gap-x-5'>
                {"Me: "}
              <Image blob={blob}/>
              </div>
            )
          }
          }
          if(msg.includes("Me")) {
            return (
              <div className='w-full flex justify-end'>
            <div className='w-4/12 rounded-xl p-2 border-2 border-white bg-white dark:border-red-500 dark:bg-red-500 my-10 sm:my-4'>
            <p key={i} className='break-words text-right'>{msg}</p>
            </div> 
            </div>
            )
          } else {
            return (
              <div className='w-full flex justify-start'>
              <div className='w-4/12 rounded-xl p-2 border-2 border-white bg-white dark:border-red-500 dark:bg-red-500 my-10 sm:my-4'>
              <p key={i} className='break-words text-left'>{msg}</p>
              </div>
              </div>
            )
          }
        })} 
      </div>
        <form className='' onSubmit={send}>
          <div className='p-2 bg-sky-300 dark:bg-rose-700 gap-x-2 fixed bottom-0 left-0 w-full flex justify-between'>
              <input className='p-2 flex-1 rounded-xl text-black' onChange={(e) => setMsg(e.target.value)} value={msg} type="text"></input>
              <i onClick={(e) => {e.preventDefault(); document.getElementById('file').click()}} id="btn" className="hover:cursor-pointer text-4xl fa-solid fa-image"></i>
              <input className='hidden' onChange={selectFile} id='file' type='file' />
          </div>
        </form>
        </div>
    
  )
}

export default ChatRoom