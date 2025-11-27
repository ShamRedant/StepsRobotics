"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ProjectCard from "./ProjectCard"


export default function Protected() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const next = searchParams.get("next") || "/"
  useEffect(() => {
    setError("")
  }, [username, password])

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Login failed")
      }

      router.replace(next)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 grid gap-4">
            <h1 className="text-2xl font-semibold text-gray-800 text-center">Sign In</h1>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <form onSubmit={onSubmit} className="grid gap-4 mt-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3 text-white bg-gray-900 hover:bg-gray-800 transition"
              >
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
