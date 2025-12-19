"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { MaskLogo } from "@/components/MaskLogo";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#ffbe0b] flex items-center justify-center">
              <MaskLogo className="w-5 h-5 text-[#0f0f1a]" />
            </div>
            <span className="text-xl font-light tracking-wide text-white" style={{ fontFamily: 'Georgia, serif' }}>NOMA</span>
          </Link>
        </div>

        <Card className="border-2 border-[#333333] bg-[#1a1a2e] rounded-lg shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-lg bg-[#ffbe0b]/10 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-[#ffbe0b]" />
            </div>
            <CardTitle className="text-3xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>Welcome Back</CardTitle>
            <p className="text-[#cccccc] mt-2 text-sm">Sign in to access your dashboard</p>
          </CardHeader>

          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#cccccc] font-medium text-sm">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a0a0a0]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 rounded-md border-2 border-[#333333] bg-[#0f0f1a] text-white placeholder:text-[#a0a0a0] focus:border-[#ffbe0b]"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#cccccc] font-medium text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a0a0a0]" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-12 rounded-md border-2 border-[#333333] bg-[#0f0f1a] text-white placeholder:text-[#a0a0a0] focus:border-[#ffbe0b]"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#ffbe0b] hover:bg-[#e6a200] text-[#000000] font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#cccccc]">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#ffbe0b] font-semibold hover:text-[#e6a200] transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-sm">
          <Link
            href="/"
            className="text-[#cccccc] hover:text-[#ffbe0b] transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
