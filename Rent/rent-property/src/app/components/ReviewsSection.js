'use client'

import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

function Card({ children, className = '' }) {
  return <div className={`rounded-lg border bg-white text-slate-950 shadow-sm ${className}`}>{children}</div>
}
function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function ClientReviewsSlider() {
  const [currentReview, setCurrentReview] = useState(0)
  const reviews = [
    { name: "Ahmed Hassan", role: "Software Engineer", content: "IT Extremes helped me find the perfect apartment in Islamabad. Their service is exceptional and the property quality is outstanding.", rating: 3 },
    { name: "Fatima Khan", role: "Marketing Manager", content: "Found my dream house in Karachi through IT Extremes. The entire process was smooth and professional. Highly recommended!", rating: 5 },
    { name: "Usman Malik", role: "Business Owner", content: "The team at IT Extremes went above and beyond to find me a commercial space that fit all my requirements. Excellent service!", rating: 5 },
    { name: "Ayesha Raza", role: "University Professor", content: "As an expat moving to Pakistan, IT Extremes made finding a home so easy. They understood my needs perfectly.", rating: 4 }
  ]

  useEffect(() => {
    const timer = setInterval(() => setCurrentReview((prev) => (prev + 1) % reviews.length), 5000)
    return () => clearInterval(timer)
  }, [reviews.length])

  return (
    <div className="relative overflow-hidden h-[400px] sm:h-[350px] md:h-[300px]">
      {reviews.map((review, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentReview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReview(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentReview ? 'bg-amber-500 scale-110' : 'bg-slate-600 hover:bg-slate-500'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  return (
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
  )
}
