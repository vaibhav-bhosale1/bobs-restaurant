"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, ChevronDown, Home, Utensils, Info, MessageSquare ,LogOut, UserCircle, CreditCard, Users, Settings} from 'lucide-react';
import { useAuth, UserButton, SignOutButton} from '@clerk/nextjs';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isSignedIn } = useAuth();
    const router=useRouter()
    

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
      <div>
      <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/50 backdrop-blur-xl shadow-lg py-2' 
            : 'bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-md py-4'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center group">
              <div className="relative overflow-hidden">
                <span className="font-bold text-2xl text-amber-500 group-hover:text-amber-400 transition-colors duration-300">Bob's</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-500"></div>
              </div>
              <span className="font-light text-xl text-white ml-2">Restaurant</span>
            </div>
    
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex space-x-1">
                <NavLink icon={<Home size={16} />} href="#" label="Home" />
                <NavLink icon={<Utensils size={16} />} href="#" label="Menu" />
                <NavLink icon={<Info size={16} />} href="#" label="About" />
                <NavLink icon={<MessageSquare size={16} />} href="#" label="Contact" />
              </div>
            </nav>
    
            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isSignedIn ? (
                <div className="flex items-center space-x-3 bg-white/10 rounded-full py-1.5 px-4 backdrop-blur-md border border-white/10">
                <UserButton afterSignOutUrl="/" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-white font-semibold hover:text-amber-400 transition-colors">
                      My Account
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black border border-white/10 text-white min-w-[180px] shadow-lg rounded-lg p-1">
                    <DropdownMenuItem
                      onClick={() => router.push("/myreservations")}
                      className="hover:bg-amber-500/10 cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md"
                    >
                      <UserCircle size={16} />
                      My Reservations
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-amber-500/10 cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md">
                      <CreditCard size={16} />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-amber-500/10 cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md">
                      <Users size={16} />
                      Team
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-amber-500/10 cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md">
                      <Settings size={16} />
                      Subscription
                    </DropdownMenuItem>
          
                    <DropdownMenuSeparator className="bg-white/10 my-1" />
          
                    <SignOutButton>
                      <DropdownMenuItem className="hover:bg-red-500/10 cursor-pointer flex items-center gap-2 px-3 py-2 rounded-md text-red-400">
                        <LogOut size={16} />
                        Logout
                      </DropdownMenuItem>
                    </SignOutButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              ) : (
                <Link href="/sign-in">
                  <button className="group relative flex items-center justify-center px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full hover:shadow-amber-500/20 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></span>
                    <Calendar size={16} className="mr-2 relative z-10" />
                    <span className="relative z-10">Reserve Table</span>
                  </button>
                </Link>
              )}
              
              <button className="hidden md:flex items-center justify-center p-2.5 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-colors duration-300 border border-white/10">
                <Phone size={18} />
              </button>
            </div>
    
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
    
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[72px] bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-xl border-t border-white/10 animate-fadeIn h-[calc(100vh-72px)] overflow-auto">
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-1">
                <MobileNavLink href="#" icon={<Home size={18} />} label="Home" />
                <MobileNavLink href="#" icon={<Utensils size={18} />} label="Menu" />
                <MobileNavLink href="#" icon={<Info size={18} />} label="About" />
                <MobileNavLink href="#" icon={<MessageSquare size={18} />} label="Contact" />
                
                <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-white/10">
                  <button className="flex items-center justify-center px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors">
                    <Phone size={18} className="mr-3" />
                    <span>Call Us</span>
                  </button>
    
                  {isSignedIn ? (
                    <div className="flex items-center space-x-3 bg-white/10 rounded-xl py-3 px-4 backdrop-blur-sm border border-white/20">
                      <UserButton />
                      <span className="text-white">My Account</span>
                    </div>
                  ) : (
                    <Link href="/sign-in" className="w-full">
                      <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-xl hover:from-amber-500 hover:to-amber-600 transition-all">
                        <Calendar size={18} className="mr-3" />
                        Reserve Table
                      </button>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
    )
}

// Helper component for desktop nav links
const NavLink = ({ href, label, icon }) => {
  return (
    <a 
      href={href} 
      className="group flex items-center px-4 py-2 hover:bg-white/10 rounded-full transition-all duration-300 relative"
    >
      <div className="flex items-center text-white/70 group-hover:text-white">
        <span className="mr-1.5">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-400 group-hover:w-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
    </a>
  );
};

// Helper component for mobile nav links
const MobileNavLink = ({ href, label, icon }) => {
  return (
    <a 
      href={href} 
      className="flex items-center px-4 py-3 hover:bg-white/10 rounded-xl transition-all duration-300 text-white group"
    >
      <div className="bg-white/10 p-2 rounded-lg mr-3 group-hover:bg-amber-600/30 transition-colors">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </a>
  );
};

export default Header