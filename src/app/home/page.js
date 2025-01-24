

"use client"



const page = () => {
    function handleClick(event) {
        event.preventDefault()
        console.log("button has been clicked")
    }

  return (
    <div className='min-h-screen w-full flex flex-col items-center gap-16 bg-purple-400'>
      {/* Logo image */}
      <img src="/images/logo.png" alt="Logo" className="w-32 h-auto" />
        <button className=' bg-blue-500 rounded p-4 text-white' onClick={handleClick}>Login</button>
        <button>className = 'Sign out'</button>
    </div>
  )
}

export default page