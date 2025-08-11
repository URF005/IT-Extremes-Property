'use client'

import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import { useMemo } from 'react'

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

function Card({ children, className = '' }) {
  return <div className={`rounded-lg border bg-white text-slate-950 shadow-sm ${className}`}>{children}</div>
}
function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

export default function PropertiesSection() {
  const properties = useMemo(() => ([
    { name: "Executive Apartment", location: "Islamabad", image: "modern executive apartment islamabad", type: "apartment" },
    { name: "Luxury House", location: "Karachi", image: "luxury house karachi pakistan", type: "house" },
    { name: "Furnished Room", location: "Lahore", image: "furnished room lahore pakistan", type: "room" },
    { name: "Family Apartment", location: "Wah Cantt", image: "family apartment wah cantt", type: "apartment" },
    { name: "Studio Apartment", location: "Islamabad", image: "studio apartment islamabad", type: "apartment" },
    { name: "Villa", location: "Karachi", image: "villa karachi pakistan", type: "house" }
  ]), [])

  return (
    <section id="properties" className="py-20 sm:py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl text-white mb-6`}>
            Featured Properties
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6 lg:mb-8"></div>
          <p className="text-slate-300 text-base lg:text-lg max-w-2xl mx-auto px-4">
            Discover curated rental properties in B-17 Islamabad, featuring premium homes and apartments in Multi Gardens and surrounding areas
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <Card key={index} className="border-slate-200 overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
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
  )
}
