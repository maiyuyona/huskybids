import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const LoginTesting = () => {
  return (
    <div className="min-h-screen relative">
      <SignedOut>
        <div className="h-screen flex flex-col items-center justify-center gap-4">
          <SignInButton mode="modal">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-gr'e'en-500 text-white px-4 py-2 rounded-lg">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="absolute top-4 right-4">
          <UserButton 
            afterSignOutUrl="/login-testing"
            appearance={{
              elements: {
                avatarBox: "w-12 h-12"
              }
            }}
          />
        </div>
      </SignedIn>
    </div>
  );
};

export default LoginTesting;
