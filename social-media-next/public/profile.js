document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  const commentDisplayCount = {};

  const logoutBtn = document.getElementById("logoutBtn");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const editProfileForm = document.getElementById("editProfileForm");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const postsContainer = document.getElementById("postsContainer");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });

  function loadProfile() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === currentUser.id);
    
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    const initials = user.username.substring(0, 2).toUpperCase();
    document.getElementById("profileAvatar").textContent = initials;
    document.getElementById("footerProfileAvatar").textContent = initials;
    document.getElementById("profileUsername").textContent = user.username;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileBio").textContent = user.bio || "Add a bio to your profile";
    
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = posts.filter(p => p.userId === user.id);
    
    document.getElementById("postsCount").textContent = userPosts.length;
    document.getElementById("followersCount").textContent = user.followers.length;
    document.getElementById("followingCount").textContent = user.following.length;
    
    renderUserPosts();
  }

  editProfileBtn.addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.id === currentUser.id);
    
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editBio").value = user.bio || "";
    
    editProfileForm.style.display = "block";
    editProfileBtn.style.display = "none";
  });

  cancelEditBtn.addEventListener("click", () => {
    editProfileForm.style.display = "none";
    editProfileBtn.style.display = "inline-block";
  });

  saveProfileBtn.addEventListener("click", () => {
    const newUsername = document.getElementById("editUsername").value.trim();
    const newBio = document.getElementById("editBio").value.trim();
    
    if (!newUsername || newUsername.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) return;
    
    const existingUser = users.find(u => u.username === newUsername && u.id !== currentUser.id);
    if (existingUser) {
      alert("This username is already taken.");
      return;
    }
    
    users[userIndex].username = newUsername;
    users[userIndex].bio = newBio;
    
    localStorage.setItem("users", JSON.stringify(users));
    
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => {
      if (post.userId === currentUser.id) {
        post.username = newUsername;
      }
      post.comments.forEach(comment => {
        if (comment.userId === currentUser.id) {
          comment.username = newUsername;
        }
      });
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    
    editProfileForm.style.display = "none";
    editProfileBtn.style.display = "inline-block";
    
    loadProfile();
  });

  function renderUserPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = posts.filter(p => p.userId === currentUser.id);
    
    postsContainer.innerHTML = "";
    
    if (userPosts.length === 0) {
      postsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.125rem;">You haven't posted anything yet.</p>
          <a href="feed.html" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Create Your First Post</a>
        </div>
      `;
      return;
    }
    
    userPosts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });
  }

  function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    
    const isLiked = post.likes.includes(currentUser.id);
    const isOwnPost = post.userId === currentUser.id;
    
    const timeAgo = getTimeAgo(post.createdAt);
    
    const initials = post.username.substring(0, 2).toUpperCase();
    
    postDiv.innerHTML = `
      <div class="post-header">
        <div class="post-author">
          <div class="post-avatar">${initials}</div>
          <div class="post-author-info">
            <div class="post-author-header">
              <h3>${post.username}</h3>
              <p class="post-time">${timeAgo}</p>
            </div>
          </div>
        </div>
        ${isOwnPost ? `<button class="post-action-btn post-delete-btn" data-post-id="${post.id}" data-action="delete"><svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"/></svg></button>` : ''}
      </div>
      
      <div class="post-content">${post.content}</div>
      
      <div class="post-actions">
        <button class="post-action-btn ${isLiked ? 'liked' : ''}" data-post-id="${post.id}" data-action="like">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.828q-1.601-1.593-2.528-2.81q-.926-1.218-1.296-2.2T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.289Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98q-.369.986-1.296 2.202t-2.519 2.809q-1.592 1.592-4.06 3.828z"/></svg>
          ${post.likes.length} ${post.likes.length === 1 ? 'Like' : 'Likes'}
        </button>
        <button class="post-action-btn" data-post-id="${post.id}" data-action="comment">
          <svg class="post-action-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"/></svg>
          ${post.comments.length} ${post.comments.length === 1 ? 'Comment' : 'Comments'}
        </button>
      </div>
      
      <div class="post-comments" id="comments-${post.id}" style="display: none;">
        <div class="comment-form">
          <input type="text" placeholder="Write a comment..." id="comment-input-${post.id}" />
          <button class="btn btn-small btn-primary" data-post-id="${post.id}" data-action="add-comment">Comment</button>
        </div>
        <div class="comments-list" id="comments-list-${post.id}"></div>
      </div>
    `;
    
    const likeBtn = postDiv.querySelector('[data-action="like"]');
    likeBtn.addEventListener("click", () => toggleLike(post.id));
    
    const commentBtn = postDiv.querySelector('[data-action="comment"]');
    commentBtn.addEventListener("click", () => {
      const commentsSection = postDiv.querySelector(`#comments-${post.id}`);
      commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none";
    });
    
    const deleteBtn = postDiv.querySelector('[data-action="delete"]');
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => deletePost(post.id));
    }
    
    const addCommentBtn = postDiv.querySelector('[data-action="add-comment"]');
    addCommentBtn.addEventListener("click", () => addComment(post.id));
    
    const commentsList = postDiv.querySelector(`#comments-list-${post.id}`);
    renderComments(post.id, commentsList);
    
    return postDiv;
  }

  function toggleLike(postId) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    const likeIndex = post.likes.indexOf(currentUser.id);
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(currentUser.id);
    }
    
    localStorage.setItem("posts", JSON.stringify(posts));
    renderUserPosts();
  }

  function deletePost(postId) {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }
    
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(p => p.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadProfile();
  }

  function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const commentText = input.value.trim();
    
    if (!commentText) return;
    
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    const newComment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      text: commentText,
      createdAt: new Date().toISOString()
    };
    
    post.comments.push(newComment);
    localStorage.setItem("posts", JSON.stringify(posts));
    
    input.value = "";
    renderComments(postId);
  }

  function deleteComment(postId, commentIndex) {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    post.comments.splice(commentIndex, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderComments(postId);
  }

  function renderComments(postId, commentsList) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    if (!commentsList) {
      commentsList = document.getElementById(`comments-list-${postId}`);
    }
    if (!commentsList) return;
    
    if (!commentDisplayCount[postId]) {
      commentDisplayCount[postId] = 5;
    }
    
    commentsList.innerHTML = "";
    
    const displayCount = commentDisplayCount[postId];
    const totalComments = post.comments.length;
    
    const reversedComments = [...post.comments].reverse();
    const commentsToShow = reversedComments.slice(0, displayCount);
    
    commentsToShow.forEach((comment, displayIndex) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      
      const initials = comment.username.substring(0, 2).toUpperCase();
      const isCommentAuthor = comment.userId === currentUser.id;
      const commentTimeAgo = getTimeAgo(comment.createdAt);
      
      const originalIndex = totalComments - 1 - displayIndex;
      
      commentDiv.innerHTML = `
        <div class="comment-avatar">${initials}</div>
        <div class="comment-content">
          <div class="comment-author-header">
            <div class="comment-author">${comment.username}</div>
            <div class="comment-time">${commentTimeAgo}</div>
          </div>
          <div class="comment-text">${comment.text}</div>
        </div>
        ${isCommentAuthor ? `<button class="comment-delete-btn" data-post-id="${postId}" data-comment-index="${originalIndex}"><svg class="comment-delete-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"/></svg></button>` : ''}
      `;
      
      const deleteBtn = commentDiv.querySelector('.comment-delete-btn');
      if (deleteBtn) {
        deleteBtn.addEventListener("click", () => deleteComment(postId, originalIndex));
      }
      
      commentsList.appendChild(commentDiv);
    });
    
    // Add "Read More" button if there are more comments
    if (totalComments > displayCount) {
      const readMoreBtn = document.createElement("button");
      readMoreBtn.classList.add("btn", "btn-small");
      readMoreBtn.style.marginTop = "0.75rem";
      readMoreBtn.style.width = "100%";
      readMoreBtn.textContent = `Read More (${totalComments - displayCount} more)`;
      readMoreBtn.addEventListener("click", () => {
        commentDisplayCount[postId] += 5;
        renderComments(postId);
      });
      commentsList.appendChild(readMoreBtn);
    }
  }

  function getTimeAgo(timestamp) {
    const now = new Date();
    const posted = new Date(timestamp);
    const seconds = Math.floor((now - posted) / 1000);
    
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  loadProfile();
});
