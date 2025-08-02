import React, { useState } from "react";
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
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputChange = (field: string, value: string) => {
    const newValue = value.replace(/ /g, "-");
    setFormData(prev => ({ ...prev, [field]: newValue }));
    setError(""); // Limpar erro ao digitar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.username || !formData.displayName) {
          throw new Error("Por favor, preencha todos os campos");
        }
        await register(formData.email, formData.password, formData.username, formData.displayName);
      }
      // Redirecionar será feito automaticamente pelo AuthContext
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erro ao processar solicitação");
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
                    description="Este será sua URL pública: /gift/seu-username"
                  />
                  
                  <Input
                    label="Nome de exibição"
                    placeholder="Ex: Dhyego Tourinho"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange("displayName", e.target.value)}
                    variant="bordered"
                    isRequired
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
              />
              
              <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                variant="bordered"
                isRequired
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

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
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
                  setError("");
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
