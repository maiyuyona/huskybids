"use client"
import { useState } from 'react';

export default function HomePage() {
    const [activeForm, setActiveForm] = useState(null);

    return (
        <div className="bg-primary-purple flex justify-center w-full min-h-screen overflow-y-auto overflow-x-hidden">
            <div className="bg-primary-purple w-full flex justify-center">

            <div className="flex flex-col absolute top-[5%] gap-[0px]">
                {/*logo part*/}
                <div className="flex flex-col w-[423px] h-[200px] bg-light-purple items-center rounded-[12px_12px_0px_0px]">
                    <img
                        className="w-[290px] h-[184px] top-4 object-cover"
                        alt="Logo"
                        src="/images/logo.png"
                    />
                </div>
                {/*new div to make spacing easier between the rest of the stuff*/}
                <div className="flex flex-col w-[423px] h-full top[200px] items-center gap-[30px]">

                        {/*short intro part*/}
                        <div className="flex w-[423px] h-[313px] items-center justify-center px-[10px] py-[10px] bg-primary-purple rounded-[0px_0px_16px_16px] border-[5px] border-solid border-light-purple">
                            {activeForm === null && (
                                <div className="relative w-fit [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-light-purple text-2xl tracking-[2.40px] leading-[normal]">
                                    Welcome to HuskyBids! 
                                </div>
                            )}
                            {activeForm === 'login' && (
                                <div className="flex flex-col w-full items-center justify-center gap-4 p-0 m-0">

                                    <div className="w-[80%] p-2 [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-light-purple tracking-[2.40px] leading-[normal] text-center">
                                        Sign in to HuskyBids!
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Username" 
                                        className="w-[80%] p-2 rounded bg-light-purple text-primary-purple placeholder-primary-purple" 
                                    />                      
                                    <input 
                                        type="password"
                                        placeholder="Password" 
                                        className="w-[80%] p-2 rounded bg-light-purple text-primary-purple placeholder-primary-purple" 
                                    />
                                    

                                </div>
                            )}

                            {activeForm === 'createAccount' && (
                                <div className="flex flex-col w-full items-center justify-center gap-4 p-0 m-0">
                                    
                                    <div className="w-[90%] p-2 [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-light-purple  tracking-[2.40px] leading-[normal] text-center">
                                        Create a new HuskyBids account!
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="New Username" 
                                        className="w-[80%] p-2 rounded bg-light-purple text-primary-purple placeholder-primary-purple" 
                                    />                      
                                    <input 
                                        type="password" 
                                        placeholder="New Password" 
                                        className="w-[80%] p-2 rounded bg-light-purple text-primary-purple placeholder-primary-purple" 
                                    />
                                    

                                </div>
                            )}
                            
                        </div>

                        {/*login button, changes color on hover, grouped for group-hover*/}
                        
                        {activeForm === null && (
                            <>
                        <button 
                        className="group flex w-[423px] h-[73px] items-center justify-center gap-2.5 px-[86px] py-3.5 bg-light-purple hover:bg-primary-purple border-[5px] border-solid border-light-purple rounded-2xl"
                        onClick={() => setActiveForm('login')}
                        >
                            <div className="relative w-fit [font-family:'Encode_Sans-ExtraBold',Helvetica] font-extrabold text-primary-purple group-hover:text-light-purple text-2xl tracking-[2.40px] leading-[normal]">
                                Login
                            </div>
                        </button>

                        {/*create account button, changes color on hover, grouped for group-hover*/}
                        <button 
                        className="group flex w-[423px] h-[73px] items-center justify-center gap-2.5 px-[86px] py-3.5 bg-light-purple hover:bg-primary-purple border-[5px] border-solid border-light-purple rounded-2xl"
                        onClick={() => setActiveForm('createAccount')}
                        >
                            <div className="relative w-fit [font-family:'Encode_Sans-ExtraBold',Helvetica] font-extrabold text-primary-purple group-hover:text-light-purple text-2xl tracking-[2.40px] leading-[normal]">
                                Create Account
                            </div>
                        </button>
                        </>)}

                        {activeForm === 'login' && (
                            <>
                            <button 
                                className="w-[423px] h-[73px] bg-light-purple hover:bg-primary-purple text-primary-purple hover:text-light-purple font-extrabold text-2xl tracking-[2.40px] leading-[normal] border-[5px] border-solid border-light-purple rounded-2xl"
                                onClick={() => setActiveForm(null)}
                            >
                                Sign in!
                            </button>
                            <button 
                            className="text-light-purple hover:text-light-purple font-bold py-2 tracking-[2.40px] leading-[normal] p-0 m-0 inline focus:outline-none"
                            onClick={() => setActiveForm(null)} // Example action
                        >
                            Forgot password?
                        </button>
                        
                            </>
                        )}

                        {activeForm === 'createAccount' && (
                            <>
                            <button 
                                className="w-[423px] h-[73px] bg-light-purple hover:bg-primary-purple text-primary-purple hover:text-light-purple font-extrabold text-2xl tracking-[2.40px] leading-[normal] border-[5px] border-solid border-light-purple rounded-2xl"
                                onClick={() => setActiveForm(null)}
                            >
                                Sign Up!
                            </button>
                            <button 
                            className="text-light-purple hover:text-light-purple font-bold py-2 tracking-[2.40px] leading-[normal] p-0 m-0 inline focus:outline-none"
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
