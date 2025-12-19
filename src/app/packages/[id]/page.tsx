"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, Clock, Package } from "lucide-react";
import { MaskLogo } from "@/components/MaskLogo";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface PackageDetails {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  features: string[];
  image_url: string;
}

export default function PackageDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [packageData, setPackageData] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        setPackageData(data);
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchPackage();
    }
  }, [params.id]);

  const handleAddToBasket = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setAdding(true);
    try {
      const { data: existingItem } = await supabase
        .from('basket_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('package_id', params.id)
        .single();

      if (existingItem) {
        const { error } = await supabase
          .from('basket_items')
          .update({ 
            quantity: existingItem.quantity + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('basket_items')
          .insert({
            user_id: user.id,
            package_id: params.id,
            quantity: 1
          });

        if (error) throw error;
      }

      setTimeout(() => {
        router.push('/basket');
      }, 500);
    } catch (error) {
      console.error('Error adding to basket:', error);
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f0f1a]"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Package Not Found</h2>
          <p className="text-gray-600 mb-6">The package you're looking for doesn't exist.</p>
          <Button asChild className="bg-[#0f0f1a] hover:bg-[#0d2238] rounded-full">
            <Link href="/packages">Browse Packages</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-14 h-14 rounded-2xl bg-[#0f0f1a] flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:shadow-xl group-hover:shadow-blue-900/30 group-hover:scale-105 transition-all duration-300">
              <MaskLogo className="w-8 h-8" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0f0f1a]">NOMA</span>
          </Link>
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

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Button
            asChild
            variant="ghost"
            className="mb-8 hover:bg-[#1a1a2e]50 rounded-full"
          >
            <Link href="/packages">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-32">
                <Badge className="bg-[#1a1a2e]100 text-[#0f0f1a] hover:bg-[#1a1a2e]200 mb-6">
                  {packageData.category}
                </Badge>
                <h1 className="text-5xl font-bold text-[#0f0f1a] mb-6 leading-tight">
                  {packageData.name}
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {packageData.description}
                </p>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-[#0f0f1a]">
                      KES {packageData.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{packageData.duration}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToBasket}
                    disabled={adding}
                    className="flex-1 bg-[#FF6B6B] hover:bg-[#E55A5A] text-white shadow-lg hover:shadow-xl rounded-full h-14 text-lg font-bold"
                  >
                    {adding ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Basket
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white border-2 border-[#333333]100 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-[#0f0f1a] mb-6">
                  What's Included
                </h2>
                <div className="space-y-4">
                  {packageData.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#1a1a2e]50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#E55A5A] flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed pt-0.5">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-blue-50 to-white border-2 border-[#333333]100 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-[#0f0f1a] mb-4">
                  Why Choose This Package?
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  This package is designed for individuals and couples who want to take their relationship to the next level. 
                  With expert guidance, structured support, and proven strategies, you'll gain the clarity and tools needed 
                  to build a stronger, healthier relationship.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Join hundreds of others who have transformed their relationships through our comprehensive programs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="bg-[#0a0a0f] text-white py-12 px-6 border-t border-[#333333]">
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