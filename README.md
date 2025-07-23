# DevConnector

A social networking platform for developers to connect, share posts, and showcase their professional profiles.

## 🚀 Features

### Authentication & Authorization
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes for authenticated users only

### Profile Management
- Create and edit developer profiles
- Add professional experience and education
- Display skills, bio, and social media links
- GitHub integration to showcase repositories
- Gravatar integration for profile pictures

### Social Features
- Create, view, edit, and delete posts
- Like and unlike posts
- Comment on posts with threaded discussions
- View all developers in the community
- Browse individual developer profiles

### Dashboard
- Personalized dashboard for logged-in users
- Quick access to profile management
- Overview of user's posts and activity

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Redux & Redux Thunk** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Express Validator** - Input validation and sanitization

### Development Tools
- **Nodemon** - Development server auto-reload
- **Concurrently** - Run multiple commands simultaneously
- **Config** - Configuration management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (MongoDB Atlas recommended)

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Roshan-Chhetri28/DevConnector.git
   cd DevConnector
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Configure environment variables**
   - Update `config/default.json` with your MongoDB URI and JWT secret
   - Add your GitHub client ID and secret for GitHub integration

5. **Run the application**
   
   **Development mode (runs both server and client):**
   ```bash
   npm run dev
   ```
   
   **Server only:**
   ```bash
   npm run server
   ```
   
   **Client only:**
   ```bash
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
DevConnector/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── layout/     # Layout components
│   │   │   ├── posts/      # Post-related components
│   │   │   ├── profile/    # Profile components
│   │   │   └── profiles/   # Profiles listing
│   │   ├── actions/        # Redux actions
│   │   ├── reducers/       # Redux reducers
│   │   ├── utils/          # Utility functions
│   │   └── dashboard/      # Dashboard components
├── config/                 # Configuration files
├── middleware/             # Custom middleware
├── models/                 # MongoDB models
├── routes/                 # API routes
│   └── api/
├── devconnector_html_theme/ # Static HTML templates
└── server.js              # Express server entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users` - Register user
- `POST /api/auth` - Authenticate user
- `GET /api/auth` - Get authenticated user

### Profiles
- `GET /api/profile/me` - Get current user's profile
- `POST /api/profile` - Create or update profile
- `GET /api/profile` - Get all profiles
- `GET /api/profile/user/:user_id` - Get profile by user ID
- `DELETE /api/profile` - Delete profile and user
- `PUT /api/profile/experience` - Add experience
- `DELETE /api/profile/experience/:exp_id` - Delete experience
- `PUT /api/profile/education` - Add education
- `DELETE /api/profile/education/:edu_id` - Delete education

### Posts
- `POST /api/post` - Create a post
- `GET /api/post` - Get all posts
- `GET /api/post/:id` - Get post by ID
- `DELETE /api/post/:id` - Delete post
- `PUT /api/post/like/:id` - Like a post
- `PUT /api/post/unlike/:id` - Unlike a post
- `POST /api/post/comment/:id` - Comment on a post
- `DELETE /api/post/comment/:post_id/:comment_id` - Delete comment

## 🎨 UI/UX Features

- Responsive design for mobile and desktop
- Clean and modern interface
- Loading spinners for better user experience
- Alert notifications for user feedback
- Private route protection
- Automatic redirects for authenticated users

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration

## 🚀 Deployment

The application is ready for deployment on platforms like:
- **Frontend**: Netlify, Vercel, or Heroku
- **Backend**: Heroku, Railway, or DigitalOcean
- **Database**: MongoDB Atlas (already configured)

Make sure to update the configuration files with production URLs and secrets.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Roshan Chhetri**
- GitHub: [@Roshan-Chhetri28](https://github.com/Roshan-Chhetri28)

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainer.

---

⭐ If you found this project helpful, please give it a star!
