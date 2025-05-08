'use client';

import { SignedIn, SignedOut, SignIn, SignUp, UserButton, SignOutButton } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import Sidebar from '../Components/Sidebar';
import MobileHeader from '../Components/MobileHeader';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('/profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Mobile Menu Toggle */}
      <MobileHeader 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* Sidebar */}
      <Sidebar 
        currentPath={currentPath} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 md:ml-0 pt-16 md:pt-0 flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md border border-purple-100">
          <h1 className="text-3xl font-extrabold mb-6 text-purple-950 tracking-tight text-center">Profile</h1>
          <SignedIn>
            <div className="flex flex-col items-center gap-4 mb-8">
              <UserButton afterSignOutUrl="/login-testing" />
              <span className="font-semibold text-purple-800">Signed in</span>
            </div>
            <SignOutButton signOutCallback={() => router.push('/login-testing')}>
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <div className="mb-6">
              <SignIn
                path="/login-testing"
                routing="path"
                signUpUrl="/sign-up"
                afterSignInUrl="/profile"
              />
            </div>
            <div>
              <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/login-testing"
                afterSignUpUrl="/profile"
              />
            </div>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}
