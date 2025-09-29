# 🏢 Planopia - Enterprise Time & Leave Management System

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.4.0-47A248?logo=mongodb)](https://mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://javascript.info/)

> **A comprehensive SaaS solution for enterprise time tracking, leave management, and team coordination with multi-tenant architecture and role-based access control.**

## 🚀 **Live Demo**
- **Production**: [planopia.pl](https://planopia.pl)
- **English Version**: [planopia.pl/en](https://planopia.pl/en)

---

## 📋 **Overview**

Planopia is a full-stack enterprise application designed to streamline workforce management for teams and companies. It replaces traditional Excel-based time tracking with a modern, automated solution that handles time logging, leave requests, approvals, and team coordination.

### **Key Business Value**
- **Free for up to 8 users** - Perfect for small teams
- **Multi-tenant architecture** - Each team has isolated data
- **Role-based permissions** - Granular access control
- **Automated workflows** - Reduces manual HR processes
- **Multi-language support** - Polish and English
- **Mobile-responsive** - Works on all devices

---

## 🎯 **Core Features**

### **⏰ Time Tracking**
- **Daily time logging** with hours worked and overtime
- **Monthly calendar view** with visual time tracking
- **PDF export** for timesheets and reports
- **Confirmation system** for monthly time approval
- **Real-time calculations** of total hours and days

### **🏖️ Leave Management**
- **Leave request system** with approval workflows
- **Multiple leave types** (vacation, sick, personal, etc.)
- **Department-based approvals** with supervisor hierarchy
- **Leave planning calendar** for team coordination
- **PDF generation** for leave requests and approvals

### **👥 Team Management**
- **Multi-tenant architecture** - Each team is isolated
- **User role management** (Admin, HR, Department Supervisor, Worker)
- **Department organization** with custom departments
- **Team registration** with admin controls
- **User invitation system** with email notifications

### **📊 Admin Dashboard**
- **User management** with role assignments
- **Leave request approvals** with bulk actions
- **Team analytics** and reporting
- **System logs** and audit trails
- **Department management** and organization

### **🔐 Security & Compliance**
- **JWT authentication** with refresh tokens
- **Role-based access control** (RBAC)
- **Rate limiting** for API protection
- **Password security** with bcrypt hashing
- **CSRF protection** and input sanitization
- **Audit logging** for all user actions

---

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18.2** with functional components and hooks
- **JavaScript (ES6+)** for modern development
- **Vite** for fast development and building
- **Tailwind CSS** for responsive design
- **FullCalendar** for calendar functionality
- **React Router** for navigation
- **Axios** for API communication
- **i18next** for internationalization
- **React Helmet** for SEO optimization

### **Backend**
- **Node.js** with Express.js framework
- **JavaScript (ES6+)** for server-side development
- **MongoDB** with Mongoose ODM
- **JWT** for authentication and authorization
- **Nodemailer** for email notifications
- **Multer** for file uploads
- **Express Rate Limit** for API protection
- **Helmet** for security headers
- **CORS** for cross-origin requests

### **DevOps & Deployment**
- **Netlify** for frontend hosting
- **MongoDB Atlas** for database hosting
- **Environment-based configuration**
- **PWA support** with service workers
- **Responsive design** for all devices

---

## 🏗️ **Architecture**

### **Frontend Architecture**
```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── leavework/       # Leave management
│   │   ├── workcalendars/   # Time tracking
│   │   ├── profile/         # User management
│   │   └── tickets/         # Support system
│   ├── context/            # React Context for state
│   ├── utils/              # Helper functions
│   ├── hooks/              # Custom React hooks
│   └── config/             # Configuration files
```

### **Backend Architecture**
```
server/
├── controllers/            # Request handlers
├── models/                # Database schemas
├── routes/                # API endpoints
├── middleware/            # Authentication & validation
├── services/              # Business logic
├── utils/                 # Helper functions
└── db/                    # Database connection
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ and npm
- MongoDB database
- Email service (SMTP)

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/planopia.git
cd planopia
```

2. **Install dependencies**
```bash
# Backend
npm install

# Frontend
cd client
npm install
```

3. **Environment setup**
```bash
# Backend .env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
APP_URL=http://localhost:3000

# Frontend .env
VITE_API_URL=http://localhost:5000
```

4. **Run the application**
```bash
# Backend (port 5000)
npm start

# Frontend (port 3000)
cd client
npm run dev
```

---

## 📱 **Screenshots**

### **Dashboard**
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+View)

### **Time Tracking**
![Time Tracking](https://via.placeholder.com/800x400/059669/FFFFFF?text=Time+Tracking+Calendar)

### **Leave Management**
![Leave Management](https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Leave+Request+System)

---

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/users/login` - User login
- `POST /api/users/refresh-token` - Refresh JWT token
- `POST /api/users/logout` - User logout

### **Time Tracking**
- `GET /api/workdays` - Get user workdays
- `POST /api/workdays` - Add workday entry
- `PUT /api/workdays/:id` - Update workday

### **Leave Management**
- `POST /api/leaveworks/leave-request` - Submit leave request
- `GET /api/leaveworks/leave-requests` - Get leave requests
- `PUT /api/leaveworks/leave-requests/:id` - Update leave request

### **User Management**
- `GET /api/users` - Get all users
- `POST /api/users/register` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

---

## 🎨 **Design Patterns & Best Practices**

### **SOLID Principles**
- **Single Responsibility** - Each component has one purpose
- **Open/Closed** - Extensible without modification
- **Dependency Inversion** - Depends on abstractions

### **Architectural Patterns**
- **MVC Pattern** - Clear separation of concerns
- **Repository Pattern** - Data access abstraction
- **Service Layer** - Business logic separation
- **Middleware Pattern** - Cross-cutting concerns

### **React Patterns**
- **Context API** - Global state management
- **Custom Hooks** - Reusable logic
- **Higher-Order Components** - Component composition
- **Render Props** - Flexible component sharing

---

## 🔒 **Security Features**

- **JWT Authentication** with secure token handling
- **Role-based Access Control** (RBAC)
- **Rate Limiting** to prevent abuse
- **Input Validation** and sanitization
- **CSRF Protection** for form submissions
- **Password Hashing** with bcrypt
- **Audit Logging** for compliance
- **CORS Configuration** for security

---

## 📈 **Performance Optimizations**

- **Code Splitting** with React.lazy()
- **Memoization** with React.memo()
- **Efficient Re-renders** with useCallback/useMemo
- **Image Optimization** with WebP format
- **Bundle Optimization** with Vite
- **Database Indexing** for faster queries
- **Caching** for frequently accessed data

---

## 🌍 **Internationalization**

- **Multi-language support** (Polish/English)
- **Dynamic language switching**
- **Localized date/time formats**
- **RTL support** ready
- **SEO optimization** for multiple languages

---

## 🧪 **Testing**

> **Planned for future development** - Testing infrastructure is set up with React Testing Library dependencies, but comprehensive test suite is planned for future releases.

**Current Status:**
- ✅ Testing dependencies installed (`@testing-library/react`, `@testing-library/jest-dom`)
- ⏳ Test configuration and comprehensive test suite - **Planned**
- ⏳ Unit tests for components - **Planned**
- ⏳ Integration tests for API endpoints - **Planned**
- ⏳ E2E tests for critical user flows - **Planned**

---

## 📊 **Analytics & Monitoring**

- **User activity tracking**
- **Performance monitoring**
- **Error logging** with detailed stack traces
- **Audit trails** for compliance
- **Usage analytics** for feature optimization

---

## 🚀 **Deployment**

### **Production Environment**
- **Frontend**: Deployed on Netlify with CDN
- **Backend**: Node.js server with PM2
- **Database**: MongoDB Atlas with replica sets
- **Email**: SMTP service integration
- **Monitoring**: Application performance monitoring

### **CI/CD Pipeline**
- **Automated testing** on pull requests
- **Build optimization** for production
- **Environment-specific configurations**
- **Zero-downtime deployments**

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Copyright (c) 2024 Michał Lipka** - All rights reserved.

---

## 👨‍💻 **Author**

**MICHAŁ LIPKA**
- GitHub: [@majkus1](https://github.com/majkus1)
- LinkedIn: [Michał Lipka](https://linkedin.com/in/michal-lipka-wd)
- Email: michalipka1@gmail.com

---

## 🙏 **Acknowledgments**

- React team for the amazing framework
- MongoDB for the flexible database
- All contributors who helped improve this project
- The open-source community for inspiration

---

## 📞 **Support**

For support, email michalipka1@gmail.com or create an issue in this repository.

---

**⭐ Star this repository if you found it helpful!**
