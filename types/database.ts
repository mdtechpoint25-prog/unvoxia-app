export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          bio: string | null
          avatar_icon: string
          is_active: boolean
          allow_messages: boolean
          allow_comments: boolean
          content_sensitivity: 'standard' | 'sensitive' | 'strict'
          notification_settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          bio?: string | null
          avatar_icon?: string
          is_active?: boolean
          allow_messages?: boolean
          allow_comments?: boolean
          content_sensitivity?: 'standard' | 'sensitive' | 'strict'
          notification_settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          bio?: string | null
          avatar_icon?: string
          is_active?: boolean
          allow_messages?: boolean
          allow_comments?: boolean
          content_sensitivity?: 'standard' | 'sensitive' | 'strict'
          notification_settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          post_type: 'experience' | 'question' | 'advice' | 'release'
          allow_comments: boolean
          is_anonymous: boolean
          view_count: number
          reaction_count: number
          comment_count: number
          share_count: number
          is_flagged: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          post_type?: 'experience' | 'question' | 'advice' | 'release'
          allow_comments?: boolean
          is_anonymous?: boolean
          view_count?: number
          reaction_count?: number
          comment_count?: number
          share_count?: number
          is_flagged?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          post_type?: 'experience' | 'question' | 'advice' | 'release'
          allow_comments?: boolean
          is_anonymous?: boolean
          view_count?: number
          reaction_count?: number
          comment_count?: number
          share_count?: number
          is_flagged?: boolean
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: number
          name: string
          usage_count: number
        }
        Insert: {
          id?: number
          name: string
          usage_count?: number
        }
        Update: {
          id?: number
          name?: string
          usage_count?: number
        }
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: number
        }
        Insert: {
          post_id: string
          tag_id: number
        }
        Update: {
          post_id?: string
          tag_id?: number
        }
      }
      follows: {
        Row: {
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      reactions: {
        Row: {
          user_id: string
          post_id: string
          reaction_type: 'feel_this' | 'not_alone' | 'strength'
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
          reaction_type?: 'feel_this' | 'not_alone' | 'strength'
          created_at?: string
        }
        Update: {
          user_id?: string
          post_id?: string
          reaction_type?: 'feel_this' | 'not_alone' | 'strength'
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          is_pinned: boolean
          is_flagged: boolean
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          is_pinned?: boolean
          is_flagged?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          is_pinned?: boolean
          is_flagged?: boolean
          created_at?: string
        }
      }
      saved_posts: {
        Row: {
          user_id: string
          post_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          post_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          post_id?: string
          created_at?: string
        }
      }
      message_requests: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          is_read?: boolean
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'reaction' | 'comment' | 'follow' | 'message' | 'mention'
          reference_id: string | null
          actor_id: string | null
          message: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'reaction' | 'comment' | 'follow' | 'message' | 'mention'
          reference_id?: string | null
          actor_id?: string | null
          message?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'reaction' | 'comment' | 'follow' | 'message' | 'mention'
          reference_id?: string | null
          actor_id?: string | null
          message?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          reporter_id: string
          post_id: string | null
          comment_id: string | null
          reported_user_id: string | null
          reason: string
          details: string | null
          status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
          created_at: string
        }
        Insert: {
          id?: string
          reporter_id: string
          post_id?: string | null
          comment_id?: string | null
          reported_user_id?: string | null
          reason: string
          details?: string | null
          status?: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
          created_at?: string
        }
        Update: {
          id?: string
          reporter_id?: string
          post_id?: string | null
          comment_id?: string | null
          reported_user_id?: string | null
          reason?: string
          details?: string | null
          status?: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
          created_at?: string
        }
      }
      blocked_users: {
        Row: {
          blocker_id: string
          blocked_id: string
          created_at: string
        }
        Insert: {
          blocker_id: string
          blocked_id: string
          created_at?: string
        }
        Update: {
          blocker_id?: string
          blocked_id?: string
          created_at?: string
        }
      }
      muted_words: {
        Row: {
          id: number
          user_id: string
          word: string
        }
        Insert: {
          id?: number
          user_id: string
          word: string
        }
        Update: {
          id?: number
          user_id?: string
          word?: string
        }
      }
      circles: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string
          member_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string
          member_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string
          member_count?: number
          created_at?: string
        }
      }
      circle_members: {
        Row: {
          circle_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          circle_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          circle_id?: string
          user_id?: string
          joined_at?: string
        }
      }
      circle_posts: {
        Row: {
          circle_id: string
          post_id: string
        }
        Insert: {
          circle_id: string
          post_id: string
        }
        Update: {
          circle_id?: string
          post_id?: string
        }
      }
      user_interests: {
        Row: {
          user_id: string
          tag_id: number
          weight: number
        }
        Insert: {
          user_id: string
          tag_id: number
          weight?: number
        }
        Update: {
          user_id?: string
          tag_id?: number
          weight?: number
        }
      }
      post_interactions: {
        Row: {
          id: number
          user_id: string
          post_id: string
          interaction_type: 'view' | 'scroll_pause' | 'read_full' | 'share'
          duration_seconds: number | null
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          post_id: string
          interaction_type: 'view' | 'scroll_pause' | 'read_full' | 'share'
          duration_seconds?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          post_id?: string
          interaction_type?: 'view' | 'scroll_pause' | 'read_full' | 'share'
          duration_seconds?: number | null
          created_at?: string
        }
      }
      daily_prompts: {
        Row: {
          id: string
          prompt_text: string
          prompt_date: string
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          prompt_text: string
          prompt_date?: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          prompt_text?: string
          prompt_date?: string
          category?: string | null
          created_at?: string
        }
      }
      prompt_responses: {
        Row: {
          id: string
          user_id: string
          prompt_id: string
          response: string
          is_private: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt_id: string
          response: string
          is_private?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt_id?: string
          response?: string
          is_private?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_for_you_feed: {
        Args: {
          p_user_id: string
          p_limit?: number
          p_cursor?: string | null
        }
        Returns: {
          id: string
          user_id: string
          username: string
          avatar_icon: string
          content: string
          post_type: string
          tags: string[]
          reaction_count: number
          comment_count: number
          share_count: number
          created_at: string
          has_reacted: boolean
          is_following: boolean
          score: number
        }[]
      }
      get_user_top_tags: {
        Args: {
          p_user_id: string
          p_limit?: number
        }
        Returns: {
          tag_id: number
          tag_name: string
          weight: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
