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
import { UserPlus, Mail, Lock, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password);
      
      // If user is immediately confirmed (has session), redirect to dashboard
      if (result.session && !result.needsConfirmation) {
        router.push('/dashboard');
      } else {
        // Otherwise show success message about email confirmation
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      // Try to parse the error message if it's from the API
      let errorMessage = "Failed to create account";
      if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setResending(true);
    setResendMessage("");
    setError("");

    try {
      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage("Confirmation email sent! Please check your inbox.");
      } else {
        setError(data.error || "Failed to resend email");
      }
    } catch (err) {
      setError("Failed to resend confirmation email");
    } finally {
      setResending(false);
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
              <UserPlus className="w-8 h-8 text-[#ffbe0b]" />
            </div>
            <CardTitle className="text-3xl font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>Create Account</CardTitle>
            <p className="text-[#cccccc] mt-2 text-sm">Join NOMA and start your journey</p>
          </CardHeader>

          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {resendMessage && (
                <div className="bg-[#ffbe0b]/10 border border-[#ffbe0b]/30 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ffbe0b] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#cccccc]">{resendMessage}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-green-300 font-semibold mb-2">
                        Account created successfully!
                      </p>
                      <p className="text-sm text-green-300">
                        We've sent a confirmation email to <strong>{email}</strong>. 
                        Please check your inbox and click the confirmation link to activate your account.
                      </p>
                      <p className="text-xs text-green-400 mt-2">
                        Check your spam folder if you don't see the email within a few minutes.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-green-800/50">
                    <p className="text-xs text-green-400 mb-2">Didn't receive the email?</p>
                    <Button
                      type="button"
                      onClick={handleResendConfirmation}
                      disabled={resending}
                      variant="outline"
                      size="sm"
                      className="w-full border-green-800/50 bg-green-900/20 text-green-400 hover:bg-green-900/30"
                    >
                      {resending ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Resend Confirmation Email
                        </>
                      )}
                    </Button>
                  </div>
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
                    disabled={loading || success}
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
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#cccccc] font-medium text-sm">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a0a0a0]" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 h-12 rounded-md border-2 border-[#333333] bg-[#0f0f1a] text-white placeholder:text-[#a0a0a0] focus:border-[#ffbe0b]"
                    placeholder="••••••••"
                    required
                    disabled={loading || success}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || success}
                className="w-full h-12 bg-[#ffbe0b] hover:bg-[#e6a200] text-[#000000] font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? "Creating account..." : success ? "Success!" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#cccccc]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#ffbe0b] font-semibold hover:text-[#e6a200] transition-colors"
                >
                  Sign In
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