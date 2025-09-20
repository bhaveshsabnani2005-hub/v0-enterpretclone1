"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Bus } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!isLogin && !formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData)
      // Redirect to dashboard or handle authentication
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-700">
          <Link
            href="/"
            className="inline-flex items-center gap-3 hover:opacity-80 transition-all duration-300 hover:scale-105"
          >
            <Bus className="h-8 w-8 text-lime-400 animate-pulse" />
            <span className="text-2xl font-bold text-white">OnTimeBharat</span>
          </Link>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 shadow-2xl backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-6 duration-700 delay-200">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent drop-shadow-sm animate-in fade-in-0 zoom-in-95 duration-500 delay-500 inline-block">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-700"
            >
              {!isLogin && (
                <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl h-12 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-all duration-300 hover:bg-gray-700/70 focus:scale-[1.02] ${
                      errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500/50 animate-shake" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm mt-1 animate-in fade-in-0 slide-in-from-left-2 duration-200">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-100">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl h-12 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-all duration-300 hover:bg-gray-700/70 focus:scale-[1.02] ${
                    errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/50 animate-shake" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 animate-in fade-in-0 slide-in-from-left-2 duration-200">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-200">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl h-12 pr-12 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-all duration-300 hover:bg-gray-700/70 focus:scale-[1.02] ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/50 animate-shake" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-400 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1 animate-in fade-in-0 slide-in-from-left-2 duration-200">
                    {errors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div className="animate-in fade-in-0 slide-in-from-left-4 duration-300 delay-300">
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-xl h-12 pr-12 focus:border-lime-400 focus:ring-1 focus:ring-lime-400/50 transition-all duration-300 hover:bg-gray-700/70 focus:scale-[1.02] ${
                        errors.confirmPassword
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/50 animate-shake"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-lime-400 transition-all duration-300 hover:scale-110"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1 animate-in fade-in-0 slide-in-from-left-2 duration-200">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold rounded-xl h-12 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-lime-400/25 animate-in fade-in-0 slide-in-from-bottom-4 duration-300 delay-400 active:scale-95"
              >
                {isLogin ? "Login" : "Sign Up"}
              </Button>

              {isLogin && (
                <div className="text-center animate-in fade-in-0 duration-300 delay-500">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-400 hover:text-lime-400 transition-all duration-300 hover:scale-105 inline-block"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <div className="text-center pt-4 animate-in fade-in-0 duration-300 delay-600">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsLogin(!isLogin)}
                  className="border-gray-600 text-gray-300 hover:text-lime-400 hover:border-lime-400 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {isLogin ? "Create Account Instead" : "Login Instead"}
                </Button>
              </div>

              {!isLogin && (
                <p className="text-xs text-gray-400 text-center mt-4 animate-in fade-in-0 duration-300 delay-700">
                  By signing up, you agree to our Terms & Conditions.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
