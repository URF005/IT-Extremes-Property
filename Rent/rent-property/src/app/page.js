'use client'

import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import PropertiesSection from './components/PropertiesSection'
import ReviewsSection from './components/ReviewsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function Home() {
  return (
    <div className={`min-h-screen bg-slate-900 ${inter.className}`}>
      <Header />
      <HeroSection />
      <PropertiesSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
