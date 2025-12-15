"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, ArrowLeft, Search, CheckCircle, Clock, XCircle, TrendingUp } from "lucide-react";

interface Order {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  payment_reference: string;
  order_status: string;
  created_at: string;
  items: { package_name: string; quantity: number; price: number }[];
}

export default function AdminPayments() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data);
      
      const stats = {
        total: data.reduce((sum: number, o: Order) => sum + parseFloat(o.total_amount.toString()), 0),
        completed: data.filter((o: Order) => o.payment_status === 'completed').length,
        pending: data.filter((o: Order) => o.payment_status === 'pending').length,
        failed: data.filter((o: Order) => o.payment_status === 'failed').length
      };
      setStats(stats);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.user_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.user_email?.toLowerCase().includes(search.toLowerCase()) ||
      order.payment_reference?.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = filter === "all" || order.payment_status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1A3C63] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Payment Monitoring</h1>
          </div>
          <p className="text-blue-200">Track all orders and payments</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#1A3C63]">KES {stats.total.toLocaleString()}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-4">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                All Orders ({filteredOrders.length})
              </span>
              <div className="flex items-center gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search orders..."
                    className="w-64"
                  />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">Order #{order.id}</h3>
                        <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(order.payment_status)}`}>
                          {getStatusIcon(order.payment_status)}
                          {order.payment_status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.user_name || 'Anonymous'} • {order.user_email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#1A3C63]">KES {parseFloat(order.total_amount.toString()).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{order.payment_method}</p>
                    </div>
                  </div>
                  
                  {order.items && order.items.length > 0 && (
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs font-medium text-gray-600 mb-2">Order Items:</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm text-gray-700 mb-1">
                          <span>{item.package_name} (x{item.quantity})</span>
                          <span>KES {parseFloat(item.price.toString()).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {order.payment_reference && (
                    <p className="text-xs text-gray-500 mt-2">Reference: {order.payment_reference}</p>
                  )}
                </div>
              ))}
              
              {filteredOrders.length === 0 && (
                <p className="text-center text-gray-500 py-8">No orders found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
