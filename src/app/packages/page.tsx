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
    <div className="min-h-screen bg-white">
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
            <Link href="/packages" className="text-[#1A3C63] font-bold text-sm border-b-2 border-[#1A3C63]">Packages</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#1A3C63] transition-colors font-medium text-sm">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#1A3C63] transition-colors font-medium text-sm">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/basket">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Basket
              </Link>
            </Button>
            <Button asChild className="bg-[#FF6B6B] hover:bg-[#E55A5A] text-white shadow-lg rounded-full">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#1A3C63] text-sm font-bold mb-6">
                <Package className="w-4 h-4" />
                Browse Our Services
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#1A3C63]">
                Relationship Growth Packages
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our curated packages designed to support your relationship journey at every stage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3 flex-wrap mb-12"
            >
              <Filter className="w-5 h-5 text-gray-500" />
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`rounded-full ${
                    selectedCategory === category
                      ? "bg-[#1A3C63] text-white"
                      : "border-gray-300 text-gray-700 hover:border-[#1A3C63]"
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
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3C63]"></div>
                <p className="mt-4 text-gray-600">Loading packages...</p>
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
                    <Card className="h-full flex flex-col border-2 border-blue-100 hover:border-[#1A3C63] hover:shadow-xl transition-all rounded-3xl overflow-hidden group">
                      <CardHeader className="pb-4">
                        <div className="mb-4">
                          <Badge className="bg-blue-100 text-[#1A3C63] hover:bg-blue-200">
                            {pkg.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl font-bold text-[#1A3C63] group-hover:text-[#FF6B6B] transition-colors">
                          {pkg.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow pb-6">
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {pkg.description}
                        </p>
                        <div className="mb-6">
                          <div className="text-3xl font-bold text-[#1A3C63] mb-1">
                            KES {pkg.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">{pkg.duration}</div>
                        </div>
                        <div className="space-y-3">
                          {pkg.features.slice(0, 4).map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pb-6 px-6 flex gap-3">
                        <Button asChild className="flex-1 bg-[#1A3C63] hover:bg-[#0d2238] text-white rounded-full">
                          <Link href={`/packages/${pkg.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white rounded-full"
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
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600">No packages found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl">
              <MaskLogo className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">NOMA</span>
          </div>
          <p className="text-gray-400 mb-8">© {new Date().getFullYear()} NOMA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
