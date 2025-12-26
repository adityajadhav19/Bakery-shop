# 🍰 The Royal Cake Studio

A full-stack bakery website built for a local cake shop, featuring an admin dashboard, user authentication, product management, contact handling, and WhatsApp-based ordering.

This project is designed and developed as a **production-ready freelance solution** for a real business.

---

## 🌐 Live Website
👉 https:

---

## ✨ Features

### 👩‍🍳 Customer Side
- Responsive landing page
- Product listing with real-time availability
- WhatsApp “Order Now” integration (includes product ID & details)
- Contact form for customer inquiries
- Mobile-friendly UI

### 🔐 Authentication
- Secure login for **Admin** and **Users**
- Role-based redirection (Admin → Dashboard, User → User page)
- JWT-based authentication
- Password hashing using bcrypt

### 🧁 Admin Dashboard
- Add, update, delete products
- Toggle product visibility & stock status
- Upload product images (Cloudinary)
- View registered users (username, email, phone)
- View & delete customer contact messages

---

## 🛠️ Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **shadcn/ui**

### Backend
- **Next.js API Routes**
- **Prisma ORM**
- **JWT Authentication**
- **bcryptjs**

### Database & Services
- **PostgreSQL (Neon – production)**
- **Cloudinary** (image storage)
- **Vercel** (deployment)

---

## 🗄️ Database Models
- Admin
- User
- Product
- ContactMessage

---

## 🚀 Deployment
- Frontend deployed on **Vercel**
- Database hosted on **Neon PostgreSQL**
- Environment variables managed securely
- Prisma migrations applied using `prisma migrate deploy`

---

## 🔐 Environment Variables

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NODE_ENV=production
IMG_DB=if you are adding images from device then use cloudinary
