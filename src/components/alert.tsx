import {Alert} from "@heroui/react";

export default function App() {
  const title = "Credenciais inválidas";
  const description = "Usuário ou senha incorretos. Tente novamente.";

  return (
    <div className="flex items-center justify-center w-full">
      <Alert description={description} title={title} />
    </div>
  );
}
