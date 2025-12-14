"use client";

import { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [showWriteModal, setShowWriteModal] = useState(false);

  const textReels = [
    {
      id: 1,
      category: "Depression",
      text: "I smile every day at work, but inside I feel empty. No one notices because I never let the mask slip.",
      replies: 42,
      support: 210
    },
    {
      id: 2,
      category: "Relationships",
      text: "Loving someone who doesn't understand your pain feels lonelier than being alone.",
      replies: 18,
      support: 97
    },
    {
      id: 3,
      category: "Job Stress",
      text: "I fear losing my job every day, but I can't tell my family how scared I am.",
      replies: 33,
      support: 156
    },
    {
      id: 4,
      category: "Family",
      text: "My parents still don't accept who I am. I've given up trying to make them understand.",
      replies: 67,
      support: 234
    },
    {
      id: 5,
      category: "Anxiety",
      text: "Some days the simplest tasks feel impossible. Getting out of bed is a victory no one sees.",
      replies: 89,
      support: 412
    },
    {
      id: 6,
      category: "Marriage",
      text: "We haven't talked about anything real in months. We're roommates pretending to be partners.",
      replies: 54,
      support: 178
    },
    {
      id: 7,
      category: "Loss",
      text: "It's been two years and I still reach for my phone to call them. The grief never really leaves.",
      replies: 91,
      support: 523
    },
    {
      id: 8,
      category: "Self-Worth",
      text: "I keep achieving things but never feel good enough. The goalposts just keep moving further away.",
      replies: 76,
      support: 289
    }
  ];

  const circles = [
    "Love & Relationships",
    "Depression Support",
    "Job Stress",
    "Marriage",
    "Family Trauma",
    "Discrimination",
    "Anxiety & Panic",
    "Self-Worth"
  ];

  return (
    <>
      <div className="noma-app">
        {/* LEFT RAIL */}
        <aside className="left-rail">
          <div className="logo-container">
            <div className="noma-logo">N</div>
          </div>
          
          <nav className="icon-nav">
            <Link href="/feed" className="nav-icon active">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </Link>
            
            <Link href="/circles" className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </Link>
            
            <button onClick={() => setShowWriteModal(true)} className="nav-icon create-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            
            <Link href="/notifications" className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </Link>
            
            <Link href="/saved" className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </Link>
            
            <Link href="/profile" className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            
            <Link href="/settings" className="nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
              </svg>
            </Link>
          </nav>
        </aside>

        {/* MAIN FEED */}
        <main className="main-feed">
          <header className="feed-header">
            <h1 className="feed-title">NOMA — Speak Without Fear</h1>
            <div className="header-actions">
              <button className="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <button className="notif-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </button>
              <Link href="/profile" className="avatar-btn" />
            </div>
          </header>

          <div className="text-reels">
            {textReels.map((reel) => (
              <article key={reel.id} className="text-reel">
                <span className="reel-tag">{reel.category}</span>
                <p className="reel-content">{reel.text}</p>
                <div className="reel-actions">
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>{reel.replies}</span>
                  </button>
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{reel.support}</span>
                  </button>
                  <button className="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>
              </article>
            ))}
            
            <div className="feed-cta">
              <p>You are not alone</p>
              <button onClick={() => setShowWriteModal(true)} className="share-cta-btn">
                Share what you're carrying
              </button>
            </div>
          </div>
        </main>

        {/* RIGHT RAIL */}
        <aside className="right-rail">
          <div className="panel-card">
            <h3 className="panel-title">Circles You May Relate To</h3>
            <ul className="circles-list">
              {circles.map((circle, idx) => (
                <li key={idx}>
                  <Link href="/circles">{circle}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-card">
            <h3 className="panel-title">You Are Not Alone</h3>
            <blockquote className="quote">
              "I thought I was weak until I saw others feel the same."
            </blockquote>
          </div>

          <div className="panel-card cta-card">
            <p>Ready to lighten your load?</p>
            <button onClick={() => setShowWriteModal(true)} className="gentle-cta">
              Share your story
            </button>
          </div>
        </aside>

        {/* MOBILE BOTTOM NAV */}
        <nav className="bottom-nav">
          <Link href="/feed" className="bottom-nav-item active">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </Link>
          <Link href="/circles" className="bottom-nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
            </svg>
          </Link>
          <button onClick={() => setShowWriteModal(true)} className="bottom-nav-item create">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
          <Link href="/notifications" className="bottom-nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            </svg>
          </Link>
          <Link href="/profile" className="bottom-nav-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>
        </nav>
      </div>

      {/* WRITE MODAL */}
      {showWriteModal && (
        <div className="modal-overlay" onClick={() => setShowWriteModal(false)}>
          <div className="write-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Share what you're carrying</h2>
              <button onClick={() => setShowWriteModal(false)} className="modal-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <textarea 
                placeholder="What's weighing on you today?"
                className="write-textarea"
                rows={8}
              />
              <div className="category-chips">
                <button className="chip">Depression</button>
                <button className="chip">Relationships</button>
                <button className="chip">Job Stress</button>
                <button className="chip">Family</button>
                <button className="chip">Anxiety</button>
                <button className="chip">Loss</button>
              </div>
              <label className="anonymous-toggle">
                <input type="checkbox" defaultChecked />
                <span>Post anonymously</span>
              </label>
            </div>
            <div className="modal-footer">
              <button className="post-btn">Share</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .noma-app {
          display: grid;
          grid-template-columns: 88px 1fr 320px;
          height: 100vh;
          background: #0b0b0f;
          color: var(--text-primary);
          overflow: hidden;
        }

        /* LEFT RAIL */
        .left-rail {
          background: #111216;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .logo-container {
          margin-bottom: 2.5rem;
        }

        .noma-logo {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #f4ffac, #a8e6a1);
          border-radius: 16px;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 24px;
          color: #0b0b0f;
          box-shadow: 0 8px 24px rgba(244, 255, 172, 0.2);
        }

        .icon-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          align-items: center;
        }

        .nav-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
        }

        .nav-icon:hover {
          color: #f4ffac;
          background: rgba(244, 255, 172, 0.1);
        }

        .nav-icon.active {
          color: #f4ffac;
          background: rgba(244, 255, 172, 0.15);
        }

        .nav-icon.create-btn {
          background: linear-gradient(135deg, #f4ffac, #a8e6a1);
          color: #0b0b0f;
          margin-top: 0.5rem;
        }

        .nav-icon.create-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(244, 255, 172, 0.3);
        }

        /* MAIN FEED */
        .main-feed {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background: #111216;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .feed-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-btn, .notif-btn {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .search-btn:hover, .notif-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f4ffac;
        }

        .avatar-btn {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #7c3aed, #0d9488);
          border-radius: 50%;
          cursor: pointer;
        }

        /* TEXT REELS */
        .text-reels {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .text-reel {
          background: #111216;
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .text-reel:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }

        .reel-tag {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #7dd3fc;
          background: rgba(125, 211, 252, 0.1);
          padding: 0.35rem 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .reel-content {
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          font-weight: 400;
        }

        .reel-actions {
          display: flex;
          gap: 1.5rem;
          opacity: 0.7;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          color: #f4ffac;
        }

        .feed-cta {
          text-align: center;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(244, 255, 172, 0.05), rgba(168, 230, 161, 0.05));
          border-radius: 20px;
          margin-top: 1rem;
        }

        .feed-cta p {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .share-cta-btn {
          background: linear-gradient(135deg, #f4ffac, #a8e6a1);
          color: #0b0b0f;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .share-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(244, 255, 172, 0.3);
        }

        /* RIGHT RAIL */
        .right-rail {
          background: #0f1014;
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
        }

        .panel-card {
          background: #111216;
          border-radius: 16px;
          padding: 1.5rem;
        }

        .panel-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .circles-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .circles-list li a {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .circles-list li a:hover {
          background: rgba(244, 255, 172, 0.1);
          color: #f4ffac;
        }

        .quote {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          padding-left: 1rem;
          border-left: 3px solid #f4ffac;
        }

        .cta-card {
          background: linear-gradient(135deg, rgba(244, 255, 172, 0.05), rgba(168, 230, 161, 0.05));
        }

        .cta-card p {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .gentle-cta {
          width: 100%;
          background: rgba(244, 255, 172, 0.2);
          color: #f4ffac;
          padding: 0.75rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .gentle-cta:hover {
          background: rgba(244, 255, 172, 0.3);
        }

        /* BOTTOM NAV (MOBILE) */
        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #111216;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.75rem;
          justify-content: space-around;
          z-index: 50;
        }

        .bottom-nav-item {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          color: rgba(255, 255, 255, 0.5);
          background: transparent;
          border: none;
          border-radius: 12px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .bottom-nav-item.active {
          color: #f4ffac;
          background: rgba(244, 255, 172, 0.15);
        }

        .bottom-nav-item.create {
          background: linear-gradient(135deg, #f4ffac, #a8e6a1);
          color: #0b0b0f;
        }

        /* WRITE MODAL */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          z-index: 100;
          padding: 1rem;
        }

        .write-modal {
          background: #111216;
          border-radius: 24px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .modal-close {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .modal-body {
          padding: 1.5rem;
        }

        .write-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          color: var(--text-primary);
          font-size: 1.05rem;
          line-height: 1.6;
          resize: vertical;
          margin-bottom: 1.5rem;
        }

        .write-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .category-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .chip {
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chip:hover {
          background: rgba(244, 255, 172, 0.15);
          border-color: #f4ffac;
          color: #f4ffac;
        }

        .anonymous-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
        }

        .anonymous-toggle input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .post-btn {
          width: 100%;
          background: linear-gradient(135deg, #f4ffac, #a8e6a1);
          color: #0b0b0f;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .post-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(244, 255, 172, 0.3);
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .noma-app {
            grid-template-columns: 72px 1fr;
          }
          .right-rail {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .noma-app {
            grid-template-columns: 1fr;
            padding-bottom: 72px;
          }
          .left-rail {
            display: none;
          }
          .bottom-nav {
            display: flex;
          }
          .feed-header {
            padding: 1rem;
          }
          .feed-title {
            font-size: 1.1rem;
          }
          .text-reels {
            padding: 1rem;
          }
          .reel-content {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}
