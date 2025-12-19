"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Shield, Users, User, ArrowRight, CheckCircle2, Lock, Eye, FileText, Sparkles, TrendingUp, Target, Clock, Award, Zap, CheckCircle, Star, MessageCircle, ThumbsUp, BarChart3, HeartHandshake, UserCheck, Lightbulb } from "lucide-react";
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
    <div className="min-h-screen bg-[#FAF8F6] overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#C9A882] flex items-center justify-center group-hover:opacity-90 transition-opacity">
              <MaskLogo className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-light tracking-wide text-[#8B7355] text-elegant">NOMA</span>
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
        <section className="relative pt-32 pb-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="text-left"
                initial="initial"
                animate="animate"
                variants={stagger}
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
                  Experience honest clarity about your relationship through our private, anonymous assessments designed for individuals and couples.
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
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
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
        
        {/* Subtle Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8E8] to-transparent" />

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

            {/* Hero Illustration */}
            <motion.div
              variants={fadeIn}
              className="mt-20 max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden spa-shadow-large bg-white p-8">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/hero-illustration.svg"
                    alt="Relationship clarity illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
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
              <h2 className="text-3xl md:text-4xl text-elegant font-semibold mb-5 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] bg-clip-text text-transparent">
                Most Relationship Problems Start With Pretending
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] mx-auto rounded-full" />
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
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white to-[#F8F4EF] elegant-border spa-shadow-soft hover:spa-shadow-medium transition-all duration-300">
                    <div className="text-3xl flex-shrink-0">{icon}</div>
                    <p className="text-base text-[#6B7469] font-normal pt-1 leading-relaxed">{text}</p>
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
              <div className="inline-block px-8 py-4 rounded-2xl spa-gradient-primary shadow-lg">
                <p className="text-lg md:text-xl text-white font-light text-elegant">NOMA is a safe space to remove the mask.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-[#F8F4EF] to-[#FDFBF7]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl text-elegant font-semibold mb-5 text-[#3A3A3A]">
                How NOMA Works
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] mx-auto rounded-full mb-5" />
              <p className="text-lg text-[#6B7469] max-w-2xl mx-auto font-light">
                A simple, private process designed for your clarity and peace of mind
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  step: "01",
                  title: "Take the Assessment",
                  description: "Complete a thoughtful questionnaire designed by relationship experts. Choose individual or couple assessment.",
                  icon: FileText,
                  color: "#D4A373"
                },
                {
                  step: "02",
                  title: "Get Your Analysis",
                  description: "Receive an instant, comprehensive report with honest insights about your relationship dynamics.",
                  icon: BarChart3,
                  color: "#9FA89E"
                },
                {
                  step: "03",
                  title: "Take Action",
                  description: "Access personalized guidance, expert recommendations, and practical next steps for your journey.",
                  icon: Lightbulb,
                  color: "#D4A373"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-6 spa-shadow-medium hover:spa-shadow-large transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl spa-gradient-primary flex items-center justify-center mb-5 shadow-md">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-[#F8F4EF] mb-3 text-display">{item.step}</div>
                    <h3 className="text-xl font-semibold text-[#3A3A3A] mb-3 text-display">{item.title}</h3>
                    <p className="text-[#6B7469] leading-relaxed font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl text-elegant font-semibold mb-6 text-[#3A3A3A]">
                Why Choose NOMA
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] mx-auto rounded-full mb-6" />
              <p className="text-xl text-[#6B7469] max-w-2xl mx-auto font-light">
                Professional insights without judgment, accessible anytime, anywhere
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "100% Private & Anonymous",
                  description: "Your identity remains completely confidential. No registration required for basic assessment."
                },
                {
                  icon: Clock,
                  title: "Instant Results",
                  description: "Get comprehensive insights immediately after completing your assessment."
                },
                {
                  icon: UserCheck,
                  title: "Expert-Designed",
                  description: "Created by licensed relationship therapists and counselors."
                },
                {
                  icon: HeartHandshake,
                  title: "For Individuals & Couples",
                  description: "Tailored assessments whether you're reflecting alone or together."
                },
                {
                  icon: Target,
                  title: "Actionable Guidance",
                  description: "Clear, practical next steps based on your unique situation."
                },
                {
                  icon: Award,
                  title: "Trusted by Thousands",
                  description: "Join people who've found clarity and direction through NOMA."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-0 spa-shadow-soft hover:spa-shadow-medium transition-all duration-300 h-full bg-gradient-to-br from-white to-[#F8F4EF]">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl spa-gradient-sage flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#3A3A3A] mb-2 text-display">{feature.title}</h3>
                      <p className="text-[#6B7469] leading-relaxed font-light">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-[#F5E5E4] to-[#F8F4EF]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl text-elegant font-semibold mb-5 text-[#3A3A3A]">
                What People Are Saying
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] mx-auto rounded-full mb-5" />
              <p className="text-lg text-[#6B7469] max-w-2xl mx-auto font-light">
                Real experiences from people who found clarity through NOMA
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "NOMA gave me the clarity I needed. The assessment was eye-opening and helped me see patterns I was blind to.",
                  author: "Sarah M.",
                  role: "Individual Assessment",
                  rating: 5
                },
                {
                  quote: "My partner and I took the couple's assessment. It opened up conversations we'd been avoiding for months.",
                  author: "James & Lisa",
                  role: "Couple Assessment",
                  rating: 5
                },
                {
                  quote: "Anonymous, professional, and exactly what I needed. The guidance was practical and compassionate.",
                  author: "Michael K.",
                  role: "Individual Assessment",
                  rating: 5
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Card className="border-0 spa-shadow-medium hover:spa-shadow-large transition-all duration-300 h-full bg-white">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#D4A373] text-[#D4A373]" />
                        ))}
                      </div>
                      <p className="text-[#6B7469] mb-5 leading-relaxed italic font-light text-sm">"{testimonial.quote}"</p>
                      <div className="border-t border-[#E8E3DC] pt-3">
                        <p className="font-semibold text-[#3A3A3A] text-display text-sm">{testimonial.author}</p>
                        <p className="text-xs text-[#9FA89E] font-light">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "5,000+", label: "Assessments Completed", icon: Users },
                { number: "95%", label: "Found It Helpful", icon: ThumbsUp },
                { number: "4.9/5", label: "Average Rating", icon: Star },
                { number: "24/7", label: "Always Available", icon: Clock }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-xl spa-gradient-primary flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#D4A373] mb-1.5 text-display">{stat.number}</div>
                  <div className="text-[#6B7469] font-light text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl md:text-4xl text-elegant font-light mb-6 text-white">
              Clarity is better than confusion.
            </h2>
            <p className="text-lg text-white/95 mb-3 max-w-2xl mx-auto leading-relaxed font-light">
              Take the first step toward honest understanding of your relationship today.
            </p>
            <p className="text-white/85 mb-8 text-base font-light">
              100% private, anonymous, and instant results
            </p>
            <Button asChild className="bg-white text-[#D4A373] hover:bg-[#F8F4EF] shadow-xl transition-all duration-300 rounded-full px-8 py-3 font-medium">
              <Link href="/assessment">
                Start Your Check-Up
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl text-elegant font-semibold mb-5 text-[#3A3A3A]">
                Frequently Asked Questions
              </h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#9FA89E] mx-auto rounded-full mb-5" />
              <p className="text-lg text-[#6B7469] max-w-2xl mx-auto font-light">
                Everything you need to know about NOMA
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  question: "Is NOMA really anonymous?",
                  answer: "Yes, absolutely. You don't need to create an account or provide any personal information to take the basic assessment. Your responses are processed privately and securely."
                },
                {
                  question: "How long does the assessment take?",
                  answer: "Most people complete the assessment in 15-20 minutes. Take your time to answer thoughtfully - there's no rush, and you can pause and return later."
                },
                {
                  question: "Is this a replacement for therapy?",
                  answer: "No, NOMA is not therapy. We provide educational insights and guidance to help you understand your relationship better. For ongoing support, we recommend working with a licensed therapist."
                },
                {
                  question: "Can couples take the assessment together?",
                  answer: "Yes! We offer both individual and couple assessments. For couple assessments, both partners complete their part separately, and you receive a combined analysis."
                },
                {
                  question: "What happens after I complete the assessment?",
                  answer: "You'll immediately receive a comprehensive report with insights, patterns identified, and personalized recommendations. You can also access additional resources and guidance packages."
                },
                {
                  question: "Is my information secure?",
                  answer: "Absolutely. We use bank-level encryption and never sell or share your data. Your privacy and security are our top priorities."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-0 spa-shadow-soft hover:spa-shadow-medium transition-all duration-300 bg-gradient-to-br from-white to-[#F8F4EF]">
                    <CardContent className="p-5">
                      <h3 className="text-base font-semibold text-[#3A3A3A] mb-2.5 text-display flex items-start gap-2.5">
                        <MessageCircle className="w-4 h-4 text-[#D4A373] flex-shrink-0 mt-0.5" />
                        {faq.question}
                      </h3>
                      <p className="text-[#6B7469] leading-relaxed font-light pl-7 text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-[#6B7469] mb-5 font-light text-sm">
                Have more questions? We're here to help.
              </p>
              <Button asChild variant="outline" size="sm" className="elegant-border text-[#D4A373] hover:bg-[#F8F4EF] rounded-full px-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-[#3A3A3A] to-[#2A2A2A] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl spa-gradient-primary flex items-center justify-center">
                  <MaskLogo className="w-5 h-5" />
                </div>
                <span className="text-xl font-light text-elegant text-[#D4A373]">NOMA</span>
              </div>
              <p className="text-[#C7CEC4] max-w-md leading-relaxed text-sm font-light mb-5">
                Helping individuals and couples remove emotional masks and gain honest clarity about their relationships.
              </p>
              <div className="flex gap-2.5">
                {/* Social media placeholders - can be updated with actual links */}
                <a href="#" className="w-9 h-9 rounded-full bg-[#4A4A4A] hover:bg-[#D4A373] transition-colors flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#4A4A4A] hover:bg-[#D4A373] transition-colors flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#4A4A4A] hover:bg-[#D4A373] transition-colors flex items-center justify-center">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4 text-[#D4A373] text-display">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/how-it-works" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">How It Works</Link></li>
                <li><Link href="/about" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">About NOMA</Link></li>
                <li><Link href="/packages" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">Packages</Link></li>
                <li><Link href="/assessment" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">Start Assessment</Link></li>
                <li><Link href="/privacy" className="text-[#C7CEC4] hover:text-[#D4A373] transition-colors font-light">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-base mb-4 text-[#D4A373] text-display">📧 Email Us</h4>
              <p className="text-[#9FA89E] text-xs mb-3 font-light">For general inquiries and support</p>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:info@nomaworld.co.ke" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">info@nomaworld.co.ke</a></li>
                <li><a href="mailto:support@nomaworld.co.ke" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">support@nomaworld.co.ke</a></li>
                <li><a href="mailto:admin@nomaworld.co.ke" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">admin@nomaworld.co.ke</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-4 text-[#D4A373] text-display">📞 Call Us</h4>
              <p className="text-[#9FA89E] text-xs mb-3 font-light">Available Mon-Fri, 9am-5pm EAT</p>
              <ul className="space-y-2 text-sm">
                <li><a href="tel:+254701066845" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">0701066845</a></li>
                <li><a href="tel:+254702794172" className="text-[#D4A373] hover:text-[#B89968] transition-colors font-light">0702794172</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#4A4A4A] pt-6 text-center text-[#9FA89E]">
            <p className="mb-1.5 font-light text-xs">© {new Date().getFullYear()} NOMA — No Mask Relationships. All rights reserved.</p>
            <p className="text-xs font-light">NOMA provides educational and guidance-based information. Not a substitute for therapy or medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
