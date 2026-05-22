import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserProfile } from '../types';
import { MOCK_USERS, MOCK_PROFILES } from '../data/mockData';

interface MockUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: MockUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const SESSION_KEY = 'myrh_mock_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const savedUser: MockUser = JSON.parse(saved);
      setUser(savedUser);
      const savedProfile = MOCK_PROFILES.find(p => p.id === savedUser.id) || null;
      setProfile(savedProfile);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) {
      throw new Error('Email ou mot de passe incorrect');
    }
    const mockUser: MockUser = { id: found.id, email: found.email };
    const mockProfile = MOCK_PROFILES.find(p => p.id === found.id) || null;
    localStorage.setItem(SESSION_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    setProfile(mockProfile);
  };

  const signUp = async (email: string, _password: string, profileData: Partial<UserProfile>) => {
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) {
      throw new Error('Un compte avec cet email existe déjà');
    }
    // In demo mode, signup creates a temporary session
    const newUser: MockUser = { id: `user-${Date.now()}`, email };
    const newProfile: UserProfile = {
      id: newUser.id,
      full_name: profileData.full_name || '',
      company_name: profileData.company_name || '',
      phone: profileData.phone || '',
      user_type: profileData.user_type || 'particulier',
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    MOCK_PROFILES.push(newProfile);
  };

  const signOut = async () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      const refreshed = MOCK_PROFILES.find(p => p.id === user.id) || null;
      setProfile(refreshed);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
