"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Link from "next/link";
import { Package, TrendingUp, FileText, BookOpen, User, ShoppingCart, Award, Clock, LogOut } from "lucide-react";
import { MaskLogo } from "@/components/MaskLogo";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_method: string;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    price: number;
    package: {
      id: string;
      name: string;
      category: string;
    };
  }[];
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchUserData();
    }
  }, [user, loading, router]);

  async function fetchUserData() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total_amount,
          status,
          payment_method,
          created_at,
          order_items (
            id,
            quantity,
            price,
            package:packages (
              id,
              name,
              category
            )
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedOrders = data?.map((order: any) => ({
        id: order.id,
        total_amount: parseFloat(order.total_amount),
        status: order.status,
        payment_method: order.payment_method,
        created_at: order.created_at,
        order_items: order.order_items.map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price),
          package: item.package
        }))
      })) || [];

      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setDataLoading(false);
    }
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#1A3C63] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <MaskLogo className="w-8 h-8" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;

  const allPackages = orders.flatMap(order => 
    order.order_items.map(item => item.package)
  );

  const mockResources = [
    { title: 'Effective Communication Guide', type: 'PDF', url: '#' },
    { title: 'Conflict Resolution Techniques', type: 'Video', url: '#' },
    { title: 'Building Trust Workbook', type: 'PDF', url: '#' }
  ];

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
              <Link href="/packages">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Browse
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/basket">Basket</Link>
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="rounded-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A3C63] to-[#0d2238] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-[#1A3C63]">My Dashboard</h1>
                <p className="text-gray-600">Track your progress and access your resources</p>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2 border-blue-100 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#1A3C63]" />
                    </div>
                    <span className="text-3xl font-bold text-[#1A3C63]">{totalOrders}</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Total Orders</h3>
                  <p className="text-sm text-gray-600">All purchases</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-blue-100 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#FF6B6B]" />
                    </div>
                    <span className="text-3xl font-bold text-[#1A3C63]">{allPackages.length}</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Services Purchased</h3>
                  <p className="text-sm text-gray-600">Unique packages</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-blue-100 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Award className="w-6 h-6 text-[#1A3C63]" />
                    </div>
                    <span className="text-3xl font-bold text-[#1A3C63]">{completedOrders}</span>
                  </div>
                  <h3 className="font-bold text-gray-800">Completed</h3>
                  <p className="text-sm text-gray-600">Total achievements</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs defaultValue="services" className="space-y-8">
            <TabsList className="bg-blue-50 p-1 rounded-full">
              <TabsTrigger value="services" className="rounded-full data-[state=active]:bg-white">
                My Orders
              </TabsTrigger>
              <TabsTrigger value="progress" className="rounded-full data-[state=active]:bg-white">
                Progress
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-full data-[state=active]:bg-white">
                Resources
              </TabsTrigger>
            </TabsList>

            <TabsContent value="services" className="space-y-6">
              {orders.length === 0 ? (
                <Card className="border-2 border-blue-100 rounded-3xl">
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">Start your journey by browsing our packages</p>
                    <Button asChild className="bg-[#FF6B6B] hover:bg-[#E55A5A] rounded-full px-8">
                      <Link href="/packages">Browse Packages</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-blue-100 hover:border-[#1A3C63] transition-all rounded-3xl">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-2xl text-[#1A3C63] mb-2">
                              Order #{order.id.substring(0, 8)}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1A3C63] font-semibold capitalize">
                                {order.status}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(order.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#1A3C63]">
                              KES {order.total_amount.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">{order.payment_method}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800">Items:</h4>
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                              <div>
                                <p className="font-medium text-gray-800">{item.package.name}</p>
                                <p className="text-sm text-gray-600">{item.package.category} × {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-[#1A3C63]">
                                KES {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card className="border-2 border-blue-100 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#1A3C63]">Your Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="h-64 flex items-center justify-center bg-blue-50 rounded-2xl">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-[#1A3C63] mx-auto mb-4" />
                      <p className="text-gray-600">Progress chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {mockResources.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-blue-100 hover:border-[#1A3C63] transition-all rounded-3xl group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                            {resource.type === 'PDF' ? (
                              <FileText className="w-6 h-6 text-[#1A3C63]" />
                            ) : (
                              <BookOpen className="w-6 h-6 text-[#1A3C63]" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#1A3C63] transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-600">{resource.type}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-xl">
                  <MaskLogo className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">NOMA</span>
              </div>
              <p className="text-gray-400">No Mask Relationships</p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4">📧 Email Us</h3>
              <p className="text-gray-400 text-sm mb-2">For general inquiries and support</p>
              <div className="space-y-2">
                <p><a href="mailto:info@nomaworld.co.ke" className="text-blue-400 hover:text-blue-300 transition-colors">info@nomaworld.co.ke</a></p>
                <p><a href="mailto:support@nomaworld.co.ke" className="text-blue-400 hover:text-blue-300 transition-colors">support@nomaworld.co.ke</a></p>
                <p><a href="mailto:admin@nomaworld.co.ke" className="text-blue-400 hover:text-blue-300 transition-colors">admin@nomaworld.co.ke</a></p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4">📞 Call Us</h3>
              <p className="text-gray-400 text-sm mb-2">Available Mon-Fri, 9am-5pm EAT</p>
              <div className="space-y-2">
                <p><a href="tel:+254701066845" className="text-blue-400 hover:text-blue-300 transition-colors">0701066845</a></p>
                <p><a href="tel:+254702794172" className="text-blue-400 hover:text-blue-300 transition-colors">0702794172</a></p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">© {new Date().getFullYear()} NOMA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}