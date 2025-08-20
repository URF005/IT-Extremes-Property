'use client'

import Image from 'next/image'
import { Mulish } from 'next/font/google'

const mulish = Mulish({ subsets: ['latin'], display: 'swap' })

export default function AboutSection() {
  return (
    <section id="about" className={`${mulish.className} py-16 sm:py-20 md:py-24 bg-slate-800`}>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* 
          flex-col on mobile (<640px)
          flex-row from sm+ (tablet, laptop, desktop)
        */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-14">
          {/* Text */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              About <span className="text-[#01F5FF]">Rentsin</span>
            </h2>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              At Rentsin, we offer clean, comfortable, and stylish apartments for rent in B-17 and
              D-17, Islamabad. Our homes are fully furnished and ready for you to enjoy — whether
              for a short stay or a long one.
            </p>
          </div>

          {/* Single Smaller Responsive Image */}
          <div className="flex-1 flex justify-center sm:justify-end">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/img5.jpeg"
                alt="Rents Inn Apartment"
                width={400}
                height={600}
                className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-auto object-cover"
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 320px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
