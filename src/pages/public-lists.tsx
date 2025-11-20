import { useState, useEffect, useMemo } from "react";
import { Card, CardBody, CardHeader, Avatar, Button, Chip } from "@heroui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { UserProfile } from "@/types";
import { SearchIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { Link } from "react-router-dom";
import { RateLimiter, QueryCache } from "@/utils/rateLimiting";
import { useAuth } from "@/contexts/AuthContext";
import useIsMobile from "@/hooks/useIsMobile";

export default function PublicListsPage() {
  const [publicLists, setPublicLists] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLists = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return publicLists;
    return publicLists.filter((user) => {
      const name = (user.displayName || "").toString().toLowerCase();
      const username = (user.username || "").toString().toLowerCase();
      const bio = (user.bio || "").toString().toLowerCase();
      return (
        name.includes(q) ||
        username.includes(q) ||
        bio.includes(q)
      );
    });
  }, [publicLists, searchQuery]);

  const { userProfile, loading: authLoading } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadPublicLists = async () => {
      try {
        // Rate limiting - máximo 5 requisições por hora
        if (!RateLimiter.canMakeRequest('load_public_lists', 1000, 3600000)) {
          setError('Muitas requisições. Tente novamente em 1 hora.');
          setLoading(false);
          return;
        }

        // Verificar cache primeiro
        const cacheKey = 'public_lists';
        let data = QueryCache.get(cacheKey);
        
        if (data) {
          setPublicLists(data);
          setLoading(false);
          return;
        }

        // Buscar usuários com limite para controlar custos
        const usersRef = collection(db, 'users');
        const q = query(
          usersRef, 
          orderBy('createdAt', 'desc'),
          limit(200) // Limitar a 200 usuários para reduzir custos
        );
        const usersSnapshot = await getDocs(q);
        
        if (usersSnapshot.size === 0) {
          setPublicLists([]);
          setLoading(false);
          return;
        }

        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as unknown as UserProfile[];

        // Filtrar apenas usuários que têm username (listas públicas)
        const publicUsersList = usersList.filter(user => user.username);
        
        // Cache por 10 minutos para reduzir consultas
        QueryCache.set(cacheKey, publicUsersList, 600000);
        
        setPublicLists(publicUsersList);
      } catch (err) {
        console.error("Erro ao carregar listas públicas:", err);
        setError("Erro ao carregar listas públicas. Tente novamente mais tarde.");
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

        {/* Campo de busca */}
        <div className="w-full max-w-4xl px-4">
          <div className="mx-auto max-w-2xl mt-6">
            <label htmlFor="search" className="sr-only">Buscar listas</label>
            <div className="flex items-center gap-2 border border-default-400 rounded-md px-3 py-2 bg-default-0">
              <SearchIcon className="text-default-500" />
              <input
                id="search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por nome, usuário ou descrição..."
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
          </div>
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
              {filteredLists.length === 0 ? (
                <div className="col-span-full text-center py-8 text-default-500">
                  <p>Nenhuma lista encontrada para "{searchQuery}".</p>
                </div>
              ) : (
                filteredLists.map((user) => (
                  <Link key={user.uid} to={`/gift/${user.username}`} className={isMobile ? 'col-span-full block' : 'block'}>
                    <Card className={`${isMobile ? 'w-full' : 'max-w-[300px]'} bg-opacity-100 border border-default-400`} isPressable>
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
                          <p className="text-sm text-default-600/0 mb-3 line-clamp-2">.</p>
                        )}

                        <div className="flex justify-between items-center mb-3">
                          <Chip size="sm" variant="flat" color="secondary">Lista Pública</Chip>
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
                          size={isMobile ? 'md' : 'sm'}
                          className="w-full bg-secondary-500/30"
                        >
                          Ver Lista de Presentes
                        </Button>
                      </CardBody>
                    </Card>
                  </Link>
              ))
              )}
            </div>
          )}

        </div>

        {/* Footer com call to action - só mostrar se não houver username no perfil do usuário autenticado */}
        {(!authLoading && !(userProfile && userProfile.username)) && (
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
        )}
      </section>
    </DefaultLayout>
  );
}
