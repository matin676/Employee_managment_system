# Employee Management System (EMS)

A comprehensive, full-stack Employee Management System designed involves automating HR processes, tracking attendance, managing projects, and streamlining admin workflows.

![Dashboard Preview](docs/dashboard-preview.png)

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Secure separation between Admin and Employee portals.
- **Dashboard**: Interactive charts, quick actions, and real-time statistics.
- **Employee Management**: CRUD operations for employee profiles, departments, and roles.
- **Attendance Tracking**:
  - Daily Clock In/Out with status tracking (Present, Late, Half-Day).
  - Admin override capabilities.
- **Leave Management**:
  - Employee leave application portal.
  - Admin approval workflow with historical records.
- **Project Management**:
  - Assign projects to employees with due dates and priorities.
  - Status tracking (In Progress, Completed).
- **Payroll System**:
  - Dynamic salary calculation based on attendance and allowances.
  - Monthly payroll generation and history.
- **Calendar Integration**:
  - Visual monthly calendar displaying leaves, holidays, and project deadlines.
- **Announcements**: Organization-wide notices and updates.

## 🛠️ Technology Stack

### Frontend

- **Framework**: [Angular 19](https://angular.io/) (Standalone Components, Signals)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: Heroicons (SVG)

### Backend

- **Framework**: [Spring Boot 3.4](https://spring.io/projects/spring-boot)
- **Language**: Java 22
- **Database**: PostgreSQL
- **ORM**: Hibernate / Spring Data JPA
- **Security**: Spring Security + JWT Authentication

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- JDK 17+
- Maven 3.8+
- PostgreSQL or MySQL Database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/matin676/Employee_managment_system.git
    cd Employee_managment_system
    ```

2.  **Backend Setup:**
    - Navigate to `ems-backend`.
    - Copy `env.properties.example` to `env.properties` and fill in your database and JWT secrets.
    - Run the application:
      ```bash
      mvn spring-boot:run
      ```

3.  **Frontend Setup:**
    - Navigate to `ems-frontend`.
    - Install dependencies:
      ```bash
      npm install
      ```
    - Run the development server:
      ```bash
      npm start
      ```
    - Open `http://localhost:4200`.

## 🏗️ Production Build

**Frontend:**

```bash
cd ems-frontend
npm run build
# Output will be in dist/ems-frontend
```

**Backend:**

```bash
cd ems-backend
mvn clean package -DskipTests
# Output will be ems-backend-0.0.1-SNAPSHOT.jar in target/
```

## 📄 License

Private Organization Use. All rights reserved.
