# True Feedback

<div align="center">

**An anonymous messaging platform built with Next.js 15+ that enables users to receive honest, anonymous feedback**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.18-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4.24-purple?style=flat-square)](https://next-auth.js.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Email Verification](#email-verification)
- [AI-Powered Features](#ai-powered-features)
- [Deployment](#deployment)
- [Development](#development)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**True Feedback** is a modern, anonymous messaging platform inspired by services like Qooh.me and Sarahah. It allows users to:

- Create an account with email verification
- Receive anonymous messages from anyone who knows their username
- Control message acceptance with a toggle
- Get AI-generated message suggestions for senders
- View and manage received messages in a dashboard

The application is built with a focus on privacy, simplicity, and user experience.

---

## ✨ Features

### Core Features
- **🔐 User Authentication** - Secure registration and login with NextAuth.js
- **📧 Email Verification** - 6-digit OTP verification using Resend
- **💬 Anonymous Messaging** - Send/receive messages without revealing identity
- **🎛️ Message Toggle** - Users can enable/disable message acceptance
- **🤖 AI Suggestions** - Google Gemini-powered message prompt suggestions
- **📊 Message Dashboard** - View all received messages in chronological order

### Technical Features
- **Server-Side Rendering** - Next.js App Router for optimal performance
- **Type Safety** - Full TypeScript implementation
- **Schema Validation** - Zod for runtime type checking
- **Responsive Design** - Tailwind CSS for mobile-first UI
- **API Route Handlers** - RESTful API endpoints
- **Session Management** - JWT-based authentication
- **Database Optimization** - Mongoose ODM with MongoDB

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.0** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **React Email** - Email template components

### Backend
- **Next.js API Routes** - Serverless functions
- **NextAuth 4.24** - Authentication
- **MongoDB** - NoSQL database
- **Mongoose 8.18** - ODM for MongoDB
- **Zod 4.1** - Schema validation

### External Services
- **Resend** - Transactional email service
- **Google Gemini (AI SDK)** - AI message suggestions
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint 9** - Code linting
- **Turbopack** - Fast bundler
- **pnpm** - Package manager

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│              Next.js App Router + React                  │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ├── Authentication (NextAuth)
                  ├── API Routes
                  │
┌─────────────────┴───────────────────────────────────────┐
│                   Server Side (Next.js)                  │
├──────────────────────────────────────────────────────────┤
│  API Routes                                              │
│  ├── /api/sign-up          → User registration          │
│  ├── /api/verify-code      → Email verification         │
│  ├── /api/send-message     → Anonymous messaging        │
│  ├── /api/get-messages     → Fetch user messages        │
│  ├── /api/accept-messages  → Toggle message acceptance  │
│  ├── /api/suggest-messages → AI suggestions             │
│  └── /api/auth/[...nextauth] → NextAuth handlers        │
└─────────────────┬───────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌────────┐  ┌──────────┐  ┌────────────┐
│MongoDB │  │ Resend   │  │   Google   │
│Database│  │  Email   │  │   Gemini   │
└────────┘  └──────────┘  └────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**, **pnpm**, or **yarn**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Resend API Key** (sign up at [resend.com](https://resend.com))
- **Google AI API Key** (for Gemini, optional for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd true-feedback-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/true-feedback
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/true-feedback

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters
NEXTAUTH_URL=http://localhost:3000

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Google AI (for message suggestions)
GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-api-key
```

#### How to Get API Keys

1. **MongoDB URI**
   - Local: `mongodb://localhost:27017/true-feedback`
   - Atlas: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **NEXTAUTH_SECRET**
   ```bash
   openssl rand -base64 32
   ```

3. **RESEND_API_KEY**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key in your dashboard

4. **GOOGLE_GENERATIVE_AI_API_KEY**
   - Visit [AI Studio](https://aistudio.google.com/)
   - Generate an API key

### Running Locally

```bash
# Development mode with hot-reload
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

The application will be available at **http://localhost:3000**

---

## 📁 Project Structure

```
true-feedback-app/
├── emails/                          # Email templates
│   └── verificationEmails.tsx       # Verification email component
├── public/                          # Static assets
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (auth)/                  # Auth route group
│   │   │   └── sign-in/
│   │   │       └── page.tsx         # Sign-in page
│   │   ├── api/                     # API route handlers
│   │   │   ├── accept-messages/
│   │   │   │   └── route.ts         # Toggle message acceptance
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       ├── options.ts   # NextAuth configuration
│   │   │   │       └── route.ts     # NextAuth handlers
│   │   │   ├── check-username-unique/
│   │   │   │   └── route.ts         # Username availability check
│   │   │   ├── get-messages/
│   │   │   │   └── route.ts         # Fetch user messages
│   │   │   ├── send-message/
│   │   │   │   └── route.ts         # Send anonymous message
│   │   │   ├── sign-up/
│   │   │   │   └── route.ts         # User registration
│   │   │   ├── suggest-messages/
│   │   │   │   └── route.ts         # AI message suggestions
│   │   │   └── verify-code/
│   │   │       └── route.ts         # Email verification
│   │   ├── context/
│   │   │   └── AuthProvider.tsx     # NextAuth session provider
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page
│   ├── helpers/
│   │   ├── apiResponse.ts           # API response utilities
│   │   └── sendVerificationEmail.ts # Email sending helper
│   ├── lib/
│   │   ├── dbConnect.ts             # MongoDB connection
│   │   └── resend.ts                # Resend client
│   ├── model/
│   │   └── User.ts                  # User & Message models
│   ├── schemas/                     # Zod validation schemas
│   │   ├── acceptMessageSchema.ts
│   │   ├── messageSchema.ts
│   │   ├── signInSchema.ts
│   │   ├── signUpSchema.ts
│   │   └── verifySchema.ts
│   ├── types/
│   │   ├── ApiResponse.ts           # API response types
│   │   └── next-auth.d.ts           # NextAuth type extensions
│   └── proxy.ts                     # Middleware (auth guards)
├── .env.local                       # Environment variables (create this)
├── .gitignore
├── next.config.ts                   # Next.js configuration
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts               # Tailwind configuration
└── tsconfig.json                    # TypeScript configuration
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/sign-up`
Register a new user and send verification email.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registration successful! A verification code has been sent to your email address."
}
```

**Validation:**
- Username: 3-20 characters
- Email: Valid email format
- Password: 6-15 characters

---

#### POST `/api/verify-code`
Verify email with 6-digit OTP.

**Request Body:**
```json
{
  "username": "johndoe",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Code verified successfully"
}
```

**Error Responses:**
- `400` - Invalid/Expired code
- `400` - User not found

---

#### POST `/api/auth/callback/credentials`
Sign in with credentials (handled by NextAuth).

**Request Body:**
```json
{
  "identifier": "john@example.com",
  "password": "securePassword123"
}
```

**Notes:**
- `identifier` can be email or username
- Returns NextAuth session token
- User must be verified to sign in

---

### Message Endpoints

#### POST `/api/send-message`
Send an anonymous message to a user.

**Request Body:**
```json
{
  "username": "johndoe",
  "content": "This is an anonymous message!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Validation:**
- Content: 10-256 characters
- Target user must have `isAcceptingMessages: true`

**Error Responses:**
- `404` - User not found
- `403` - User not accepting messages

---

#### GET `/api/get-messages`
Fetch authenticated user's messages (requires authentication).

**Headers:**
```
Cookie: next-auth.session-token=<token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "_id": "user_id",
      "messages": [
        {
          "content": "Anonymous message here",
          "createdAt": "2024-01-15T10:30:00.000Z"
        }
      ]
    }
  ]
}
```

**Error Responses:**
- `401` - Unauthorized (not signed in)
- `404` - User not found

---

#### POST `/api/accept-messages`
Toggle message acceptance status (requires authentication).

**Request Body:**
```json
{
  "acceptMessages": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Messages acceptance status updated successfully",
  "data": {
    "isAcceptingMessages": true
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `404` - User not found

---

### Utility Endpoints

#### GET `/api/check-username-unique?username=johndoe`
Check if a username is available.

**Query Parameters:**
- `username` (required): Username to check

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Username is available",
  "data": {
    "isUnique": true
  }
}
```

**Error Responses:**
- `400` - Invalid username format
- `200` - Username already exists (with `isUnique: false`)

---

#### GET `/api/suggest-messages`
Get AI-generated message suggestions.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Success",
  "data": "What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?"
}
```

**Notes:**
- Returns 3 questions separated by `||`
- Uses Google Gemini 2.5 Flash Lite model
- No authentication required

---

## 🗄️ Database Schema

### User Model

```typescript
interface User {
  _id: ObjectId;
  username: string;              // Unique, 3-20 chars
  email: string;                 // Unique, valid email
  password: string;              // bcrypt hashed (salt rounds: 12)
  verifyCode?: string;           // 6-digit OTP
  verifyCodeExpiry?: Date;       // 1 hour from generation
  isVerified: boolean;           // Default: false
  isAcceptingMessages: boolean;  // Default: true
  messages: Message[];           // Array of received messages
  createdAt: Date;
  updatedAt: Date;
}
```

### Message Model (Subdocument)

```typescript
interface Message {
  _id: ObjectId;
  content: string;               // 10-256 chars
  createdAt: Date;               // Auto-generated
}
```

### Indexes

```javascript
// Recommended indexes for performance
db.users.createIndex({ username: 1 }, { unique: true })
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ username: 1, isVerified: 1 })
```

---

## 🔐 Authentication Flow

### Registration Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant DB
    participant Email

    User->>Frontend: Fill registration form
    Frontend->>API: POST /api/sign-up
    API->>DB: Check existing user
    API->>API: Hash password (bcrypt)
    API->>API: Generate 6-digit OTP
    API->>DB: Create user (unverified)
    API->>Email: Send verification email
    Email->>User: Receive OTP
    API->>Frontend: Success response
```

### Verification Flow

```
1. User receives 6-digit OTP via email
2. User enters OTP in verification form
3. POST /api/verify-code { username, code }
4. Server validates:
   - Code matches
   - Code not expired (< 1 hour old)
5. Set user.isVerified = true
6. User can now sign in
```

### Sign-In Flow

```
1. User enters email/username + password
2. NextAuth credentials provider:
   - Find user by email OR username
   - Check isVerified === true
   - Compare password with bcrypt
3. Generate JWT token
4. Store session in cookie
5. Redirect to dashboard
```

---

## 📧 Email Verification

### Email Template

The project uses **React Email** for beautiful, responsive email templates.

**Location:** `emails/verificationEmails.tsx`

**Features:**
- Custom font (Roboto)
- Responsive design
- Clean, professional layout
- Preview text for email clients

**Sending Process:**

```typescript
// Automated in sign-up flow
const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
const expiryDate = new Date(Date.now() + 3600000); // 1 hour

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: userEmail,
  subject: 'Verify your account',
  react: VerificationEmail({ username, otp: verifyCode })
});
```

**Customization:**
- Change sender email in `src/helpers/sendVerificationEmail.ts`
- Modify template in `emails/verificationEmails.tsx`
- Adjust expiry time in sign-up route

---

## 🤖 AI-Powered Features

### Message Suggestions

The app uses **Google Gemini 2.5 Flash Lite** via the Vercel AI SDK to generate contextual message prompts.

**Implementation:**

```typescript
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemini-2.5-flash-lite'),
  prompt: 'Create three open-ended questions...',
  maxOutputTokens: 600
});
```

**Output Format:**
```
Question 1||Question 2||Question 3
```

**Use Cases:**
- Help users who don't know what to say
- Encourage thoughtful, positive messaging
- Reduce inappropriate content

**Configuration:**
- Model: `gemini-2.5-flash-lite` (fast, cost-effective)
- Max tokens: 600
- No authentication required for endpoint

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Environment Variables in Vercel**
   ```
   MONGO_URI=mongodb+srv://...
   NEXTAUTH_SECRET=<generate-new-secret>
   NEXTAUTH_URL=https://your-domain.vercel.app
   RESEND_API_KEY=re_...
   GOOGLE_GENERATIVE_AI_API_KEY=...
   ```

### Other Platforms

#### Netlify
- Use `next export` for static export (limited features)
- Or deploy with Netlify's Next.js runtime

#### Railway
- Connect GitHub repository
- Set environment variables
- Deploy automatically

#### AWS / DigitalOcean
- Build Docker image
- Deploy to container service
- Configure environment variables

### Production Checklist

- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Use MongoDB Atlas (managed cluster)
- [ ] Configure custom domain
- [ ] Enable HTTPS
- [ ] Set up error monitoring (Sentry)
- [ ] Configure email domain in Resend
- [ ] Add rate limiting for API routes
- [ ] Set up database backups
- [ ] Configure CORS if needed

---

## 🛠️ Development

### Code Style

The project uses ESLint for code quality:

```bash
npm run lint
```

### TypeScript

Full type safety with strict mode enabled:

```typescript
// Example: Type-safe API response
import { ApiResponse } from '@/types/ApiResponse';

export function jsonSuccess<T>(
  data?: T,
  message: string = 'Success'
): Response {
  const payload: ApiResponse & { data?: T } = {
    success: true,
    message
  };
  if (data) payload.data = data;
  return Response.json(payload);
}
```

### Validation Schemas

All user inputs are validated with Zod:

```typescript
// schemas/signUpSchema.ts
export const signUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(15)
});
```

### Database Connection

Singleton pattern prevents connection pool exhaustion:

```typescript
const connection: ConnectionObject = {};

