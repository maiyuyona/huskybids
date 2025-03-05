import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const LoginTesting = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default LoginTesting;
