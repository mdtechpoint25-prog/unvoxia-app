"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { CreditCard, Smartphone, CheckCircle2, ArrowLeft } from "lucide-react";
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
    price: number;
  };
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (user) {
      fetchBasketItems();
      setEmail(user.email || "");
    } else {
      router.push('/login');
    }
  }, [user, router]);

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
            price
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
          price: parseFloat(item.package.price)
        }
      })) || [];

      setBasketItems(formattedItems);
    } catch (error) {
      console.error('Error fetching basket:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleCheckout = async () => {
    if (!user || basketItems.length === 0) return;

    setProcessing(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'pending',
          payment_method: paymentMethod
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = basketItems.map(item => ({
        order_id: order.id,
        package_id: item.package_id,
        quantity: item.quantity,
        price: item.package.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      const { error: deleteError } = await supabase
        .from('basket_items')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      setTimeout(() => {
        setProcessing(false);
        setOrderComplete(true);
      }, 1500);
    } catch (error) {
      console.error('Error processing checkout:', error);
      setProcessing(false);
    }
  };

  const subtotal = basketItems.reduce(
    (sum, item) => sum + item.package.price * item.quantity,
    0
  );
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3C63]"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (basketItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1A3C63] mb-6">Your basket is empty</h1>
          <Button asChild className="bg-[#FF6B6B] hover:bg-[#E55A5A] rounded-full px-8">
            <Link href="/packages">Browse Packages</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-[#1A3C63] mb-6">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your order has been confirmed. You'll receive an email with access details shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-[#1A3C63] hover:bg-[#0d2238] rounded-full px-8">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 border-2">
              <Link href="/packages">Browse More Packages</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-14 h-14 rounded-2xl bg-[#1A3C63] flex items-center justify-center shadow-lg shadow-blue-900/20">
              <MaskLogo className="w-8 h-8" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#1A3C63]">NOMA</span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Button
            asChild
            variant="ghost"
            className="mb-8 hover:bg-blue-50 rounded-full"
          >
            <Link href="/basket">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Basket
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-[#1A3C63] mb-4">Checkout</h1>
            <p className="text-gray-600">Complete your purchase securely</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-2 border-blue-100 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-[#1A3C63]">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="rounded-xl mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+254 700 000 000"
                        className="rounded-xl mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-2 border-blue-100 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-[#1A3C63]">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div
                          className={`flex items-center space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            paymentMethod === "mpesa"
                              ? "border-[#1A3C63] bg-blue-50"
                              : "border-blue-100 hover:border-blue-200"
                          }`}
                          onClick={() => setPaymentMethod("mpesa")}
                        >
                          <RadioGroupItem value="mpesa" id="mpesa" />
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                              <Smartphone className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <Label htmlFor="mpesa" className="text-lg font-bold cursor-pointer">
                                M-Pesa
                              </Label>
                              <p className="text-sm text-gray-600">Pay with your mobile money</p>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`flex items-center space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            paymentMethod === "card"
                              ? "border-[#1A3C63] bg-blue-50"
                              : "border-blue-100 hover:border-blue-200"
                          }`}
                          onClick={() => setPaymentMethod("card")}
                        >
                          <RadioGroupItem value="card" id="card" />
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-[#1A3C63]" />
                            </div>
                            <div>
                              <Label htmlFor="card" className="text-lg font-bold cursor-pointer">
                                Credit/Debit Card
                              </Label>
                              <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "mpesa" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6"
                      >
                        <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                        <Input
                          id="mpesa-number"
                          type="tel"
                          placeholder="+254 700 000 000"
                          className="rounded-xl mt-2"
                        />
                      </motion.div>
                    )}

                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 space-y-4"
                      >
                        <div>
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="rounded-xl mt-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              className="rounded-xl mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              className="rounded-xl mt-2"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-32"
              >
                <Card className="border-2 border-blue-100 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-[#1A3C63]">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {basketItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.package.name} ×{item.quantity}</span>
                          <span className="font-semibold">KES {(item.package.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t-2 border-blue-100 pt-4 space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax (16%)</span>
                        <span className="font-semibold">KES {tax.toLocaleString()}</span>
                      </div>
                      <div className="border-t-2 border-blue-100 pt-3">
                        <div className="flex justify-between text-xl font-bold text-[#1A3C63]">
                          <span>Total</span>
                          <span>KES {total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="w-full bg-[#FF6B6B] hover:bg-[#E55A5A] text-white shadow-lg hover:shadow-xl rounded-full h-14 text-lg font-bold"
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        "Complete Purchase"
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Your payment information is secure and encrypted
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}