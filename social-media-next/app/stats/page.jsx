import * as stats from "@/repos/stats";

export const metadata = {
  title: "ClickChat — Platform Statistics",
};

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
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        📊 Platform Statistics
      </h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>Live data from the ClickChat database</p>

      {/* Overview Cards */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.5rem" }}>
          Platform Overview
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Users", value: overview.users, emoji: "👤" },
            { label: "Posts", value: overview.posts, emoji: "📝" },
            { label: "Likes", value: overview.likes, emoji: "❤️" },
            { label: "Comments", value: overview.comments, emoji: "💬" },
            { label: "Follows", value: overview.follows, emoji: "🔗" },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "1.25rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{card.emoji}</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#111827" }}>{card.value}</div>
              <div style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "0.25rem" }}>{card.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Averages */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.5rem" }}>
          Averages
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <StatCard label="Avg. Posts per User" value={avgPosts} unit="posts" />
          <StatCard label="Avg. Followers per User" value={avgFollowers} unit="followers" />
        </div>
      </section>

      {/* Top Performers */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.5rem" }}>
          Top Performers
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          {activeUser && (
            <HighlightCard
              title="Most Active User"
              emoji="🏆"
              name={activeUser.username}
              detail={`${activeUser.postCount} posts`}
            />
          )}
          {followedUser && (
            <HighlightCard
              title="Most Followed User"
              emoji="⭐"
              name={followedUser.username}
              detail={`${followedUser.followerCount} followers`}
            />
          )}
          {likedPost && (
            <HighlightCard
              title="Most Liked Post"
              emoji="❤️"
              name={`@${likedPost.user.username}`}
              detail={`${likedPost.likeCount} likes`}
              excerpt={likedPost.content}
            />
          )}
        </div>
      </section>

      {/* Top 5 Commented Posts */}
      <section>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.5rem" }}>
          Top 5 Most Commented Posts
        </h2>
        {commentedPosts.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No commented posts yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {commentedPosts.map((post, i) => (
              <div
                key={post.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "1rem",
                }}
              >
                <div style={{
                  minWidth: "2rem",
                  height: "2rem",
                  background: "#3b82f6",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "600", color: "#111827", marginBottom: "0.25rem" }}>
                    @{post.user.username}
                    <span style={{ fontWeight: "400", color: "#6b7280", marginLeft: "0.5rem", fontSize: "0.875rem" }}>
                      · {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
                    </span>
                  </p>
                  <p style={{ color: "#374151", fontSize: "0.9rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ label, value, unit }) {
  return (
    <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem" }}>
      <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#111827" }}>{value}</div>
      <div style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "0.25rem" }}>{label}</div>
    </div>
  );
}

function HighlightCard({ title, emoji, name, detail, excerpt }) {
  return (
    <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem" }}>
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <div style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{title}</div>
      <div style={{ fontSize: "1.125rem", fontWeight: "bold", color: "#111827" }}>{name}</div>
      <div style={{ color: "#3b82f6", fontSize: "0.875rem", marginTop: "0.25rem" }}>{detail}</div>
      {excerpt && (
        <p style={{ color: "#374151", fontSize: "0.875rem", marginTop: "0.5rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
          {excerpt}
        </p>
      )}
    </div>
  );
}
