# Quick Start Guide

Get started with the Student Registration & Staff Management System in 5 minutes!

## Prerequisites

- Node.js (v16 or higher)
- npm package manager

## 1. Installation

```bash
# Navigate to project directory
cd c:\Users\sathi\Desktop\SR\SRINTE

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5174`

## 2. First Time Setup

The application automatically initializes with a default admin account:

- **Email**: admin@gmail.com
- **Password**: admin123

## 3. Test Workflow

### Step 1: Register as Staff
1. Click "Register here" on the login page
2. Fill in the form:
   - Name: "John Staff"
   - Email: "john@example.com"
   - Role: Select "Staff"
   - Password: "password123"
3. Click "Register"
4. You'll be redirected to the login page

### Step 2: Approve Staff (Admin)
1. Go to login page
2. Use admin credentials:
   - Email: admin@gmail.com
   - Password: admin123
3. Click "Login"
4. You'll see "Admin Dashboard"
5. Find the pending staff request (John Staff)
6. Click "Approve" button

### Step 3: Login as Staff
1. Go to login page
2. Use staff credentials:
   - Email: john@example.com
   - Password: password123
3. Click "Login"
4. You'll see "Staff Dashboard"

### Step 4: Register as Student
1. Open a new browser tab/window
2. Go to the login page
3. Click "Register here"
4. Fill in the form:
   - Name: "Jane Student"
   - Email: "jane@example.com"
   - Role: Select "Student"
   - Password: "password123"
5. Click "Register"

### Step 5: Approve Student (Staff)
1. Go back to the staff dashboard tab
2. You should see "Jane Student" in pending approvals
3. Click "Approve" button

### Step 6: Login as Student
1. Open the third browser tab or login again
2. Use student credentials:
   - Email: jane@example.com
   - Password: password123
3. Click "Login"
4. You'll see "Student Dashboard"

### Step 7: Update Student Profile
1. In the student dashboard, click "My Profile" tab
2. Fill in the profile information:
   - Age: 20
   - 10th Marks: 85
   - 12th Marks: 88
   - CGPA: 7.5
   - Skills: Python, JavaScript, React
   - Contact: 9999999999
   - Address: Your address
3. Click "Submit Data for Verification"

### Step 8: Verify Student Data (Staff)
1. Go back to the staff dashboard tab
2. Click on the "Verify Data" tab
3. You should see "Jane Student" with data pending verification
4. Click "Verify" to approve the data

## Testing Scenarios

### Scenario 1: Testing Approval Workflow
```
1. Register 2-3 staff members
2. Approve them as admin
3. Register 5-6 students
4. Approve them as staff
5. Verify their data
```

### Scenario 2: Testing Data Export
```
1. Create and approve 3 students
2. Have them submit profile data
3. Verify their data as staff
4. In Staff Dashboard, go to "Approved Students" tab
5. Click "Export to Excel" button
6. Open the downloaded file
```

### Scenario 3: Testing Data Verification
```
1. Register and approve a student
2. Have student submit data
3. As staff, go to "Verify Data" tab
4. Click "Verify" to approve or "Reject" to ask for changes
5. If rejected, student can resubmit
```

## Key Features to Test

- ✅ **Registration**: Create accounts as various roles
- ✅ **Approval Workflow**: Test admin approving staff, staff approving students
- ✅ **Data Verification**: Submit and verify student data
- ✅ **Data Editing**: Staff can edit verified student data
- ✅ **Export**: Download student data as Excel
- ✅ **Status Checking**: View approval and verification status
- ✅ **Login Protection**: Try logging in without approval

## Troubleshooting

### Port Already in Use
If port 5174 is in use:
```bash
# Run dev server on different port
npm run dev -- --port 5175
```

### Clear Data
To reset all data (including users), clear browser LocalStorage:
1. Open Developer Tools (F12)
2. Go to "Application" → "Local Storage"
3. Click your domain
4. Click "Clear All"

### Server Not Starting
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Important Notes

- **Data Persistence**: All data is stored in browser LocalStorage
- **Single Admin**: Only one admin account (admin@gmail.com)
- **Approval Required**: Students must be approved by staff before accessing dashboard
- **Staff Approval**: Staff must be approved by admin before accessing dashboard
- **Data Verification**: All student data must be verified by staff

## Next Steps

1. Explore all three dashboards
2. Test the complete workflow
3. Try different scenarios
4. Check browser console for any errors
5. Review the FEATURES.md for detailed documentation

## Need Help?

Refer to `FEATURES.md` for complete feature documentation and system architecture.

---

**Happy Testing!** 🎉
