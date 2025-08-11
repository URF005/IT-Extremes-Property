'use client'

import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

export default function AboutSection() {
  return (
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
               IT Extremes is Pakistan's leading rental property platform, helping tenants find quality accommodations in Islamabad and its sectors like Multi Gardens B-17. We connect you with the best homes and commercial spaces across the city for a smooth rental experience.
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
  )
}
