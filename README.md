# Blogging Platform - Complete Documentation 


## Table of Contents
- [Key Features](#key-features-✨)
- [Technical Stack](#technical-stack-💻)
- [Installation](#installation-🛠️)
- [API Endpoints](#api-endpoints-🔑)
- [Security](#security-🔒)
- [Nested Comments System](#nested-comments-system-💬)
- [Project Structure](#project-structure-📂)
- [Contribution](#contribution-🤝)
- [Developer CV](#developer-cv-📄)

---

## Key Features ✨
### Core Functionality
- **Posts Management**
  - Create/Edit/Delete posts with image support
  - Pagination & Category Filtering
  - Likes System with real-time updates

- **Advanced Comments**
  - Unlimited-depth nested comments
  - Replies with @mentions
  - Dynamic loading & lazy rendering

- **Admin Dashboard**
  - User/Post/Comment management
  - Real-time analytics
  - Content moderation tools

---

## Technical Stack 💻
### Backend
| Technology       | Usage                          |
|------------------|--------------------------------|
| Node.js 18.x     | Runtime Environment           |
| Express.js 4.x   | REST API Framework            |
| MongoDB 7.x      | NoSQL Database                |
| Mongoose 8.x     | ODM Library                   |
| Cloudinary       | Image/Video Storage           |

### Frontend
| Technology       | Usage                          |
|------------------|--------------------------------|
| React 18         | UI Library                    |
| Redux Toolkit    | State Management              |
| React Router 6   | Navigation                    |
| Axios            | HTTP Client                   |
| React Toastify   | Notification System           |

---

## Installation 🛠️
### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Setup Instructions
1. Configure backend environment (.env):
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url

cd backend && npm install
cd ../frontend && npm install

# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm start

Data Protection
Password hashing: bcrypt with 12 salt rounds

JWT tokens: 30-day expiry with refresh mechanism

Input sanitization: XSS protection for all user inputs


The project deals with Nested Comments 