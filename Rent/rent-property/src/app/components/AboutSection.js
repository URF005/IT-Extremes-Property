'use client'

import Image from 'next/image'
import { Mulish } from 'next/font/google'

const mulish = Mulish({ subsets: ['latin'], display: 'swap' })

export default function AboutSection() {
  return (
    <section id="about" className={`${mulish.className} py-16 sm:py-20 md:py-24 bg-slate-800`}>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-2">
          {/* Text */}
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              About <span className="text-[#01F5FF]">Rents Inn</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#01F5FF]" />
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              At Rents Inn, we offer clean, comfortable, and stylish apartments for rent in B-17 and
              D-17, Islamabad. Our homes are fully furnished and ready for you to enjoy — whether
              for a short stay or a long one.
            </p>
          </div>

          {/* Images */}
          <div className="max-w-2xl w-full mx-auto lg:mx-0">
            {/* Mobile/Small: stacked images */}
            <div className="md:hidden space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/mg.jpg"
                  alt="Luxury furnished apartment interior"
                  width={1600}
                  height={1067}
                  className="w-full h-auto object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/DI.jpg"
                  alt="Modern apartment building exterior"
                  width={1600}
                  height={1067}
                  className="w-full h-auto object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* md+ : main image with overlap */}
            <div className="hidden md:block relative pt-8 pr-8">
              {/* Main */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/mg.jpg"
                  alt="Luxury furnished apartment interior"
                  width={1600}
                  height={1067}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  priority
                />
              </div>

              {/* Overlapped secondary */}
              <div className="absolute -bottom-6 -right-6 w-3/5 lg:w-1/2 rounded-xl overflow-hidden ring-4 ring-slate-800 shadow-2xl">
                <Image
                  src="/DI.jpg"
                  alt="Modern apartment building exterior"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1280px) 35vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
