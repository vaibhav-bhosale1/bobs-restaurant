// pages/signin.js or app/signin/page.js (depending on your Next.js version)
import { SignIn, SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - SignIn component */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome Back</h1>
          <SignUp />
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 relative bg-gray-100">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{ backgroundImage: "url('/login.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-amber-800/40"></div>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Restaurant Bob</h2>
          <p className="text-lg">Authentic French Cuisine</p>
        </div>
      </div>
    </div>
  );
}