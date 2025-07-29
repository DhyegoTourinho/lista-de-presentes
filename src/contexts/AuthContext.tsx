import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { UserProfile } from '@/types';
import { FirebaseConfigWarning } from '@/components/FirebaseConfigWarning';

// Verificar se o Firebase está configurado
const isFirebaseConfigured = () => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  return requiredVars.every(varName => {
    const value = import.meta.env[varName];
    return value && 
           value !== 'your_api_key_here' && 
           value !== 'your_project_id' && 
           value !== 'your_sender_id' && 
           value !== 'your_app_id';
  });
};

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFirebaseWarning, setShowFirebaseWarning] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setShowFirebaseWarning(true);
      setLoading(false);
      return;
    }
    setShowFirebaseWarning(false);
  }, []);

  const login = async (email: string, password: string) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase não está configurado');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, username: string, displayName: string) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase não está configurado');
    }
    
    // Verificar se o username já existe
    const usernameDoc = await getDoc(doc(db, 'usernames', username));
    if (usernameDoc.exists()) {
      throw new Error('Username já está em uso');
    }

    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Atualizar perfil do Firebase Auth
    await updateProfile(user, { displayName });

    // Criar perfil no Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      username,
      displayName,
      email,
      gifts: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Salvar perfil do usuário
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // Reservar username
    await setDoc(doc(db, 'usernames', username), { uid: user.uid });
  };

  const logout = async () => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase não está configurado');
    }
    await signOut(auth);
    setUserProfile(null);
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!isFirebaseConfigured() || !currentUser || !userProfile) return;

    const updatedProfile = {
      ...userProfile,
      ...profileData,
      updatedAt: new Date()
    };

    await setDoc(doc(db, 'users', currentUser.uid), updatedProfile);
    setUserProfile(updatedProfile);
  };

  const loadUserProfile = async (user: User) => {
    if (!isFirebaseConfigured()) return;
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      setUserProfile(userDoc.data() as UserProfile);
    }
  };

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    logout,
    updateUserProfile
  };

  if (showFirebaseWarning) {
    return <FirebaseConfigWarning />;
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
