import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { superAdminAuthService, SuperAdminCredentials, SuperAdmin } from '@/services/authService';

interface SuperAdminAuthState {
  user: SuperAdmin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useSuperAdminAuth = () => {
  const [authState, setAuthState] = useState<SuperAdminAuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('superadmin_token');
        const user = localStorage.getItem('superadmin_user');
        
        if (token && user) {
          setAuthState({
            user: JSON.parse(user),
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error initializing superadmin auth:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: SuperAdminCredentials): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      console.log('Attempting superadmin login with credentials:', { email: credentials.email });
      
      const data = await superAdminAuthService.login(credentials);
      
      console.log('API response:', data);

      // Check if the response indicates failure
      if (data.success === false || data.error) {
        throw new Error(data.message || data.error || 'Superadmin login failed');
      }

      // Try to extract user and token from various possible response formats
      let user, token;

      // Format 1: Standard Node.js/Express response { success: true, data: { user, token } }
      if (data.data && data.data.user && data.data.token) {
        user = data.data.user;
        token = data.data.token;
        console.log('Login successful (standard format), storing user data:', user);
      }
      // Format 2: Direct response { user, token }
      else if (data.user && data.token) {
        user = data.user;
        token = data.token;
        console.log('Login successful (direct format), storing user data:', user);
      }
      // Format 3: JWT with user { user, accessToken } or { user, jwt }
      else if (data.user && (data.accessToken || data.jwt)) {
        user = data.user;
        token = data.accessToken || data.jwt;
        console.log('Login successful (JWT format), storing user data:', user);
      }
      // Format 4: Prisma user with different token field names
      else if ((data.admin || data.superadmin) && (data.token || data.accessToken || data.jwt)) {
        user = data.admin || data.superadmin;
        token = data.token || data.accessToken || data.jwt;
        console.log('Login successful (admin format), storing user data:', user);
      }
      // Format 5: Check for Prisma model naming (User model)
      else if (data.User && data.token) {
        user = data.User;
        token = data.token;
        console.log('Login successful (Prisma User model), storing user data:', user);
      }
      // Format 6: Check for nested response with different structure
      else if (data.result && data.result.user && data.result.token) {
        user = data.result.user;
        token = data.result.token;
        console.log('Login successful (nested result), storing user data:', user);
      }
      // Format 7: Check for response with message and data
      else if (data.message && data.user && data.token) {
        user = data.user;
        token = data.token;
        console.log('Login successful (message format), storing user data:', user);
      }
      // Format 8: Token-only response (decode user from JWT)
      else if (data.token && !data.user) {
        token = data.token;
        console.log('Login successful (token-only format), decoding user from JWT');
        
        // Decode JWT to extract user information
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          user = {
            id: payload.id,
            email: payload.email,
            name: payload.name || payload.email,
            role: payload.role || 'superadmin'
          };
          console.log('Decoded user from JWT:', user);
        } catch (jwtError) {
          console.error('Error decoding JWT:', jwtError);
          // Create a minimal user object if JWT decoding fails
          user = {
            id: 'unknown',
            email: 'unknown@example.com',
            name: 'Superadmin',
            role: 'superadmin'
          };
        }
      }
      else {
        console.error('Unknown response format from Node.js/Prisma backend:', data);
        console.error('Available keys in response:', Object.keys(data));
        
        // Try to find token and user anywhere in the response (fallback)
        console.log('Attempting fallback extraction...');
        
        // Search for token in any nested object
        const findToken = (obj: any, path = ''): string | null => {
          if (typeof obj !== 'object' || obj === null) return null;
          
          for (const [key, value] of Object.entries(obj)) {
            const currentPath = path ? `${path}.${key}` : key;
            
            if (key.toLowerCase().includes('token') && typeof value === 'string') {
              console.log(`Found token at: ${currentPath}`);
              return value;
            }
            
            if (typeof value === 'object') {
              const found = findToken(value, currentPath);
              if (found) return found;
            }
          }
          return null;
        };
        
        // Search for user in any nested object
        const findUser = (obj: any, path = ''): any => {
          if (typeof obj !== 'object' || obj === null) return null;
          
          for (const [key, value] of Object.entries(obj)) {
            const currentPath = path ? `${path}.${key}` : key;
            
            if (key.toLowerCase().includes('user') || key.toLowerCase().includes('admin')) {
              console.log(`Found user at: ${currentPath}`);
              return value;
            }
            
            if (typeof value === 'object') {
              const found = findUser(value, currentPath);
              if (found) return found;
            }
          }
          return null;
        };
        
        const foundToken = findToken(data);
        const foundUser = findUser(data);
        
        if (foundToken && foundUser) {
          console.log('Fallback extraction successful!');
          console.log('Found token:', foundToken.substring(0, 20) + '...');
          console.log('Found user:', foundUser);
          
          user = foundUser;
          token = foundToken;
        } else {
          console.error('Could not find token or user in response');
          throw new Error(`Unknown response format. Received: ${JSON.stringify(data, null, 2)}`);
        }
      }

      // Validate that we have the required fields
      if (!user || !token) {
        console.error('Missing user or token in response:', { user, token });
        throw new Error('Invalid response: missing user or token');
      }

      // Ensure user has required fields
      if (!user.id || !user.email) {
        console.error('User object missing required fields:', user);
        throw new Error('Invalid user data: missing id or email');
      }

      // Store auth data in localStorage with superadmin prefix
      localStorage.setItem('superadmin_token', token);
      localStorage.setItem('superadmin_user', JSON.stringify(user));

      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: "Superadmin Login Successful",
        description: `Welcome back, ${user.name || user.email}!`,
      });

      return true;
    } catch (error) {
      console.error('Superadmin login error:', error);
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
      
      toast({
        title: "Superadmin Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during superadmin login",
        variant: "destructive",
      });

      return false;
    }
  }, [toast]);

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem('superadmin_token');
    localStorage.removeItem('superadmin_user');

    // Reset auth state
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });

    toast({
      title: "Superadmin Logged Out",
      description: "You have been successfully logged out.",
    });
  }, [toast]);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('superadmin_token');
      if (!token) return false;

      const data = await superAdminAuthService.refreshToken(token);

      if (data.success && data.data) {
        const { user, token: newToken } = data.data;
        
        localStorage.setItem('superadmin_token', newToken);
        localStorage.setItem('superadmin_user', JSON.stringify(user));

        setAuthState({
          user,
          token: newToken,
          isAuthenticated: true,
          isLoading: false,
        });

        return true;
      }

      // If refresh fails, logout
      logout();
      return false;
    } catch (error) {
      console.error('Superadmin token refresh error:', error);
      logout();
      return false;
    }
  }, [logout]);

  return {
    ...authState,
    login,
    logout,
    refreshToken,
  };
};
