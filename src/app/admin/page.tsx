"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Users, FileText, Quote, DollarSign, TrendingUp, Activity, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activePackages: 0,
    publishedBlogs: 0,
    activeQuotes: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const cards = [
    {
      title: "Packages",
      value: stats.activePackages,
      icon: Package,
      color: "bg-[#1a1a2e]500",
      href: "/admin/packages",
      description: "Manage pricing & packages"
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-green-500",
      href: "/admin/users",
      description: "Monitor user progress"
    },
    {
      title: "Revenue",
      value: `KES ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-orange-500",
      href: "/admin/payments",
      description: "Payment tracking"
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: TrendingUp,
      color: "bg-purple-500",
      href: "/admin/payments",
      description: "Order management"
    },
    {
      title: "Blog Posts",
      value: stats.publishedBlogs,
      icon: FileText,
      color: "bg-indigo-500",
      href: "/admin/blog",
      description: "Content management"
    },
    {
      title: "Daily Quotes",
      value: stats.activeQuotes,
      icon: Quote,
      color: "bg-pink-500",
      href: "/admin/quotes",
      description: "Quote publishing"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0f0f1a] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">NOMA Admin Dashboard</h1>
          <p className="text-[#ffbe0b]200">Manage your platform efficiently</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#333333]400">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`${card.color} p-2 rounded-lg`}>
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{card.value}</div>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/admin/packages">
                  <Package className="w-4 h-4 mr-2" />
                  Add New Package
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/admin/blog">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Blog Post
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/admin/quotes">
                  <Quote className="w-4 h-4 mr-2" />
                  Add Daily Quote
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/admin/users">
                  <Users className="w-4 h-4 mr-2" />
                  View User Progress
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Latest Order</span>
                  <span className="font-medium">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">New User Registration</span>
                  <span className="font-medium">15 minutes ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Blog Post Published</span>
                  <span className="font-medium">1 hour ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Payment Received</span>
                  <span className="font-medium">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
