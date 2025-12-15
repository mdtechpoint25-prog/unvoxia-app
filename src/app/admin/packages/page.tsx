"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, Edit, Trash2, ArrowLeft, Save, X } from "lucide-react";

interface PackageData {
  id?: number;
  name: string;
  type: string;
  price: number;
  description: string;
  features: string[];
  is_active: boolean;
}

export default function AdminPackages() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [formData, setFormData] = useState<PackageData>({
    name: "",
    type: "",
    price: 0,
    description: "",
    features: [""],
    is_active: true
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/packages');
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingPackage ? `/api/admin/packages/${editingPackage.id}` : '/api/admin/packages';
      const method = editingPackage ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchPackages();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    
    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleEdit = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setIsEditing(true);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingPackage(null);
    setFormData({
      name: "",
      type: "",
      price: 0,
      description: "",
      features: [""],
      is_active: true
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
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
            <h1 className="text-4xl font-bold">Package Management</h1>
          </div>
          <p className="text-blue-200">Add, edit, and manage pricing packages</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    {isEditing ? 'Edit Package' : 'Add New Package'}
                  </span>
                  {isEditing && (
                    <Button variant="ghost" size="sm" onClick={resetForm}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Package Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Individual Check-Up"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <Input
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="individual, couple, deep-dive"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Price (KES)</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      placeholder="150"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the package"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Features</label>
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder="Feature description"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          disabled={formData.features.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addFeature} className="mt-2">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium">Active Package</label>
                  </div>

                  <Button type="submit" className="w-full bg-[#1A3C63] hover:bg-[#0d2238]">
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Update Package' : 'Create Package'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Existing Packages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{pkg.name}</h3>
                          <p className="text-sm text-gray-500">{pkg.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-[#1A3C63]">KES {pkg.price}</p>
                          <span className={`text-xs px-2 py-1 rounded ${pkg.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {pkg.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                      <div className="mb-3">
                        <p className="text-xs font-medium text-gray-500 mb-1">Features:</p>
                        <ul className="text-sm space-y-1">
                          {pkg.features.map((feature, i) => (
                            <li key={i} className="text-gray-600">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)} className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(pkg.id!)} className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
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
