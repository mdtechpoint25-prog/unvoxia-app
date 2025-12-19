"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, ArrowLeft, Search, Eye, TrendingUp } from "lucide-react";

interface User {
  id: number;
  email: string;
  name: string;
  relationship_status: string;
  created_at: string;
  progress_count: number;
  completed_count: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserProgress = async (userId: number) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/progress`);
      const data = await response.json();
      setUserProgress(data);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    fetchUserProgress(user.id);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

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
            <h1 className="text-4xl font-bold">User Management</h1>
          </div>
          <p className="text-[#ffbe0b]200">Monitor user progress and activity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    All Users ({filteredUsers.length})
                  </span>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search users..."
                      className="w-64"
                    />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{user.name || 'Anonymous User'}</h3>
                          <p className="text-sm text-gray-500">{user.email || 'No email'}</p>
                          <p className="text-sm text-gray-600 mt-1">Status: {user.relationship_status || 'Not specified'}</p>
                          <p className="text-xs text-gray-400 mt-2">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-4 mb-2">
                            <div>
                              <p className="text-2xl font-bold text-[#ffbe0b]600">{user.progress_count}</p>
                              <p className="text-xs text-gray-500">Assessments</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-green-600">{user.completed_count}</p>
                              <p className="text-xs text-gray-500">Completed</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {selectedUser ? 'User Progress' : 'Select a User'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedUser ? (
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-bold text-lg mb-1">{selectedUser.name}</h3>
                      <p className="text-sm text-gray-600">{selectedUser.email}</p>
                    </div>
                    
                    {userProgress.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">Assessment History</h4>
                        {userProgress.map((progress, idx) => (
                          <div key={idx} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{progress.assessment_type}</span>
                              <span className={`text-xs px-2 py-1 rounded ${progress.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                {progress.completed ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                              <div 
                                className="bg-[#1a1a2e]600 h-2 rounded-full transition-all" 
                                style={{ width: `${progress.progress_percentage}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500">{progress.progress_percentage}% complete</p>
                            {progress.current_step && (
                              <p className="text-xs text-gray-600 mt-1">Current: {progress.current_step}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-8">No assessments yet</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Select a user to view their progress
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
