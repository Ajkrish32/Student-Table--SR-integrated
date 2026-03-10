# Student Registration & Staff Management System

A complete frontend-only React application for managing student registrations, staff approvals, and student profile verification with data export capabilities.

## 🎯 Overview

This is a comprehensive single-page application built with React and Vite that manages:
- **Student Registration & Approval** - Students register and wait for staff approval
- **Staff Registration & Approval** - Staff registers and waits for admin approval
- **Admin Dashboard** - Single admin account manages staff approvals
- **Staff Dashboard** - Staff manages student approvals, data verification, and exports
- **Student Dashboard** - Students update their profiles and track verification status

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Visit**: http://localhost:5174

4. **Login as Admin** (Default credentials):
   - Email: `admin@gmail.com`
   - Password: `admin123`

For detailed testing guide, see [QUICKSTART.md](QUICKSTART.md)

## ✨ Key Features

### 1. Authentication & Authorization
- ✅ User registration (Student/Staff)
- ✅ Role-based login
- ✅ Admin account with hardcoded credentials
- ✅ Approval status checking
- ✅ Protected routes

### 2. Admin Features
- ✅ View pending staff approvals
- ✅ Approve/Reject staff registrations
- ✅ View approved staff list

### 3. Staff Features
- ✅ Approve/Reject student registrations
- ✅ Verify student profile data
- ✅ Edit verified student information
- ✅ Delete student records
- ✅ **Export student data to Excel** (XLSX format)

### 4. Student Features
- ✅ Register and create account
- ✅ Update profile (age, marks, CGPA, skills, etc.)
- ✅ Submit data for staff verification
- ✅ Check approval and verification status
- ✅ View account information

### 5. Data Management
- ✅ Approval workflow (Admin → Staff → Student)
- ✅ Data verification to prevent cheating
- ✅ Status tracking throughout the process
- ✅ Data locking after staff verification

## 📁 Project Structure

```
src/
├── components/
│   └── ProtectedRoute.jsx          Route protection
├── contexts/
│   └── AuthContext.jsx             Auth state & logic
├── hooks/
│   └── useAuth.js                  Auth custom hook
├── pages/
│   ├── Registration.jsx            Registration form
│   ├── Login.jsx                   Login page
│   ├── AdminDashboard.jsx          Admin panel
│   ├── StaffDashboard.jsx          Staff panel
│   ├── StudentDashboard.jsx        Student panel
│   └── Dashboard.css               Shared dashboard styles
├── utils/
│   └── excelExport.js             Excel export utility
├── App.jsx                         Main app & routes
├── main.jsx                        Entry point
```

## 🔄 Workflow

### Registration & Approval Flow
```
Student/Staff Registration
        ↓
Wait for Approval
        ↓
Admin/Staff Approves
        ↓
User Can Login
        ↓
Access Dashboard
```

### Data Verification Flow
```
Student Submits Data
        ↓
Staff Reviews Data
        ↓
Staff Verifies/Rejects
        ↓
Data Locked (if verified)
        ↓
Only Staff Can Modify
```

## 👥 User Roles

| Role | Can Do |
|------|--------|
| **Admin** | Approve staff registrations |
| **Staff** | Approve students, verify data, export data, edit records |
| **Student** | Register, update profile, submit data for verification |

## 📊 Excel Export

Staff can export student data including:
- Personal Information (Name, Email, Contact, Address)
- Academic Data (10th/12th marks, CGPA)
- Skills & Abilities
- Approval Status
- Data Verification Status
- Registration Date

## 🛠 Tech Stack

- **React** 19.2.0 - UI Framework
- **Vite** 8.0.0 - Build tool
- **React Router** 6+ - Routing
- **XLSX** - Excel export
- **Context API** - State management
- **Responsive CSS** - Styling

## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## 💾 Data Storage

All data is stored in browser **LocalStorage**:
- No cloud storage required
- Data persists across sessions
- Clear browser cache to reset

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📚 Documentation

- [QUICKSTART.md](QUICKSTART.md) - Quick testing guide
- [FEATURES.md](FEATURES.md) - Detailed feature documentation

## ⚠️ Security Notes

This is a **frontend-only demo application**. For production:
- Implement backend authentication
- Hash passwords with bcrypt
- Use JWT tokens
- Add HTTPS
- Validate on backend
- Implement proper session management

## 🎓 Test Users

### Admin (Pre-created)
- Email: `admin@gmail.com`
- Password: `admin123`

### Create for Testing:
- Register staff/students as needed
- Use any email and password
- Follow approval workflow

## 🔧 Customization

### Change Admin Credentials
Edit `src/contexts/AuthContext.jsx`:
```javascript
const DEFAULT_ADMIN = {
  id: 1,
  name: 'Admin',
  email: 'your-email@example.com',
  password: 'your-password', // In production, hash this!
  role: 'admin',
  // ... rest of config
};
```

### Add More Fields
Update student profile fields in `AuthContext.jsx` `profileData` object.

## 📞 Support

For issues or questions:
1. Check [QUICKSTART.md](QUICKSTART.md) for testing guide
2. Review [FEATURES.md](FEATURES.md) for detailed documentation
3. Check browser console for error messages

## 📜 License

This project is provided as-is for educational purposes.

---

**Built with ❤️ using React & Vite**
