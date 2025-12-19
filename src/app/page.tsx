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
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F8F4EF] to-[#F5E5E4] overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#E8E3DC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl spa-gradient-primary flex items-center justify-center spa-shadow-soft group-hover:scale-105 transition-all duration-500">
              <MaskLogo className="w-7 h-7" />
            </div>
            <span className="text-2xl font-semibold tracking-tight text-[#D4A373] text-elegant">NOMA</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link href="/how-it-works" className="text-[#6B7469] hover:text-[#D4A373] transition-colors font-medium text-sm">How It Works</Link>
            <Link href="/packages" className="text-[#6B7469] hover:text-[#D4A373] transition-colors font-medium text-sm">Packages</Link>
            <Link href="/about" className="text-[#6B7469] hover:text-[#D4A373] transition-colors font-medium text-sm">About</Link>
            <Link href="/privacy" className="text-[#6B7469] hover:text-[#D4A373] transition-colors font-medium text-sm">Privacy</Link>
            <Link href="/contact" className="text-[#6B7469] hover:text-[#D4A373] transition-colors font-medium text-sm">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full hidden md:flex border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild className="spa-gradient-primary hover:opacity-90 text-white spa-shadow-medium hover:spa-shadow-large hover:scale-105 transition-all duration-500 rounded-full px-8 h-11 font-semibold text-sm">
              <Link href="/assessment">Start Assessment</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative pt-40 pb-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5E5E4]/40 via-[#F8F4EF]/60 to-[#FDFBF7]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#D4A373]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#9FA89E]/10 to-transparent rounded-full blur-3xl" />
          
          <motion.div 
            className="max-w-5xl mx-auto text-center relative z-10"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#D4A373]/30 text-[#D4A373] text-sm font-medium spa-shadow-soft">
                <Shield className="w-4 h-4" />
                100% Private & Anonymous Platform
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 leading-[1.1] text-elegant"
            >
              <span className="bg-gradient-to-r from-[#D4A373] via-[#B89968] to-[#9FA89E] bg-clip-text text-transparent">NOMA</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 text-[#6B7469] text-balance text-elegant italic"
            >
              No Mask Relationships
            </motion.p>
            
            <motion.div
              variants={fadeIn}
              className="w-24 h-1 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] mx-auto rounded-full mb-10"
            />
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-[#6B7469] mb-6 max-w-3xl mx-auto leading-relaxed font-light text-balance"
            >
              Get honest clarity about your relationship—privately, anonymously, and without judgment.
            </motion.p>
            
            <motion.p 
              variants={fadeIn}
              className="text-base text-[#9FA89E] mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              Professional relationship check-ups for individuals and couples seeking clarity, direction, and practical next steps.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
              <Button asChild size="lg" className="spa-gradient-primary hover:opacity-95 text-white spa-shadow-large hover:scale-[1.02] transition-all duration-500 rounded-full text-lg px-14 py-8 h-auto font-semibold">
                <Link href="/assessment" className="flex items-center gap-2.5">
                  Start Your Check-Up
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 elegant-border text-[#D4A373] hover:bg-[#F8F4EF] transition-all duration-500 rounded-full text-lg px-14 py-8 h-auto font-semibold">
                <Link href="/how-it-works">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-[#6B7469]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D4A373]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#D4A373]" />
                </div>
                <span className="font-medium">100% Anonymous</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#9FA89E]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#9FA89E]" />
                </div>
                <span className="font-medium">Instant Results</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#D4A373]/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-[#D4A373]" />
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
              <h2 className="text-4xl md:text-5xl text-elegant font-semibold mb-6 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] bg-clip-text text-transparent">
                Most Relationship Problems Start With Pretending
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] mx-auto rounded-full" />
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
                  <div className="flex items-start gap-5 p-8 rounded-3xl bg-gradient-to-br from-white to-[#F8F4EF] elegant-border spa-shadow-soft hover:spa-shadow-medium transition-all duration-500">
                    <div className="text-4xl flex-shrink-0">{icon}</div>
                    <p className="text-lg text-[#6B7469] font-normal pt-1 leading-relaxed">{text}</p>
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
              <div className="inline-block px-10 py-5 rounded-3xl spa-gradient-primary spa-shadow-large">
                <p className="text-2xl text-white font-light text-elegant">NOMA is a safe space to remove the mask.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-32 px-6 bg-gradient-to-br from-[#D4A373] via-[#B89968] to-[#9FA89E] overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl text-elegant font-light mb-8 text-white">
              Clarity is better than confusion.
            </h2>
            <p className="text-xl text-white/95 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
              Take the first step toward honest understanding of your relationship today.
            </p>
            <p className="text-white/85 mb-10 text-lg font-light">
              100% private, anonymous, and instant results
            </p>
            <Button asChild size="lg" className="bg-white text-[#D4A373] hover:bg-[#F8F4EF] spa-shadow-large transition-all duration-500 rounded-full text-lg px-14 py-8 h-auto font-semibold">
              <Link href="/assessment">
                Start Your Check-Up
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-[#3A3A3A] to-[#2A2A2A] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl spa-gradient-primary flex items-center justify-center spa-shadow-soft">
                  <MaskLogo className="w-6 h-6" />
                </div>
                <span className="text-2xl font-light text-elegant text-[#D4A373]">NOMA</span>
              </div>
              <p className="text-[#C7CEC4] max-w-md leading-relaxed text-base font-light">
                Helping individuals and couples remove emotional masks and gain honest clarity about their relationships.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-lg mb-6 text-[#D4A373] text-display">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/how-it-works" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">How It Works</Link></li>
                <li><Link href="/about" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">About NOMA</Link></li>
                <li><Link href="/assessment" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">Start Assessment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-6 text-[#D4A373] text-display">📧 Email Us</h4>
              <p className="text-[#9FA89E] text-sm mb-4 font-light">For general inquiries and support</p>
              <ul className="space-y-2">
                <li><a href="mailto:info@nomaworld.co.ke" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">info@nomaworld.co.ke</a></li>
                <li><a href="mailto:support@nomaworld.co.ke" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">support@nomaworld.co.ke</a></li>
                <li><a href="mailto:admin@nomaworld.co.ke" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">admin@nomaworld.co.ke</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-lg mb-6 text-[#D4A373] text-display">📞 Call Us</h4>
              <p className="text-[#9FA89E] text-sm mb-4 font-light">Available Mon-Fri, 9am-5pm EAT</p>
              <ul className="space-y-2">
                <li><a href="tel:+254701066845" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">0701066845</a></li>
                <li><a href="tel:+254702794172" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">0702794172</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#4A4A4A] pt-10 text-center text-[#9FA89E]">
            <p className="mb-2 font-light">© {new Date().getFullYear()} NOMA — No Mask Relationships. All rights reserved.</p>
            <p className="text-sm font-light">NOMA provides educational and guidance-based information. Not a substitute for therapy or medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
