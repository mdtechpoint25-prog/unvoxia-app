"use client";

import Link from "next/link";
import PostCard from "./PostCard";

interface PreviewPost {
  id: string;
  username: string;
  content: string;
  category: string;
  reactions: number;
  comments: number;
  timeAgo: string;
}

const SAMPLE_POSTS: PreviewPost[] = [
  {
    id: "1",
    username: "HopefulHeart",
    content:
      "Today I finally told someone about my anxiety. It felt like lifting a weight off my chest. Small steps matter.",
    category: "Feelings",
    reactions: 127,
    comments: 23,
    timeAgo: "2h ago",
  },
  {
    id: "2",
    username: "AuthenticSoul",
    content:
      "Reminder: You dont have to have it all figured out. Life is about growing, not being perfect.",
    category: "Support",
    reactions: 89,
    comments: 15,
    timeAgo: "4h ago",
  },
  {
    id: "3",
    username: "RealTalk",
    content:
      "Just finished painting something that represents my journey this year. Art helps me process emotions I cant put into words.",
    category: "Creativity",
    reactions: 156,
    comments: 31,
    timeAgo: "6h ago",
  },
  {
    id: "4",
    username: "TruthSeeker",
    content:
      "Its okay to not be okay. Today was hard, but tomorrow is a new chance. Sharing here because I know Im not alone.",
    category: "Thoughts",
    reactions: 203,
    comments: 47,
    timeAgo: "8h ago",
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Feelings: "#e74c3c",
    Support: "#1ABC9C",
    Creativity: "#9B59B6",
    Thoughts: "#3498db",
    Life: "#f39c12",
    Anonymous: "#7f8c8d",
  };
  return colors[category] || "#1ABC9C";
};

export default function FeedPreview() {
  return (
    <section
      id="feed-preview"
      style={{
        padding: "6rem 1.5rem",
        background: "linear-gradient(180deg, #f9fafb 0%, #fff 100%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background:
                "linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)",
              padding: "0.5rem 1rem",
              borderRadius: "50px",
              marginBottom: "1rem",
              border: "1px solid rgba(26, 188, 156, 0.2)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#1ABC9C",
                boxShadow: "0 0 10px #1ABC9C",
              }}
            />
            <span
              style={{
                color: "#1ABC9C",
                fontSize: "0.875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              100% Real Content
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#1a1a2e",
              marginBottom: "1rem",
            }}
          >
            Real Stories From Real People
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            No filters, no fakeness - just authentic thoughts and genuine
            connections. This is what social media was meant to be.
          </p>
        </div>

        {/* Posts Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {SAMPLE_POSTS.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "1.5rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                border: "1px solid #e5e7eb",
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* Post Badge */}
              <span
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: `${getCategoryColor(post.category)}15`,
                  color: getCategoryColor(post.category),
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {post.category}
              </span>

              {/* Post Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    {post.username.charAt(0)}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color: "#1a1a2e",
                        fontSize: "0.95rem",
                      }}
                    >
                      @{post.username}
                    </div>
                    <div
                      style={{ fontSize: "0.75rem", color: "#9ca3af" }}
                    >
                      {post.timeAgo}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p
                style={{
                  color: "#4a5568",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  minHeight: "80px",
                }}
              >
                {post.content}
              </p>

              {/* Post Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    color: "#6b7280",
                    fontSize: "0.85rem",
                  }}
                >
                  <span style={{ color: "#e74c3c" }}>Heart</span>
                  <span>{post.reactions}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    color: "#6b7280",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>Chat</span>
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/feed"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background:
                "linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              padding: "1rem 2.5rem",
              borderRadius: "12px",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(26, 188, 156, 0.3)",
              transition: "background 0.3s ease",
            }}
          >
            View Full Feed
            <span>-&gt;</span>
          </Link>
          <p
            style={{
              marginTop: "1rem",
              color: "#9ca3af",
              fontSize: "0.875rem",
            }}
          >
            Join thousands sharing their authentic stories
          </p>
        </div>
      </div>
    </section>
  );
}

