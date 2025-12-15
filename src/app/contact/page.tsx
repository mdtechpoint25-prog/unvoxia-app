"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Mail, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/contact" className="text-foreground font-medium">Contact</Link>
          </div>
          <Button asChild className="rounded-full">
            <Link href="/assessment">Start Check-Up</Link>
          </Button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <section className="px-6 mb-16">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions or need support? We're here to help.
            </p>
          </motion.div>
        </section>

        <section className="px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-6 mb-12">
                  <Card>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Support</h3>
                        <p className="text-muted-foreground text-sm mb-2">For general inquiries and support</p>
                        <a href="mailto:support@noma.co.ke" className="text-primary hover:underline">support@noma.co.ke</a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">WhatsApp</h3>
                        <p className="text-muted-foreground text-sm mb-2">Quick questions and follow-ups</p>
                        <p className="text-primary">Coming soon</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Response Time</h3>
                        <p className="text-muted-foreground text-sm">We typically respond within 24-48 hours during business days.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-6 bg-primary/5 rounded-2xl">
                  <h3 className="font-semibold mb-2">Before You Contact Us</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Many common questions are answered in our Help section:
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>
                      <Link href="/how-it-works" className="text-primary hover:underline">→ How does the assessment work?</Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-primary hover:underline">→ Privacy and data handling</Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-primary hover:underline">→ About NOMA and our mission</Link>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                          <Heart className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3">Thank You!</h3>
                        <p className="text-muted-foreground mb-6">
                          Your message has been received. We'll get back to you within 24-48 hours.
                        </p>
                        <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-full">
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Your Name</Label>
                              <Input 
                                id="name" 
                                placeholder="Enter your name"
                                required
                                className="rounded-lg"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input 
                                id="email" 
                                type="email"
                                placeholder="your@email.com"
                                required
                                className="rounded-lg"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="subject">Subject</Label>
                              <Input 
                                id="subject" 
                                placeholder="What's this about?"
                                required
                                className="rounded-lg"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="message">Message</Label>
                              <Textarea 
                                id="message" 
                                placeholder="Tell us how we can help..."
                                rows={5}
                                required
                                className="rounded-lg resize-none"
                              />
                            </div>
                          </div>
                          
                          <Button type="submit" className="w-full rounded-full" size="lg">
                            Send Message
                          </Button>
                          
                          <p className="text-xs text-center text-muted-foreground">
                            By submitting this form, you agree to our{" "}
                            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                          </p>
                        </form>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
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
