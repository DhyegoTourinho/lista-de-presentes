import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Avatar, Button, Chip } from "@heroui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { UserProfile } from "@/types";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { Link } from "react-router-dom";

export default function PublicListsPage() {
  const [publicLists, setPublicLists] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPublicLists = async () => {
      try {
        // Buscar todos os usuários públicos
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as unknown as UserProfile[];

        // Filtrar apenas usuários que têm username (listas públicas)
        const publicUsersList = usersList.filter(user => user.username);
        
        setPublicLists(publicUsersList);
      } catch (err) {
        console.error("Erro ao carregar listas públicas:", err);
        setError("Erro ao carregar listas públicas");
      } finally {
        setLoading(false);
      }
    };

    loadPublicLists();
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center min-h-screen">
          <div>Carregando listas públicas...</div>
        </section>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Erro</h1>
            <p className="text-default-500">{error}</p>
          </div>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-6 py-8 md:py-10">
        {/* Header */}
        <div className="text-center max-w-2xl">
          <h1 className={title()}>Listas de Presentes Públicas</h1>
          <p className="text-default-500 mt-4">
            Explore as listas de presentes criadas por outros usuários
          </p>
        </div>

        {/* Lista de usuários */}
        <div className="w-full max-w-4xl px-4">
          {publicLists.length === 0 ? (
            <div className="text-center py-8 text-default-500">
              <p>Nenhuma lista pública encontrada ainda.</p>
              <p>Seja o primeiro a criar uma lista!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicLists.map((user) => (
                <Card key={user.uid} className="max-w-[300px] bg-opacity-100 border border-default-400" isPressable>
                  <CardHeader className="flex gap-3">
                    <Avatar 
                      size="md"
                      src={user.profileImage}
                      name={user.displayName}
                      className="flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1">
                      <p className="text-md font-semibold">{user.displayName}</p>
                      <p className="text-small text-default-500">@{user.username}</p>
                    </div>
                  </CardHeader>
                  
                  <CardBody className="pt-0">
                    {user.bio ? (
                      <p className="text-sm text-default-600 mb-3 line-clamp-2">
                        {user.bio}
                      </p>
                    ) : (
                        <p className="text-sm text-default-600/0 mb-3 line-clamp-2">
                          .
                        </p>
                    )}
                    
                    <div className="flex justify-between items-center mb-3">
                      <Chip size="sm" variant="flat" color="secondary">
                        Lista Pública
                      </Chip>
                      {user.createdAt && (
                        <span className="text-xs text-default-400">
                          Criado em {new Date((user.createdAt as any)?.seconds ? (user.createdAt as any).seconds * 1000 : user.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      as={Link}
                      to={`/gift/${user.username}`}
                      variant="bordered"
                      size="sm"
                      className="w-full bg-secondary-500/30"
                    >
                      Ver Lista de Presentes
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer com call to action */}
        <div className="text-center max-w-4xl mt-8">
          <Card className="bg-gradient-to-r from-secondary-50/60 to-primary-50/60">
            <CardBody className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Crie sua própria lista!</h3>
              <p className="text-default-600">
                Junte-se à comunidade e crie sua lista de presentes personalizada
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  as={Link}
                  to="/login"
                  color="secondary"
                  size="lg"
                >
                  Criar Minha Lista
                </Button>
                <Button
                  as={Link}
                  to="/"
                  variant="bordered"
                  size="lg"
                >
                  Voltar ao Início
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
