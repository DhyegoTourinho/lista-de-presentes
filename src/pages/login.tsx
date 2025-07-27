import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Input, Button, Divider } from "@heroui/react";
import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import Alert from "@/components/alert";


export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.toUpperCase() === "Dhyego".toUpperCase() && password.toUpperCase() === "123456".toUpperCase()) {
      window.location.href = "/";
    } else {
      <Alert />
    }
    
  };
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 min-h-[80vh]">
        <div className="flex flex-col items-center gap-8 max-w-md w-full px-4">
          <div className="text-center">
            <h1 className={title()}>Login</h1>
            <p className="text-default-500 mt-2">
              Entre na sua conta para gerenciar sua lista de presentes
            </p>
          </div>

          <Card className="w-full">
            <CardHeader className="flex gap-3 justify-center">
              <div className="flex flex-col items-center">
                <p className="text-md font-semibold">Bem vindo</p>
                <p className="text-small text-default-500">Entre com suas credenciais</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input
                  type="text"
                  label="Usuário"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  isRequired
                  variant="flat"
                />
                
                <Input
                  label="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired
                  variant="flat"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />

                <Button 
                  type="submit" 
                  color="secondary" 
                  className="w-full"
                  variant="shadow"
                  size="lg"
                >
                  Entrar
                </Button>
              </form>

              <div className="flex flex-col gap-4 mt-6">
                <Divider />
                <div className="flex justify-between items-center text-small">
                  <Link to="/" className="text-primary hover:underline">
                    ← Voltar para a lista
                  </Link>
                  {/* <Link to="/register" className="text-primary hover:underline">
                    Criar conta
                  </Link> */}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
