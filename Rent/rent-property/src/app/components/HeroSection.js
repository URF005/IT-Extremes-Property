'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, X as CloseIcon } from 'lucide-react'
import { Playfair_Display } from 'next/font/google'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

/* ----------------------------- Floating Alert ----------------------------- */
function FloatingAlert({ show, title = 'Success', message = 'Booking saved. We’ll contact you shortly.', onClose }) {
  return (
    <div
      className={`fixed z-[100] transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      w-full max-w-sm sm:max-w-xs bottom-0 sm:bottom-4 sm:right-4 sm:translate-x-0`}
      style={{ left: show ? '50%' : '50%', transform: show ? 'translate(-50%, 0)' : 'translate(-50%, 1rem)' }}
    >
      <div className="mx-auto sm:mx-0 flex items-start gap-3 rounded-xl border border-emerald-300/60 bg-white/95 backdrop-blur p-4 shadow-2xl w-[90%] sm:w-auto">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
        <div className="pr-6">
          <p className="text-slate-900 font-semibold">{title}</p>
          <p className="text-slate-600 text-sm break-words">{message}</p>
        </div>
        <button aria-label="Close" onClick={onClose} className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 transition">
          <CloseIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/* --------------------------------- Button -------------------------------- */
function Button({ children, className = '', size = 'md', variant = 'default', onClick, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'
  const sizes = { xs: 'px-2 py-1 text-xs h-7', sm: 'px-3 py-2 text-sm h-8', md: 'px-4 py-2 text-base h-10', lg: 'px-6 py-3 text-lg h-12' }
  const variants = {
    default: 'bg-amber-500 text-slate-900 hover:bg-amber-600 focus:ring-amber-500',
    outline: 'border border-amber-500 text-amber-500 bg-transparent hover:bg-amber-500 hover:text-slate-900 focus:ring-amber-500',
    link: 'text-amber-500 hover:text-amber-400 underline-offset-4 hover:underline bg-transparent p-0 h-auto'
  }
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

/* --------------------------------- Utils --------------------------------- */
const addHours = (d, h) => new Date(d.getTime() + h * 3600_000)
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 45, 0, 0) // 15‑min step
const sameDay = (a, b) => a.toDateString() === b.toDateString()

/* ------------------------------ Booking Widget --------------------------- */
function BookingWidget() {
  const now = useMemo(() => new Date(), [])
  const defaultCheckout = useMemo(() => addHours(now, 24), [now])

  const [checkIn, setCheckIn] = useState(now)
  const [checkOut, setCheckOut] = useState(defaultCheckout)
  const [guests, setGuests] = useState(1)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [savedOk, setSavedOk] = useState(false)

  // Ensure checkout is at least 1 hour after check-in
  const handleCheckInChange = (date) => {
    if (!date) return
    setCheckIn(date)
    const minCo = addHours(date, 1)
    if (!(checkOut > minCo)) setCheckOut(minCo)
  }

  const handleCheckOutChange = (date) => {
    if (!date) return
    const minCo = addHours(checkIn, 1)
    setCheckOut(date > minCo ? date : minCo)
  }

  const minCheckInDate = now
  const minCheckoutDate = addHours(checkIn, 1)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!mobile.trim()) e.mobile = 'Mobile number is required'
    else if (!/^[0-9+\-\s()]{7,20}$/.test(mobile)) e.mobile = 'Enter a valid phone number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const formatDate = (d) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const formatTime12h = (d) => {
    let hours = d.getHours()
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // 0 becomes 12
    return `${hours}:${minutes} ${ampm}`
  }

  const handleBookNow = async () => {
    if (!validate()) return
    setSaving(true)
    setSavedOk(false)
    try {
      const bookingData = {
        checkIn: {
          date: formatDate(checkIn),
          time: formatTime12h(checkIn)
        },
        checkOut: {
          date: formatDate(checkOut),
          time: formatTime12h(checkOut)
        },
        guests,
        name,
        mobile
      }

      // Save locally (browser storage)
      const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
      existing.push(bookingData)
      localStorage.setItem('bookings', JSON.stringify(existing, null, 2))

      // Optionally send to API
      const res = await fetch('/api/save-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking: bookingData })
      })
      if (!res.ok) throw new Error(await res.text())

      setSavedOk(true)
      setTimeout(() => setSavedOk(false), 2500)
      setName('')
      setMobile('')
      setGuests(1)
      setErrors({})
      const freshNow = new Date()
      setCheckIn(freshNow)
      setCheckOut(addHours(freshNow, 24))
    } catch (err) {
      console.error('Booking save failed:', err)
      alert('Sorry, could not save your booking. Please try again.')
    } finally {
      setSaving(false)
    }
  }


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* Check-in (date + time in one field) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">CHECK-IN</label>
          <DatePicker
            selected={checkIn}
            onChange={handleCheckInChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="yyyy-MM-dd h:mm aa"
            minDate={minCheckInDate}
            minTime={sameDay(checkIn, minCheckInDate) ? minCheckInDate : startOfDay(checkIn)}
            maxTime={endOfDay(checkIn)}
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            placeholderText="Select date & time"
          />
        </div>

        {/* Check-out (date + time in one field) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">CHECK-OUT</label>
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOutChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="yyyy-MM-dd h:mm aa"
            minDate={minCheckoutDate}
            minTime={sameDay(checkOut, minCheckoutDate) ? minCheckoutDate : startOfDay(checkOut)}
            maxTime={endOfDay(checkOut)}
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            placeholderText="Select date & time"
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">GUESTS</label>
          <div className="flex items-center border border-slate-300 rounded-md bg-white">
            <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="p-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
            </button>
            <span className="flex-1 text-center text-slate-900 font-medium text-sm">{guests}</span>
            <button onClick={() => setGuests(g => g + 1)} className="p-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">NAME</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: '' })) }}
            placeholder="Your Name"
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
          />
          {errors.name && <p className="text-xs text-red-500 -mt-1">{errors.name}</p>}
        </div>

        {/* Mobile + Book Now */}
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">MOBILE</label>
          <div className="flex items-stretch gap-2">
            <input
              type="tel"
              value={mobile}
              onChange={(e) => { setMobile(e.target.value); if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' })) }}
              placeholder="+92-3XX-XXXXXXX"
              className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            />
            <Button onClick={handleBookNow} disabled={saving} className="px-4 min-w-[110px] h-12">
              {saving ? 'Saving...' : 'Book Now'}
            </Button>
          </div>
          {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
        </div>
      </div>

      <FloatingAlert show={savedOk} onClose={() => setSavedOk(false)} />
    </>
  )
}

/* --------------------------- Hero Background Slider ---------------------- */
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
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 4000)
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
              : 'opacity-0 translate-x-full'}`}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.alt} fill className="object-cover" priority={index === 0} />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80"></div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-amber-500 scale-110' : 'bg-white/50 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------- Hero Section ---------------------------- */
export default function HeroSection() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerOffset = window.innerWidth >= 768 ? 140 : 160
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-8">
      <HeroSlider />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="space-y-6 sm:space-y-8 mb-8">
          <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up`}>
            PREMIUM RENTAL<br />PROPERTIES
          </h1>
          <div className="w-24 h-0.5 bg-amber-500 mx-auto animate-fade-in-up animation-delay-200"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto px-4 leading-relaxed animate-fade-in-up animation-delay-400">
            Discover premium rentals in Islamabad - from luxury apartments to comfortable homes in B-17 Islamabad
          </p>
          <button
            onClick={() => scrollToSection('properties')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-2 text-sm mx-auto font-semibold rounded-md animate-fade-in-up animation-delay-600"
          >
            Explore Properties
          </button>
        </div>

        <div className="mt-8 sm:mt-12 animate-fade-in-up animation-delay-800 relative z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-4 sm:p-6 max-w-6xl mx-auto">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
