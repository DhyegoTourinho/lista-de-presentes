import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardBody, CardHeader, Link, Divider } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    displayName: ""
  });
  const [registerError, setRegisterError] = useState(""); // Erro específico para registro

  const { currentUser, login, register, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirecionar automaticamente quando usuário estiver logado
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Aplicar limitações específicas por campo
    if (field === "username") {
      // Username: máximo 75 caracteres, remover espaços e converter para minúsculas
      processedValue = value.replace(/\s+/g, "-").toLowerCase().slice(0, 75);
    } else if (field === "email") {
      // Email: máximo 250 caracteres
      processedValue = value.slice(0, 250);
    } else if (field === "displayName") {
      // Display name: máximo 100 caracteres (boa prática)
      processedValue = value.slice(0, 100);
    } else if (field === "password") {
      // Password: máximo 128 caracteres (padrão de segurança)
      processedValue = value.slice(0, 128);
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    clearError(); // Limpar erro do contexto ao digitar
    setRegisterError(""); // Limpar erro de registro
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    setRegisterError("");

    try {
      // Validações adicionais
      if (!isLogin) {
        // Validar campos obrigatórios
        if (!formData.username || !formData.displayName) {
          setRegisterError("Por favor, preencha todos os campos obrigatórios");
          return;
        }

        // Validar limites de caracteres
        if (formData.username.length > 75) {
          setRegisterError("Nome de usuário deve ter no máximo 75 caracteres");
          return;
        }

        if (formData.email.length > 250) {
          setRegisterError("E-mail deve ter no máximo 250 caracteres");
          return;
        }

        if (formData.displayName.length > 100) {
          setRegisterError("Nome de exibição deve ter no máximo 100 caracteres");
          return;
        }

        if (formData.password.length > 128) {
          setRegisterError("Senha deve ter no máximo 128 caracteres");
          return;
        }

        // Validar username (apenas letras, números, hífens e underscores)
        if (!/^[a-z0-9_-]+$/.test(formData.username)) {
          setRegisterError("Nome de usuário deve conter apenas letras minúsculas, números, hífens e underscores");
          return;
        }

        // Validar tamanho mínimo do username
        if (formData.username.length < 3) {
          setRegisterError("Nome de usuário deve ter pelo menos 3 caracteres");
          return;
        }

        await register(formData.email, formData.password, formData.username, formData.displayName);
      } else {
        await login(formData.email, formData.password);
      }
      // Redirecionamento será automático pelo useEffect
    } catch (err: any) {
      setRegisterError(err.message || "Erro ao processar solicitação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="flex flex-col items-center pb-4">
            <h1 className="text-2xl font-bold">
              {isLogin ? "Entrar" : "Criar Conta"}
            </h1>
            <p className="text-default-500 text-center">
              {isLogin 
                ? "Entre na sua conta para gerenciar seus presentes" 
                : "Crie sua conta e comece a gerenciar sua lista de presentes"
              }
            </p>
          </CardHeader>
          
          <CardBody className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <Input
                    label="Nome de usuário"
                    placeholder="Ex: dhyego-tourinho"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    variant="bordered"
                    isRequired
                    maxLength={75}
                    description={
                      <div className="flex justify-between">
                        <span>Este será sua URL pública: /gift/seu-username</span>
                        <span className={`text-xs ${formData.username.length > 65 ? 'text-warning' : formData.username.length === 75 ? 'text-danger' : 'text-default-400'}`}>
                          {formData.username.length}/75
                        </span>
                      </div>
                    }
                    color={formData.username.length === 75 ? "danger" : formData.username.length > 65 ? "warning" : "default"}
                  />
                  
                  <Input
                    label="Nome de exibição"
                    placeholder="Ex: Dhyego Tourinho"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange("displayName", e.target.value)}
                    variant="bordered"
                    isRequired
                    maxLength={100}
                    description={
                      <div className="flex justify-end">
                        <span className={`text-xs ${formData.displayName.length > 85 ? 'text-warning' : formData.displayName.length === 100 ? 'text-danger' : 'text-default-400'}`}>
                          {formData.displayName.length}/100
                        </span>
                      </div>
                    }
                    color={formData.displayName.length === 100 ? "danger" : formData.displayName.length > 85 ? "warning" : "default"}
                  />
                </>
              )}
              
              <Input
                label="E-mail"
                placeholder="seu@email.com"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                variant="bordered"
                isRequired
                maxLength={250}
                description={
                  <div className="flex justify-end">
                    <span className={`text-xs ${formData.email.length > 225 ? 'text-warning' : formData.email.length === 250 ? 'text-danger' : 'text-default-400'}`}>
                      {formData.email.length}/250
                    </span>
                  </div>
                }
                color={formData.email.length === 250 ? "danger" : formData.email.length > 225 ? "warning" : "default"}
              />
              
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                variant="bordered"
                isRequired
                maxLength={128}
                description={
                  <div className="flex justify-end">
                    <span className={`text-xs ${formData.password.length > 110 ? 'text-warning' : formData.password.length === 128 ? 'text-danger' : 'text-default-400'}`}>
                      {formData.password.length}/128
                    </span>
                  </div>
                }
                color={formData.password.length === 128 ? "danger" : formData.password.length > 110 ? "warning" : "default"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />

              {(error || registerError) && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                  {error || registerError}
                </div>
              )}

              <Button
                color="secondary"
                type="submit"
                className="w-full"
                size="lg"
                isLoading={loading}
              >
                {isLogin ? "Entrar" : "Criar Conta"}
              </Button>
            </form>

            <Divider />

            <div className="text-center">
              <p className="text-sm text-default-500">
                {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              </p>
              <Link
                href="/admin/:username"
                as="button"
                type="button"
                color="secondary"
                onPress={() => {
                  setIsLogin(!isLogin);
                  clearError();
                  setRegisterError("");
                  setFormData({ email: "", password: "", username: "", displayName: "" });
                }}
              >
                {isLogin ? "Criar conta" : "Fazer login"}
              </Link>
            </div>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
