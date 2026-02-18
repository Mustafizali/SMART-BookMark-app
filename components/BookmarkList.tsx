'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function BookmarkList({ user }: any) {
  const router = useRouter()

  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setBookmarks(data || [])
  }

  // Realtime subscription
  useEffect(() => {
    if (!user?.id) return

    fetchBookmarks()

    const channel = supabase
      .channel(`bookmarks-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setBookmarks((prev) => {
            // prevent duplicates
            if (prev.some((b) => b.id === payload.new.id)) {
              return prev
            }
            return [payload.new, ...prev]
          })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setBookmarks((prev) =>
            prev.filter((bm) => bm.id !== payload.old.id)
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id])

  // Add bookmark
  const addBookmark = async () => {
    if (!url || !title) return

    let formattedUrl = url.trim()

    if (
      !formattedUrl.startsWith('http://') &&
      !formattedUrl.startsWith('https://')
    ) {
      formattedUrl = 'https://' + formattedUrl
    }

    const { error } = await supabase.from('bookmarks').insert({
      user_id: user.id,
      url: formattedUrl,
      title,
    })

    if (error) {
      console.error(error)
      return
    }

    setUrl('')
    setTitle('')
  }

  // Delete bookmark (optimistic)
  const deleteBookmark = async (id: string) => {
    // Optimistic update
    setBookmarks((prev) => prev.filter((bm) => bm.id !== id))

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      fetchBookmarks() // rollback if needed
    }
  }

  // Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error(error)
      return
    }

    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 border border-white/40 relative overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Bookmarks
            </h1>
            <p className="text-gray-500 mt-1">
              Organize and access your favorite links instantly
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
              {bookmarks.length} Saved
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Add Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            placeholder="Enter URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <input
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <button
            onClick={addBookmark}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Add
          </button>
        </div>

        {/* Bookmark List */}
        <ul className="space-y-4">
          {bookmarks.map((bm) => (
            <li
              key={bm.id}
              className="group flex justify-between items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <a
                href={bm.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-700 group-hover:text-indigo-600 transition"
              >
                {bm.title}
              </a>

              <button
                onClick={() => deleteBookmark(bm.id)}
                className="px-3 py-1 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
