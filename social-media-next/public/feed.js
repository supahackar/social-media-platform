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
          <p style="font-size: 1.125rem;">No posts yet!</p>
          <p style="margin-top: 0.5rem;">Be the first to share something.</p>
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
    const isFollowed = post.followedByMe || false;
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
              ${!isOwnPost ? `<button class="btn btn-small ${isFollowed ? "btn-secondary" : "btn-primary"} follow-user-btn" data-user-id="${post.user.id}" style="margin-left:auto;">${isFollowed ? "Unfollow" : "Follow"}</button>` : ""}
            </div>
          </div>
        </div>
        ${isOwnPost ? `<button class="post-action-btn post-delete-btn" title="Delete post" data-post-id="${post.id}" data-action="delete"><svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"/></svg></button>` : ""}
      </div>

      <div class="post-content">${post.content}</div>

      <div class="post-actions">
        <button class="post-action-btn ${isLiked ? "liked" : ""}" data-post-id="${post.id}" data-action="like" title="${likeCount === 1 ? '1 Like' : likeCount + ' Likes'}">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.828q-1.601-1.593-2.528-2.81q-.926-1.218-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369.986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z"/></svg>
          <span class="like-count">${likeCount}</span>
        </button>
        <button class="post-action-btn" data-post-id="${post.id}" data-action="comment" title="${commentCount === 1 ? '1 Comment' : commentCount + ' Comments'}">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/></svg>
          <span class="comment-count">${commentCount}</span>
        </button>
      </div>

      <div class="post-comments" id="comments-${post.id}" style="display: none;">
        <div class="comment-form">
          <textarea placeholder="Write a comment..." id="comment-input-${post.id}"></textarea>
          <div class="comment-form-actions">
            <button class="btn btn-primary" data-post-id="${post.id}" data-action="add-comment">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
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
    const followBtn = postDiv.querySelector('.follow-user-btn');
    if (followBtn) followBtn.addEventListener("click", () => toggleFollowUser(post.user.id, followBtn));

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
    countSpan.textContent = `${newCount}`;
    likeBtn.title = `${newCount === 1 ? '1 Like' : newCount + ' Likes'}`;
  }

  function showConfirm(title, message) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "confirm-modal-overlay";
      overlay.innerHTML = `
        <div class="confirm-modal-box">
          <h3>${title}</h3>
          <p>${message}</p>
          <div class="confirm-modal-actions">
            <button class="btn btn-secondary" id="confirmCancel">Cancel</button>
            <button class="btn btn-primary confirm-delete-btn" id="confirmOk">Delete</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      overlay.querySelector("#confirmCancel").addEventListener("click", () => { overlay.remove(); resolve(false); });
      overlay.querySelector("#confirmOk").addEventListener("click", () => { overlay.remove(); resolve(true); });
      overlay.addEventListener("click", (e) => { if (e.target === overlay) { overlay.remove(); resolve(false); } });
    });
  }

  async function deletePost(postId) {
    if (!await showConfirm("Delete Post", "This action can't be undone.")) return;
    await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id }),
    });
    renderPosts();
  }

  async function deleteComment(commentId, postId, postDiv) {
    await fetch("/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId, userId: currentUser.id }),
    });
    loadComments(postId, postDiv);
    const countSpan = postDiv.querySelector(".comment-count");
    const current = parseInt(countSpan.textContent);
    const newCount = Math.max(0, current - 1);
    countSpan.textContent = `${newCount}`;
  }

  async function toggleFollowUser(userId, btn) {
    const res = await fetch("/api/follows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: currentUser.id, followingId: userId }),
    });
    const { following } = await res.json();
    btn.textContent = following ? "Unfollow" : "Follow";
    btn.classList.toggle("btn-primary", !following);
    btn.classList.toggle("btn-secondary", following);
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
    countSpan.textContent = `${newCount}`;
  }

  async function loadComments(postId, postDiv) {
    const res = await fetch(`/api/comments?postId=${postId}`);
    const comments = await res.json();
    const sorted = comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const commentsList = postDiv.querySelector(`#comments-list-${postId}`);
    commentsList.innerHTML = "";
    sorted.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      const initials = comment.user.username.substring(0, 2).toUpperCase();
      const isOwnComment = comment.user.id === currentUser.id;
      commentDiv.innerHTML = `
        <div class="comment-avatar">${initials}</div>
        <div class="comment-content">
          <div class="comment-author-header">
            <div class="comment-author">${comment.user.username}</div>
            <div class="comment-time">${getTimeAgo(comment.createdAt)}</div>
            ${!isOwnComment ? `<button class="btn btn-small btn-primary follow-comment-user-btn" data-user-id="${comment.user.id}">Follow</button>` : ""}
            ${isOwnComment ? `<button class="comment-delete-btn" data-comment-id="${comment.id}" title="Delete comment" style="margin-left:auto;background:none;border:none;cursor:pointer;padding:0 0.2rem;line-height:1;display:flex;align-items:center;"><svg class="comment-delete-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"/></svg></button>` : ""}
          </div>
          <div class="comment-text">${comment.content}</div>
        </div>
      `;
      const delBtn = commentDiv.querySelector('.comment-delete-btn');
      if (delBtn) delBtn.addEventListener('click', () => deleteComment(comment.id, postId, postDiv));
      const followBtn = commentDiv.querySelector('.follow-comment-user-btn');
      if (followBtn) followBtn.addEventListener('click', () => toggleFollowUser(comment.user.id, followBtn));
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
