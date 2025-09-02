# Connection - Social Networking Platform

A modern social networking application built with Node.js, Express, and Prisma, featuring user authentication, connection management, and email notifications. This platform allows users to send, accept, and reject connection requests, building meaningful relationships in a secure environment.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT, bcrypt for password hashing
- **Email Service**: Nodemailer with Gmail SMTP
- **Logging**: Winston logger with custom middleware
- **Development**: ES6 modules, Prisma migrations
- **Security**: CORS enabled, request validation

## Features

### 1. User Management
- **User Registration**: Create new accounts with username, email, and password
- **User Authentication**: Secure login with JWT token generation
- **Profile Management**: View user profiles by username
- **Password Security**: Bcrypt hashing for secure password storage

### 2. Connection System
- **Send Connection Requests**: Initiate connections with other users
- **Accept Connections**: Approve incoming connection requests
- **Reject Connections**: Decline unwanted connection requests
- **Connection Status Tracking**: Monitor PENDING, ACCEPTED, and REJECTED states
- **Connection History**: View all pending requests and accepted connections

### 3. Email Notifications
- **Connection Request Notifications**: Automated emails for new requests
- **Request Status Updates**: Notifications for accepted/rejected requests
- **HTML Templates**: Professional email templates for better user experience
- **Gmail Integration**: Reliable email delivery through Gmail SMTP

### 4. Security & Middleware
- **JWT Authentication**: Secure route protection
- **Request Validation**: Input sanitization and validation
- **Error Handling**: Comprehensive error management with logging
- **Request Stack Tracking**: Debug information for development

## Application Flow

### 1. User Registration & Authentication
- User creates account with unique username and email
- Password is securely hashed using bcrypt
- JWT token is generated and returned upon successful login
- Protected routes require valid JWT token

### 2. Connection Management
- Authenticated users can send connection requests to other users
- Recipients receive email notifications about new requests
- Users can accept or reject incoming connection requests
- Connection status is updated in real-time

### 3. Email Notification System
- Automated email notifications for connection events
- HTML templates for professional appearance
- Gmail SMTP integration for reliable delivery
- Configurable email settings through environment variables

### 4. Data Management
- SQLite database with Prisma ORM
- Efficient data relationships and indexing
- Automatic timestamp management
- Cascade deletion for data integrity

## API Endpoints

### Authentication
- `POST /user/create` - Create new user account
- `POST /user/login` - User login and JWT generation

### User Management
- `GET /profile/:username` - Get user profile information

### Connection Management
- `POST /connection/send` - Send connection request (Protected)
- `PATCH /connection/accept` - Accept connection request (Protected)
- `PATCH /connection/reject` - Reject connection request (Protected)
- `GET /connections/pending` - Get pending connection requests (Protected)
- `GET /connections` - Get accepted connections/friends list (Protected)

### System
- `GET /` - Welcome message
- `GET /health` - Server health check

## Database Schema

### User Model
- Unique username and email
- Secure password storage
- Timestamp tracking
- Connection relationships

### Connection Model
- Sender and receiver relationships
- Connection status (PENDING, ACCEPTED, REJECTED)
- Timestamp tracking
- Unique constraint on sender-receiver pairs

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account for email service

### Environment Variables
Create a `.env` file with the following variables:
```env
PORT=3400
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-jwt-secret
```

### Installation Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations: `npx prisma migrate dev`
5. Start the server: `npm start`

## Project Structure

```
connection/
├── controller/          # Route controllers
├── middleware/          # Custom middleware
├── prisma/             # Database schema and migrations
├── repository/          # Data access layer
├── routes/             # API route definitions
├── service/            # Business logic services
├── templates/          # Email HTML templates
├── utils/              # Utility functions
├── logs/               # Application logs
└── server.js           # Main application entry point
```

## Development Features

- **ES6 Modules**: Modern JavaScript syntax
- **Prisma Migrations**: Database version control
- **Winston Logging**: Comprehensive application logging
- **Error Handling**: Graceful error management
- **Request Stack Tracking**: Development debugging support

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **CORS Protection**: Cross-origin request handling
- **Input Validation**: Request data sanitization
- **Protected Routes**: Authentication middleware for sensitive endpoints

This connection platform provides a robust foundation for social networking applications, ensuring secure user interactions, efficient data management, and professional user experience through automated email notifications.
