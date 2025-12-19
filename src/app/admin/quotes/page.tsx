"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Quote, Plus, Edit, Trash2, ArrowLeft, Save, Calendar } from "lucide-react";

interface DailyQuote {
  id?: number;
  quote: string;
  author: string;
  category: string;
  is_active: boolean;
  scheduled_date: string;
  display_count: number;
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<DailyQuote[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<DailyQuote>({
    quote: "",
    author: "",
    category: "Relationships",
    is_active: true,
    scheduled_date: new Date().toISOString().split('T')[0],
    display_count: 0
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = formData.id ? `/api/admin/quotes/${formData.id}` : '/api/admin/quotes';
      const method = formData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchQuotes();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote?')) return;
    
    try {
      await fetch(`/api/admin/quotes/${id}`, { method: 'DELETE' });
      fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const handleEdit = (quote: DailyQuote) => {
    setFormData({
      ...quote,
      scheduled_date: quote.scheduled_date?.split('T')[0] || new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({
      quote: "",
      author: "",
      category: "Relationships",
      is_active: true,
      scheduled_date: new Date().toISOString().split('T')[0],
      display_count: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0f0f1a] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Daily Quotes Management</h1>
          </div>
          <p className="text-[#ffbe0b]200">Create and schedule daily inspirational quotes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="w-5 h-5" />
                  {isEditing ? 'Edit Quote' : 'Add New Quote'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quote</label>
                    <Textarea
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder="The greatest glory in living lies not in never falling, but in rising every time we fall."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <Input
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Nelson Mandela"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Input
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Relationships, Love, Life"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Schedule Date</label>
                      <Input
                        type="date"
                        value={formData.scheduled_date}
                        onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium">Active Quote</label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-[#0f0f1a] hover:bg-[#0d2238]">
                      <Save className="w-4 h-4 mr-2" />
                      {isEditing ? 'Update Quote' : 'Add Quote'}
                    </Button>
                    {isEditing && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="w-5 h-5" />
                  All Quotes ({quotes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 pr-2">
                          <p className="text-sm font-medium italic line-clamp-3">"{quote.quote}"</p>
                          <p className="text-xs text-gray-600 mt-2">— {quote.author || 'Unknown'}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${quote.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {quote.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(quote.scheduled_date).toLocaleDateString()}
                        </span>
                        <span>Category: {quote.category}</span>
                        <span>Views: {quote.display_count}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(quote)} className="flex-1">
                          <Edit className="w-3 h-3 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(quote.id!)} className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-3 h-3 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
