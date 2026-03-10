import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Default admin user
const DEFAULT_ADMIN = {
  id: 1,
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'admin123', // In production, hash this!
  role: 'admin',
  createdAt: new Date().toISOString(),
  isApproved: true,
  approvedBy: 'system',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedCurrentUser = localStorage.getItem('currentUser');
    
    let initialUsers = [];
    
    // Initialize with admin if no users exist
    if (!storedUsers) {
      initialUsers = [DEFAULT_ADMIN];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    } else {
      initialUsers = JSON.parse(storedUsers);
      // Ensure admin exists
      const adminExists = initialUsers.some(u => u.role === 'admin');
      if (!adminExists) {
        initialUsers.unshift(DEFAULT_ADMIN);
        localStorage.setItem('users', JSON.stringify(initialUsers));
      }
    }
    
    setUsers(initialUsers);
    
    if (storedCurrentUser) {
      setUser(JSON.parse(storedCurrentUser));
    }
    setLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users, loading]);

  // Save current user to localStorage and keep in sync with users
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Keep synchronized with the users list in case of updates from others
      const syncUser = users.find(u => u.id === user.id);
      if (syncUser) {
        const { isLoggedIn, ...userData } = user;
        if (JSON.stringify(syncUser) !== JSON.stringify(userData)) {
          setUser({ ...syncUser, isLoggedIn: true });
        }
      }
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user, users]);

  const register = (userData) => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user with default values
    const newUser = {
      id: Date.now(),
      ...userData,
      password: userData.password, // In production, hash this!
      createdAt: new Date().toISOString(),
      isApproved: false,
      approvedBy: null,
      dataVerified: false,
    };

    // Add additional fields for students
    if (userData.role === 'student') {
      newUser.profileData = {
        age: '',
        class10Marks: '',
        class10MaxMarks: '',
        class10Percentage: '',
        class12Marks: '',
        class12MaxMarks: '',
        class12Percentage: '',
        cgpa: '',
        skills: '',
        contact: '',
        address: '',
      };
      newUser.dataVerificationStatus = 'pending'; // pending, verified, rejected
    }

    setUsers([...users, newUser]);
    return { success: true, message: 'Registration successful' };
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Check if admin
    if (foundUser.role === 'admin') {
      setUser({ ...foundUser, isLoggedIn: true });
      return { success: true, message: 'Login successful' };
    }

    // Check if approved
    if (!foundUser.isApproved) {
      const waitMsg = foundUser.role === 'staff' ? 'Admin' : 'Staff';
      return { 
        success: false, 
        error: `Waiting for approval. Your account needs to be approved by the ${waitMsg} before you can login.` 
      };
    }

    setUser({ ...foundUser, isLoggedIn: true });
    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setUser(null);
  };

  const approveUser = (userId, approverRole) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          isApproved: true,
          approvedBy: approverRole,
          approvedAt: new Date().toISOString(),
        };
      }
      return u;
    }));
  };

  const rejectUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const updateStudentData = (studentId, profileData) => {
    setUsers(users.map(u => {
      if (u.id === studentId && u.role === 'student') {
        return {
          ...u,
          profileData: {
            ...u.profileData,
            ...profileData,
          },
          dataVerificationStatus: u.dataVerificationStatus === 'verified' ? 'verified' : 'pending',
        };
      }
      return u;
    }));
  };

  const verifyStudentData = (studentId, verified = true) => {
    setUsers(users.map(u => {
      if (u.id === studentId) {
        return {
          ...u,
          dataVerificationStatus: verified ? 'verified' : 'rejected',
          dataVerifiedBy: verified ? user?.id : null,
          dataVerifiedAt: new Date().toISOString(),
        };
      }
      return u;
    }));
  };

  const updateStudentDataByStaff = (studentId, profileData) => {
    setUsers(users.map(u => {
      if (u.id === studentId && u.role === 'student') {
        return {
          ...u,
          profileData: {
            ...u.profileData,
            ...profileData,
          },
          dataVerificationStatus: 'verified',
          dataVerifiedBy: user?.id,
          dataVerifiedAt: new Date().toISOString(),
        };
      }
      return u;
    }));
  };

  const deleteStudent = (studentId, deleteBy) => {
    setUsers(users.filter(u => u.id !== studentId));
  };

  const getPendingStaff = () => {
    return users.filter(u => u.role === 'staff' && !u.isApproved);
  };

  const getApprovedStaff = () => {
    return users.filter(u => u.role === 'staff' && u.isApproved);
  };

  const getPendingStudents = () => {
    return users.filter(u => u.role === 'student' && !u.isApproved);
  };

  const getApprovedStudents = () => {
    return users.filter(u => u.role === 'student' && u.isApproved);
  };

  const getUserById = (id) => {
    return users.find(u => u.id === id);
  };

  const value = {
    user,
    users,
    loading,
    register,
    login,
    logout,
    approveUser,
    rejectUser,
    updateStudentData,
    verifyStudentData,
    updateStudentDataByStaff,
    deleteStudent,
    getPendingStaff,
    getApprovedStaff,
    getPendingStudents,
    getApprovedStudents,
    getUserById,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
