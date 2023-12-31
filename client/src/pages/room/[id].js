import React, {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import io from 'socket.io-client'
import Image from '../../components/Image'

const ChatRoom = () => {
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')
  const [file, setFile] = useState(null)
  const [socket, setSocket] = useState(null);
  const autoScroll = useRef()
  const id = router.query.id
  let username;

  if (typeof window !== "undefined" && window.localStorage) {
    username = localStorage.getItem("username");
    if(username == null) {
      username == 'user'
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
    socket.emit("send-message", item)
    setMessages((prev) => {
      return [
        ...prev,
        item
      ]
    })
    setFile()
    setMsg('')
    autoScroll.current.scrollIntoView({behavior: "instant"})
    return;
  }
  const value = `${username}: ${msg}`
  const me = `Me : ${msg}`
  socket.emit("send-message", value)
  setMessages((prev) => {
    return [
      ...prev,
      me
    ]
  })
  setMsg('')
  autoScroll.current.scrollIntoView({behavior: "instant"})
}

useEffect(() => {

  const newSocket = io('https://tale-tcz3.onrender.com', {
    transports: ["websocket"],
  });

  newSocket.on('connect', () => {
    //console.log('Connected client')
  })

  newSocket.on('receive-message', (msg) => {
    let list = messages.concat(msg)
    saveChat(id, list)
    setMessages((prev) => {
        return [
            ...prev,
            msg
        ]
    });
    //console.log("Received message is: " + msg)
})

  setSocket(newSocket);

  // Clean up the socket connection on unmount
  return () => {
    //console.log("Disconnecting from WebSocket server...");
    newSocket.disconnect();
  };
}, []);


  return (
    <div>
      <div className='w-full h-screen overflow-auto'>
      <div onClick={() => navigator.clipboard.writeText(id)} className='z-10 hover:cursor-pointer w-full flex justify-center items-center gap-x-4 top-20 sm:top-20'><p>ROOM ID - {id}</p><i class="fa-regular fa-clipboard"></i></div>
      <i onClick={() => router.push('/')} className=" duration-300 fa-solid fa-circle-left text-3xl sm:text-5xl hover:scale-110 hover:translate-x-1 hover:opacity-40 cursor-pointer"></i>
        {messages?.map((msg, i) => {
          if(typeof msg === 'object') {
            const blob = new Blob([msg.file], {type: "file"})
            if(msg.sender != username) {
              //console.log(msg.sender)
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
            <p className='break-words text-right'>{msg}</p>
            </div> 
            </div>
            )
          } else {
            return (
              <div className='w-full flex justify-start'>
              <div className='w-4/12 rounded-xl p-2 border-2 border-white bg-white dark:border-red-500 dark:bg-red-500 my-10 sm:my-4'>
              <p className='break-words text-left'>{msg}</p>
              </div>
              </div>
            )
          }
        })} 
      </div>
      <span ref={autoScroll}></span>
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