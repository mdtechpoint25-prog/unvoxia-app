"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, Eye, Shield, Compass, HandHeart } from "lucide-react";

export default function About() {
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
            <Link href="/about" className="text-foreground font-medium">About</Link>
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
              About NOMA
            </h1>
            <p className="text-xl text-muted-foreground">
              NOMA was created to help people face relationship truth safely, honestly, and constructively.
            </p>
          </motion.div>
        </section>

        <section className="px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <Card>
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-6 text-lg text-muted-foreground">
                    <p>
                      <span className="text-foreground font-medium">Everyone wears masks.</span> In relationships, we learn to hide parts of ourselves — our fears, doubts, frustrations, and unmet needs. We do this to keep peace, avoid conflict, or protect ourselves from vulnerability.
                    </p>
                    <p>
                      But these masks come at a cost. They create distance. They breed confusion. They turn small problems into big ones because we never address what's really happening beneath the surface.
                    </p>
                    <p>
                      <span className="text-foreground font-medium">NOMA — No Mask Relationships — exists to change this.</span>
                    </p>
                    <p>
                      We believe that healthy relationships begin when people stop pretending. When they have the courage to see their relationship clearly, acknowledge what's working and what isn't, and take meaningful steps forward.
                    </p>
                    <p>
                      But we also understand that removing the mask is hard. It requires a safe space — free from judgment, shame, or pressure. That's exactly what NOMA provides.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
                Our Core Beliefs
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Clarity Over Confusion",
                  desc: "Understanding the true state of your relationship is the first step to healing or growing. You can't fix what you can't see."
                },
                {
                  icon: Shield,
                  title: "Safety Without Judgment",
                  desc: "Everyone deserves a space to be honest without fear of shame or criticism. NOMA never judges — we guide."
                },
                {
                  icon: Compass,
                  title: "Direction Over Diagnosis",
                  desc: "We don't diagnose problems or tell you what to do. We provide insights and options so you can decide your own path."
                },
                {
                  icon: HandHeart,
                  title: "Privacy Is Sacred",
                  desc: "Relationship struggles are deeply personal. Your information stays private, always. You control what happens with your insights."
                }
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{title}</h3>
                      <p className="text-muted-foreground">{desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 mb-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-serif font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                What NOMA Is — and Isn't
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-primary/30">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">NOMA Is</h3>
                  <ul className="space-y-3">
                    {[
                      "A private relationship wellness tool",
                      "A safe space for honest self-reflection",
                      "A guide to clarity and next steps",
                      "Anonymous and judgment-free",
                      "Accessible and affordable"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-muted">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-muted-foreground mb-4">NOMA Is Not</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "A replacement for professional therapy",
                      "A diagnostic tool or medical advice",
                      "A place for judgment or shame",
                      "Public relationship advice",
                      "A quick fix for serious problems"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>×</span>
                        <span>{item}</span>
                      </li>
                    ))}
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
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Our Vision
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    NOMA aims to become Africa's leading relationship wellness platform — a trusted brand for honesty and clarity, bridging the gap between confusion and counseling, and helping people before relationships break.
                  </p>
                  <p className="text-primary font-medium">
                    Because healthy relationships build healthy communities.
                  </p>
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
              Ready to Remove the Mask?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Take the first step toward honest clarity about your relationship.
            </p>
            <Button asChild size="lg" className="rounded-full text-lg px-8 py-6 h-auto">
              <Link href="/assessment">
                Start Your Check-Up
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
