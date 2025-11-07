import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  AuthError,
  AuthErrorCodes
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
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
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
  const [error, setError] = useState<string | null>(null);
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
      setError("Firebase não está configurado");
      return;
    }

    setError(null); // Limpar erro anterior
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      // Tipar com mais segurança
      const error = err as AuthError;
      
      // Códigos que indicam credenciais inválidas
      const invalidCredentialCodes = new Set([
        AuthErrorCodes.INVALID_EMAIL, // email mal formatado
        AuthErrorCodes.USER_DELETED, // usuário não existe  
        AuthErrorCodes.INVALID_PASSWORD, // senha errada
        'auth/wrong-password', // senha incorreta (código antigo)
        'auth/user-not-found', // usuário não encontrado
        'auth/invalid-credential', // credencial inválida (novo código Firebase v9+)
        'auth/invalid-login-credentials' // credenciais de login inválidas
      ]);

      if (invalidCredentialCodes.has(error.code)) {
        // Mensagem genérica para não vazar qual dos dois está errado
        setError("Credenciais inválidas, por favor, verifique seus dados e tente novamente.");
      } else if (error.code === 'auth/too-many-requests') {
        setError("Muitas tentativas de login. Tente novamente em alguns minutos.");
      } else {
        // Para outros tipos de erro, usar mensagem genérica
        setError("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
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

  const clearError = () => {
    setError(null);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    clearError
  };

  if (showFirebaseWarning) {
    return <FirebaseConfigWarning />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
