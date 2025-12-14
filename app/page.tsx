"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="landing-shell">
      <section className="hero-text">
        <h1>Join the Ultimate Social Experience</h1>
        <p>Chat with friends, join communities, share epic moments — all in one immersive app.</p>
        <Link href="/signup" className="cta-button">Get Started Free</Link>
      </section>

      <div className="app-mockup">
        <div
          className="banner"
          style={{ backgroundImage: "url('/original-99e65cf9fa036d9fb855c8c614021298.webp')" }}
        >
          <div className="header-overlay">
            <div className="logo">N</div>
            <input type="text" placeholder="Search" className="search-bar" />
            <div className="avatar-circle" />
          </div>
        </div>

        <div className="main-content">
          <aside className="sidebar-left">
            <div className="channel-list">
              <div className="channel">Work</div>
              <div className="channel active">
                <span>ICG</span>
                <div className="chat-preview">Jaden: Let&#39;s discuss this tom...</div>
              </div>
              <div className="channel">SP</div>
              <div className="channel">BFF</div>
              <div className="channel">MJ</div>
              <div className="channel">GI</div>
            </div>
          </aside>

          <main className="central-chat">
            <div className="chat-header">ICG chat</div>
            <div className="messages">
              <div className="message">→ Richard Wilson added You</div>
              <div className="message">
                Conner Garcia: Hey guys! Don&#39;t forget about our meeting next week! I&#39;ll be waiting for you at the
                &quot;Cozy Corner&quot; cafe at 6:00 PM. Don&#39;t be late!
              </div>
              <div className="message">Richard Wilson: Absolutely, I&#39;ll be there! Looking forward to catching up and discussing everything.</div>
              <div className="message">Lawrence Patterson: @rwilson @jparker I have a new game plan</div>
              <div className="message">Jaden Parker: Let&#39;s discuss this tomorrow</div>
              <Link href="/signup" className="join-btn">Join</Link>
            </div>
            <div className="input-bar">
              <input type="text" placeholder="Write a message..." />
              <div className="send-btn">Send</div>
            </div>
          </main>

          <aside className="sidebar-right">
            <h3>Members</h3>
            <div className="member">Richard Wilson <span className="badge">Admin</span></div>
            <div className="member">You</div>
            <div className="member">Jaden Parker</div>
            <div className="member">Conner Garcia</div>
            <div className="member">Lawrence Patterson</div>

            <h3 className="files-heading">Files</h3>
            <div className="file-row">115 photos</div>
            <div className="file-row">208 files</div>
            <div className="file-row">47 shared links</div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .landing-shell {
          font-family: var(--font-sans);
          background: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
          padding: 100px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .hero-text {
          text-align: center;
          max-width: 900px;
          margin-top: 12px;
        }

        .hero-text h1 {
          font-size: clamp(36px, 4vw, 52px);
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .hero-text p {
          font-size: clamp(18px, 2.2vw, 22px);
          color: var(--text-secondary);
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-block;
          background: var(--accent);
          color: var(--bg-primary);
          padding: 16px 40px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          transition: background 150ms ease, transform 150ms ease;
          text-decoration: none;
        }

        .cta-button:hover { background: var(--accent-hover); transform: translateY(-1px); }

        .app-mockup {
          width: 100%;
          max-width: 1600px;
          background: var(--bg-surface);
          border-radius: 40px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .banner {
          height: 320px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .header-overlay {
          position: absolute;
          inset: 0;
          background: var(--gradient-overlay);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px;
        }

        .logo {
          font-size: 32px;
          font-weight: 700;
          color: var(--accent);
        }

        .search-bar {
          background: var(--overlay-medium);
          border: none;
          border-radius: 50px;
          padding: 12px 20px;
          width: 280px;
          color: var(--text-primary);
        }

        .search-bar::placeholder { color: var(--text-secondary); }

        .avatar-circle {
          width: 40px;
          height: 40px;
          background: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(0,0,0,0.3);
        }

        .main-content {
          display: flex;
          min-height: 700px;
        }

        .sidebar-left, .sidebar-right {
          width: 320px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .channel-list { display: flex; flex-direction: column; gap: 8px; }

        .channel {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 20px;
          background: var(--overlay-low);
          font-size: 15px;
          color: var(--text-primary);
        }

        .channel.active {
          background: var(--accent);
          color: var(--bg-primary);
          font-weight: 700;
          justify-content: space-between;
        }

        .chat-preview {
          background: var(--overlay-low);
          border-radius: 12px;
          padding: 6px 10px;
          font-size: 13px;
          color: var(--bg-primary);
        }

        .central-chat {
          flex: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-header {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .messages {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-right: 8px;
        }

        .message {
          max-width: 80%;
          padding: 16px 24px;
          border-radius: 28px;
          background: var(--overlay-low);
          color: var(--text-primary);
        }

        .join-btn {
          display: inline-block;
          align-self: flex-start;
          background: var(--accent);
          color: var(--bg-primary);
          padding: 10px 24px;
          border-radius: 50px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 150ms ease, transform 150ms ease;
          text-decoration: none;
        }

        .join-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

        .input-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--overlay-medium);
          border-radius: 50px;
        }

        .input-bar input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 16px;
        }

        .input-bar input::placeholder { color: var(--text-muted); }

        .send-btn { color: var(--accent); font-weight: 700; cursor: pointer; }

        .sidebar-right h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .member { color: var(--text-secondary); font-size: 15px; }
        .badge { background: var(--overlay-medium); color: var(--accent); padding: 4px 8px; border-radius: 12px; margin-left: 8px; font-size: 12px; }

        .files-heading { margin-top: 20px; }
        .file-row { color: var(--text-secondary); font-size: 15px; }

        @media (max-width: 1200px) {
          .main-content { flex-direction: column; min-height: auto; }
          .sidebar-left, .sidebar-right { width: 100%; }
          .message { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}
