"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from "lucide-react";
import { MaskLogo } from "@/components/MaskLogo";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface BasketItem {
  id: string;
  package_id: string;
  quantity: number;
  package: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: string;
  };
}

export default function BasketPage() {
  const { user } = useAuth();
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBasketItems();
    } else {
      setLoading(false);
    }
  }, [user]);

  async function fetchBasketItems() {
    try {
      const { data, error } = await supabase
        .from('basket_items')
        .select(`
          id,
          package_id,
          quantity,
          package:packages (
            id,
            name,
            description,
            category,
            price,
            duration
          )
        `)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      const formattedItems = data?.map((item: any) => ({
        id: item.id,
        package_id: item.package_id,
        quantity: item.quantity,
        package: {
          id: item.package.id,
          name: item.package.name,
          description: item.package.description,
          category: item.package.category,
          price: parseFloat(item.package.price),
          duration: item.package.duration
        }
      })) || [];
      
      setBasketItems(formattedItems);
    } catch (error) {
      console.error('Error fetching basket:', error);
    } finally {
      setLoading(false);
    }
  }

  const updateQuantity = async (id: string, delta: number) => {
    const item = basketItems.find(i => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    
    try {
      const { error } = await supabase
        .from('basket_items')
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setBasketItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('basket_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBasketItems(items => items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const subtotal = basketItems.reduce(
    (sum, item) => sum + item.package.price * item.quantity,
    0
  );
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  if (!user) {
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
          </div>
        </nav>
        
        <main className="pt-32 pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#1A3C63] mb-6">Please Log In</h1>
            <p className="text-gray-600 mb-8">You need to be logged in to view your basket.</p>
            <Button asChild className="bg-[#FF6B6B] hover:bg-[#E55A5A] rounded-full px-8">
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/packages">Browse Packages</Link>
            </Button>
            <Button asChild className="bg-[#FF6B6B] hover:bg-[#E55A5A] text-white shadow-lg rounded-full">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-[#1A3C63]" />
              <h1 className="text-5xl font-bold text-[#1A3C63]">Your Basket</h1>
            </div>
            <p className="text-gray-600">
              Review your selected packages before checking out
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3C63]"></div>
              <p className="mt-4 text-gray-600">Loading your basket...</p>
            </div>
          ) : basketItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your basket is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add packages to get started on your relationship journey
              </p>
              <Button asChild className="bg-[#1A3C63] hover:bg-[#0d2238] rounded-full px-8">
                <Link href="/packages">Browse Packages</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {basketItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-blue-100 hover:border-[#1A3C63] transition-all rounded-3xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-[#1A3C63] mb-2">
                              {item.package.name}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {item.package.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">
                                {item.package.category} • {item.package.duration}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-[#1A3C63]">
                                KES {(item.package.price * item.quantity).toLocaleString()}
                              </div>
                              <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="h-8 w-8 rounded-full hover:bg-blue-100"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-semibold">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="h-8 w-8 rounded-full hover:bg-blue-100"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="sticky top-32"
                >
                  <Card className="border-2 border-blue-100 rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-[#1A3C63] mb-6">
                        Order Summary
                      </h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span className="font-semibold">
                            KES {subtotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Tax (16%)</span>
                          <span className="font-semibold">
                            KES {tax.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t-2 border-blue-100 pt-4">
                          <div className="flex justify-between text-xl font-bold text-[#1A3C63]">
                            <span>Total</span>
                            <span>KES {total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-[#FF6B6B] hover:bg-[#E55A5A] text-white shadow-lg hover:shadow-xl rounded-full h-14 text-lg font-bold"
                      >
                        <Link href="/checkout">
                          Proceed to Checkout
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full mt-3 rounded-full border-2 border-gray-300"
                      >
                        <Link href="/packages">Continue Shopping</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}
        </div>
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