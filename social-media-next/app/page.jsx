export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-main)", fontFamily: '"Inter", sans-serif', display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <nav style={{ backgroundColor: "var(--bg-card)", padding: "1rem 2rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", position: "relative", minHeight: "3.5rem" }}>
          <a href="/" style={{ fontFamily: '"Lobster Two", serif', fontSize: "2.5rem", fontWeight: "700", color: "var(--text)", display: "flex", alignItems: "center", gap: "0.5rem", letterSpacing: "0.06em", position: "absolute", left: "50%", transform: "translateX(-50%)", textDecoration: "none", whiteSpace: "nowrap" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style={{ color: "var(--text)", flexShrink: 0 }}>
              <path fill="currentColor" d="m13.775 22l-3.625-7.8L6 20V2l14 11h-7.1l3.6 7.725z" />
            </svg>
            ClickChat
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "2rem 1.5rem 1.25rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--primary)", marginBottom: "0.75rem", textAlign: "center" }}>
          Welcome to <span className="hero-accent" style={{ fontFamily: '"Lobster Two", serif', letterSpacing: "0.04em" }}>ClickChat</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "0.75rem", textAlign: "center", maxWidth: "550px" }}>
          Connect with friends, share your thoughts, and discover new people.
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "1.5rem", alignItems: "center" }}>
          <a href="/register.html" className="btn-get-started">Get Started</a>
          <a href="/login.html" className="btn-login">Login</a>
        </div>

        {/* Feature Cards */}
        <div className="feature-grid">
          {[
            { title: "Share Your Thoughts", desc: "Post updates, share ideas, and express yourself with the community." },
            { title: "Connect with Others", desc: "Follow users, like posts, and engage in conversations." },
            { title: "Stay Updated", desc: "See posts from people you follow in your personalized feed." },
            { title: "Join a Vast Community", desc: "Connect with others and be part of a thriving network." },
          ].map((card) => (
            <div key={card.title} className="feature-card">
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text)", marginBottom: "0.5rem" }}>{card.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}