export async function dbConnect() {
  if (connection.isConnected) {
    return; // Reuse existing connection
  }
  const db = await mongoose.connect(process.env.MONGO_URI!);
  connection.isConnected = db.connections[0].readyState;
}
```

### API Response Helpers

Consistent response format across all endpoints:

```typescript
// Success
return jsonSuccess({ user }, 'User created');

// Error
return jsonError('Invalid credentials', 401);

// Bad Request
return jsonBadRequest(['Username required', 'Password too short']);
```

---

## 🔒 Security Considerations

### Password Security
- **Hashing:** bcryptjs with 12 salt rounds
- **Minimum length:** 6 characters
- **Stored:** Hashed in database, never plain text

### Session Management
- **JWT tokens** via NextAuth
- **HTTP-only cookies** prevent XSS attacks
- **Secure flag** in production (HTTPS only)

### Input Validation
- **Client-side:** Form validation
- **Server-side:** Zod schema validation
- **SQL Injection:** Prevented by Mongoose ODM

### Rate Limiting
Consider adding rate limiting for production:

```typescript
// Example: Install express-rate-limit or use edge middleware
import { Ratelimit } from '@upstash/ratelimit';

export async function POST(req: Request) {
  const identifier = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(identifier);
  
  if (!success) {
    return jsonError('Too many requests', 429);
  }
  // ... rest of handler
}
```

### Environment Variables
- **Never commit** `.env` files
- **Rotate secrets** regularly
- **Use different keys** for dev/staging/prod

### CORS
Configure CORS for API routes if needed:

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' }
        ]
      }
    ];
  }
};
```

