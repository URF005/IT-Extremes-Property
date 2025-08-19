'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, X as CloseIcon } from 'lucide-react'
import { Mulish } from 'next/font/google'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const mulish = Mulish({ subsets: ['latin'], display: 'swap' })

/* ----------------------------- Floating Alert ----------------------------- */
function FloatingAlert({ show, title = 'Success', message = 'Booking saved. We’ll contact you shortly.', onClose }) {
  return (
    <div
      className={`fixed z-[100] transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      w-full max-w-sm sm:max-w-xs bottom-0 sm:bottom-4 sm:right-4 sm:translate-x-0`}
      style={{ left: show ? '50%' : '50%', transform: show ? 'translate(-50%, 0)' : 'translate(-50%, 1rem)' }}
    >
      <div className="mx-auto sm:mx-0 flex items-start gap-3 rounded-xl border border-[#01F5FF]/60 bg-white/95 backdrop-blur p-4 shadow-2xl w-[90%] sm:w-auto">
        <CheckCircle2 className="w-5 h-5 text-[#01F5FF] mt-0.5 flex-shrink-0" />
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
    default: 'bg-[#01F5FF] text-slate-900 hover:bg-[#00DDEE] focus:ring-[#01F5FF]',
    outline: 'border border-[#01F5FF] text-[#01F5FF] bg-transparent hover:bg-[#01F5FF] hover:text-slate-900 focus:ring-[#01F5FF]',
    link: 'text-[#01F5FF] hover:text-[#00DDEE] underline-offset-4 hover:underline bg-transparent p-0 h-auto'
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
const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 45, 0, 0) // 15-min step
const sameDay = (a, b) => a.toDateString() === b.toDateString()

/* -------------------------- Responsive helper ---------------------------- */
function useIsSmallScreen(breakpoint = 640) {
  const [isSmall, setIsSmall] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const onChange = (e) => setIsSmall(e.matches)
    setIsSmall(mql.matches)
    mql.addEventListener ? mql.addEventListener('change', onChange) : mql.addListener(onChange)
    return () => {
      mql.removeEventListener ? mql.removeEventListener('change', onChange) : mql.removeListener(onChange)
    }
  }, [breakpoint])
  return isSmall
}

/* --------------------------- Datepicker Enhancements --------------------- */
/** Custom header: clean, no arrows, month/year dropdowns */
function CustomHeader({ date, changeYear, changeMonth }) {
  const years = useMemo(() => {
    const y = new Date().getFullYear()
    const arr = []
    for (let i = y - 50; i <= y + 10; i++) arr.push(i)
    return arr
  }, [])
  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ]

  return (
    <div className="flex items-center justify-between px-3 py-2 border-b bg-white sticky top-0">
      <div className="text-slate-900 font-semibold text-sm">
        {months[date.getMonth()]} {date.getFullYear()}
      </div>
      <div className="flex items-center gap-2">
        <select
          aria-label="Month"
          className="rounded-md border border-slate-300 text-sm px-2 py-1 bg-white"
          value={months[date.getMonth()]}
          onChange={(e) => changeMonth(months.indexOf(e.target.value))}
        >
          {months.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          aria-label="Year"
          className="rounded-md border border-slate-300 text-sm px-2 py-1 bg-white"
          value={date.getFullYear()}
          onChange={(e) => changeYear(Number(e.target.value))}
        >
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
    </div>
  )
}

