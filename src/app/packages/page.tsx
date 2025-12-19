"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Filter, Package, ArrowRight, Check } from "lucide-react";
import { MaskLogo } from "@/components/MaskLogo";
import { supabase } from "@/lib/supabase";

interface Package {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  features: string[];
  image_url: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPackages(data || []);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const categories = ["All", ...Array.from(new Set(packages.map(pkg => pkg.category)))];
  const filteredPackages = selectedCategory === "All" 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f1a]/95 backdrop-blur-sm border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ffbe0b] flex items-center justify-center">
              <MaskLogo className="w-5 h-5 text-[#0f0f1a]" />
            </div>
            <span className="text-xl font-light tracking-wide text-white" style={{ fontFamily: 'Georgia, serif' }}>NOMA</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[#cccccc] hover:text-[#ffbe0b] transition-colors text-sm">How It Works</Link>
            <Link href="/packages" className="text-[#ffbe0b] font-medium text-sm">Packages</Link>
            <Link href="/about" className="text-[#cccccc] hover:text-[#ffbe0b] transition-colors text-sm">About</Link>
            <Link href="/contact" className="text-[#cccccc] hover:text-[#ffbe0b] transition-colors text-sm">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-[#cccccc] hover:text-[#ffbe0b] hover:bg-transparent text-sm font-normal">
              <Link href="/basket">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Basket
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-[#ffbe0b] hover:bg-[#e6a200] text-[#000000] shadow-lg hover:shadow-xl transition-all duration-300 rounded-md px-6 py-2 text-sm font-semibold">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        <section className="px-6 mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffbe0b]/10 border border-[#ffbe0b]/30 text-[#ffbe0b] text-sm font-semibold mb-6">
                <Package className="w-4 h-4" />
                Browse Our Services
              </div>
              <h1 className="text-5xl md:text-6xl font-light mb-6 text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Relationship Growth Packages
              </h1>
              <p className="text-xl text-[#cccccc] max-w-3xl mx-auto">
                Choose from our curated packages designed to support your relationship journey at every stage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 flex-wrap mb-12"
            >
              <Filter className="w-5 h-5 text-[#cccccc]" />
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#ffbe0b] hover:bg-[#e6a200] text-[#000000] shadow-lg"
                      : "border-2 border-[#333333] text-[#cccccc] hover:border-[#ffbe0b] hover:text-[#ffbe0b] bg-transparent"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffbe0b]"></div>
                <p className="mt-4 text-[#cccccc]">Loading packages...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col border-2 border-[#333333] bg-[#1a1a2e] hover:border-[#ffbe0b] hover:shadow-2xl hover:shadow-[#ffbe0b]/20 transition-all duration-300 rounded-lg overflow-hidden group">
                      <CardHeader className="pb-4">
                        <div className="mb-4">
                          <Badge className="bg-[#ffbe0b]/10 text-[#ffbe0b] border border-[#ffbe0b]/30 hover:bg-[#ffbe0b]/20">
                            {pkg.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl font-light text-white group-hover:text-[#ffbe0b] transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                          {pkg.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow pb-6">
                        <p className="text-[#cccccc] mb-6 leading-relaxed text-sm">
                          {pkg.description}
                        </p>
                        <div className="mb-6">
                          <div className="text-3xl font-light text-[#ffbe0b] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                            KES {pkg.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-[#a0a0a0]">{pkg.duration}</div>
                        </div>
                        <div className="space-y-3">
                          {pkg.features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-[#ffbe0b] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-[#cccccc]">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pb-6 px-6 flex gap-3">
                        <Button asChild className="flex-1 bg-[#ffbe0b] hover:bg-[#e6a200] text-[#000000] rounded-md shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                          <Link href={`/packages/${pkg.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-2 border-[#333333] text-[#ffbe0b] hover:bg-[#ffbe0b] hover:text-[#000000] hover:border-[#ffbe0b] rounded-md transition-all duration-300"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && filteredPackages.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-[#333333] mx-auto mb-4" />
                <p className="text-xl text-[#cccccc]">No packages found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-[#0f0f1a] text-white py-12 px-6 border-t border-[#333333]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#ffbe0b] flex items-center justify-center">
              <MaskLogo className="w-5 h-5 text-[#0f0f1a]" />
            </div>
            <span className="text-lg font-light text-white" style={{ fontFamily: 'Georgia, serif' }}>NOMA</span>
          </div>
          <p className="text-[#a0a0a0] text-sm">© {new Date().getFullYear()} NOMA — No Mask Relationships. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