---

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Fails
```
Error: Error connecting to DB
```

**Solution:**
- Check `MONGO_URI` is correct
- Verify MongoDB is running (local) or accessible (Atlas)
- Check network/firewall settings
- Ensure IP is whitelisted in Atlas

#### Email Not Sending
```
Error sending verification email
```

**Solution:**
- Verify `RESEND_API_KEY` is valid
- Check Resend dashboard for errors
- Ensure sender domain is verified
- Check email quota limits

#### NextAuth Session Error
```
[next-auth][error][JWT_SESSION_ERROR]
```

**Solution:**
- Set `NEXTAUTH_SECRET` in environment
- Ensure secret is at least 32 characters
- Clear browser cookies
- Restart dev server

#### AI Suggestions Failing
```
Error generating suggestions
```

**Solution:**
- Check `GOOGLE_GENERATIVE_AI_API_KEY`
- Verify API quota in Google AI Studio
- Check network connectivity
- Review API usage limits

#### Build Errors
```
Type error: Cannot find module '@/...'
```

**Solution:**
- Check `tsconfig.json` paths configuration
- Run `npm install` again
- Delete `.next` folder and rebuild
- Verify file paths match imports

### Debug Mode

Enable detailed logging:

```typescript
// In API routes
console.log('Request:', await req.json());
console.log('Session:', session);
console.log('DB Query Result:', user);
```

### Logs Location

- **Development:** Terminal/console
- **Vercel:** Vercel dashboard → Logs
- **Production:** Configure external logging (Logtail, DataDog)

---

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Guidelines
- Follow existing code style
- Add TypeScript types for new code
- Write descriptive commit messages
- Update documentation for new features
- Add tests where applicable

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Resend](https://resend.com/) - Email service
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

---

<div align="center">

**Built with ❤️ using Next.js**

[Report Bug](../../issues) · [Request Feature](../../issues)

</div>