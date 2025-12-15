"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, CheckCircle2, FileText, BarChart3, Target, Clock, Shield, AlertCircle } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">NOMA</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-foreground font-medium">How It Works</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <Button asChild className="rounded-full">
            <Link href="/assessment">Start Check-Up</Link>
          </Button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <section className="px-6 mb-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              How NOMA Works
            </h1>
            <p className="text-xl text-muted-foreground">
              A simple, private process to gain clarity about your relationship in four straightforward steps.
            </p>
          </motion.div>
        </section>

        <section className="px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {[
                {
                  step: "1",
                  title: "Choose Your Path",
                  desc: "Select whether you're taking the assessment as an individual or as a couple. Both paths provide valuable insights tailored to your situation.",
                  icon: Target,
                  details: [
                    "Individual: Understand your relationship from your perspective",
                    "Couple: Both partners complete the assessment together",
                    "No account required — completely anonymous"
                  ]
                },
                {
                  step: "2",
                  title: "Answer Honest Questions",
                  desc: "Complete a structured questionnaire covering key areas of relationship health. Questions are designed to be thought-provoking but non-judgmental.",
                  icon: FileText,
                  details: [
                    "Questions cover communication, trust, emotional connection",
                    "Takes approximately 15-20 minutes to complete",
                    "Your answers remain private and secure"
                  ]
                },
                {
                  step: "3",
                  title: "Receive Your Relationship Health Score",
                  desc: "Get a comprehensive breakdown of your relationship's strengths and areas that need attention based on your responses.",
                  icon: BarChart3,
                  details: [
                    "Score across multiple relationship dimensions",
                    "Clear visualization of strengths and concerns",
                    "Honest insights without judgment or shame"
                  ]
                },
                {
                  step: "4",
                  title: "Get Your Personalized Action Plan",
                  desc: "Receive practical, actionable guidance tailored to your specific situation that you can implement immediately.",
                  icon: CheckCircle2,
                  details: [
                    "Specific recommendations for your situation",
                    "Resources for further support if needed",
                    "Clear next steps to move forward"
                  ]
                }
              ].map(({ step, title, desc, icon: Icon, details }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="bg-primary/5 p-8 flex items-center justify-center md:w-48">
                          <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-semibold">
                            {step}
                          </div>
                        </div>
                        <div className="p-8 flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Icon className="w-6 h-6 text-primary" />
                            <h3 className="text-2xl font-semibold">{title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-4">{desc}</p>
                          <ul className="space-y-2">
                            {details.map((detail, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 bg-card mb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                What the Assessment Covers
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Communication", desc: "How well you express and receive thoughts and feelings" },
                { title: "Trust & Honesty", desc: "The foundation of security in your relationship" },
                { title: "Emotional Connection", desc: "The depth of your emotional bond and intimacy" },
                { title: "Conflict Resolution", desc: "How you handle disagreements and challenges" },
                { title: "Commitment & Alignment", desc: "Shared goals and vision for the future" },
                { title: "Support & Care", desc: "How you show up for each other daily" }
              ].map(({ title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-background border border-border"
                >
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                What to Expect
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <Clock className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Time Investment</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Individual assessment: ~15 minutes</li>
                    <li>• Couple assessment: ~20-25 minutes</li>
                    <li>• Results delivered immediately</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <Shield className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Your Privacy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• No account creation required</li>
                    <li>• Anonymous assessment option</li>
                    <li>• Secure data handling</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-6 mb-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-amber-900">Important Disclaimer</h3>
                      <ul className="space-y-2 text-amber-800">
                        <li>• NOMA provides educational and guidance-based information</li>
                        <li>• Not a substitute for professional therapy or medical advice</li>
                        <li>• Users are responsible for their own decisions</li>
                        <li>• If you're in an emergency situation, please seek professional help immediately</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Begin?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward clarity and understanding.
            </p>
            <Button asChild size="lg" className="rounded-full text-lg px-8 py-6 h-auto">
              <Link href="/assessment">
                Start Your Check-Up Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
              <Heart className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-semibold">NOMA</span>
          </div>
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} NOMA — No Mask Relationships. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
