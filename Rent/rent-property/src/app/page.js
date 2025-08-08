'use client'

import Image from 'next/image'
import { Star, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Inter, Playfair_Display } from 'next/font/google'


// --- Professional Fonts ---
const inter = Inter({ subsets: ['latin'], display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

// Custom Button Component
function Button({ children, className = '', size = 'md', variant = 'default', onClick, ...props }) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs h-7',
    sm: 'px-3 py-2 text-sm h-8',
    md: 'px-4 py-2 text-base h-10',
    lg: 'px-6 py-3 text-lg h-12'
  }

  const variantClasses = {
    default: 'bg-amber-500 text-slate-900 hover:bg-amber-600 focus:ring-amber-500',
    outline: 'border border-amber-500 text-amber-500 bg-transparent hover:bg-amber-500 hover:text-slate-900 focus:ring-amber-500',
    link: 'text-amber-500 hover:text-amber-400 underline-offset-4 hover:underline bg-transparent p-0 h-auto'
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Card Component
function Card({ children, className = '' }) {
  return (
    <div className={`rounded-lg border bg-white text-slate-950 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

function CardContent({ children, className = '' }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

// Client Reviews Slider Component
function ClientReviewsSlider() {
  const [currentReview, setCurrentReview] = useState(0)

  const reviews = [
    {
      name: "Ahmed Hassan",
      role: "Software Engineer",
      content: "IT Extremes helped me find the perfect apartment in Islamabad. Their service is exceptional and the property quality is outstanding.",
      rating: 3
    },
    {
      name: "Fatima Khan",
      role: "Marketing Manager",
      content: "Found my dream house in Karachi through IT Extremes. The entire process was smooth and professional. Highly recommended!",
      rating: 5
    },
    {
      name: "Usman Malik",
      role: "Business Owner",
      content: "The team at IT Extremes went above and beyond to find me a commercial space that fit all my requirements. Excellent service!",
      rating: 5
    },
    {
      name: "Ayesha Raza",
      role: "University Professor",
      content: "As an expat moving to Pakistan, IT Extremes made finding a home so easy. They understood my needs perfectly.",
      rating: 4
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [reviews.length])

  return (
    <div className="relative overflow-hidden h-[400px] sm:h-[350px] md:h-[300px]">
      {reviews.map((review, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentReview
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          <Card className="border-slate-200 h-full">
            <CardContent className="h-full flex flex-col">
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-black text-lg md:text-xl mb-6 italic flex-grow">
                "{review.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-black font-semibold">{review.name}</h4>
                  <p className="text-black text-sm">{review.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {/* Review Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReview(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentReview
                ? 'bg-amber-500 scale-110'
                : 'bg-slate-600 hover:bg-slate-500'
              }`}
          />
        ))}
      </div>
    </div>
  )
}
// Utility: format a Date as YYYY-MM-DD in local time
function formatDateLocal(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function BookingWidget() {
  // --- Dynamic dates ---
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const [checkIn, setCheckIn] = useState(formatDateLocal(today))
  const [checkOut, setCheckOut] = useState(formatDateLocal(tomorrow))
  const [guests, setGuests] = useState(1)
  const [location, setLocation] = useState('')
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  const locations = [
    'Wah Cantt','Taxila','B-17 Islamabad','DHA Islamabad','Bahria Town Islamabad',
    'F-6 Islamabad','F-7 Islamabad','F-8 Islamabad','F-10 Islamabad','F-11 Islamabad',
    'G-6 Islamabad','G-7 Islamabad','G-8 Islamabad','G-9 Islamabad','G-10 Islamabad','G-11 Islamabad',
    'Blue Area Islamabad','Gulberg Islamabad','PWD Islamabad','I-8 Islamabad','I-9 Islamabad','I-10 Islamabad',
    'Rawalpindi Cantt','Saddar Rawalpindi','Commercial Market Rawalpindi','Satellite Town Rawalpindi'
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLocationOpen && !event.target.closest('.location-dropdown')) {
        setIsLocationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLocationOpen])

  const handleGuestChange = (increment) => {
    setGuests(prev => (increment ? prev + 1 : Math.max(1, prev - 1)))
  }

  const handleCheckInChange = (value) => {
    setCheckIn(value)
    // Ensure checkout is always at least the day after check-in
    const ci = new Date(value)
    const co = new Date(checkOut)
    if (!(co > ci)) {
      const nextDay = new Date(ci)
      nextDay.setDate(ci.getDate() + 1)
      setCheckOut(formatDateLocal(nextDay))
    }
  }

  const handleCheckOutChange = (value) => {
    // Prevent selecting a checkout before/equals check-in
    const ci = new Date(checkIn)
    const co = new Date(value)
    if (co > ci) setCheckOut(value)
    else {
      const nextDay = new Date(ci)
      nextDay.setDate(ci.getDate() + 1)
      setCheckOut(formatDateLocal(nextDay))
    }
  }

  const handleSearch = () => {
    console.log('Searching with:', { checkIn, checkOut, guests, location })
    // Add your search logic here
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
      {/* Check-in */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">
          CHECK-IN
        </label>
        <div className="relative">
          <input
            type="date"
            value={checkIn}
            min={formatDateLocal(today)}
            onChange={(e) => handleCheckInChange(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
          />
        </div>
      </div>

      {/* Check-out */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">
          CHECK-OUT
        </label>
        <div className="relative">
          <input
            type="date"
            value={checkOut}
            min={checkIn}  // can’t be before (or equal to) check-in; logic enforces > check-in
            onChange={(e) => handleCheckOutChange(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">
          GUESTS
        </label>
        <div className="flex items-center border border-slate-300 rounded-md bg-white">
          <button
            onClick={() => handleGuestChange(false)}
            className="p-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="flex-1 text-center text-slate-900 font-medium text-sm">{guests}</span>
          <button
            onClick={() => handleGuestChange(true)}
            className="p-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Location with Dropdown */}
      <div className="space-y-2 location-dropdown">
        <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">
          LOCATION
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="w-full p-3 border border-slate-300 rounded-md text-left bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm flex items-center justify-between"
          >
            <span className={`${location ? 'text-slate-900' : 'text-black font-bold'}`}>
              {location || 'Where To Next'}
            </span>
            <svg
              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isLocationOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-slate-300 rounded-md shadow-xl z-[9999] max-h-60 overflow-y-auto transform transition-all duration-200 ease-out">
              {locations.map((loc, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setLocation(loc)
                    setIsLocationOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left text-slate-700 hover:bg-black hover:text-white transition-colors duration-200 text-sm first:rounded-t-md last:rounded-b-md"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Book Now */}
      <div className="sm:col-span-2 lg:col-span-1">
        <button
          onClick={handleSearch}
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 p-3 h-12 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex flex-col items-center justify-center"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-xs font-semibold">Book Now</span>
          <span className="text-xs font-medium">+92-300-1234567</span>
        </button>
      </div>
    </div>
  )
}


// Hero Background Slider Component
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { image: '/property-1.png', alt: 'Modern luxury apartment in Islamabad' },
    { image: '/property-2.png', alt: 'Premium house in Karachi' },
    { image: '/property-3.png', alt: 'Furnished room in Lahore' },
    { image: '/property-4.png', alt: 'Luxury villa in Rawalpindi' },
    { image: '/property-5.png', alt: 'Studio apartment in Wah Cantt' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index === (currentSlide - 1 + slides.length) % slides.length
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80"></div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-amber-500 scale-110' : 'bg-white/50 hover:bg-white/70'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let isValid = true
    const newErrors = {}

    if (!formData.name.trim()) { newErrors.name = 'Name is required'; isValid = false }
    if (!formData.email.trim()) { newErrors.email = 'Email is required'; isValid = false }
    else if (!validateEmail(formData.email)) { newErrors.email = 'Please enter a valid email address'; isValid = false }
    if (!formData.message.trim()) { newErrors.message = 'Message is required'; isValid = false }

    setFormErrors(newErrors)
    if (isValid) {
      setIsSubmitting(true)
      setTimeout(() => {
        console.log('Form submitted:', formData)
        setIsSubmitting(false)
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitSuccess(false), 5000)
      }, 1500)
    }
  }

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
    <div className={`min-h-screen bg-slate-900 ${inter.className}`}>
      {/* Top Header Bar */}
      <div className={`fixed top-0 w-full z-50 bg-slate-800 text-white py-2 px-4 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 translate-y-0'}`}>
        <div className="container mx-auto">
          <div className="hidden lg:flex items-center justify-between text-sm">
            {/* Left side - Contact Info */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Wah Cantt, Islamabad, Pakistan</span>
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
              <button onClick={() => scrollToSection('properties')} className="hover:text-amber-500 transition-colors">Explore Properties</button>

              <button onClick={() => scrollToSection('about')} className="hover:text-amber-500 transition-colors">About</button>
              <div className="flex items-center space-x-3 ml-4">
                <Facebook className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
                <Twitter className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
                <svg className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
                <Youtube className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
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
              <Facebook className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
              <Instagram className="w-4 h-4 hover:text-amber-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 translate-y-0 top-8'}`}>
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-white hover:text-amber-500 transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('properties')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Properties</button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-amber-500 transition-colors font-medium">Contact</button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">IT</span>
              </div>
              <span className={`${playfair.className} text-white text-xl`}>IT Extremes</span>
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
                <h4 className="text-white font-semibold mb-3 text-sm">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span className="text-slate-300">Wah Cantt, Islamabad, Pakistan</span>
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
                <button onClick={() => scrollToSection('home')} className="block w-full text-left text-white hover:text-amber-500 transition-colors font-medium py-2">Home</button>
                <button onClick={() => scrollToSection('properties')} className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors font-medium py-2">Properties</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors font-medium py-2">Contact</button>
              </nav>

              {/* Quick Links Section */}
              <div className="border-t border-slate-700 pt-4 mt-4">
                <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
                <div className="space-y-2">
                  <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors text-sm py-1">Explore Properties</button>

                  <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors text-sm py-1">About</button>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="border-t border-slate-700 pt-4 mt-4">
                <h4 className="text-white font-semibold mb-3 text-sm">Follow Us</h4>
                <div className="flex items-center space-x-4">
                  <Facebook className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                  <Instagram className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                  <Youtube className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Sliding Background */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-8">
        <HeroSlider />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-center">
          <div className="space-y-6 sm:space-y-8 mb-8">
            <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up`}>
              PREMIUM RENTAL<br />
              PROPERTIES
            </h1>
            <div className="w-24 h-0.5 bg-amber-500 mx-auto animate-fade-in-up animation-delay-200"></div>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto px-4 leading-relaxed animate-fade-in-up animation-delay-400">
              Discover exceptional rental properties across Pakistan's major cities - from luxury apartments to comfortable rooms
            </p>
            <Button
              size="xs"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-2 text-sm mx-auto font-semibold animate-fade-in-up animation-delay-600"
              onClick={() => scrollToSection('properties')}
            >
              Explore Properties
            </Button>
          </div>

          {/* Booking Widget */}
          <div className="mt-8 sm:mt-12 animate-fade-in-up animation-delay-800 relative z-50">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 sm:p-6 max-w-6xl mx-auto">
              <BookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Get to Know Section */}
      <section id="about" className="py-20 sm:py-24 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-white mb-6`}>
                  About IT Extremes
                </h2>
                <div className="w-16 h-0.5 bg-amber-500 mb-6 lg:mb-8"></div>
                <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-4 lg:mb-6">
                  IT Extremes is Pakistan's premier rental property platform, connecting tenants with quality accommodations
                  across major cities including Islamabad, Karachi, Lahore, and Wah Cantt.
                </p>
                <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8">
                  From modern apartments to comfortable rooms and spacious houses, we offer verified properties
                  that meet the highest standards of comfort, safety, and affordability.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
              <div className="space-y-4">
                <Image
                  src="/luxury-hotel-pool.png"
                  alt="Modern apartment complex in Islamabad"
                  width={250}
                  height={300}
                  className="rounded-lg object-cover w-full h-48 sm:h-64"
                />
                <Image
                  src="/elegant-hotel-lobby.png"
                  alt="Luxury property lobby"
                  width={250}
                  height={200}
                  className="rounded-lg object-cover w-full h-32 sm:h-40"
                />
              </div>
              <div className="space-y-4 mt-8">
                <Image
                  src="/luxury-hotel-exterior.png"
                  alt="Premium house exterior in Karachi"
                  width={250}
                  height={200}
                  className="rounded-lg object-cover w-full h-32 sm:h-40"
                />
                <Image
                  src="/premium-hotel-suite-bedroom.png"
                  alt="Furnished room in Lahore"
                  width={250}
                  height={300}
                  className="rounded-lg object-cover w-full h-48 sm:h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 sm:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-white mb-6`}>
              Featured Properties
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6 lg:mb-8"></div>
            <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto px-4">
              Explore our handpicked selection of premium rental properties across Pakistan's major cities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: "Executive Apartment", location: "Islamabad", image: "modern executive apartment islamabad", type: "apartment" },
              { name: "Luxury House", location: "Karachi", image: "luxury house karachi pakistan", type: "house" },
              { name: "Furnished Room", location: "Lahore", image: "furnished room lahore pakistan", type: "room" },
              { name: "Family Apartment", location: "Wah Cantt", image: "family apartment wah cantt", type: "apartment" },
              { name: "Studio Apartment", location: "Islamabad", image: "studio apartment islamabad", type: "apartment" },
              { name: "Villa", location: "Karachi", image: "villa karachi pakistan", type: "house" }
            ].map((property, index) => (
              <Card
                key={index}
                className="border-slate-200 overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48 sm:h-56 lg:h-64">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=256&width=400&query=${property.image}`}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className={`${playfair.className} text-lg sm:text-xl text-slate-900 mb-2`}>{property.name}</h3>
                  <p className="text-amber-600 text-sm mb-2 font-medium">{property.location}</p>
                  {/* Client request: details line in BLACK */}
                  <p className="text-black text-sm mb-4">
                    Premium {property.name.toLowerCase()} available for rent in {property.location}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="text-slate-900 font-semibold text-sm sm:text-base">From PKR 25,000/month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Client Reviews Section */}
      <section className="py-20 sm:py-24 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-white mb-6`}>
              What They're Saying
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6 lg:mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <ClientReviewsSlider />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-white mb-6`}>
              Contact Us
            </h2>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6 lg:mb-8"></div>
            <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto px-4">
              Get in touch with our team to find your perfect rental property
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-slate-300">+92-300-1234567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-slate-300">info@itextremes.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Address</h3>
                  <p className="text-slate-300">Wah Cantt, Punjab, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 lg:p-8 rounded-lg">
              <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {submitSuccess && (
                  <p className="text-green-400 text-sm">Thanks! We’ll get back to you shortly.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4 lg:mb-6">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-sm">IT</span>
                </div>
                <span className={`${playfair.className} text-white text-xl`}>IT Extremes</span>
              </div>
              <p className="text-slate-400 mb-4 lg:mb-6 text-sm sm:text-base">
                Pakistan's leading rental property platform, connecting tenants with premium accommodations across major cities.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
                <Youtube className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 lg:mb-6">Quick Links</h4>
              <ul className="space-y-2 lg:space-y-3">
                <li><button onClick={() => scrollToSection('about')} className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">About Us</button></li>
                <li><button onClick={() => scrollToSection('properties')} className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">Properties</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 lg:mb-6">Cities</h4>
              <ul className="space-y-2 lg:space-y-3">
                <li><a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">Islamabad</a></li>
                <li><a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">Karachi</a></li>
                <li><a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">Lahore</a></li>
                <li><a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">Wah Cantt</a></li>
                <li><a className="text-slate-400 hover:text-amber-500 transition-colors text-sm sm:text-base">Rawalpindi</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 lg:mb-6">Contact Info</h4>
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-400 text-sm sm:text-base">Wah Cantt, Punjab, Pakistan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-400 text-sm sm:text-base">+92-300-1234567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-400 text-sm sm:text-base">info@itextremes.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 lg:pt-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <p className="text-slate-400 text-sm text-center">
                © 2024 IT Extremes. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
