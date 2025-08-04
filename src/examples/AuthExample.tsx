import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardBody } from '@heroui/react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Exemplo de como usar o AuthProvider atualizado
 * 
 * Funcionalidades demonstradas:
 * - Login automático sem window.location.reload()
 * - Tratamento de erros específicos (credenciais inválidas, muitas tentativas)
 * - Redirecionamento automático quando usuário está logado
 * - Limpeza de erros ao interagir com campos
 * - Estado de loading durante operações
 */
export default function AuthExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, loading, error, login, logout, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirecionamento automático quando usuário está logado
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard'); // ou qualquer rota protegida
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // O login agora gerencia seus próprios erros via contexto
    await login(email, password);
    // Se sucesso, redirecionamento será automático pelo useEffect acima
  };

  const handleInputChange = () => {
    // Limpar erros quando usuário começar a digitar
    if (error) {
      clearError();
    }
  };

  const handleLogout = async () => {
    await logout();
    // Estado será atualizado automaticamente pelo contexto
  };

  // Se usuário está logado, mostrar dashboard simples
  if (currentUser) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardBody className="text-center space-y-4">
          <h2 className="text-xl font-bold">Bem-vindo!</h2>
          <p>Email: {currentUser.email}</p>
          <p>UID: {currentUser.uid}</p>
          <Button 
            color="danger" 
            variant="flat"
            onPress={handleLogout}
            isLoading={loading}
          >
            Sair
          </Button>
        </CardBody>
      </Card>
    );
  }

  // Formulário de login
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardBody>
        <form onSubmit={handleLogin} className="space-y-4">
          <h2 className="text-xl font-bold text-center">Login</h2>
          
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange();
            }}
            required
          />
          
          <Input
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            required
          />

          {/* Exibição automática de erros do contexto */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={loading}
            isDisabled={!email || !password}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            <p>Exemplos de erro que você pode testar:</p>
            <p>• Email: usuario@inexistente.com</p>
            <p>• Senha: senhaerrada</p>
            <p>• Resultado: "Credenciais inválidas, por favor, verifique seus dados e tente novamente."</p>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}

/*
BENEFÍCIOS DO AUTHPROVIDER ATUALIZADO:

1. **Sem window.location.reload()**
   - Estado reativo atualiza automaticamente a UI
   - Transições suaves entre estados de autenticação
   - Melhor experiência do usuário

2. **Gerenciamento de erros centralizado**
   - Erros específicos por tipo (credenciais inválidas, muitas tentativas)
   - Mensagens de segurança que não revelam dados sensíveis
   - Fácil limpeza de erros

3. **Estado de loading consistente**
   - Loading global durante operações de autenticação
   - UI responsiva com indicadores visuais
   - Previne múltiplos submits

4. **Redirecionamento automático**
   - useEffect monitora mudanças no currentUser
   - Redirecionamento suave sem reload da página
   - Flexível para diferentes rotas

5. **Persistência local automática**
   - Firebase mantém sessão automaticamente
   - onAuthStateChanged sincroniza estado
   - Recuperação de sessão ao recarregar página

EXEMPLO DE USO EM QUALQUER COMPONENTE:

const { currentUser, error, login, clearError } = useAuth();

// Login simples
await login(email, password);

// Verificar se está logado
if (currentUser) {
  // Usuário autenticado
}

// Mostrar erros
if (error) {
  // Exibir error na UI
}

// Limpar erros
clearError();
*/
