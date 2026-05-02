export default function StatsLoading() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-main)", fontFamily: '"Inter", sans-serif', display: "flex", flexDirection: "column" }}>

      {/* Nav skeleton */}
      <nav>
        <div className="nav-container">
          <a href="/feed.html" className="nav-logo">
            <svg className="nav-logo-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.92 6.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 6h-5a1 1 0 0 0 0 2h2.59L13 13.59l-3.29-3.3a1 1 0 0 0-1.42 0l-6 6a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 12.41l3.29 3.3a1 1 0 0 0 1.42 0L20 9.41V12a1 1 0 0 0 2 0V7a1 1 0 0 0-.08-.38"/></svg>
            <span className="nav-logo-text">ClickChat</span>
          </a>
          <button className="btn btn-secondary btn-small" disabled>Logout</button>
        </div>
      </nav>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2.5rem 1.5rem", width: "100%", flex: 1 }}>

        {/* Section heading skeleton */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="skeleton" style={{ height: "2rem", width: "220px", margin: "0 auto" }} />
        </div>

        {/* Overview cards skeleton */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div className="skeleton" style={{ height: "2rem", width: "200px", margin: "0 auto 1.5rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton" style={{ height: "130px", borderRadius: "14px" }} />
            ))}
          </div>
        </section>

        {/* Averages skeleton */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div className="skeleton" style={{ height: "2rem", width: "140px", margin: "0 auto 1.5rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[1, 2].map((i) => (
              <div key={i} className="skeleton" style={{ height: "160px", borderRadius: "14px" }} />
            ))}
          </div>
        </section>

        {/* Top Performers skeleton */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div className="skeleton" style={{ height: "2rem", width: "200px", margin: "0 auto 1.5rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: "220px", borderRadius: "14px" }} />
            ))}
          </div>
        </section>

        {/* Most Commented skeleton */}
        <section>
          <div className="skeleton" style={{ height: "2rem", width: "280px", margin: "0 auto 1.5rem" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton" style={{ height: "72px", borderRadius: "12px" }} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <footer>
        <div className="footer-nav">
          <a href="/feed.html" className="footer-nav-btn" title="Feed">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </a>
          <a href="/users.html" className="footer-nav-btn" title="Discover">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.5 1.6 2.5 3.27 2.5 5.45V19h8v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </a>
          <a href="/stats" className="footer-nav-btn active" title="Statistics">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </a>
          <a href="/profile.html" className="footer-nav-btn profile-btn" title="Profile">
            <div className="footer-profile-avatar" />
          </a>
        </div>
      </footer>
    </div>
  );
}
