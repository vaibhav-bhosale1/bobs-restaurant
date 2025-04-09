"use client";
import React, { useState, useEffect } from "react";
import {
  Menu, X, Calendar, Phone, ChevronDown, Home, Utensils,
  Info, MessageSquare, LogOut, UserCircle, CreditCard,
  Users, Settings
} from "lucide-react";
import { useAuth, UserButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-black/60 backdrop-blur-xl shadow-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-black font-bold text-2xl tracking-wide">
          <span className="text-amber-500">Bob's</span> Restaurant
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center text-white text-sm font-medium">
          <NavLink href="#" label="Home" icon={<Home size={16} />} />
          <NavLink href="#" label="Menu" icon={<Utensils size={16} />} />
          <NavLink href="#" label="About" icon={<Info size={16} />} />
          <NavLink href="#" label="Contact" icon={<MessageSquare size={16} />} />
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center bg-white/10 border border-white/20 backdrop-blur-lg rounded-full px-4 py-1.5 space-x-3">
              <UserButton afterSignOutUrl="/" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-black font-medium hover:text-amber-400 transition">
                    My Account <ChevronDown size={16} className="inline ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border border-white/10 text-white min-w-[200px] shadow-xl rounded-xl p-1">
                  <DropdownMenuItem onClick={() => router.push("/myreservations")} className="menu-item">
                    <UserCircle size={16} /> My Reservations
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item"><CreditCard size={16} /> Billing</DropdownMenuItem>
                  <DropdownMenuItem className="menu-item"><Users size={16} /> Team</DropdownMenuItem>
                  <DropdownMenuItem className="menu-item"><Settings size={16} /> Subscription</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10 my-1" />
                  <SignOutButton>
                    <DropdownMenuItem className="menu-item text-red-400 hover:bg-red-500/10">
                      <LogOut size={16} /> Logout
                    </DropdownMenuItem>
                  </SignOutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/sign-in">
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:to-amber-500 text-white font-medium px-5 py-2 rounded-full shadow-md hover:shadow-amber-500/30 transition-all flex items-center">
                <Calendar size={16} className="mr-2" />
                Reserve Table
              </button>
            </Link>
          )}
          <button className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition">
            <Phone size={18} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/10 text-black border border-white/20"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10 animate-slideDown">
          <div className="px-4 py-6 space-y-3 text-black">
            <MobileNavLink label="Home" icon={<Home size={18} />} />
            <MobileNavLink label="Menu" icon={<Utensils size={18} />} />
            <MobileNavLink label="About" icon={<Info size={18} />} />
            <MobileNavLink label="Contact" icon={<MessageSquare size={18} />} />
            {isSignedIn ? (
              <>
                <div className="flex items-center space-x-3 mt-4">
                  <UserButton />
                  <span className="font-medium">My Account</span>
                </div>
                <SignOutButton>
                  <button className="w-full mt-3 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition">
                    <LogOut size={16} className="inline mr-2" />
                    Logout
                  </button>
                </SignOutButton>
              </>
            ) : (
              <Link href="/sign-in">
                <button className="w-full mt-4 bg-amber-500 py-3 rounded-lg text-black hover:bg-amber-600 transition">
                  <Calendar size={16} className="inline mr-2" />
                  Reserve Table
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Reusable NavLink
const NavLink = ({ href, label, icon }) => (
  <a href={href} className="relative group flex items-center gap-1 hover:text-amber-400 transition">
    {icon}
    <span>{label}</span>
    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
  </a>
);

// Mobile Link
const MobileNavLink = ({ label, icon }) => (
  <button className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-white/10 transition">
    <span className="mr-3">{icon}</span>
    {label}
  </button>
);

// Custom styles for dropdown items
// Add in global.css or tailwind config
//  }

export default Header;
