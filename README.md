# HRMS Dashboard - MERN Stack

## Project Overview
The HRMS (Human Resource Management System) Dashboard is a full-stack web application built using the MERN (MongoDB, Express.js, React, and Node.js) stack. This project was developed as a part of the hiring process for PSQUARE COMPANY. The application provides authentication, candidate management, employee management, attendance management, and leave management, following the provided Figma design.

---

## Features

### 1. **Authentication and Authorization**
- Implemented JWT-based authentication.
- Sessions are valid for **2 hours**.
- Auto-logout after session expiration.
- Proper form validation for login and registration fields.

### 2. **Candidate Management**
- HR can create candidate profiles.
- Download candidate resumes as PDF.
- Selected candidates are moved to the Employee Management system with their details intact.
- Implemented Filters and Search using Figma designs.

### 3. **Employee Management**
- HR can view, edit, and delete employee details.
- Role assignment functionality.
- Search and Filter implemented as per Figma design.

### 4. **Attendance Management**
- Displays only current employees.
- Search and Filter functionality implemented.

### 5. **Leave Management**
- Only present employees can apply for leaves.
- HR can create and update leave statuses.
- Approved leaves are displayed on a leave calendar.
- Search and Filter available.

---

## Tech Stack

- **Frontend:** React (with Vanilla CSS)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **State Management:** Context API

---

## Installation and Setup

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- MongoDB
- Git

### Clone the Repository
```bash
git clone https://github.com/bachan-singh/HR-Dashboard-MERN-stack-project.git
```

### Install Dependencies
#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### Environment Variables
Create a `.env` file in the backend directory with the following:
```env
PORT=5000
JWT_EXPIRY=2h
```

### Run the Application
#### Start MongoDB
```bash
mongod
```

#### Start Backend Server
```bash
cd server
npm start
```

#### Start Frontend
```bash
cd client
npm start
```

Access the application at `http://localhost:3000`

---

## API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and generate JWT token.
- `POST /api/auth/logout` - Logout.

### **Candidate Management**
- `POST /api/candidates` - Create a candidate.
- `GET /api/candidates` - Get candidate list.
- `GET /api/candidates/:id` - Get candidate details.
- `PUT /api/candidates/:id` - Update candidate.
- `DELETE /api/candidates/:id` - Delete candidate.

### **Employee Management**
- `POST /api/employees` - Create an employee.
- `GET /api/employees` - Get employee list.
- `GET /api/employees/:id` - Get employee details.
- `PUT /api/employees/:id` - Update employee.
- `DELETE /api/employees/:id` - Delete employee.

### **Attendance Management**
- `GET /api/attendance` - Get employee attendance.
- `POST /api/attendance` - Mark employee attendance.

### **Leave Management**
- `POST /api/leaves` - Create a leave request.
- `GET /api/leaves` - Get leave requests.
- `PUT /api/leaves/:id` - Update leave status.

---

## Deployment
- Hosted on **Vercel**

---

## Features Evaluated
- State Management using Context API
- Error Handling
- CSS Responsiveness using Vanilla CSS
- Routing with React Router
- Clean HTML/CSS structure
- Code Reusability

---

## Future Enhancements
- Implement role-based access control.
- Add email notifications for leave approvals.
- Integrate employee performance tracking.

---

## Contact
- **Developer:** Bachan Singh
- **Email:** bachansingh1407@gmail.com
- **LinkedIn:** [Bachan Singh](https://linkedin.com/in/bachan-singh)

---

## Video Explanation
A detailed video explaining the project implementation has been provided.

