'use client'

import { MapPin, Mail, Phone } from 'lucide-react'
import { Playfair_Display } from 'next/font/google'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = window.innerWidth >= 768 ? 140 : 160
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-950 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4 lg:mb-6">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">IT</span>
              </div>
              <span className={`${playfair.className} text-white text-xl`}>
                IT Extremes
              </span>
            </div>
            <p className="text-slate-400 mb-4 lg:mb-6 text-sm sm:text-base">
              Pakistan's leading rental property platform, connecting tenants with premium accommodations across major cities.
            </p>
            <div className="flex space-x-4">
              <FaFacebookF className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
              <FaInstagram className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
              <FaYoutube className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
              <FaTiktok className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 lg:mb-6">Quick Links</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('properties')}
                  className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base"
                >
                  Contact
                </button>
              </li>

            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-white font-semibold mb-4 lg:mb-6">Location</h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">
                  Islamabad
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">
                  B-17
                </a>
              </li>
              <li>
                <a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">
                  Capital Square
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 lg:mb-6">Contact Info</h4>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-slate-400 text-sm sm:text-base">
                  Islamabad, Pakistan
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-slate-400 text-sm sm:text-base">
                  +92-300-1234567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-slate-400 text-sm sm:text-base">
                  info@itextremes.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 lg:pt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <p className="text-slate-400 text-sm text-center">
              © 2024 IT Extremes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
