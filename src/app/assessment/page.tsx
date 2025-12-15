"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, User, Users, Shield, Clock, CheckCircle2 } from "lucide-react";

export default function Assessment() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #c026d3 0%, #e879f9 50%, #f0abfc 100%)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ background: 'rgba(192, 38, 211, 0.9)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#c026d3]" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">NOMA</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy</Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: '40vh' }}>
          <path fill="rgba(255, 255, 255, 0.95)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,144C672,139,768,149,864,154.7C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              How Can I Help You
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Choose the path that best fits your situation. Both options provide valuable insights and a personalized action plan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white group">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="mb-6">
                    <div className="relative w-24 h-24 mb-4">
                      <svg className="absolute inset-0" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f0abfc" strokeWidth="2"/>
                        <circle cx="30" cy="45" r="3" fill="#c026d3"/>
                        <circle cx="70" cy="45" r="3" fill="#c026d3"/>
                        <path d="M 35 60 Q 50 70 65 60" fill="none" stroke="#c026d3" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Get the Right Partner</h2>
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                    We use the understanding of how you work to give you clarity about your perfect match and your path to your love.
                  </p>
                  
                  <Button className="rounded-full w-full bg-gradient-to-r from-[#c026d3] to-[#e879f9] hover:opacity-90" size="lg">
                    <Link href="/assessment/individual" className="w-full">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white group">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="mb-6">
                    <div className="relative w-24 h-24 mb-4">
                      <svg className="absolute inset-0" viewBox="0 0 100 100">
                        <circle cx="40" cy="50" r="20" fill="none" stroke="#f0abfc" strokeWidth="2"/>
                        <circle cx="60" cy="50" r="20" fill="none" stroke="#f0abfc" strokeWidth="2"/>
                        <path d="M 35 48 Q 50 35 65 48" fill="none" stroke="#c026d3" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Save Marriage</h2>
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                    We are on a mission to help couples create clarity and calm in their relationship/partnership.
                  </p>
                  
                  <Button className="rounded-full w-full bg-gradient-to-r from-[#c026d3] to-[#e879f9] hover:opacity-90" size="lg">
                    <Link href="/assessment/couple" className="w-full">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white group">
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="mb-6">
                    <div className="relative w-24 h-24 mb-4">
                      <svg className="absolute inset-0" viewBox="0 0 100 100">
                        <rect x="30" y="35" width="40" height="50" fill="none" stroke="#f0abfc" strokeWidth="2" rx="2"/>
                        <line x1="40" y1="45" x2="60" y2="45" stroke="#c026d3" strokeWidth="2"/>
                        <line x1="40" y1="55" x2="60" y2="55" stroke="#c026d3" strokeWidth="2"/>
                        <line x1="40" y1="65" x2="55" y2="65" stroke="#c026d3" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">Book 25 Min Free Call</h2>
                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                    Are you seeking peace and transformation of pain around your relationship?
                  </p>
                  
                  <Button className="rounded-full w-full bg-gradient-to-r from-[#c026d3] to-[#e879f9] hover:opacity-90" size="lg">
                    <Link href="/contact" className="w-full">
                      Book Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-white/80 mt-8"
          >
            By proceeding, you agree to our{" "}
            <Link href="/privacy" className="text-white underline hover:text-white/90">Privacy Policy</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-white underline hover:text-white/90">Terms of Use</Link>.
          </motion.p>
        </motion.div>
      </main>

      <footer className="relative z-10 bg-white/95 backdrop-blur text-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#c026d3] to-[#e879f9] flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">NOMA</span>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} NOMA — No Mask Relationships. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}