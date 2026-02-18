'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import BookmarkList from '../components/BookmarkList'


export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
        console.log("USER:", user)
      } else {
        setUser(data.user)
      }
    }

    getUser()
  }, [])

  if (!user) return null

  return <BookmarkList user={user} />
}
