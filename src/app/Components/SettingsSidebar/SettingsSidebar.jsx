"use client";

 import Link from 'next/link';
 import {
   SignedOut,
   SignedIn,
   SignInButton,
   SignUpButton,
   useClerk,
   useUser,
 } from "@clerk/nextjs";
 import styles from './SettingsSidebar.module.css'; // Assuming you still have this CSS
 import { useMutation } from "convex/react";
 import { api } from "../../../../convex/_generated/api";
 import { useEffect, useState } from 'react';
 import Image from 'next/image'; // Import Image component

 const SettingsSidebar = () => { // Removed the props
   const { signOut, user } = useClerk();
   const createUserMutation = useMutation(api.main.createUser);
   const [hasCreatedUser, setHasCreatedUser] = useState(false);

   useEffect(() => {
     if (user && !hasCreatedUser) {
       createUserIfNotExist(user.id);
       setHasCreatedUser(true);
     }
   }, [user, hasCreatedUser]);

   const createUserIfNotExist = async (clerkId) => {
     if (clerkId) {
       try {
         await createUserMutation({ clerkId });
         console.log("User created in Convex:", clerkId);
       } catch (error) {
         console.error("Error creating user in Convex:", error);
       }
     }
   };

   return (
     <div className={styles.sidebar}> {/* Removed the conditional class */}
       <h2 className={styles.sidebarHeader}>
         {user?.imageUrl ? (
           <Image src={user?.imageUrl} alt="Profile" width={40} height={40} className={styles.userPicture} />
         ) : (
           user ? `Hello, ${user.firstName || user.username || 'User'}` : 'Hello, Guest'
         )}
       </h2>
       <ul className={styles.menu}>
         {user ? (
           <>
             <li><Link href="/settings">Settings</Link></li>
             <li><Link href="/betting-history">Betting History</Link></li>
             <li>
               <button onClick={() => signOut()} className={styles.logoutButton}>
                 Sign Out
               </button>
             </li>
           </>
         ) : (
           <>
             <li>
               <SignInButton> {/* Removed mode="modal" */}
                 <button className={styles.authButton}>Sign In</button>
               </SignInButton>
             </li>
             <li>
               <SignUpButton mode="modal"> {/* Keeping modal for signup for now, adjust if needed */}
                 <button className={styles.authButton}>Sign Up</button>
               </SignUpButton>
             </li>
           </>
         )}
         {/* Add any always visible links here */}
       </ul>
       {/* <button onClick={toggleSidebar} className="absolute top-4 left-4">Close</button> */} {/* Removed the close button */}
     </div>
   );
 };

 export default SettingsSidebar;