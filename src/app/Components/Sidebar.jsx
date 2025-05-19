"use client";

 import React, { useState, useEffect } from "react";
 import Link from "next/link";
 import Image from "next/image";
 import BiscuitIcon from "./BiscuitIcon";
 import { usePathname } from 'next/navigation';
 import { useMutation, useQuery } from "convex/react";
 import { api } from "../../../convex/_generated/api";
 import { useUser } from "@clerk/nextjs";

 const Sidebar = ({}) => {
   const pathname = usePathname();
   const { user } = useUser();
   const [showDailyBonus, setShowDailyBonus] = useState(false);
   const claimBonusMutation = useMutation(api.main.claimDailyBonus);
   const getUserQuery = useQuery(api.main.getUserByClerkId, { clerkId: user?.id });
   const [biscuits, setBiscuits] = useState(0);

   console.log('Sidebar - getUserQuery:', getUserQuery);
   console.log('Sidebar - user id:', user?.id);

   useEffect(() => {
     if (user?.id && getUserQuery?.data?.biscuits !== undefined) {
       setBiscuits(getUserQuery.data.biscuits);
       const now = Date.now();
       const lastClaim = getUserQuery.data.lastDailyBonusClaim || 0;
       const oneDay = 24 * 60 * 60 * 1000;
       setShowDailyBonus(now - lastClaim >= oneDay);
     } else {
       setBiscuits(0);
       setShowDailyBonus(false);
     }
   }, [user?.id, getUserQuery?.data]);

   const isActivePath = (path) => pathname === path;

   const getBackgroundColor = (path) => {
     if (!isActivePath(path)) return 'hover:bg-yellow-300';

     switch (path) {
       case '/testingHome':
         return 'bg-[#4b2e83] text-white';
       case '/dashboard':
         return 'bg-gray-50';
       case '/new-bid':
         return 'bg-[#4b2e83] text-white';
       case '/tasks':
         return 'bg-[#4b2e83] text-white';
       case '/leaderboard':
         return 'bg-[#4b2e83] text-white';
       default:
         return 'bg-yellow-300';
     }
   };

   const claimDailyBonus = async () => {
     if (!user?.id) {
       alert("Please sign in to claim your daily biscuits.");
       return;
     }
     try {
       const result = await claimBonusMutation();
       setShowDailyBonus(false);
       setBiscuits(result.newBalance);
       alert("Daily bonus of 100 Biscuits claimed!");
     } catch (error) {
       alert(error.message);
     }
   };

   return (
     <div className="fixed left-0 top-0 h-full w-64 bg-yellow-400 text-purple-900 p-6 flex flex-col shadow-lg">
       {getUserQuery?.isLoading ? (
         <div className="flex items-center justify-center h-full">
           <p>Loading user data...</p>
         </div>
       ) : getUserQuery?.isError ? (
         <div className="flex items-center justify-center h-full text-red-500">
           <p>Error loading user data: {getUserQuery.error?.message || 'Something went wrong.'}</p>
         </div>
       ) : (
         <>
           {/* Logo/Header */}
           <div className="mb-8">
             <Link href="/" className="block">
               <Image
                 src="/images/logo.png"
                 alt="HuskyBids Logo"
                 width={150}
                 height={50}
                 className="mb-2"
               />
             </Link>
           </div>

           {/* Daily Bonus Alert */}
           {user?.id ? (
             showDailyBonus && (
               <div className="mb-6 bg-white text-purple-900 p-3 rounded-lg shadow-md">
                 <div className="font-semibold mb-2">Daily Bonus Available!</div>
                 <button
                   onClick={claimDailyBonus}
                   className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors text-sm"
                 >
                   Claim Free 100 Biscuits
                 </button>
               </div>
             )
           ) : (
             <div className="mb-6 bg-gray-200 text-gray-600 p-3 rounded-lg shadow-md text-center">
               Sign in to get daily biscuits!
             </div>
           )}

           {/* Navigation Links */}
           <nav className="flex-1">
             <ul className="space-y-4">
               <li>
                 <Link href="/testingHome" className={`block p-2 rounded-md ${getBackgroundColor('/testingHome')}`}>
                   Home
                 </Link>
               </li>
               <li>
                 <Link href="/dashboard" className={`block p-2 rounded-md ${getBackgroundColor('/dashboard')}`}>
                   Dashboard
                 </Link>
               </li>
               <li>
                 <Link href="/new-bid" className={`block p-2 rounded-md ${getBackgroundColor('/new-bid')}`}>
                   New Bid
                 </Link>
               </li>
               <li>
                 <Link href="/tasks" className={`block p-2 rounded-md ${getBackgroundColor('/tasks')}`}>
                   Tasks
                 </Link>
               </li>
               <li>
                 <Link href="/leaderboard" className={`block p-2 rounded-md ${getBackgroundColor('/leaderboard')}`}>
                   Leaderboard
                 </Link>
               </li>
               {/* Add more links here that should always be visible */}
             </ul>
           </nav>

           {/* Biscuit Balance */}
           <div className="border-t border-yellow-500 pt-4">
             <div className="flex items-center space-x-2">
               <BiscuitIcon size={24} />
               <div>
                 <div className="text-sm text-purple-900 opacity-75">
                   Your Balance
                 </div>
                 <div className="font-bold text-purple-900">
                   {user?.id ? `${biscuits} Biscuits` : "Sign In"}
                 </div>
               </div>
             </div>
           </div>
         </>
       )}
     </div>
   );
 };

 export default Sidebar;