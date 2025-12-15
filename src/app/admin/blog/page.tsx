"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Edit, Trash2, ArrowLeft, Save, Eye } from "lucide-react";

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  is_published: boolean;
  views: number;
  published_at?: string;
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    author: "NOMA Team",
    excerpt: "",
    content: "",
    featured_image: "",
    category: "Relationships",
    is_published: false,
    views: 0
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSend = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      published_at: formData.is_published ? new Date().toISOString() : null
    };

    try {
      const url = formData.id ? `/api/admin/blog/${formData.id}` : '/api/admin/blog';
      const method = formData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        fetchPosts();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData(post);
    setIsEditing(true);
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      slug: "",
      author: "NOMA Team",
      excerpt: "",
      content: "",
      featured_image: "",
      category: "Relationships",
      is_published: false,
      views: 0
    });
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
            <h1 className="text-4xl font-bold">Blog Management</h1>
          </div>
          <p className="text-blue-200">Create and manage blog posts</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {isEditing ? 'Edit Post' : 'Create New Post'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Understanding Relationship Communication"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="understanding-relationship-communication"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate from title</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Author</label>
                      <Input
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Input
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                    <Input
                      value={formData.featured_image}
                      onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Short summary of the post..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your blog post content here..."
                      rows={10}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="is_published" className="text-sm font-medium">Publish Immediately</label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-[#1A3C63] hover:bg-[#0d2238]">
                      <Save className="w-4 h-4 mr-2" />
                      {isEditing ? 'Update Post' : 'Create Post'}
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
                  <FileText className="w-5 h-5" />
                  Published Posts ({posts.filter(p => p.is_published).length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {posts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 pr-2">
                          <h4 className="font-bold text-sm line-clamp-2">{post.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{post.category}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {post.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span><Eye className="w-3 h-3 inline mr-1" />{post.views} views</span>
                        <span>by {post.author}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(post)} className="flex-1 text-xs">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(post.id!)} className="text-red-600 hover:bg-red-50 text-xs">
                          <Trash2 className="w-3 h-3" />
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
