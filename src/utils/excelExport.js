import * as XLSX from 'xlsx';

export const exportToExcel = (students, filename = 'students_data.xlsx') => {
  // Prepare data for export
  const data = students.map(student => ({
    'ID': student.id,
    'Name': student.name,
    'Email': student.email,
    'Age': student.profileData?.age || 'N/A',
    '10th Marks': student.profileData?.class10Marks || 'N/A',
    '10th Max': student.profileData?.class10MaxMarks || 'N/A',
    '10th %': student.profileData?.class10Percentage || 'N/A',
    '12th Marks': student.profileData?.class12Marks || 'N/A',
    '12th Max': student.profileData?.class12MaxMarks || 'N/A',
    '12th %': student.profileData?.class12Percentage || 'N/A',
    'CGPA': student.profileData?.cgpa || 'N/A',
    'Skills': student.profileData?.skills || 'N/A',
    'Contact': student.profileData?.contact || 'N/A',
    'Address': student.profileData?.address || 'N/A',
    'Status': student.isApproved ? 'Approved' : 'Pending',
    'Data Verification': student.dataVerificationStatus || 'Pending',
    'Registration Date': new Date(student.createdAt).toLocaleDateString(),
  }));

  // Create a new workbook
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  // Adjust column widths
  const columnWidths = [
    { wch: 10 }, // ID
    { wch: 20 }, // Name
    { wch: 25 }, // Email
    { wch: 10 }, // Age
    { wch: 12 }, // 10th Marks
    { wch: 12 }, // 10th Max
    { wch: 10 }, // 10th %
    { wch: 12 }, // 12th Marks
    { wch: 12 }, // 12th Max
    { wch: 10 }, // 12th %
    { wch: 10 }, // CGPA
    { wch: 20 }, // Skills
    { wch: 15 }, // Contact
    { wch: 25 }, // Address
    { wch: 12 }, // Status
    { wch: 18 }, // Data Verification
    { wch: 15 }, // Registration Date
  ];

  worksheet['!cols'] = columnWidths;

  // Write the workbook
  XLSX.writeFile(workbook, filename);
};
