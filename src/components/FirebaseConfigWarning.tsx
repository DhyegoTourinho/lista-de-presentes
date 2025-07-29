import { Card, CardBody, CardHeader, Button, Link } from "@heroui/react";

export const FirebaseConfigWarning = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <h2 className="text-xl font-bold text-warning">⚠️ Configuração Necessária</h2>
        </CardHeader>
        <CardBody className="space-y-4 text-center">
          <p className="text-default-600">
            O Firebase não está configurado corretamente. Para usar o sistema de autenticação, você precisa:
          </p>
          
          <div className="text-left space-y-2 text-sm">
            <p>1. Criar um projeto no Firebase Console</p>
            <p>2. Configurar Authentication (Email/Password)</p>
            <p>3. Configurar Firestore Database</p>
            <p>4. Adicionar as configurações ao arquivo .env</p>
          </div>
          
          <div className="space-y-2">
            <Button
              as={Link}
              href="https://console.firebase.google.com"
              target="_blank"
              color="secondary"
              className="w-full"
            >
              Abrir Firebase Console
            </Button>
            
            <Button
              as={Link}
              href="https://github.com/DhyegoTourinho/lista-de-presentes/blob/main/FIREBASE_SETUP.md"
              target="_blank"
              variant="bordered"
              className="w-full"
            >
              Ver Instruções Detalhadas
            </Button>
          </div>
          
          <p className="text-xs text-default-400">
            Após configurar, recarregue a página
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
