"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Shield, Users, User, ArrowRight, CheckCircle2, Lock, Eye, FileText, Sparkles, TrendingUp, Target, Clock, Award, Zap, CheckCircle } from "lucide-react";
import { MaskLogo } from "@/components/MaskLogo";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-14 h-14 rounded-2xl bg-[#1A3C63] flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:shadow-xl group-hover:shadow-blue-900/30 group-hover:scale-105 transition-all duration-300">
              <MaskLogo className="w-8 h-8" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#1A3C63]">NOMA</span>
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <Link href="/how-it-works" className="text-gray-700 hover:text-[#1A3C63] transition-colors font-medium text-sm">How It Works</Link>
            <Link href="/packages" className="text-gray-700 hover:text-[#1A3C63] transition-colors font-medium text-sm">Packages</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1A3C63] transition-colors font-medium text-sm">About</Link>
            <Link href="/privacy" className="text-gray-700 hover:text-[#1A3C63] transition-colors font-medium text-sm">Privacy</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1A3C63] transition-colors font-medium text-sm">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full hidden md:flex">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild className="bg-[#FF6B6B] hover:bg-[#E55A5A] text-white shadow-lg shadow-coral-200/50 hover:shadow-xl hover:shadow-coral-300/60 hover:scale-105 transition-all duration-300 rounded-full px-8 h-11 font-bold text-sm">
              <Link href="/assessment">Start Assessment</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative pt-44 pb-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-gray-50/40 to-orange-50/30" />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-200/15 to-blue-300/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-200/15 to-orange-300/10 rounded-full blur-3xl" />
          
          <motion.div 
            className="max-w-5xl mx-auto text-center relative z-10"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-blue-200/60 text-[#1A3C63] text-sm font-bold shadow-soft">
                <Shield className="w-4 h-4" />
                100% Private & Anonymous Platform
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-7xl md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.9]"
            >
              <span className="text-[#1A3C63]">NOMA</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-balance"
            >
              No Mask Relationships
            </motion.p>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed font-medium text-balance"
            >
              Get honest clarity about your relationship—privately, anonymously, and without judgment.
            </motion.p>
            
            <motion.p 
              variants={fadeIn}
              className="text-base text-gray-500 mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              Professional relationship check-ups for individuals and couples seeking clarity, direction, and practical next steps.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
              <Button asChild size="lg" className="bg-[#FF6B6B] hover:bg-[#E55A5A] text-white shadow-xl shadow-orange-200/50 hover:shadow-2xl hover:shadow-orange-300/60 hover:scale-[1.02] transition-all duration-300 rounded-full text-lg px-14 py-8 h-auto font-bold">
                <Link href="/assessment" className="flex items-center gap-2.5">
                  Start Your Check-Up
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-[#1A3C63] text-[#1A3C63] hover:bg-blue-50 hover:border-[#0d2238] transition-all duration-300 rounded-full text-lg px-14 py-8 h-auto font-bold">
                <Link href="/how-it-works">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#1A3C63]" />
                </div>
                <span className="font-medium">100% Anonymous</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#FF6B6B]" />
                </div>
                <span className="font-medium">Instant Results</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#1A3C63]" />
                </div>
                <span className="font-medium">Expert Guidance</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Most Relationship Problems Start With Pretending
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full" />
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { text: "We pretend we're okay when we're not", icon: "😔" },
                { text: "We hide our fears to avoid conflict", icon: "😰" },
                { text: "We ask friends instead of facing truth", icon: "🤷" },
                { text: "We stay confused for too long", icon: "😵" }
              ].map(({ text, icon }, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group"
                >
                  <div className="flex items-start gap-4 p-7 rounded-3xl bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all">
                    <div className="text-4xl flex-shrink-0">{icon}</div>
                    <p className="text-lg text-gray-700 font-medium pt-1">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-xl shadow-blue-200">
                <p className="text-2xl text-white font-bold">NOMA is a safe space to remove the mask.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-32 px-6 bg-gradient-to-br from-blue-500 via-blue-500 to-blue-600 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Clarity is better than confusion.
            </h2>
            <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
              Take the first step toward honest understanding of your relationship today.
            </p>
            <p className="text-white/80 mb-10 text-lg">
              100% private, anonymous, and instant results
            </p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transition-all rounded-full text-lg px-12 py-7 h-auto font-bold">
              <Link href="/assessment">
                Start Your Check-Up
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl">
                  <MaskLogo className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">NOMA</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed text-lg">
                Helping individuals and couples remove emotional masks and gain honest clarity about their relationships.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-blue-400 transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About NOMA</Link></li>
                <li><Link href="/assessment" className="text-gray-400 hover:text-blue-400 transition-colors">Start Assessment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">📧 Email Us</h4>
              <p className="text-gray-400 text-sm mb-4">For general inquiries and support</p>
              <ul className="space-y-2">
                <li><a href="mailto:info@nomaworld.co.ke" className="text-blue-400 hover:text-blue-300 transition-colors">info@nomaworld.co.ke</a></li>
                <li><a href="mailto:support@nomaworld.co.ke" className="text-blue-400 hover:text-blue-300 transition-colors">support@nomaworld.co.ke</a></li>
                <li><a href="mailto:admin@nomaworld.co.ke" className="text-blue-400 hover:text-blue-300 transition-colors">admin@nomaworld.co.ke</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">📞 Call Us</h4>
              <p className="text-gray-400 text-sm mb-4">Available Mon-Fri, 9am-5pm EAT</p>
              <ul className="space-y-2">
                <li><a href="tel:+254701066845" className="text-blue-400 hover:text-blue-300 transition-colors">0701066845</a></li>
                <li><a href="tel:+254702794172" className="text-blue-400 hover:text-blue-300 transition-colors">0702794172</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-10 text-center text-gray-500">
            <p className="mb-2">© {new Date().getFullYear()} NOMA — No Mask Relationships. All rights reserved.</p>
            <p className="text-sm">NOMA provides educational and guidance-based information. Not a substitute for therapy or medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
