'use client'

import { supabase } from '../../lib/supabaseClient'


export default function Login() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google'
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
        <svg
          className="w-5 h-5"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.939 31.91 29.387 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.964 3.036l5.657-5.657C34.053 5.053 29.276 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 16.108 19.007 13 24 13c3.059 0 5.842 1.154 7.964 3.036l5.657-5.657C34.053 5.053 29.276 3 24 3 16.318 3 9.656 7.337 6.306 14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 43c5.318 0 10.177-2.037 13.822-5.357l-6.383-5.396C29.387 35 26.806 36 24 36c-5.363 0-9.904-3.066-11.529-7.544l-6.5 5.004C9.285 39.556 16.063 43 24 43z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303c-1.039 3.002-3.143 5.433-5.864 6.974l.003-.002 6.383 5.396C39.76 36.939 44 30.552 44 23c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>

        <span>Continue with Google</span>
      </button>

      <p className="text-white/60 text-sm mt-6">
        Secure authentication powered by Google
      </p>
    </div>

  </div>
  )
}
