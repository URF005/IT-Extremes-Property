'use client'

import { useEffect, useMemo, useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import { Search, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' })

const DUMMY_USERS = [
  { id: 'USR-0001', name: 'Ali Khan', email: 'ali.khan@example.com', phone: '+92 300 1111111', status: 'Active', joinedAt: '2025-06-12' },
  { id: 'USR-0002', name: 'Sara Ahmed', email: 'sara.ahmed@example.com', phone: '+92 333 2222222', status: 'Pending', joinedAt: '2025-06-14' },
  { id: 'USR-0003', name: 'Hassan Raza', email: 'hassan.raza@example.com', phone: '+92 301 3333333', status: 'Active', joinedAt: '2025-06-18' },
  { id: 'USR-0004', name: 'Fatima Noor', email: 'fatima.noor@example.com', phone: '+92 302 4444444', status: 'Suspended', joinedAt: '2025-07-01' },
  { id: 'USR-0005', name: 'Usman Ali', email: 'usman.ali@example.com', phone: '+92 304 5555555', status: 'Active', joinedAt: '2025-07-10' },
  { id: 'USR-0006', name: 'Maryam Iqbal', email: 'maryam.iqbal@example.com', phone: '+92 306 6666666', status: 'Pending', joinedAt: '2025-07-16' },
]

export default function AdminPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  // 🔐 Client-side guard
  useEffect(() => {
    const ok = typeof window !== 'undefined' && sessionStorage.getItem('adminAuthed') === '1'
    if (!ok) router.replace('/')
  }, [router])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return DUMMY_USERS
    return DUMMY_USERS.filter(u =>
      [u.id, u.name, u.email, u.phone, u.status, u.joinedAt].join(' ').toLowerCase().includes(q)
    )
  }, [query])

  const statusBadge = (s) => {
    const base = 'px-2 py-1 rounded text-[11px] sm:text-xs font-medium whitespace-nowrap'
    if (s === 'Active') return <span className={`${base} bg-emerald-500/15 text-emerald-400 border border-emerald-700/50`}>Active</span>
    if (s === 'Pending') return <span className={`${base} bg-amber-500/15 text-amber-400 border border-amber-700/50`}>Pending</span>
    return <span className={`${base} bg-rose-500/15 text-rose-400 border border-rose-700/50`}>Suspended</span>
  }

  const logout = () => {
    sessionStorage.removeItem('adminAuthed')
    router.replace('/')
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="min-w-0">
            <h1 className={`${playfair.className} text-xl sm:text-2xl lg:text-3xl leading-tight`}>Admin Dashboard</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">IT Extremes — User Management</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden sm:inline text-slate-300 hover:text-amber-500 transition-colors text-sm"
            >
              Back to site
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-200 hover:bg-slate-800 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Actions Row (sticky on mobile for quick search) */}
      <div className="sticky top-[56px] sm:top-[64px] z-20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 border-b border-slate-800">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative w-full sm:max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                aria-label="Search users"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-md border border-slate-700 bg-slate-800 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                placeholder="Search users by name, email, phone, status…"
              />
            </div>
            <div className="text-slate-400 text-xs sm:text-sm sm:ml-auto">
              Showing <span className="text-amber-400 font-medium">{filtered.length}</span> of {DUMMY_USERS.length}
            </div>
          </div>
        </section>
      </div>

      {/* Content */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Desktop/Tablet Table (with horizontal scroll if needed) */}
        <div className="hidden md:block rounded-xl border border-slate-800 bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-900/70 border-b border-slate-800">
                <tr>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-slate-300">User ID</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-slate-300">Name</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-slate-300">Email</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-slate-300">Phone</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-slate-300">Status</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-slate-300">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                    <td className="px-4 py-3 text-slate-200">{u.id}</td>
                    <td className="px-4 py-3 text-slate-200">{u.name}</td>
                    <td className="px-4 py-3 text-slate-300">{u.email}</td>
                    <td className="px-4 py-3 text-slate-300">{u.phone}</td>
                    <td className="px-4 py-3">{statusBadge(u.status)}</td>
                    <td className="px-4 py-3 text-slate-400">{u.joinedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {filtered.map((u) => (
            <article
              key={u.id}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"
              aria-label={`User ${u.name}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-base leading-tight">{u.name}</h3>
                {statusBadge(u.status)}
              </div>
              <dl className="text-sm text-slate-300 space-y-1">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">ID</dt>
                  <dd className="text-right">{u.id}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Email</dt>
                  <dd className="text-right break-all">{u.email}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Phone</dt>
                  <dd className="text-right">{u.phone}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-400">Joined</dt>
                  <dd className="text-right">{u.joinedAt}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
