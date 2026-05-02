import * as stats from "@/repos/stats";

export const metadata = {
  title: "ClickChat — Platform Statistics",
};

function IconUsers({ size = 28 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" fillRule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.25-2.095c.478-.86.75-1.85.75-2.905a6 6 0 0 0-.75-2.906a4 4 0 1 1 0 5.811M15.466 20c.34-.588.535-1.271.535-2v-1a5.98 5.98 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clipRule="evenodd" />
    </svg>
  );
}

function IconPosts({ size = 28 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21M6 14h12v-2H6zm0 3h12v-1.5H6z" />
    </svg>
  );
}

function IconHeart({ size = 28 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.828q-1.601-1.593-2.528-2.81t-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369.986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z" />
    </svg>
  );
}

function IconComment({ size = 28 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z" />
    </svg>
  );
}

function IconFollows({ size = 28 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M17.346 15.539q0 2.271-1.565 3.866T11.952 21t-3.838-1.595t-1.576-3.867v-8.73q0-1.587 1.092-2.697Q8.72 3 10.308 3t2.678 1.11t1.091 2.698v8.269q0 .88-.615 1.517q-.614.637-1.498.637t-1.52-.627t-.636-1.527V7.269q0-.212.144-.356q.143-.144.356-.144t.356.144t.144.356v7.808q0 .479.327.816q.328.338.807.338t.807-.338t.328-.816V6.789q-.006-1.166-.802-1.977Q11.48 4 10.308 4q-1.163 0-1.966.821q-.804.821-.804 1.987v8.73q-.005 1.853 1.283 3.157Q10.11 20 11.96 20q1.823 0 3.1-1.305t1.287-3.156v-8.27q0-.212.144-.356t.357-.144t.356.144t.143.356z" />
    </svg>
  );
}

function IconMostActive({ size = 36 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48">
      <path fill="currentColor" fillRule="evenodd" d="M12 7a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v1h5a1 1 0 0 1 1 1v6a5 5 0 0 1-5 5h-1.683A12.02 12.02 0 0 1 26 27.834V34h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H16a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6v-6.166A12.02 12.02 0 0 1 12.683 20H11a5 5 0 0 1-5-5V9a1 1 0 0 1 1-1h5zm24 9v-6h4v5a3 3 0 0 1-3 3h-1zm-24-6H8v5a3 3 0 0 0 3 3h1z" clipRule="evenodd" />
    </svg>
  );
}

function IconMostFollowed({ size = 36 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="m7.625 6.4l2.8-3.625q.3-.4.713-.587T12 2t.863.188t.712.587l2.8 3.625l4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9l.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25q-.125.05-.275.063T6.975 21q-.8 0-1.4-.6T5 18.925l.1-4.125l-2.725-3.875q-.2-.275-.288-.575T2 9.75q0-.625.363-1.162t1.012-.763z" />
    </svg>
  );
}

function IconFeed({ size = 36 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path fill="currentColor" d="M4 21v-9.375L2.2 13L1 11.4L12 3l11 8.4l-1.2 1.575l-1.8-1.35V21zm4-6q-.425 0-.712-.288T7 14t.288-.712T8 13t.713.288T9 14t-.288.713T8 15m4 0q-.425 0-.712-.288T11 14t.288-.712T12 13t.713.288T13 14t-.288.713T12 15m4 0q-.425 0-.712-.288T15 14t.288-.712T16 13t.713.288T17 14t-.288.713T16 15" />
    </svg>
  );
}