/* ------------------------------ Booking Widget --------------------------- */
function BookingWidget() {
  const now = useMemo(() => new Date(), [])
  const defaultCheckout = useMemo(() => addHours(now, 24), [now])
  const isSmall = useIsSmallScreen(640)

  const [checkIn, setCheckIn] = useState(now)
  const [checkOut, setCheckOut] = useState(defaultCheckout)
  const [guests, setGuests] = useState(1)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [savedOk, setSavedOk] = useState(false)

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
    hours = hours ? hours : 12
    return `${hours}:${minutes} ${ampm}`
  }

  const handleBookNow = async () => {
    if (!validate()) return
    setSaving(true)
    setSavedOk(false)
    try {
      const bookingData = {
        checkIn: { date: formatDate(checkIn), time: formatTime12h(checkIn) },
        checkOut: { date: formatDate(checkOut), time: formatTime12h(checkOut) },
        guests,
        name,
        mobile
      }

      const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
      existing.push(bookingData)
      localStorage.setItem('bookings', JSON.stringify(existing, null, 2))

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

  // --- Enhanced DatePicker config (portal everywhere; custom header; no arrows) ---
  const desktopTimeProps = { showTimeSelect: true, timeIntervals: 15 }
  const mobileTimeProps = { showTimeInput: true, timeInputLabel: 'Time' }

  const commonPickerProps = {
    dateFormat: 'yyyy-MM-dd h:mm aa',
    popperPlacement: 'bottom-start',
    withPortal: true,                 // always portal => no clipping on any screen
    portalId: 'hero-datepicker-portal',
    shouldCloseOnScroll: false,       // keep open on scroll
    dropdownMode: 'select',
    showMonthDropdown: false,         // custom header handles this
    showYearDropdown: false,          // custom header handles this
    scrollableYearDropdown: true,
    yearDropdownItemNumber: 60,
    calendarClassName: 'booking-calendar',
    fixedHeight: true,                // consistent height; no jump
    renderCustomHeader: (props) => <CustomHeader {...props} />,
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">CHECK-IN</label>
          <DatePicker
            selected={checkIn}
            onChange={handleCheckInChange}
            {...commonPickerProps}
            {...(isSmall ? mobileTimeProps : desktopTimeProps)}
            minDate={minCheckInDate}
            minTime={sameDay(checkIn, minCheckInDate) ? minCheckInDate : startOfDay(checkIn)}
            maxTime={endOfDay(checkIn)}
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#01F5FF] focus:border-[#01F5FF] text-sm"
            placeholderText="Select date & time"
          />
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">CHECK-OUT</label>
          <DatePicker
            selected={checkOut}
            onChange={handleCheckOutChange}
            {...commonPickerProps}
            {...(isSmall ? mobileTimeProps : desktopTimeProps)}
            minDate={minCheckoutDate}
            minTime={sameDay(checkOut, minCheckoutDate) ? minCheckoutDate : startOfDay(checkOut)}
            maxTime={endOfDay(checkOut)}
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#01F5FF] focus:border-[#01F5FF] text-sm"
            placeholderText="Select date & time"
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600 uppercase tracking-wide">GUESTS</label>
          <div className="flex items-center border border-slate-300 rounded-md bg-white">
            <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="p-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none" aria-label="Decrease guests">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
            </button>
            <span className="flex-1 text-center text-slate-900 font-medium text-sm">{guests}</span>
            <button onClick={() => setGuests(g => g + 1)} className="p-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none" aria-label="Increase guests">
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
            className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#01F5FF] focus:border-[#01F5FF] text-sm"
            autoComplete="name"
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
              className="w-full p-3 border border-slate-300 rounded-md text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#01F5FF] focus:border-[#01F5FF] text-sm"
              autoComplete="tel"
            />
            <Button onClick={handleBookNow} disabled={saving} className="px-4 min-w-[110px] h-12">
              {saving ? 'Saving...' : 'Book Now'}
            </Button>
          </div>
          {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
        </div>
      </div>

      <FloatingAlert show={savedOk} onClose={() => setSavedOk(false)} />

      {/* ---- Global styles for enhanced, responsive, scroll-safe react-datepicker ---- */}
      <style jsx global>{`
        /* Portal overlay: center on all screens so top/bottom never clip */
        .react-datepicker__portal {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.65);
          padding: 16px;
          z-index: 100 !important;
        }

        /* Calendar container: scrollable, capped to viewport height */
        .react-datepicker__portal .react-datepicker,
        .booking-calendar {
          width: min(92vw, 460px);
          max-height: calc(92svh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
          background: #fff;
          border-radius: 16px;
          overflow: auto; /* enable internal scroll if needed */
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 40px rgba(2, 6, 23, 0.18);
        }

        /* Remove built-in prev/next arrows completely */
        .react-datepicker__navigation,
        .react-datepicker__navigation--previous,
        .react-datepicker__navigation--next {
          display: none !important;
        }

        /* Header cleaned + sticky */
        .react-datepicker__header {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .react-datepicker__current-month { display: none; } /* using custom header */

        /* Day grid sizing */
        .react-datepicker__day,
        .react-datepicker__day-name {
          width: 2.25rem;
          line-height: 2.25rem;
          margin: 0.15rem;
          font-size: 0.95rem;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background: #01F5FF !important;
          color: #0f172a !important;
          border-radius: 8px !important;
        }
        .react-datepicker__day:hover {
          background: #e6fafe;
          border-radius: 8px;
        }

        /* Desktop time list */
        @media (min-width: 641px) {
          .react-datepicker {
            display: inline-flex;
            align-items: stretch;
            min-height: 360px;
          }
          .react-datepicker__month-container {
            min-width: 300px;
          }
          .react-datepicker__time-container {
            border-left: 1px solid #e5e7eb;
            width: 120px;
            position: sticky;
            top: 0;
            background: #fff;
          }
          .react-datepicker__time, .react-datepicker__time-box {
            width: 120px;
            max-height: 320px;
          }
          .react-datepicker__time-list { scrollbar-width: thin; }
          .react-datepicker__time-list-item--selected {
            background: #01F5FF !important;
            color: #0f172a !important;
            border-radius: 6px;
          }
        }

        /* Mobile: sticky time input bottom; bigger touch targets */
        @media (max-width: 640px) {
          .react-datepicker__triangle { display: none; }
          .react-datepicker__day-name,
          .react-datepicker__day {
            font-size: 15px;
          }
          .react-datepicker__input-time-container {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 14px env(safe-area-inset-bottom);
            border-top: 1px solid #e5e7eb;
            background: #fff;
            position: sticky;
            bottom: 0;
          }
          .react-datepicker-time__input {
            width: 120px;
            padding: 10px 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-size: 14px;
          }
        }

        /* Medium screens: cap time list height to avoid overflow */
        @media (min-width: 641px) and (max-width: 1024px) {
          .react-datepicker__time-container,
          .react-datepicker__time {
            max-height: 300px;
          }
        }
      `}</style>
    </>
  )
}

/* --------------------------- Hero Background Slider ---------------------- */
function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { image: '/img1.jpeg', alt: 'Islamabad' },
    { image: '/img2.jpeg', alt: 'Islamabad' },
    { image: '/img3.jpeg', alt: 'Islamabad' },
    { image: '/img4.jpeg', alt: 'Islamabad' },
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[#01F5FF] scale-110' : 'bg-white/50 hover:bg-white/70'}`}
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
    <section id="home" className={`${mulish.className} relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-8`}>
      <HeroSlider />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="space-y-6 sm:space-y-8 mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-bold animate-fade-in-up">
            Rooms/ Apartment for rent in Islamabad
          </h1>

          <div className="w-24 h-0.5 bg-[#01F5FF] mx-auto animate-fade-in-up animation-delay-200"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto px-4 leading-relaxed animate-fade-in-up animation-delay-400">
            Discover premium rentals in Islamabad - from luxury apartments to comfortable homes in B-17 & D-17 Islamabad
          </p>
          <button
            onClick={() => scrollToSection('properties')}
            className="bg-[#01F5FF] hover:bg-[#00DDEE] text-slate-900 px-6 py-2 text-sm mx-auto font-semibold rounded-md animate-fade-in-up animation-delay-600"
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
