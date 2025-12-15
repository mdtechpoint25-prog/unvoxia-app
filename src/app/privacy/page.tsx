"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, Shield, Lock, Eye, AlertTriangle, Phone } from "lucide-react";

export default function Privacy() {
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
            <Link href="/privacy" className="text-foreground font-medium">Privacy</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
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
              Privacy & Disclaimer
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy and safety are our top priorities. Please read this information carefully.
            </p>
          </motion.div>
        </section>

        <section className="px-6 mb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Information We Collect</h3>
                      <p className="text-muted-foreground">
                        NOMA collects only the information necessary to provide our relationship assessment service. This includes your assessment responses and, if you choose to provide it, your email address for result delivery.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">How We Use Your Information</h3>
                      <ul className="text-muted-foreground space-y-2">
                        <li>• To generate your relationship health score and insights</li>
                        <li>• To create your personalized action plan</li>
                        <li>• To deliver results to you (via email if provided)</li>
                        <li>• To improve our assessment tools and services</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">What We Don't Do</h3>
                      <ul className="text-muted-foreground space-y-2">
                        <li>• We never share your responses with third parties</li>
                        <li>• We never post or publish your information publicly</li>
                        <li>• We never sell your data to anyone</li>
                        <li>• We never contact you without your permission</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Data Security</h3>
                      <p className="text-muted-foreground">
                        Your data is stored securely using industry-standard encryption. We use secure connections (SSL/TLS) to protect data in transit. Access to your information is strictly limited to essential personnel.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Your Rights</h3>
                      <p className="text-muted-foreground">
                        You can request deletion of your data at any time by contacting us. You control what happens with your assessment results. You can choose to remain completely anonymous.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="px-6 mb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-amber-900">Important Disclaimer</h2>
                  </div>
                  
                  <div className="space-y-4 text-amber-800">
                    <p className="font-medium">
                      Please read and understand the following before using NOMA:
                    </p>
                    
                    <div className="space-y-3">
                      <p>
                        <strong>Educational Purpose:</strong> NOMA provides educational and guidance-based information only. Our assessments and recommendations are designed to help you gain clarity and insight, not to diagnose conditions or prescribe treatments.
                      </p>
                      
                      <p>
                        <strong>Not Professional Therapy:</strong> NOMA is not a substitute for professional therapy, counseling, or medical advice. If you're experiencing serious relationship difficulties, mental health challenges, or crisis situations, please consult a qualified professional.
                      </p>
                      
                      <p>
                        <strong>Personal Responsibility:</strong> You are responsible for your own decisions and actions based on the insights you receive. NOMA provides guidance, but the choices you make are your own.
                      </p>
                      
                      <p>
                        <strong>No Guarantees:</strong> While our assessments are thoughtfully designed, we cannot guarantee specific outcomes or that our insights will apply perfectly to your unique situation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="px-6 mb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-red-200 bg-red-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-red-900">Emergency Situations</h2>
                  </div>
                  
                  <div className="space-y-4 text-red-800">
                    <p className="font-medium">
                      If you or someone you know is in immediate danger:
                    </p>
                    
                    <ul className="space-y-2">
                      <li>• Contact your local emergency services immediately</li>
                      <li>• Reach out to a domestic violence hotline in your area</li>
                      <li>• Contact a mental health crisis line if experiencing thoughts of self-harm</li>
                      <li>• Go to your nearest hospital emergency room</li>
                    </ul>
                    
                    <p className="font-medium mt-4">
                      NOMA is not equipped to handle emergency situations. Please seek professional help immediately if you're in crisis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="px-6 mb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">Terms of Use</h2>
                  </div>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      By using NOMA, you agree to:
                    </p>
                    
                    <ul className="space-y-2">
                      <li>• Use our services for personal, non-commercial purposes only</li>
                      <li>• Provide honest responses to get accurate insights</li>
                      <li>• Understand that results are for guidance, not diagnosis</li>
                      <li>• Take responsibility for decisions based on your results</li>
                      <li>• Respect the privacy of others if completing a couple assessment</li>
                      <li>• Seek professional help for serious concerns</li>
                    </ul>
                    
                    <p className="mt-4">
                      We reserve the right to update these terms at any time. Continued use of NOMA after changes constitutes acceptance of the new terms.
                    </p>
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
            <p className="text-muted-foreground mb-8">
              By proceeding with NOMA's assessment, you acknowledge that you have read and understood this Privacy Policy and Disclaimer.
            </p>
            <Button asChild size="lg" className="rounded-full text-lg px-8 py-6 h-auto">
              <Link href="/assessment">
                I Understand — Start My Check-Up
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
