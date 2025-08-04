import { Link, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { title, subtitle } from "@/components/primitives";
import { useAuth } from "@/contexts/AuthContext";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const { currentUser, userProfile } = useAuth();
  
  return (
    <DefaultLayout>
    {currentUser && userProfile ? (
      // Usuário logado - mostrar dashboard
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        
        <div className="inline-block max-w-4xl text-center justify-center">
          <span className={title()}>{userProfile.displayName}'s&nbsp;</span>
          <span className={title({ color: "violet" })}>GIFTLAB&nbsp;</span>
          <br />
        </div> 

        <div className="bg-opacity-100 w-full max-w-4xl mt-4 px-4 space-y-6">
          <Card
          className="bg-opacity-50 border border-default-400"
          >
            <CardHeader>
              <h2 className="text-2xl font-semibold">
                Bem-vindo, 
                <span className="text-secondary-500">&nbsp;{userProfile.displayName}&nbsp;</span>
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <p className="text-default-600 ">
                Gerencie sua lista de presentes e compartilhe com seus amigos e familiares.
              </p>
              
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                <Button
                  as={Link}
                  href={`/admin/${userProfile.username}`}
                  color="secondary"
                  size="lg"
                  className="bg-secondary-500/30 flex-1 py-3"
                >
                    Gerenciar Minha Lista
                </Button>
                
                <Button
                  as={Link}
                  href={`/gift/${userProfile.username}`}
                  variant="bordered"
                  size="lg"
                  className="flex-1 py-3"
                >
                  Ver meu Perfil Público
                </Button>
                <div className="col-span-2 flex flex-col sm:flex-row gap-4 w-full">

                  <Button
                    as={Link}
                    href="/listas"
                    size="lg"
                    variant="bordered"
                    className="py-3 flex-1 bg-gradient-to-r from-black-500/30 to-secondary-500/30"
                  >
                    Ver Listas Públicas
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg mt-16">
                <p className="text-sm text-default-600">
                  <strong>Seu Link público:</strong>
                  <br />
                  <code className="text-secondary">
                    {window.location.origin}/gift/{userProfile.username}
                  </code>
                </p>
                <p className="text-xs text-default-500 mt-2">
                  Compartilhe este link para que outras pessoas vejam sua lista de presentes.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
      ) : (
      // Usuário não logado - mostrar landing page
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-4xl text-center justify-center">
          <span className={title()}>Faça já a sua&nbsp;</span>
          <span className={title({ color: "violet" })}>Lista de Presentes&nbsp;</span>
          <br />
          <div className={subtitle({ class: "mt-4" })}>
            Crie e gerencie sua própria lista de presentes personalizada
        </div>
        </div>
          <div className="w-full max-w-4xl px-4 space-y-8">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
              className="bg-black-600/20 border border-default-400"
              >
                <CardHeader>
                  <h3 className="text-xl font-semibold">🎁 Crie sua Lista</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600 mb-4">
                    Adicione produtos, defina preços e inclua links para facilitar a compra.
                  </p>
                </CardBody>
              </Card>

              <Card
              className="bg-black-600/20 border border-default-400"
              >
                <CardHeader>
                  <h3 className="text-xl font-semibold">🔗 Compartilhe</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600 mb-4">
                    Receba uma URL personalizada para compartilhar com amigos e família.
                  </p>
                </CardBody>
              </Card>

              <Card
              className="bg-black-600/20 border border-default-400"
              >
                <CardHeader>
                  <h3 className="text-xl font-semibold">⚡ Fácil de Usar</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600 mb-4">
                    Interface intuitiva construída com NextUI e React.
                  </p>
                </CardBody>
              </Card>

              <Card
              className="bg-black-600/20 border border-default-400"
              >
                <CardHeader>
                  <h3 className="text-xl font-semibold">🔒 Seguro</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-default-600 mb-4">
                    Seus dados são protegidos com Firebase Authentication.
                  </p>
                </CardBody>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold">Vamos começar?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as={Link}
                  href="/login"
                  color="secondary"
                  size="lg"
                  className="bg-secondary-500/30 px-8"
                >
                  Criar Conta Gratuita
                </Button>
                <Button
                  as={Link}
                  href="/listas"
                  variant="bordered"
                  size="lg"
                  className="px-8 bg-black-500/30"
                >
                  Ver Listas Públicas
                </Button>
              </div>
            </div>
          </div>
        </section>
        )}
    </DefaultLayout>
  );
}
