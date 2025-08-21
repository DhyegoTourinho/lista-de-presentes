import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Image,
  Chip,
  Avatar
} from "@heroui/react";
import { 
  doc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy 
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { UserProfile, Gift } from "@/types";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { CometCard } from "@/components/ui/comet-card";

export default function GiftPage() {
  const { username } = useParams<{ username: string }>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!username) return;

      try {
        // Primeiro, buscar o UID pelo username
        const usernameDoc = await getDoc(doc(db, 'usernames', username));
        
        if (!usernameDoc.exists()) {
          setError("Usuário não encontrado");
          return;
        }

        const uid = usernameDoc.data().uid;
        
        // Buscar o perfil completo do usuário
        const userDoc = await getDoc(doc(db, 'users', uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          setUserProfile(userData);
          
          // Carregar presentes da subcoleção
          const giftsRef = collection(db, 'users', uid, 'gifts');
          const q = query(giftsRef, orderBy('createdAt', 'desc'));
          const giftsSnapshot = await getDocs(q);
          
          const giftsData = giftsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Gift[];
          
          setGifts(giftsData);
        } else {
          setError("Perfil não encontrado");
        }
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setError("Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [username]);

  const handlePurchaseClick = (gift: Gift) => {
    if (gift.link) {
      window.open(gift.link, '_blank');
    }
  };

  if (loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center min-h-screen">
          <div>Carregando...</div>
        </section>
      </DefaultLayout>
    );
  }
  // Verificações usando variáveis
  const isPaginaNaoEncontrada = error === "Página não encontrada";
  const isUsuarioNaoEncontrado = error === "Usuário não encontrado";

  if (isUsuarioNaoEncontrado) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className={title({ color: "violet" })}>Usuário não encontrado</h1>
          <p className="text-default-500 text-1xl">
            O usuário "<span className="text-secondary-600">{username}</span>" não existe, verifique se a url está correta e tente novamente.
          </p>
        </div>
      </section>
    );
  }

  if (isPaginaNaoEncontrada) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-warning">Página não encontrada</h1>
          <p className="text-default-500">
            A página solicitada não existe.
          </p>
        </div>
      </section>
    );
  }
  if (error || !userProfile) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className={title({ color: "violet" })}>Perfil não encontrado</h1>
            <p className="text-default-500">
              O usuário "<span className="text-secondary-600">{username}</span>" não existe, verifique se a url está correta e tente novamente
            </p>
          </div>
        </section>
    );
  }
  if (error) {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className={title({ color: "violet" })}>Ocorreu um erro inesperado</h1>
            <p className="text-default-500">{error || "Ocorreu um erro, por favor tente novamente."}</p>
          </div>
        </section>
    );
  }
  

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-6 py-8 md:py-10">
        {/* Header do Perfil */}
        <div className="text-center max-w-2xl">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Avatar 
              size="lg"
              src={userProfile.profileImage}
              name={userProfile.displayName}
              className="w-20 h-20"
            />
            <div>
              <h1 className="text-3xl font-bold">{userProfile.displayName}</h1>
              <p className="text-default-500">@{userProfile.username}</p>
              {userProfile.bio && (
                <p className="text-default-600 mt-2">{userProfile.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Lista de Presentes */}
        <div className="w-full max-w-6xl px-4">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Lista de Presentes</h2>
            </CardHeader>
            <CardBody>
              {gifts.length === 0 ? (
                <div className="text-center py-8 text-default-500">
                  <p>Nenhum presente na lista ainda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
                  {gifts.map((gift) => (
                  <CometCard rotateDepth = {17.5}
                    translateDepth = {20}
                    className = "max-w-[280px] mx-auto"
                  >
                    <Card key={gift.id} className="max-w-[280px]">
                      <CardBody className="p-4">
                        {gift.imageUrl && (
                          <Image
                          src={gift.imageUrl}
                          alt={gift.name}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                          fallbackSrc="/api/placeholder/280/160"
                          />
                        )}
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg leading-tight">{gift.name}</h3>
                            {gift.isPurchased && (
                              <Chip color="success" size="sm" variant="flat">
                                Comprado
                              </Chip>
                            )}
                          </div>
                          
                          {gift.description && (
                            <p className="text-sm text-default-500 line-clamp-2">
                              {gift.description}
                            </p>
                          )}
                          
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-xl font-bold text-primary">
                              R$ {gift.price.toFixed(2)}
                            </span>
                          </div>
                          
                          {gift.link && !gift.isPurchased && (
                            <Button
                            color="secondary"
                            variant="flat"
                            size="sm"
                            className="w-full mt-3"
                            onPress={() => handlePurchaseClick(gift)}
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
                  </CometCard>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Footer com informações */}
        <div className="text-center text-sm text-default-400 max-w-md">
          <p>
            Esta é uma lista de presentes pública. 
            {!userProfile.gifts?.some(g => g.isPurchased) && userProfile.gifts?.length > 0 && (
              " Clique nos itens para ver onde comprar."
            )}
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
