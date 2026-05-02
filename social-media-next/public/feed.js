document.addEventListener("DOMContentLoaded", async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const initials = currentUser.username.substring(0, 2).toUpperCase();
  const footerProfileAvatar = document.getElementById("footerProfileAvatar");
  if (footerProfileAvatar) footerProfileAvatar.textContent = initials;

  const postsContainer = document.getElementById("postsContainer");
  const createPostBtn = document.getElementById("createPostBtn");
  const postContent = document.getElementById("postContent");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  createPostBtn.addEventListener("click", async () => {
    const content = postContent.value.trim();
    if (!content) {
      alert("Please write something before posting!");
      return;
    }
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, content }),
    });
    postContent.value = "";
    renderPosts();
  });

  async function renderPosts() {
    postsContainer.innerHTML = `<div class="loading-wrap"><div class="loading-spinner"></div><span>Loading posts…</span></div>`;
    const res = await fetch(`/api/posts?userId=${currentUser.id}`);
    const feedPosts = await res.json();

    postsContainer.innerHTML = "";

    if (feedPosts.length === 0) {
      postsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem;">Your feed is empty!</p>
          <p style="margin-top: 0.5rem;">Follow some users to see their posts here.</p>
          <a href="users.html" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Discover Users</a>
        </div>
      `;
      return;
    }

    feedPosts.forEach((post) => {
      postsContainer.appendChild(createPostElement(post));
    });
  }

  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    const isLiked = post.likes.length > 0;
    const isOwnPost = post.user.id === currentUser.id;
    const likeCount = post._count.likes;
    const commentCount = post._count.comments;
    const timeAgo = getTimeAgo(post.createdAt);
    const avatarInitials = post.user.username.substring(0, 2).toUpperCase();

    postDiv.innerHTML = `
      <div class="post-header">
        <div class="post-author">
          <div class="post-avatar">${avatarInitials}</div>
          <div class="post-author-info">
            <div class="post-author-header">
              <h3>${post.user.username}</h3>
              <p class="post-time">${timeAgo}</p>
            </div>
          </div>
        </div>
        ${isOwnPost ? `<button class="post-action-btn post-delete-btn" data-post-id="${post.id}" data-action="delete"><svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"/></svg></button>` : ""}
      </div>

      <div class="post-content">${post.content}</div>

      <div class="post-actions">
        <button class="post-action-btn ${isLiked ? "liked" : ""}" data-post-id="${post.id}" data-action="like">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.828q-1.601-1.593-2.528-2.81q-.926-1.218-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369.986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z"/></svg>
          <span class="like-count">${likeCount} ${likeCount === 1 ? "Like" : "Likes"}</span>
        </button>
        <button class="post-action-btn" data-post-id="${post.id}" data-action="comment">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/></svg>
          <span class="comment-count">${commentCount} ${commentCount === 1 ? "Comment" : "Comments"}</span>
        </button>
      </div>

      <div class="post-comments" id="comments-${post.id}" style="display: none;">
        <div class="comment-form">
          <textarea placeholder="Write a comment..." id="comment-input-${post.id}" rows="2"></textarea>
          <button class="btn btn-small btn-primary" data-post-id="${post.id}" data-action="add-comment">Comment</button>
        </div>
        <div class="comments-list" id="comments-list-${post.id}"></div>
      </div>
    `;

    postDiv.querySelector('[data-action="like"]').addEventListener("click", () => toggleLike(post.id, postDiv));
    postDiv.querySelector('[data-action="comment"]').addEventListener("click", () => {
      const section = postDiv.querySelector(`#comments-${post.id}`);
      if (section.style.display === "none") {
        section.style.display = "block";
        loadComments(post.id, postDiv);
      } else {
        section.style.display = "none";
      }
    });
    const deleteBtn = postDiv.querySelector('[data-action="delete"]');
    if (deleteBtn) deleteBtn.addEventListener("click", () => deletePost(post.id));
    postDiv.querySelector('[data-action="add-comment"]').addEventListener("click", () => addComment(post.id, postDiv));

    return postDiv;
  }

  async function toggleLike(postId, postDiv) {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, postId }),
    });
    const { liked } = await res.json();
    const likeBtn = postDiv.querySelector('[data-action="like"]');
    likeBtn.classList.toggle("liked", liked);
    const countSpan = likeBtn.querySelector(".like-count");
    const current = parseInt(countSpan.textContent);
    const newCount = liked ? current + 1 : current - 1;
    countSpan.textContent = `${newCount} ${newCount === 1 ? "Like" : "Likes"}`;
  }

  async function deletePost(postId) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id }),
    });
    renderPosts();
  }

  async function addComment(postId, postDiv) {
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();
    if (!content) return;
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, postId, content }),
    });
    input.value = "";
    loadComments(postId, postDiv);
    const countSpan = postDiv.querySelector(".comment-count");
    const current = parseInt(countSpan.textContent);
    const newCount = current + 1;
    countSpan.textContent = `${newCount} ${newCount === 1 ? "Comment" : "Comments"}`;
  }

  async function loadComments(postId, postDiv) {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const comments = await res.json();
    const commentsList = postDiv.querySelector(`#comments-list-${postId}`);
    commentsList.innerHTML = "";
    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      const initials = comment.user.username.substring(0, 2).toUpperCase();
      commentDiv.innerHTML = `
        <div class="comment-avatar">${initials}</div>
        <div class="comment-content">
          <div class="comment-author-header">
            <div class="comment-author">${comment.user.username}</div>
            <div class="comment-time">${getTimeAgo(comment.createdAt)}</div>
          </div>
          <div class="comment-text">${comment.content}</div>
        </div>
      `;
      commentsList.appendChild(commentDiv);
    });
  }

  function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  renderPosts();
});
