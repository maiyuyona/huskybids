

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
    <div>
      
      <div className='min-h-screen w-full flex flex-col items-center gap-16 bg-purple-400'>
        <button className=' bg-blue-500 rounded p-4 text-white ' onClick={handleClick}>Login</button>
        <button className=' bg-blue-500 rounded p-4 text-white ' onClick={newAccount}>create a new account</button>
      </div>
    </div>
    
  )
}

export default page