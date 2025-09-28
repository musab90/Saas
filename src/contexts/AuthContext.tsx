import React, { createContext, useContext, ReactNode } from 'react';
import { useSuperAdminAuth } from '@/hooks/useAuth';
import { SuperAdmin, SuperAdminCredentials } from '@/services/authService';

interface SuperAdminAuthContextType {
  user: SuperAdmin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: SuperAdminCredentials) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const SuperAdminAuthContext = createContext<SuperAdminAuthContextType | undefined>(undefined);

interface SuperAdminAuthProviderProps {
  children: ReactNode;
}

export const SuperAdminAuthProvider: React.FC<SuperAdminAuthProviderProps> = ({ children }) => {
  const auth = useSuperAdminAuth();

  return (
    <SuperAdminAuthContext.Provider value={auth}>
      {children}
    </SuperAdminAuthContext.Provider>
  );
};

export const useSuperAdminAuthContext = (): SuperAdminAuthContextType => {
  const context = useContext(SuperAdminAuthContext);
  if (context === undefined) {
    throw new Error('useSuperAdminAuthContext must be used within a SuperAdminAuthProvider');
  }
  return context;
};
