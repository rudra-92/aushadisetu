import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEFAULT_USER, storageService } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: () => void;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return localStorage.getItem('aushadhi_onboarded') === 'true';
  });

  useEffect(() => {
    const savedUser = storageService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrPhone: string, _password: string, _rememberMe = true) => {
    // Basic validation
    if (!emailOrPhone.trim()) {
      return { success: false, error: 'Please enter a valid email or phone number.' };
    }

    // Demo account matching or fallback login
    const loggedUser: User = {
      ...DEFAULT_USER,
      email: emailOrPhone.includes('@') ? emailOrPhone : DEFAULT_USER.email,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : DEFAULT_USER.phone
    };

    storageService.setUser(loggedUser);
    setUser(loggedUser);
    return { success: true };
  };

  const loginAsDemo = () => {
    storageService.setUser(DEFAULT_USER);
    setUser(DEFAULT_USER);
    localStorage.setItem('aushadhi_onboarded', 'true');
    setHasCompletedOnboarding(true);
  };

  const register = async (name: string, email: string, phone: string, _password: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      role: 'Consumer',
      totalScans: 0,
      totalReports: 0
    };

    storageService.setUser(newUser);
    setUser(newUser);
    // User needs to go through onboarding
    localStorage.setItem('aushadhi_onboarded', 'false');
    setHasCompletedOnboarding(false);
    return { success: true };
  };

  const logout = () => {
    storageService.setUser(null);
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    const updated = storageService.updateUserProfile(updates);
    setUser(updated);
  };

  const completeOnboarding = (role: UserRole) => {
    if (user) {
      const updated = storageService.updateUserProfile({ role });
      setUser(updated);
    }
    localStorage.setItem('aushadhi_onboarded', 'true');
    setHasCompletedOnboarding(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
        hasCompletedOnboarding,
        completeOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
