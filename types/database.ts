export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          phone: string;
          password_hash: string;
          avatar_url: string | null;
          badges: Json | null;
          created_at: string;
          last_login: string | null;
          email_verified: boolean;
          otp_code: string | null;
          otp_expiry: string | null;
          reset_token: string | null;
          reset_expiry: string | null;
        };
        Insert: {
          username: string;
          email: string;
          phone: string;
          password_hash: string;
          avatar_url?: string | null;
          badges?: Json | null;
          last_login?: string | null;
          email_verified?: boolean;
          otp_code?: string | null;
          otp_expiry?: string | null;
          reset_token?: string | null;
          reset_expiry?: string | null;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          media_url: string | null;
          category: string | null;
          created_at: string;
          reactions: Json | null;
          comments_count: number;
        };
        Insert: {
          user_id: string;
          content: string;
          media_url?: string | null;
          category?: string | null;
          reactions?: Json | null;
        };
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
          reactions: Json | null;
        };
        Insert: {
          post_id: string;
          user_id: string;
          content: string;
          reactions?: Json | null;
        };
        Update: Partial<Database['public']['Tables']['comments']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          media_url: string | null;
          created_at: string;
          read: boolean;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'read'>;
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      daily_prompts: {
        Row: {
          id: string;
          prompt: string | null;
          user_id: string;
          response: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['daily_prompts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['daily_prompts']['Insert']>;
      };
      reactions: {
        Row: {
          id: string;
          target_type: string;
          target_id: string;
          user_id: string;
          emoji: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reactions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reactions']['Insert']>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export type User = Database['public']['Tables']['users']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type DailyPrompt = Database['public']['Tables']['daily_prompts']['Row'];
export type Reaction = Database['public']['Tables']['reactions']['Row'];
