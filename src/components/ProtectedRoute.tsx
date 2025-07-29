import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, userProfile } = useAuth();
  const { username } = useParams<{ username: string }>();

  // Se não estiver logado, redireciona para login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado mas não tiver perfil carregado ainda
  if (!userProfile) {
    return <div>Carregando...</div>;
  }

  // Se o username da URL não corresponder ao username do usuário logado
  if (username && userProfile.username !== username) {
    return <Navigate to={`/admin/${userProfile.username}`} replace />;
  }

  return <>{children}</>;
};
