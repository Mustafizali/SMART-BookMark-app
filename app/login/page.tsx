'use client'

import { supabase } from '../../lib/supabaseClient'

export default function Login() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-3">
          Welcome Back
        </h1>

        <p className="text-white/70 mb-8">
          Sign in to manage your smart bookmarks
        </p>

        <button
          onClick={loginWithGoogle}
          className="group w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Continue with Google
        </button>

        <p className="text-white/60 text-sm mt-6">
          Secure authentication powered by Google
        </p>
      </div>
    </div>
  )
}
