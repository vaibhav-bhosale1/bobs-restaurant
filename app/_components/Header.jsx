"use client"
import React from 'react'

import { useState } from 'react';
import { Menu, X, User, Calendar, Search, Phone } from 'lucide-react';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  
    <div>
            <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-red-600">Bob's</span>
            <span className="font-light text-xl">Restaurant</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Menu</a>
            <a href="#" className="text-gray-700 hover:text-red-600 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-red-600 font-medium">Contact</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-white border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
              <Phone size={16} className="mr-2" />
              <span>Call Us</span>
            </button>
            <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              <Calendar size={16} className="mr-2" />
              <span>Reserve Table</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium py-2">Home</a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium py-2">Menu</a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium py-2">About</a>
              <a href="#" className="text-gray-700 hover:text-red-600 font-medium py-2">Contact</a>
              <div className="flex flex-col space-y-2 pt-2">
                <button className="flex items-center justify-center px-4 py-2 bg-white border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                  <Phone size={16} className="mr-2" />
                  <span>Call Us</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                  <Calendar size={16} className="mr-2" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>

    </div>
  )
}

export default Header