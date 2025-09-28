# Superadmin Authentication System

This document describes the superadmin authentication system implemented in the SaaS application.

## Overview

The superadmin authentication system provides secure login/logout functionality specifically for superadmin access to the SaaS platform. It uses React Context for state management and localStorage for persistence. This system is separate from tenant user authentication and is designed exclusively for platform administrators.

## Architecture

### Components

1. **SuperAdminAuthService** (`src/services/authService.ts`)
   - Handles API calls to the superadmin authentication endpoints
   - Provides type-safe interfaces for superadmin API responses
   - Centralized API configuration for superadmin access

2. **useSuperAdminAuth Hook** (`src/hooks/useAuth.ts`)
   - Custom hook for superadmin authentication logic
   - Manages superadmin authentication state
   - Handles superadmin login, logout, and token refresh

3. **SuperAdminAuthContext** (`src/contexts/AuthContext.tsx`)
   - React Context for global superadmin authentication state
   - Provides superadmin authentication methods to components
   - Wraps the entire application for superadmin access

4. **PrivateRoute** (`src/components/PrivateRoute.tsx`)
   - Higher-order component for protected superadmin routes
   - Redirects unauthenticated users to superadmin login
   - Shows loading state during authentication check

5. **SuperAdminLogin Page** (`src/pages/Login.tsx`)
   - Professional superadmin login form with validation
   - Password visibility toggle
   - Form validation using react-hook-form and zod
   - Clear indication this is for superadmin access only

## API Endpoints

- **Superadmin Login**: `POST http://localhost:4040/api/admin/login`
- **Superadmin Refresh Token**: `POST http://localhost:4040/api/admin/refresh`

**Note**: These endpoints are specifically for superadmin access, not for tenant users.

## Features

### Superadmin Login Page
- ✅ Professional UI design with gradient backgrounds
- ✅ Clear "Superadmin Access" branding
- ✅ Email and password validation
- ✅ Show/hide password toggle with eye icon
- ✅ Login button with icon
- ✅ Form validation with error messages
- ✅ Loading states during submission
- ✅ Toast notifications for success/error
- ✅ Separate from tenant user authentication

### Superadmin Authentication
- ✅ Secure token-based superadmin authentication
- ✅ Automatic token refresh for superadmin sessions
- ✅ Persistent superadmin login state (localStorage with superadmin prefix)
- ✅ Global superadmin authentication state management
- ✅ Type-safe API integration for superadmin endpoints
- ✅ Clear separation from tenant authentication

### Private Superadmin Routing
- ✅ All pages are protected for superadmin access only
- ✅ Automatic redirect to superadmin login for unauthenticated users
- ✅ Loading states during authentication checks
- ✅ Preserve intended destination after superadmin login

### Superadmin User Experience
- ✅ Smooth transitions and animations
- ✅ Responsive design for all screen sizes
- ✅ Dark mode support
- ✅ Professional superadmin logout functionality in header
- ✅ Superadmin user information display in header
- ✅ Clear indication of superadmin access level

## Usage

### Using the Superadmin Auth Context

```tsx
import { useSuperAdminAuthContext } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useSuperAdminAuthContext();
  
  // Use superadmin authentication state and methods
}
```

### Protected Superadmin Routes

All routes are automatically protected for superadmin access. The `PrivateRoute` component wraps each page:

```tsx
<Route 
  path="/dashboard" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>
```

### Superadmin Login Form

The superadmin login form automatically handles:
- Form validation
- Superadmin API integration
- Success/error states
- Automatic redirect after successful superadmin login
- Clear indication this is for superadmin access only

## Security Features

- Token-based superadmin authentication
- Secure superadmin token storage in localStorage (with superadmin prefix)
- Automatic superadmin token refresh
- Protected superadmin API endpoints
- Form validation on both client and server
- Clear separation from tenant user authentication

## File Structure

```
src/
├── services/
│   └── authService.ts          # Superadmin API service layer
├── hooks/
│   └── useAuth.ts              # Superadmin authentication hook
├── contexts/
│   └── AuthContext.tsx         # Global superadmin auth context
├── components/
│   └── PrivateRoute.tsx        # Superadmin route protection
├── pages/
│   └── Login.tsx               # Superadmin login page
└── docs/
    └── AUTHENTICATION.md       # This documentation
```

## Configuration

The superadmin API base URL is configured in `src/services/authService.ts`:

```typescript
const API_BASE_URL = 'http://localhost:4040/api';
```

Update this URL to match your production superadmin API endpoint.

## Important Notes

- **This authentication system is specifically for superadmin access only**
- **It is completely separate from tenant user authentication**
- **All localStorage keys use the `superadmin_` prefix to avoid conflicts**
- **The login page clearly indicates it's for superadmin access**
- **This system should not be used for tenant user login functionality**
