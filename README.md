# ClickChat - Social Media Platform

A social media platform built with HTML5, CSS3, and Vanilla JavaScript for CMPS350 Web Development course.

## 🚀 Features

### Implemented ✅

- **User Authentication**
  - Registration with email validation
  - Login system
  - Password validation (min 6 characters)
  - Session management with localStorage

- **User Profiles**
  - View user profile with stats (posts, followers, following)
  - Edit profile (username and bio)
  - Display user's posts

- **News Feed**
  - Create new posts (text-based)
  - View posts from followed users
  - Real-time post updates

- **Post Interactions**
  - Like posts (with like count)
  - Comment on posts
  - Delete own posts
  - View post timestamp

- **Social Features**
  - Follow/unfollow users
  - View all users
  - See follower/following counts

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox & Grid layouts, responsive design
- **Vanilla JavaScript (ES6+)** - DOM manipulation, event handling
- **localStorage** - Client-side data persistence (JSON format)

## 📁 Project Structure

```
social-media-platform/
├── index.html          # Landing page
├── login.html          # Login page
├── register.html       # Registration page
├── feed.html           # News feed (main page)
├── profile.html        # User profile page
├── users.html          # Users discovery page
├── login.js            # Login logic
├── register.js         # Registration logic
├── feed.js             # Feed & post interactions
├── profile.js          # Profile management
├── users.js            # User discovery & follow
└── styles/
    ├── reset.css       # CSS reset
    └── global.css      # Global styles & layout
```

## 🎨 Design Features

- Purple/violet color theme with light and dark mode support
- Responsive layout that works on desktop, tablet, and mobile
- Clean and modern UI with smooth transitions
- Accessible color contrast ratios

## 💾 Data Structure

All data is stored in localStorage as JSON:

### Users
```javascript
{
  id: "unique-id",
  username: "username",
  email: "email@example.com",
  password: "password",
  bio: "User bio",
  followers: ["userId1", "userId2"],
  following: ["userId3", "userId4"],
  createdAt: "ISO timestamp"
}
```

### Posts
```javascript
{
  id: "unique-id",
  userId: "author-id",
  username: "author-username",
  content: "Post content",
  likes: ["userId1", "userId2"],
  comments: [
    {
      id: "comment-id",
      userId: "commenter-id",
      username: "commenter-username",
      text: "Comment text",
      createdAt: "ISO timestamp"
    }
  ],
  createdAt: "ISO timestamp"
}
```

## 🚦 How to Run

1. Open `index.html` in a web browser (Chrome, Firefox, Safari, Edge)
2. No server or build process required!
3. All data persists in your browser's localStorage

## 📖 How to Use

### 1. Register a New Account
- Navigate to the Register page
- Enter a username (min 3 characters)
- Enter a valid email address
- Create a password (min 6 characters)
- Confirm your password
- Click "Create Account"

### 2. Login
- Go to the Login page
- Enter your email and password
- Click "Login"

### 3. Create a Post
- Once logged in, you'll see the News Feed
- Type your message in the "What's on your mind?" box
- Click "Post"
- Your post appears at the top of the feed

### 4. Interact with Posts
- Click the ❤️ button to like/unlike a post
- Type a comment and click "Comment" to add a comment
- Click 🗑️ to delete your own posts

### 5. Follow Users
- Go to the "Users" page from the navigation
- Click "Follow" on any user
- Their posts will now appear in your feed
- Click "Unfollow" to stop seeing their posts

### 6. Edit Your Profile
- Go to "My Profile" from the navigation
- Click "Edit Profile"
- Update your username or bio
- Click "Save Changes"

## ✨ Highlights

- **No frameworks** - Pure vanilla JavaScript, CSS, and HTML
- **Fully responsive** - Works on all screen sizes
- **Dark mode support** - Automatically adapts to system preference
- **Persistent data** - All data saved in localStorage
- **Clean code** - Well-organized, commented
- **Form validation** - Email format, password strength checks
- **Real-time updates** - Immediate UI updates after actions

## 📝 Notes

- This is a client-side only application
- Passwords are stored in plain text in localStorage
- Data is stored per-browser 

## 🎓 Course Information

- **Course**: CMPS350 - Web Development Fundamentals
- **Project**: Phase 1 - Social Media Platform
- **Due Date**: March 26, 2026

