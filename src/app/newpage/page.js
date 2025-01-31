

"use client"



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
    <div className='min-h-screen w-full flex flex-col items-center gap-16 bg-purple-100'>
      {/* Logo image */}
      <img src="/images/logo.png" alt="Logo" className="w-48 h-auto" />
        <button className=' bg-blue-500 rounded p-4 text-white' onClick={handleClick}>Login</button>
        <button className=' bg-blue-500 rounded p-4 text-white ' onClick={newAccount}>create a new account</button>
    </div>
    
  )
}

export default page