export default async function StatsPage() {
  const [
    overview,
    avgPosts,
    avgFollowers,
    activeUser,
    likedPost,
    followedUser,
    commentedPosts,
  ] = await Promise.all([
    stats.platformOverview(),
    stats.avgPostsPerUser(),
    stats.avgFollowersPerUser(),
    stats.mostActiveUser(),
    stats.mostLikedPost(),
    stats.mostFollowedUser(),
    stats.mostCommentedPosts(),
  ]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-main)", fontFamily: '"Inter", sans-serif', display: "flex", flexDirection: "column" }}>

      {/* Nav */}
      <nav>
        <div className="nav-container">
          <a href="/feed.html" className="nav-logo">
            <svg className="nav-logo-icon" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="currentColor" d="M21.92 6.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 6h-5a1 1 0 0 0 0 2h2.59L13 13.59l-3.29-3.3a1 1 0 0 0-1.42 0l-6 6a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 12.41l3.29 3.3a1 1 0 0 0 1.42 0L20 9.41V12a1 1 0 0 0 2 0V7a1 1 0 0 0-.08-.38"/></svg>
            <span className="nav-logo-text">ClickChat</span>
          </a>
          <button className="btn btn-secondary btn-small" id="logoutBtn">Logout</button>
        </div>
      </nav>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2.5rem 1.5rem", width: "100%", flex: 1 }}>

        {/* Hover styles */}
        <style>{`
          .stat-card { transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; }
          .stat-card:hover { transform: translateY(-4px); border-color: var(--border-strong) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.25); }
          .stat-icon { display: inline-flex; transition: transform 0.18s ease; }
          .stat-card:hover .stat-icon:hover { transform: scale(1.3); }
          .stat-avatar { transition: transform 0.18s ease; }
          .stat-card:hover .stat-avatar:hover { transform: scale(1.15); }
          .stat-number { display: inline-block; transition: transform 0.18s ease; }
          .stat-card:hover .stat-number:hover { transform: scale(1.2); cursor: default; }
          .stat-username { display: inline-block; transition: transform 0.18s ease; }
          .stat-card:hover .stat-username:hover { transform: scale(1.1); cursor: default; }
          .commented-row { transition: border-color 0.18s ease, background-color 0.18s ease; }
          .commented-row:hover { border-color: var(--border-strong) !important; background-color: var(--bg-muted) !important; }
          .commented-text { display: block; transition: transform 0.18s ease; transform-origin: left center; }
          .commented-row:hover .commented-text:hover { transform: scale(1.03); }
        `}</style>

        {/* Overview */}
        <section style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)", marginBottom: "1.5rem" }}>Platform Overview</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Users",    value: overview.users,    Icon: IconUsers,   color: "#4CAF7A", size: 30 },
              { label: "Posts",    value: overview.posts,    Icon: IconPosts,   color: "#5A8DEE", size: 30 },
              { label: "Likes",    value: overview.likes,    Icon: IconHeart,   color: "#E85A5A", size: 36 },
              { label: "Comments", value: overview.comments, Icon: IconComment, color: "#E08A3C", size: 30 },
              { label: "Follows",  value: overview.follows,  Icon: IconFollows, color: "#A78BFA", size: 30 },
            ].map(({ label, value, Icon, color, size }) => (
              <div key={label} className="stat-card" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.75rem 1rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
                <div className="stat-icon" style={{ color }}><Icon size={size} /></div>
                <div className="stat-number" style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)", lineHeight: 1 }}>{value}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Averages */}
        <section style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)", marginBottom: "1.5rem" }}>Averages</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div className="stat-card" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <div className="stat-icon" style={{ color: "#5A8DEE" }}><IconPosts size={36} /></div>
              <div className="stat-number" style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--text)", lineHeight: 1 }}>{avgPosts}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Avg. Posts per User</div>
            </div>
            <div className="stat-card" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "2.5rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
              <div className="stat-icon" style={{ color: "#A78BFA" }}><IconFollows size={36} /></div>
              <div className="stat-number" style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--text)", lineHeight: 1 }}>{avgFollowers}</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Avg. Followers per User</div>
            </div>
          </div>
        </section>

        {/* Top Performers */}
        <section style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)", marginBottom: "1.5rem" }}>Top Performers</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {activeUser && (
              <div className="stat-card" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div className="stat-icon" style={{ color: "#C9A227" }}><IconMostActive size={44} /></div>
                {/* Avatar */}
                <div className="stat-avatar" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#C9A22733", border: "2px solid #C9A227", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: "700", color: "#C9A227", marginTop: "0.25rem", flexShrink: 0 }}>
                  {activeUser.username[0].toUpperCase()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Most Active User</div>
                <div className="stat-username" style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--text)" }}>@{activeUser.username}</div>
                <div style={{ color: "#C9A227", fontSize: "0.95rem", fontWeight: "500" }}>{activeUser.postCount} posts</div>
              </div>
            )}
            {followedUser && (
              <div className="stat-card" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div className="stat-icon" style={{ color: "#E6E8EA" }}><IconMostFollowed size={44} /></div>
                {/* Avatar */}
                <div className="stat-avatar" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#E6E8EA1A", border: "2px solid #E6E8EA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: "700", color: "#E6E8EA", marginTop: "0.25rem", flexShrink: 0 }}>
                  {followedUser.username[0].toUpperCase()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Most Followed User</div>
                <div className="stat-username" style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--text)" }}>@{followedUser.username}</div>
                <div style={{ color: "#E6E8EA", fontSize: "0.95rem", fontWeight: "500" }}>{followedUser.followerCount} followers</div>
              </div>
            )}
            {likedPost && (
              <div className="stat-card" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                <div className="stat-icon" style={{ color: "#E85A5A" }}><IconHeart size={52} /></div>
                {/* Avatar */}
                <div className="stat-avatar" style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#E85A5A22", border: "2px solid #E85A5A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: "700", color: "#E85A5A", marginTop: "0.25rem", flexShrink: 0 }}>
                  {likedPost.user.username[0].toUpperCase()}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Most Liked Post</div>
                <div className="stat-username" style={{ fontSize: "1.25rem", fontWeight: "bold", color: "var(--text)" }}>@{likedPost.user.username}</div>
                <div style={{ color: "#E85A5A", fontSize: "0.95rem", fontWeight: "500" }}>{likedPost.likeCount} likes</div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflowWrap: "break-word", textAlign: "center" }}>
                  {likedPost.content}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Top 5 Most Commented Posts */}
        <section style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text)", marginBottom: "1.5rem" }}>Top 5 Most Commented Posts</h2>
          {commentedPosts.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No commented posts yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {commentedPosts.map((post, i) => (
                <div key={post.id} className="commented-row" style={{ display: "flex", alignItems: "flex-start", gap: "1rem", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1rem 1.25rem" }}>
                  <div style={{ minWidth: "2rem", height: "2rem", backgroundColor: "var(--primary)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.875rem", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <p style={{ fontWeight: "600", color: "var(--text)", marginBottom: "0.25rem" }}>
                      @{post.user.username}
                      <span style={{ fontWeight: "400", color: "var(--text-muted)", marginLeft: "0.5rem", fontSize: "0.875rem" }}>
                        · {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
                      </span>
                    </p>
                    <p className="commented-text" style={{ color: "var(--text-muted)", fontSize: "0.9rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflowWrap: "break-word" }}>
                      {post.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer>
        <div className="footer-nav">
          <a href="/feed.html" className="footer-nav-btn" title="Feed" aria-label="Feed">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </a>
          <a href="/users.html" className="footer-nav-btn" title="Discover" aria-label="Discover Users">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.5 1.6 2.5 3.27 2.5 5.45V19h8v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </a>
          <a href="/stats" className="footer-nav-btn active" title="Statistics" aria-label="Statistics">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </a>
          <a href="/profile.html" className="footer-nav-btn profile-btn" id="profileNavBtn" title="Profile" aria-label="My Profile">
            <div className="footer-profile-avatar" id="footerProfileAvatar"></div>
          </a>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var user = JSON.parse(localStorage.getItem('currentUser') || 'null');
          if (!user) { window.location.href = '/login.html'; return; }
          var el = document.getElementById('footerProfileAvatar');
          if (el) el.textContent = user.username.substring(0, 2).toUpperCase();
          var logoutBtn = document.getElementById('logoutBtn');
          if (logoutBtn) logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = '/login.html';
          });
        })();
      ` }} />
    </div>
  );
}


