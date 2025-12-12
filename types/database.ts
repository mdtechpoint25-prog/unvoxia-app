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
          bio: string | null;
          badges: Json;
          streak_count: number;
          last_prompt_date: string | null;
          notification_settings: Json;
          email_verified: boolean;
          status: string;
          otp_code: string | null;
          otp_expiry: string | null;
          reset_token: string | null;
          reset_expiry: string | null;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          username: string;
          email: string;
          phone: string;
          password_hash: string;
          avatar_url?: string | null;
          bio?: string | null;
          badges?: Json;
          streak_count?: number;
          last_prompt_date?: string | null;
          notification_settings?: Json;
          email_verified?: boolean;
          status?: string;
          otp_code?: string | null;
          otp_expiry?: string | null;
          reset_token?: string | null;
          reset_expiry?: string | null;
          last_login?: string | null;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          media_url: string | null;
          category: string;
          is_anonymous: boolean;
          created_at: string;
          reactions: Json;
          comments_count: number;
        };
        Insert: {
          user_id: string;
          content: string;
          media_url?: string | null;
          category?: string;
          is_anonymous?: boolean;
          reactions?: Json;
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
          reactions: Json;
        };
        Insert: {
          post_id: string;
          user_id: string;
          content: string;
          reactions?: Json;
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
          is_anonymous: boolean;
          created_at: string;
          read: boolean;
        };
        Insert: {
          sender_id: string;
          receiver_id: string;
          content: string;
          media_url?: string | null;
          is_anonymous?: boolean;
        };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      chat_requests: {
        Row: {
          id: string;
          requester_id: string;
          recipient_id: string;
          status: string;
          message: string | null;
          created_at: string;
          responded_at: string | null;
        };
        Insert: {
          requester_id: string;
          recipient_id: string;
          status?: string;
          message?: string | null;
        };
        Update: Partial<Database['public']['Tables']['chat_requests']['Insert']>;
      };
      daily_prompts: {
        Row: {
          id: string;
          prompt: string | null;
          user_id: string | null;
          response: string | null;
          feelings_score: number | null;
          created_at: string;
        };
        Insert: {
          prompt?: string | null;
          user_id?: string | null;
          response?: string | null;
          feelings_score?: number | null;
        };
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
        Insert: {
          target_type: string;
          target_id: string;
          user_id: string;
          emoji: string;
        };
        Update: Partial<Database['public']['Tables']['reactions']['Insert']>;
      };
      flagged_posts: {
        Row: {
          id: string;
          post_id: string;
          reporter_id: string;
          reason: string;
          status: string;
          admin_notes: string | null;
          created_at: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
        };
        Insert: {
          post_id: string;
          reporter_id: string;
          reason: string;
          status?: string;
          admin_notes?: string | null;
        };
        Update: Partial<Database['public']['Tables']['flagged_posts']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string | null;
          link: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          type: string;
          title: string;
          message?: string | null;
          link?: string | null;
          read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
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
export type ChatRequest = Database['public']['Tables']['chat_requests']['Row'];
export type DailyPrompt = Database['public']['Tables']['daily_prompts']['Row'];
export type Reaction = Database['public']['Tables']['reactions']['Row'];
export type FlaggedPost = Database['public']['Tables']['flagged_posts']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
