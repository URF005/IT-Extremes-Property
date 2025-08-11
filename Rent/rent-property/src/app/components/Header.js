'use client'

import { useEffect, useState } from 'react'
import { MapPin, Mail, Phone, Menu, X } from 'lucide-react'
import { Playfair_Display } from 'next/font/google'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = window.innerWidth >= 768 ? 140 : 160
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Top Header Bar */}
      <div
        className={`fixed top-0 w-full z-50 bg-slate-800 text-white py-2 px-4 transition-all duration-300 ${isScrolled
          ? 'opacity-0 pointer-events-none -translate-y-full'
          : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="container mx-auto">
          <div className="hidden lg:flex items-center justify-between text-sm">
            {/* Left side - Contact Info */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>info@itextremes.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+92-300-1234567</span>
              </div>
            </div>

            {/* Right side - Links and Social */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => scrollToSection('properties')}
                className="hover:text-amber-500 transition-colors"
              >
                Explore Properties
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-amber-500 transition-colors"
              >
                About
              </button>
              <div className="flex items-center space-x-3 ml-4">
                <FaFacebookF className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
                <FaInstagram className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
                <FaYoutube className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
                <FaTiktok className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          {/* Mobile top header - simplified */}
          <div className="lg:hidden flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>+92-300-1234567</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaFacebookF className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
              <FaInstagram className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
              <FaYoutube className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" /> {/* Added */}
              <FaTiktok className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed w-full z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 transition-all duration-300 ${isScrolled
          ? 'opacity-0 pointer-events-none -translate-y-full'
          : 'opacity-100 translate-y-0 top-8'
          }`}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-amber-500 transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('properties')}
                className="text-slate-300 hover:text-amber-500 transition-colors font-medium"
              >
                Properties
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-slate-300 hover:text-amber-500 transition-colors font-medium"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">IT</span>
              </div>
              <span className={`${playfair.className} text-white text-xl`}>
                IT Extremes
              </span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-amber-500 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-sm border-t border-slate-800">
            <div className="container mx-auto px-4 py-4">
              {/* Contact Info Section */}
              <div className="border-b border-slate-700 pb-4 mb-4">
                <h4 className="text-white font-semibold mb-3 text-sm">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-300">
                      Wah Cantt, Islamabad, Pakistan
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-300">info@itextremes.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-300">+92-300-1234567</span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-3">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left text-white hover:text-amber-500 transition-colors font-medium py-2"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('properties')}
                  className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors font-medium py-2"
                >
                  Properties
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors font-medium py-2"
                >
                  Contact
                </button>
              </nav>

              {/* Quick Links Section */}
              <div className="border-t border-slate-700 pt-4 mt-4">
                <h4 className="text-white font-semibold mb-3 text-sm">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors text-sm py-1"
                  >
                    Explore Properties
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors text-sm py-1"
                  >
                    About
                  </button>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="border-t border-slate-700 pt-4 mt-4">
                <h4 className="text-white font-semibold mb-3 text-sm">
                  Follow Us
                </h4>
                <div className="flex items-center space-x-4">
                  <FaFacebookF className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                  <FaInstagram className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                  <FaYoutube className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                  <FaTiktok className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
