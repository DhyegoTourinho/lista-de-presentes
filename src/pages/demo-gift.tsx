import { Card, CardBody, CardHeader, Button, Divider } from "@heroui/react";
import DefaultLayout from "@/layouts/default";

export default function DemoGiftPage() {
  const demoUser = {
    username: "demo",
    displayName: "Usuário Demo",
    bio: "Esta é uma demonstração do sistema de lista de presentes. Configure o Firebase para criar sua própria lista!"
  };

  const demoGifts = [
    {
      id: "1",
      name: "Smartphone Premium",
      description: "Último modelo com ótima câmera e bateria de longa duração",
      price: 2500.00,
      imageUrl: "https://via.placeholder.com/300x200?text=Smartphone",
      link: "https://example.com/smartphone",
      isPurchased: false
    },
    {
      id: "2", 
      name: "Fones de Ouvido Bluetooth",
      description: "Fones sem fio com cancelamento de ruído",
      price: 350.00,
      imageUrl: "https://via.placeholder.com/300x200?text=Fones",
      link: "https://example.com/fones",
      isPurchased: true,
      purchasedBy: "João Silva"
    },
    {
      id: "3",
      name: "Livro de Programação",
      description: "Guia completo para desenvolvimento web moderno",
      price: 89.90,
      imageUrl: "https://via.placeholder.com/300x200?text=Livro",
      link: "https://example.com/livro",
      isPurchased: false
    }
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-6 py-8 md:py-10">
        {/* Header do Perfil */}
        <div className="text-center max-w-2xl">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              D
            </div>
            <div>
              <h1 className="text-3xl font-bold">{demoUser.displayName}</h1>
              <p className="text-default-500">@{demoUser.username}</p>
              <p className="text-default-600 mt-2">{demoUser.bio}</p>
            </div>
          </div>
        </div>

        {/* Aviso de Demo */}
        <div className="w-full max-w-4xl px-4">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardBody className="text-center">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                Página de Demonstração
              </h2>
              <p className="text-purple-700 mb-4">
                Esta é uma prévia de como sua lista de presentes aparecerá. Configure seus presentes para criar sua própria lista personalizada!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  color="secondary"
                  onClick={() => window.open('https://console.firebase.google.com', '_blank')}
                >
                  Configurar Firebase
                </Button>
                <Button
                  variant="bordered"
                  onClick={() => window.open('https://github.com/DhyegoTourinho/lista-de-presentes/blob/main/FIREBASE_SETUP.md', '_blank')}
                >
                  Ver Tutorial
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Lista de Presentes Demo */}
        <div className="w-full max-w-6xl px-4">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Lista de Presentes</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {demoGifts.map((gift) => (
                  <Card key={gift.id} className="max-w-[280px]">
                    <CardBody className="p-4">
                      <img
                        src={gift.imageUrl}
                        alt={gift.name}
                        className="w-full h-40 object-cover rounded-lg mb-3 bg-default-100"
                      />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg leading-tight">{gift.name}</h3>
                          {gift.isPurchased && (
                            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Comprado
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-default-500 line-clamp-2">
                          {gift.description}
                        </p>
                        
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xl font-bold text-primary">
                            R$ {gift.price.toFixed(2)}
                          </span>
                        </div>
                        
                        {!gift.isPurchased && (
                          <Button
                            color="secondary"
                            variant="flat"
                            size="sm"
                            className="w-full mt-3"
                            onClick={() => alert('Demo: Link para compra seria aberto aqui!')}
                          >
                            Ver/Comprar
                          </Button>
                        )}
                        
                        {gift.isPurchased && gift.purchasedBy && (
                          <div className="text-xs text-default-400 mt-2">
                            Comprado por: {gift.purchasedBy}
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-default-400 max-w-md">
          <Divider className="mb-4" />
          <p>
            Esta é uma demonstração do sistema. Com o banco de dados configurado, você poderá:
          </p>
          <ul className="text-left mt-2 space-y-1">
            <li>• Criar sua conta personalizada</li>
            <li>• Adicionar e gerenciar seus presentes</li>
            <li>• Compartilhar sua lista única</li>
            <li>• Acompanhar compras em tempo real</li>
          </ul>
        </div>
      </section>
    </DefaultLayout>
  );
}
