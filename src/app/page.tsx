"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Shield, Users, CheckCircle, Star, Clock } from "lucide-react";
import { MaskLogo } from "@/components/MaskLogo";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C9A882] flex items-center justify-center">
              <MaskLogo className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-light tracking-wide text-[#8B7355]" style={{ fontFamily: 'Georgia, serif' }}>NOMA</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[#7A7A7A] hover:text-[#C9A882] transition-colors text-sm">How It Works</Link>
            <Link href="/packages" className="text-[#7A7A7A] hover:text-[#C9A882] transition-colors text-sm">Packages</Link>
            <Link href="/about" className="text-[#7A7A7A] hover:text-[#C9A882] transition-colors text-sm">About</Link>
            <Link href="/contact" className="text-[#7A7A7A] hover:text-[#C9A882] transition-colors text-sm">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-[#7A7A7A] hover:text-[#C9A882] hover:bg-transparent text-sm font-normal">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#C9A882] hover:bg-[#B89770] text-white shadow-sm rounded-md px-5 text-sm font-normal">
              <Link href="/assessment">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                initial="initial"
                animate="animate"
                variants={{
                  animate: { transition: { staggerChildren: 0.1 } }
                }}
              >
                <motion.h1 
                  variants={fadeIn}
                  className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 leading-tight text-[#5A5A5A]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Revitalize Your Relationship,<br />
                  <span className="text-[#C9A882]">Revitalize Your Connection</span>
                </motion.h1>
                
                <motion.p 
                  variants={fadeIn}
                  className="text-base md:text-lg text-[#7A7A7A] mb-8 leading-relaxed max-w-lg"
                >
                  Experience honest clarity about your relationship through our private, anonymous assessments designed for individuals and couples seeking deeper understanding.
                </motion.p>
                
                <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                  <Button asChild className="bg-[#C9A882] hover:bg-[#B89770] text-white shadow-sm rounded-md px-8 py-6 h-auto text-base font-normal">
                    <Link href="/assessment">
                      Start Your Assessment
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border border-[#D4D4D4] text-[#7A7A7A] hover:bg-[#F5F5F5] rounded-md px-8 py-6 h-auto text-base font-normal">
                    <Link href="/how-it-works">
                      Learn More
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Right Image */}
              <motion.div 
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
              >
                <Image
                  src="/hero-illustration.svg"
                  alt="Relationship clarity"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8E8] to-transparent" />

        {/* Services Section */}
        <section className="relative py-20 px-6 bg-[#FAF8F6]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-[#5A5A5A] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Relationship Assessment Services
              </h2>
              <p className="text-base text-[#7A7A7A] max-w-2xl mx-auto">
                Private, professional guidance for individuals and couples seeking clarity and deeper connection
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Individual Assessment",
                  description: "Personal insights into your relationship patterns, needs, and authentic desires for connection."
                },
                {
                  icon: Users,
                  title: "Couple Assessment",
                  description: "Joint evaluation to understand dynamics, communication patterns, and paths to deeper intimacy."
                },
                {
                  icon: Shield,
                  title: "Private & Anonymous",
                  description: "Complete confidentiality with secure, anonymous results delivered instantly to your inbox."
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#F5EFE7] flex items-center justify-center">
                        <service.icon className="w-8 h-8 text-[#C9A882]" />
                      </div>
                      <h3 className="text-lg font-medium text-[#5A5A5A] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#7A7A7A] leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Floral Image Section */}
        <section className="relative h-[300px] overflow-hidden">
          <Image
            src="/wellness-illustration.svg"
            alt="Wellness background"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center px-6"
            >
              <h2 className="text-3xl md:text-4xl font-light text-[#5A5A5A] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Your Clarity Journey<br />Starts Here
              </h2>
              <p className="text-base text-[#7A7A7A] max-w-xl mx-auto">
                Begin your path to authentic connection and deeper understanding
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-[#5A5A5A] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                How It Works
              </h2>
              <p className="text-base text-[#7A7A7A] max-w-2xl mx-auto">
                A simple, three-step process to gain clarity about your relationship
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Take Assessment",
                  description: "Complete our thoughtfully designed questionnaire at your own pace, in complete privacy."
                },
                {
                  number: "02",
                  title: "Receive Insights",
                  description: "Get instant, comprehensive analysis with honest insights tailored to your situation."
                },
                {
                  number: "03",
                  title: "Move Forward",
                  description: "Access personalized guidance and practical recommendations for your next steps."
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-light text-[#E8DFD3] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    {step.number}
                  </div>
                  <h3 className="text-lg font-medium text-[#5A5A5A] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#7A7A7A] leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 px-6 bg-[#FAF8F6]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "5,000+", label: "Assessments Completed" },
                { number: "95%", label: "Found It Helpful" },
                { number: "4.9/5", label: "Average Rating" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl font-light text-[#C9A882] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#7A7A7A]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-[#5A5A5A] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Ready to Begin Your Journey?
              </h2>
              <p className="text-base text-[#7A7A7A] mb-8 max-w-2xl mx-auto">
                Take the first step toward authentic connection and deeper understanding today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-[#C9A882] hover:bg-[#B89770] text-white shadow-sm rounded-md px-8 py-6 h-auto text-base font-normal">
                  <Link href="/assessment">
                    Start Your Assessment
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border border-[#D4D4D4] text-[#7A7A7A] hover:bg-[#F5F5F5] rounded-md px-8 py-6 h-auto text-base font-normal">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#3A3A3A] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#C9A882] flex items-center justify-center">
                  <MaskLogo className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-light text-[#C9A882]" style={{ fontFamily: 'Georgia, serif' }}>NOMA</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                No Mask Relationships. Helping individuals and couples find authentic connection through honest clarity.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-4 text-[#C9A882]">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-it-works" className="text-gray-400 hover:text-[#C9A882] transition-colors">How It Works</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-[#C9A882] transition-colors">About Us</Link></li>
                <li><Link href="/packages" className="text-gray-400 hover:text-[#C9A882] transition-colors">Packages</Link></li>
                <li><Link href="/assessment" className="text-gray-400 hover:text-[#C9A882] transition-colors">Start Assessment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-sm mb-4 text-[#C9A882]">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@nomaworld.co.ke</li>
                <li>support@nomaworld.co.ke</li>
                <li>0701066845</li>
                <li>0702794172</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-4 text-[#C9A882]">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-[#C9A882] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-[#C9A882] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} NOMA — No Mask Relationships. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
