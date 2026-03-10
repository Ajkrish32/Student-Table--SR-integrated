# Student Registration & Staff Management System

A comprehensive ReactJS frontend application for managing student registrations, staff approvals, and student profile verification.

## Features

### 1. **Authentication System**
- **Student Registration**: Students can register with their basic information
- **Staff Registration**: Staff members can register to manage students
- **Admin Account**: Single admin account for approving staff members
  - **Demo Credentials**: 
    - Email: `admin@gmail.com`
    - Password: `admin123`
- **Login with Approval Status**: Only approved staff and students can log in

### 2. **Admin Dashboard**
- View pending staff approval requests
- Approve or reject staff registrations
- View list of approved staff members
- Manage the approval workflow

### 3. **Staff Dashboard**
- **Student Approval**: Approve or reject student registrations
- **Data Verification**: Review and verify student profile data
  - Students submit: Age, 10th marks, 12th marks, CGPA, Skills, Contact, Address
  - Staff verifies or rejects data to prevent cheating
- **Data Management**: Edit and update student information
  - Once staff updates data, it becomes verified and locked
- **Data Export**: Export approved students' data to Excel format
  - File includes all profile information and verification status
- **Student Deletion**: Remove students from the system (only after approval)

### 4. **Student Dashboard**
- **Profile Management**: Update personal and academic information after approval
  - Age, 10th & 12th marks, CGPA, Skills, Contact, Address
- **Approval Status**: Check registration and data verification status
- **Data Verification Workflow**:
  - Submit data for staff review
  - Wait for staff to verify data
  - Once verified, data is locked and only staff can modify

## Workflow

### Student Registration & Approval
```
Student Registration → Waiting for Staff Approval → Staff Approves → Access Dashboard
```

### Staff Registration & Approval
```
Staff Registration → Waiting for Admin Approval → Admin Approves → Access Dashboard
```

### Student Data Verification
```
Student Submits Data → Staff Verifies Data → Data Locked
```

## User Roles & Permissions

### Admin
- Approve/Reject staff registrations
- Cannot manage student data directly

### Staff
- Approve/Reject student registrations
- Verify student profile data
- Edit student data (after verification, staff can update)
- Delete student records
- Export student data to Excel

### Student
- Register and create account
- Update profile information (after staff approval)
- Submit data for verification
- Check approval and verification status

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Routing**: React Router v6
- **Data Export**: XLSX (Excel)
- **State Management**: React Context API
- **Storage**: Browser LocalStorage

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx          # Route protection component
├── contexts/
│   └── AuthContext.jsx             # Authentication context
├── hooks/
│   └── useAuth.js                  # Custom hook for auth
├── pages/
│   ├── Registration.jsx            # Registration page
│   ├── Registration.css
│   ├── Login.jsx                   # Login page
│   ├── Login.css
│   ├── AdminDashboard.jsx          # Admin dashboard
│   ├── StaffDashboard.jsx          # Staff dashboard
│   ├── StudentDashboard.jsx        # Student dashboard
│   └── Dashboard.css               # Dashboard styles
├── utils/
│   └── excelExport.js             # Excel export utility
├── App.jsx                         # Main app with routing
├── App.css                         # Global styles
├── main.jsx                        # Entry point
├── index.css                       # Global CSS
```

## Usage Guide

### For Testing

#### 1. Admin Access
- Go to http://localhost:5174/login
- Use demo credentials:
  - Email: `admin@gmail.com`
  - Password: `admin123`
- Click "Approve" to approve pending staff requests

#### 2. Staff Access
1. Go to http://localhost:5174/register
2. Select "Staff" as role
3. Fill in your details and register
4. Wait for admin to approve (use admin login above)
5. Log in with your credentials
6. In staff dashboard:
   - Approve pending students
   - Verify student data submissions
   - Edit & manage student information
   - Export student data to Excel

#### 3. Student Access
1. Go to http://localhost:5174/register
2. Select "Student" as role
3. Fill in your details and register
4. Wait for staff to approve
5. Log in with your credentials
6. In student dashboard:
   - Update your profile information
   - Submit data for staff verification
   - Check your approval status

## Excel Export Format

The exported Excel file includes the following columns:
- ID
- Name
- Email
- Age
- 10th Marks
- 12th Marks
- CGPA
- Skills
- Contact
- Address
- Status (Approved/Pending)
- Data Verification (Pending/Verified/Rejected)
- Registration Date

## Data Persistence

All data is stored in browser's LocalStorage. This means:
- Data persists across browser sessions
- Clearing browser cache will reset all data
- For production, implement a backend database

## Security Notes

⚠️ **This is a frontend-only demo application. For production:**
- Implement proper authentication with JWT tokens
- Hash passwords using bcrypt or similar
- Move to a secure backend API
- Implement HTTPS
- Add CSRF protection
- Validate all inputs on the backend
- Use secure session management

## Features Implemented

✅ Student Registration
✅ Staff Registration
✅ Admin Account (Single)
✅ Admin Dashboard (Staff Approval)
✅ Staff Dashboard (Student Management)
✅ Student Dashboard (Profile Management)
✅ Data Verification Workflow
✅ Approval Status Checking
✅ Excel Data Export
✅ Login with Approval Status
✅ Protected Routes
✅ Context-based Auth Management
✅ Responsive Design
✅ Form Validation
✅ Status Tracking

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Notes

- The application uses browser LocalStorage for data persistence
- Only one admin account exists with the provided credentials
- Students cannot log in until approved by staff
- Staff cannot log in until approved by admin
- All data submitted by students requires staff verification to prevent cheating
- Once staff verifies data, it's locked and can only be modified by staff

## Future Enhancements

- Backend API integration
- Email notifications
- Bulk student import
- Advanced reporting
- Role-based access control (RBAC)
- Audit logs
- Payment integration
- Document upload capability
