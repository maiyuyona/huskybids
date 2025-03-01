

"use client"

import Link from 'next/link';

const page = () => {
    function handleClick(event) {
        event.preventDefault()
        console.log("button has been clicked")
    }

    function newAccount(event) {
        event.preventDefault()
        console.log("new account button")
    }

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-16 bg-purple-400'>
      {/* Logo image */}
      <img src="/images/logo.png" alt="Logo" className="w-48 h-auto" />
        <button 
          className=' bg-blue-500 rounded p-4 text-white' 
          onClick={handleClick}
          >
            Login
        </button>

        <button 
          className=' bg-blue-500 rounded p-4 text-white ' 
          onClick={newAccount}
          >
            create a new account
        </button>

      <Link href= '/home'>
        <button
          className='bg-blue-500 rounded p-4 text-white'
        >
          temp button
        </button>
      </Link>
        

    </div>
    
  )
}

export default page