"use client"
import { useState } from 'react';

export default function HomePage() {
    const [activeForm, setActiveForm] = useState(null);

    return (
        <div className="bg-[#4b2e83] flex justify-center w-full min-h-screen overflow-y-auto overflow-x-hidden">
            <div className="bg-[#4b2e83] w-full max-w-[1512px] relative flex justify-center">

            <div className="flex flex-col absolute top-[5%] gap-[0px]">
                {/*logo part*/}
                <div className="flex flex-col w-[423px] h-[200px] bg-[#c5b4e3] items-center rounded-[12px_12px_0px_0px]">
                    <img
                        className="w-[290px] h-[184px] top-4 object-cover"
                        alt="Logo"
                        src="/images/logo.png"
                    />
                </div>
                {/*new div to make spacing easier between the rest of the stuff*/}
                <div className="flex flex-col w-[423px] h-full top[200px] items-center gap-[30px]">

                        {/*short intro part*/}
                        <div className="flex w-[423px] h-[313px] items-center justify-center px-[10px] py-[10px] bg-[#4b2e83] rounded-[0px_0px_16px_16px] border-[5px] border-solid border-[#c5b4e3]">
                            {activeForm === null && (
                                <div className="relative w-fit [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-[#c5b4e3] text-2xl tracking-[2.40px] leading-[normal]">
                                    Welcome to HuskyBids! 
                                </div>
                            )}
                            {activeForm === 'login' && (
                                <div className="flex flex-col w-full items-center justify-center gap-4 p-0 m-0">

                                    <div className="w-[80%] p-2 [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-[#c5b4e3] tracking-[2.40px] leading-[normal] text-center">
                                        Sign in to HuskyBids!
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Username" 
                                        className="w-[80%] p-2 rounded bg-[#c5b4e3] text-[#4b2e83] placeholder-[#4b2e83]" 
                                    />                      
                                    <input 
                                        type="password"
                                        placeholder="Password" 
                                        className="w-[80%] p-2 rounded bg-[#c5b4e3] text-[#4b2e83] placeholder-[#4b2e83]" 
                                    />
                                    

                                </div>
                            )}

                            {activeForm === 'createAccount' && (
                                <div className="flex flex-col w-full items-center justify-center gap-4 p-0 m-0">
                                    
                                    <div className="w-[90%] p-2 [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-[#c5b4e3]  tracking-[2.40px] leading-[normal] text-center">
                                        Create a new HuskyBids account!
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="New Username" 
                                        className="w-[80%] p-2 rounded bg-[#c5b4e3] text-[#4b2e83] placeholder-[#4b2e83]" 
                                    />                      
                                    <input 
                                        type="password" 
                                        placeholder="New Password" 
                                        className="w-[80%] p-2 rounded bg-[#c5b4e3] text-[#4b2e83] placeholder-[#4b2e83]" 
                                    />
                                    

                                </div>
                            )}
                            
                        </div>

                        {/*login button, changes color on hover, grouped for group-hover*/}
                        
                        {activeForm === null && (
                            <>
                        <button 
                        className="group flex w-[423px] h-[73px] items-center justify-center gap-2.5 px-[86px] py-3.5 bg-[#c5b4e3] hover:bg-[#4b2e83] border-[5px] border-solid border-[#c5b4e3] rounded-2xl"
                        onClick={() => setActiveForm('login')}
                        >
                            <div className="relative w-fit [font-family:'Encode_Sans-ExtraBold',Helvetica] font-extrabold text-[#4b2e83] group-hover:text-[#c5b4e3] text-2xl tracking-[2.40px] leading-[normal]">
                                Login
                            </div>
                        </button>

                        {/*create account button, changes color on hover, grouped for group-hover*/}
                        <button 
                        className="group flex w-[423px] h-[73px] items-center justify-center gap-2.5 px-[86px] py-3.5 bg-[#c5b4e3] hover:bg-[#4b2e83] border-[5px] border-solid border-[#c5b4e3] rounded-2xl"
                        onClick={() => setActiveForm('createAccount')}
                        >
                            <div className="relative w-fit [font-family:'Encode_Sans-ExtraBold',Helvetica] font-extrabold text-[#4b2e83] group-hover:text-[#c5b4e3] text-2xl tracking-[2.40px] leading-[normal]">
                                Create Account
                            </div>
                        </button>
                        </>)}

                        {activeForm === 'login' && (
                            <>
                            <button 
                                className="w-[423px] h-[73px] bg-[#c5b4e3] hover:bg-[#4b2e83] text-[#4b2e83] hover:text-[#c5b4e3] font-extrabold text-2xl tracking-[2.40px] leading-[normal] border-[5px] border-solid border-[#c5b4e3] rounded-2xl"
                                onClick={() => setActiveForm(null)}
                            >
                                Sign in!
                            </button>
                            <button 
                            className="text-[#c5b4e3] hover:text-[#c5b4e3] font-bold py-2 tracking-[2.40px] leading-[normal] p-0 m-0 inline focus:outline-none"
                            onClick={() => setActiveForm(null)} // Example action
                        >
                            Forgot password?
                        </button>
                        
                            </>
                        )}

                        {activeForm === 'createAccount' && (
                            <>
                            <button 
                                className="w-[423px] h-[73px] bg-[#c5b4e3] hover:bg-[#4b2e83] text-[#4b2e83] hover:text-[#c5b4e3] font-extrabold text-2xl tracking-[2.40px] leading-[normal] border-[5px] border-solid border-[#c5b4e3] rounded-2xl"
                                onClick={() => setActiveForm(null)}
                            >
                                Sign Up!
                            </button>
                            <button 
                            className="text-[#c5b4e3] hover:text-[#c5b4e3] font-bold py-2 tracking-[2.40px] leading-[normal] p-0 m-0 inline focus:outline-none"
                            onClick={() => setActiveForm('login')} // Example action
                        >
                            Already have an account?
                        </button>
                        
                            </>
                        )} 
                    </div>
            
            
            </div>
            </div>
        </div>
    )
}
