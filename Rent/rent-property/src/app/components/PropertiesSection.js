'use client'

import Image from 'next/image'
import { Mulish } from 'next/font/google'
import { useEffect, useMemo, useState, useCallback } from 'react'

const mulish = Mulish({ subsets: ['latin'], display: 'swap' })

function Card({ children, className = '' }) {
  return <div className={`rounded-lg border bg-white text-slate-950 shadow-sm ${className}`}>{children}</div>
}
function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

// Icons
function PlayIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.25" />
      <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
    </svg>
  )
}
function ChevronLeft({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PropertiesSection() {
  const [modal, setModal] = useState(null) // {type: 'video' | 'gallery', ...}
  const isOpen = !!modal

  const openVideo = useCallback((src, title) => {
    setModal({ type: 'video', src, title })
  }, [])

  const openGallery = useCallback((images, startIndex = 0, title) => {
    setModal({ type: 'gallery', images, index: startIndex, title })
  }, [])

  const closeModal = useCallback(() => setModal(null), [])

  // Prevent background scroll while modal is open
  useEffect(() => {
    if (!isOpen) return
    const { style } = document.body
    const prev = style.overflow
    style.overflow = 'hidden'
    return () => { style.overflow = prev }
  }, [isOpen])

  // Keyboard controls
  const prevImage = useCallback(() => {
    setModal(m => (m && m.type === 'gallery'
      ? { ...m, index: (m.index - 1 + m.images.length) % m.images.length }
      : m))
  }, [])
  const nextImage = useCallback(() => {
    setModal(m => (m && m.type === 'gallery'
      ? { ...m, index: (m.index + 1) % m.images.length }
      : m))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
      if (modal && modal.type === 'gallery') {
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, modal, closeModal, nextImage, prevImage])

  // Touch swipe
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)
  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const delta = touchEndX - touchStartX
    const threshold = 40 // px
    if (delta > threshold) prevImage()
    if (delta < -threshold) nextImage()
    setTouchStartX(null)
    setTouchEndX(null)
  }

  const properties = useMemo(() => ([
    {
      mediaType: 'imageGallery',
      name: 'Apartment',
      location: 'City Centre D-17 Islamabad',
      images: [
        '/img6.jpeg',
        '/img7.jpeg',
        '/img8.jpeg',
        '/img9.jpeg',
        '/img10.jpeg',
        '/img11.jpeg',
        '/img12.jpeg'
      ],
      description: '2-bedroom apartment with one AC',
      price: 'PKR 14,500/month',
    },
    {
      mediaType: 'video',
      name: 'Apartment',
      location: 'Capital Square B-17',
      video: '/Apartment1.mp4',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyy5f1rR79owykEwoWhPnF-tyPFxUYMgx6g&s',
      description: 'Premium apartment available for rent',
      price: 'PKR 24,000/month',
    },
    {
      mediaType: 'video',
      name: 'Apartment',
      location: 'Capital Square B-17',
      video: '/Apartment2.mp4',
      poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyy5f1rR79owykEwoWhPnF-tyPFxUYMgx6g&s',
      description: 'Premium apartment available for rent',
      price: 'PKR 24,000/month',
    },
  ]), [])

  return (
    <>
      <section id="properties" className={`${mulish.className} py-20 sm:py-24 bg-slate-900`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6">
              Other Properties
            </h2>
            <div className="w-16 h-0.5 bg-[#01F5FF] mx-auto mb-6 lg:mb-8"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {properties.map((property, index) => {
              const isGallery = property.mediaType === 'imageGallery'
              const isVideo = property.mediaType === 'video'

              return (
                <Card
                  key={index}
                  className="border-slate-200 overflow-hidden group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative h-48 sm:h-56 lg:h-64 bg-slate-100">
                    {isVideo ? (
                      <>
                        {/* Poster */}
                        <img
                          src={property.poster}
                          alt={`${property.name} poster`}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => openVideo(property.video, property.name)}
                          className="absolute inset-0 flex items-center justify-center"
                          aria-label={`Play ${property.name} video`}
                        >
                          <span className="inline-flex items-center justify-center rounded-full text-white bg-black/50 hover:bg-black/60 w-14 h-14 sm:w-16 sm:h-16 shadow-lg">
                            <PlayIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                          </span>
                        </button>
                      </>
                    ) : isGallery ? (
                      <>
                        <Image
                          src={'/img9.jpeg'}
                          alt={`${property.name} photo`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          priority={index === 0}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const previewSrc = '/img9.jpeg'
                            const previewIndex = property.images.indexOf(previewSrc)
                            openGallery(
                              property.images,
                              previewIndex >= 0 ? previewIndex : 0,
                              property.name
                            )
                          }}
                          className="absolute inset-0"
                          aria-label={`View photos of ${property.name}`}
                          title="View photos"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const previewSrc = '/img9.jpeg'
                            const previewIndex = property.images.indexOf(previewSrc)
                            openGallery(
                              property.images,
                              previewIndex >= 0 ? previewIndex : 0,
                              property.name
                            )
                          }}
                          className="absolute bottom-3 right-3 rounded-full bg-black/60 hover:bg-black/70 text-white text-xs sm:text-sm px-3 py-1.5 shadow-md"
                        >
                          View photos ({property.images.length})
                        </button>
                      </>
                    ) : null}
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl text-slate-900 font-semibold mb-2">
                      {property.name}
                    </h3>
                    <p className="text-black text-sm mb-2 font-medium">
                      {property.location}
                    </p>
                    <p className="text-black text-sm mb-4">
                      {property.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <span className="text-slate-900 font-semibold text-sm sm:text-base">
                        From {property.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* MODALS */}
      {isOpen && modal && (
        <div
          className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6"
          style={{ minHeight: '100svh' }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative z-10 w-full max-w-6xl">
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 sm:-top-12 text-white/90 hover:text-white text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            {modal.type === 'video' && (
              <div
                className="mx-auto"
                style={{
                  maxWidth: 'min(96vw, calc(80svh * 16 / 9))',
                  height: 'min(80svh, calc(96vw * 9 / 16))',
                }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black">
                  <video
                    src={modal.src}
                    className="absolute inset-0 w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              </div>
            )}

            {modal.type === 'gallery' && (
              <div
                className="mx-auto"
                style={{
                  maxWidth: 'min(96vw, calc(80svh * 16 / 9))',
                  height: 'min(80svh, calc(96vw * 9 / 16))',
                }}
              >
                <div
                  className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black select-none"
                  onTouchStart={onTouchStart}
                  onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
                  onTouchEnd={onTouchEnd}
                >
                  <img
                    src={modal.images[modal.index]}
                    alt={`Gallery ${modal.index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />

                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute inset-y-0 left-0 w-1/2 z-10"
                  />
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute inset-y-0 right-0 w-1/2 z-10"
                  />

                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white rounded-full p-2 sm:p-3 z-20"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white rounded-full p-2 sm:p-3 z-20"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/60 text-white text-xs sm:text-sm px-2 py-1 rounded z-20">
                    {modal.index + 1} / {modal.images.length}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
