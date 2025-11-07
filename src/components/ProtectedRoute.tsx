import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Spinner } from '@heroui/react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, userProfile, loading } = useAuth();
  const { username } = useParams<{ username: string }>();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Carregando..." />
      </div>
    );
  }

  // Se não estiver logado, redireciona para login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado mas não tiver perfil carregado ainda
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Carregando perfil..." />
      </div>
    );
  }

  // Se o username da URL não corresponder ao username do usuário logado
  if (username && userProfile.username !== username) {
    return <Navigate to={`/admin/${userProfile.username}`} replace />;
  }

  return <>{children}</>;
};
