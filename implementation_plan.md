# Implementation Plan: Login Redirect and Logout

## Goal
Implement login redirection to the admin dashboard and logout functionality, and secure the admin routes.

## Changes

### 1. Environment Setup
- Created `.env` file with Supabase credentials and application name configuration.

### 2. Login Redirect
- **File**: `src/pages/auth/login/ui/Login.tsx`
- **Change**: Updated `handleSuccess` to navigate to `/admin` upon successful login.
- **Library**: Used `useNavigate` from `react-router-dom`.

### 3. Logout Functionality
- **File**: `src/widgets/sidebar/ui/AppSidebar.tsx`
- **Change**: Added `handleLogout` function attached to the "Logout" button.
- **Logic**: Calls `supabase.auth.signOut()` and redirects to `/auth/login`.

### 4. Admin Route Protection
- **File**: `src/shared/layouts/AdminLayout.tsx`
- **Change**: Added session check on mount using `supabase.auth.getSession()` and `onAuthStateChange`.
- **Logic**: Redirects unauthenticated users to `/auth/login`.

## Verification
- **Build**: Validated with `npm run dev`.
- **Types**: Fixed strict TypeScript errors regarding Supabase types.
- **Linting**: Addressed unused imports and strict mode requirements.
