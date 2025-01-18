// types/header.ts

export interface User {
    id: string;
    fullName: string;
    email: string;
    avatar?: string;
    role: UserRole;
    createdAt: string;
    lastLogin?: string;
    balance:number;
  }
  
  export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR'
  }
  
  export interface HeaderProps {
    onLoginSuccess?: (user: User) => void;
    onLogout?: () => void;
    className?: string;
  }
  
  export interface NavigationItem {
    path: string;
    label: string;
    icon?: React.ReactNode;
    requiresAuth?: boolean;
    roles?: UserRole[];
  }
  
  export interface UserDropdownProps {
    user: User;
    onLogout: () => void;
    className?: string;
  }
  
  export interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (user: User) => void;
    className?: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
    expiresIn: number;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
  }
  
  export interface RegisterData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }