# DDO Bharuch | Employee Management System (EMS)

A modern, high-performance Employee Management System designed for the **District Development Office (DDO), Bharuch**. This platform streamlines administration, attendance tracking, and payroll management with a premium user experience.

## 🚀 Features

- **Robust Attendance Tracking**: Seamless clock-in/out with automated status (Late, Present, Half-day) and server-side date normalization.
- **Dynamic Post Management**: Real-time announcements for organization-wide communication.
- **Leave Management**: Employee request portal and Admin approval workflow with instant status notifications.
- **Payroll & Salaries**: Automated salary processing and historical payroll records.
- **Role-Based Access Control (RBAC)**: secure data isolation for Admin and Employee roles.
- **Modern UI/UX**: Built with a sleek, dark-themed aesthetic (Glassmorphism), micro-animations, and responsive layouts.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Database**: [Prisma ORM](https://www.prisma.io/) with MySQL/PostgreSQL
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **State/Forms**: `react-hook-form`, `zod`, `framer-motion`
- **Notifications**: `sonner` (Rich Action Toasts)
- **Authentication**: JWT-based secure sessions with `jose` and `bcryptjs`

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- A running database instance

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/matin676/Employee_managment_system.git
   cd Employee_managment_system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root:

   ```env
   DATABASE_URL="mysql://user:pass@localhost:3306/ems"
   JWT_SECRET="your_secure_secret_here"
   ```

4. Initialize Database:

   ```bash
   npx prisma db push
   # Optional: Seed data
   npm run seed
   ```

5. Run Development Server:

   ```bash
   npm run dev
   ```

## 🏗️ Production Build

To prepare the application for deployment:

```bash
npm run build
npm start
```

## 📄 License

This project is private and intended for use by the District Development Office, Bharuch.
All rights reserved.
