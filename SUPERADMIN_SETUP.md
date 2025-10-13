# SuperAdmin Setup Guide

## Overview
The SuperAdmin functionality allows you to manage all admins and employees across the organization. A SuperAdmin can view:

1. **Dashboard Overview**: Statistics about admins and employees
2. **All Admins**: List of all admin users with their employee counts
3. **All Employees**: Complete employee directory with filtering and pagination

## Backend Setup

### 1. Database Schema Changes
- Updated `UserModel` to include "SuperAdmin" role
- Created SuperAdmin middleware for authorization
- Added SuperAdmin controller with dashboard APIs
- Added SuperAdmin routes

### 2. API Endpoints

#### SuperAdmin Dashboard APIs (Protected)
- `GET /api/superadmin/dashboard` - Dashboard overview data
- `GET /api/superadmin/admins` - List all admins with stats
- `GET /api/superadmin/employees` - List all employees with filtering
- `POST /api/superadmin/assign-employees` - Assign employees to admin (future feature)

#### SuperAdmin Authentication APIs (Public)
- `POST /api/superadmin-auth/signup` - Create SuperAdmin account
- `POST /api/superadmin-auth/login` - SuperAdmin login

### 3. Create SuperAdmin User

#### Option 1: Using the Script (Quick Setup)
Run the script to create a SuperAdmin user:

```bash
cd Backend
node create-superadmin.js
```

This will create a SuperAdmin with:
- Email: `superadmin@company.com`
- Username: `superadmin`
- Password: `SuperAdmin@123`

#### Option 2: Using the SuperAdmin Signup Page
1. Navigate to `/superadmin-signup`
2. Fill in the required details
3. Complete the signup process

## Frontend Setup

### 1. Components Created
- `SuperAdminDashboard.jsx` - Main dashboard component
- `SuperAdminRouteGuard.jsx` - Route protection for SuperAdmin
- `SuperAdmin.services.js` - API service functions

### 2. Routing
- Added `/superadmin-dashboard` route
- SuperAdmin option appears in sidebar only for SuperAdmin users
- Protected by SuperAdminRouteGuard

### 3. Features
- **Overview Tab**: Dashboard with statistics and recent activities
- **Admins Tab**: List of all admins with employee counts
- **Employees Tab**: Complete employee directory with:
  - Search functionality
  - Status filtering (Active/Inactive)
  - Department filtering
  - Pagination
  - Employee details display

## Usage Instructions

### 1. Login as SuperAdmin
#### Option 1: Regular Admin Login Page
1. Go to the main login page (`/`)
2. Click "👑 SuperAdmin Login" link
3. Use SuperAdmin credentials to login

#### Option 2: Direct SuperAdmin Login
1. Navigate directly to `/superadmin-login`
2. Use SuperAdmin credentials to login
3. You'll be redirected to the SuperAdmin dashboard

### 2. Access SuperAdmin Dashboard
1. Click on "Super Admin" in the sidebar
2. Navigate through the three tabs:
   - **Overview**: Get a bird's eye view of the organization
   - **Admins**: See all admin users and their employee counts
   - **Employees**: Browse and filter all employees

### 3. Employee Management
- Use the search bar to find specific employees
- Filter by status (Active/Inactive)
- Filter by department
- Adjust pagination (10, 25, or 50 items per page)
- View detailed employee information

## Security Features

1. **Role-based Access**: Only SuperAdmin users can access the dashboard
2. **Route Protection**: SuperAdminRouteGuard ensures proper authorization
3. **API Authorization**: Backend middleware validates SuperAdmin role
4. **Conditional UI**: SuperAdmin menu item only shows for SuperAdmin users

## Future Enhancements

1. **Employee Assignment**: Assign specific employees to admins
2. **Admin Creation**: Create new admin users from SuperAdmin dashboard
3. **Department Management**: Manage departments and their assignments
4. **Advanced Analytics**: More detailed reports and analytics
5. **Bulk Operations**: Bulk actions on employees and admins

## Troubleshooting

### Common Issues

1. **SuperAdmin menu not showing**: Check if user role is correctly set to "SuperAdmin"
2. **Access denied errors**: Ensure user is logged in and has SuperAdmin role
3. **API errors**: Check backend server is running and database is connected

### Testing
1. Create SuperAdmin user using the script
2. Login with SuperAdmin credentials
3. Verify SuperAdmin option appears in sidebar
4. Test all three dashboard tabs
5. Test employee filtering and pagination

## Notes

- The current implementation shows all employees for all admins since there's no direct admin-employee relationship
- Future versions can implement department-based or assignment-based employee grouping
- All employee data comes from the EmpData collection
- Admin data comes from the Users collection with role="Admin"
