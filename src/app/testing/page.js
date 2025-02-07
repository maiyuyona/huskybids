"use client"

export default function HomePage() {
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
                            <div className="relative w-fit [font-family:'Encode_Sans-Medium',Helvetica] font-medium text-[#c5b4e3] text-2xl tracking-[2.40px] leading-[normal]">
                                Welcome to HuskyBids! 
                            </div>
                        </div>

                        {/*login button, changes color on hover, grouped for group-hover*/}
                        <button className="group flex w-[423px] h-[73px] items-center justify-center gap-2.5 px-[86px] py-3.5 bg-[#c5b4e3] hover:bg-[#4b2e83] border-[5px] border-solid border-[#c5b4e3] rounded-2xl">
                            <div className="relative w-fit [font-family:'Encode_Sans-ExtraBold',Helvetica] font-extrabold text-[#4b2e83] group-hover:text-[#c5b4e3] text-2xl tracking-[2.40px] leading-[normal]">
                                Login
                            </div>
                        </button>

                        {/*create account button, changes color on hover, grouped for group-hover*/}
                        <button className="group flex w-[423px] h-[73px] items-center justify-center gap-2.5 px-[86px] py-3.5 bg-[#c5b4e3] hover:bg-[#4b2e83] border-[5px] border-solid border-[#c5b4e3] rounded-2xl">
                            <div className="relative w-fit [font-family:'Encode_Sans-ExtraBold',Helvetica] font-extrabold text-[#4b2e83] group-hover:text-[#c5b4e3] text-2xl tracking-[2.40px] leading-[normal]">
                                Create Account
                            </div>
                        </button>

                    </div>
            
            
            </div>
            </div>
        </div>
    )
}
