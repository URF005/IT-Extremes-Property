'use client'

import Image from 'next/image'
import { Mulish } from 'next/font/google'

// Import Mulish only
const mulish = Mulish({ subsets: ['latin'], display: 'swap' })

function Img({ src, alt, wrapperClass = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${wrapperClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width:1536px) 40vw, (min-width:1280px) 44vw, (min-width:1024px) 48vw, (min-width:768px) 50vw, 100vw"
      />
    </div>
  )
}

export default function MainProperty() {
  return (
    <section id="main" className={`${mulish.className} py-20 sm:py-24 bg-slate-800`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Property highlight + discount */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#01F5FF]/15 px-3 py-1 ring-1 ring-[#01F5FF]/40">
                <span className="h-2 w-2 rounded-full bg-[#01F5FF] animate-pulse" />
                <span className="text-[#01F5FF] text-xs font-semibold tracking-wide">
                  Limited-time deal
                </span>
                <span className="ml-1 rounded-full bg-[#01F5FF]/10 px-2 py-0.5 text-[#01F5FF] text-[10px] font-semibold ring-1 ring-[#01F5FF]/40">
                  45% OFF
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Rents Inn — Premium Apartments in B-17
              </h2>

              <p className="text-slate-300 text-base lg:text-lg leading-relaxed">
                Clean, comfortable, and stylish furnished homes — perfect for short or long stays.  
                Located in <span className="font-semibold text-white">Capital Square Block D</span>, 
                offering a prime location with easy access to city facilities.
              </p>
            </div>

            {/* Price block */}
            <div className="rounded-2xl bg-slate-900/60 ring-1 ring-white/10 p-5 sm:p-6">
              <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-slate-400 line-through text-lg sm:text-xl">
                    PKR 10,900
                  </span>
                  <span
                    className="inline-flex items-center rounded-md bg-emerald-500/15 px-2 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/40"
                    aria-label="Forty-five percent off"
                  >
                    45% OFF
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-slate-300 text-sm">Now</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    PKR 5,950
                  </span>
                  <span className="text-slate-400 text-xs sm:text-sm">
                    for a limited time
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-md bg-[#01F5FF]/10 px-2.5 py-1 text-[11px] font-medium text-[#01F5FF] ring-1 ring-[#01F5FF]/40">
                  ✨ Adda Highlight — Featured Property
                </span>
                <span className="text-slate-400 text-xs">
                  Prices include furnished stay. Taxes/fees may apply.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Tall image + 2×2 grid */}
          <div className="grid gap-4 mt-8 lg:mt-0 grid-cols-1 md:grid-cols-3 items-start">
            {/* Tall rectangle */}
            <Img
              src="/img5.jpeg"
              alt="Featured apartment vertical"
              wrapperClass="aspect-[2/3] md:col-start-1 md:row-span-2"
            />

            {/* Right side 2×2 */}
            <div className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-rows-2">
              <Img src="/img1.jpeg" alt="Gallery 1" wrapperClass="aspect-square" />
              <Img src="/img2.jpeg" alt="Gallery 2" wrapperClass="aspect-square" />
              <Img src="/img3.jpeg" alt="Gallery 3" wrapperClass="aspect-square" />
              <Img src="/img4.jpeg" alt="Gallery 4" wrapperClass="aspect-square" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
