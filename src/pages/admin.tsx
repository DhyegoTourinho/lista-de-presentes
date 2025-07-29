import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { 
  Button, 
  Input, 
  Card, 
  CardBody, 
  CardHeader, 
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image
} from "@heroui/react";
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/config/firebase";
import { Gift } from "@/types";
import DefaultLayout from "@/layouts/default";

export default function AdminPage() {
  const { username } = useParams<{ username: string }>();
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [loading, setLoading] = useState(false);
  const [giftForm, setGiftForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    link: ""
  });
  const [profileForm, setProfileForm] = useState({
    displayName: "",
    bio: ""
  });

  // Verificar se o usuário tem acesso a esta página
  if (!currentUser || !userProfile || userProfile.username !== username) {
    return <Navigate to="/login" replace />;
  }

  // Carregar presentes do Firestore
  const loadGifts = async () => {
    if (!currentUser) return;
    
    try {
      const giftsRef = collection(db, 'users', currentUser.uid, 'gifts');
      const q = query(giftsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const giftsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gift[];
      
      setGifts(giftsData);
    } catch (error) {
      console.error('Erro ao carregar presentes:', error);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        displayName: userProfile.displayName || "",
        bio: userProfile.bio || ""
      });
      loadGifts();
    }
  }, [userProfile, currentUser]);

  const handleAddGift = () => {
    setEditingGift(null);
    setGiftForm({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      link: ""
    });
    onOpen();
  };

  const handleEditGift = (gift: Gift) => {
    setEditingGift(gift);
    setGiftForm({
      name: gift.name,
      description: gift.description || "",
      price: gift.price.toString(),
      imageUrl: gift.imageUrl || "",
      link: gift.link || ""
    });
    onOpen();
  };

  const handleSaveGift = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const giftData = {
        name: giftForm.name,
        description: giftForm.description,
        price: parseFloat(giftForm.price) || 0,
        imageUrl: giftForm.imageUrl,
        link: giftForm.link,
        isPurchased: editingGift?.isPurchased || false,
        purchasedBy: editingGift?.purchasedBy || null,
        purchasedAt: editingGift?.purchasedAt || null,
        createdAt: editingGift?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const giftsRef = collection(db, 'users', currentUser.uid, 'gifts');

      if (editingGift) {
        // Editar presente existente
        const giftDoc = doc(db, 'users', currentUser.uid, 'gifts', editingGift.id);
        await updateDoc(giftDoc, giftData);
      } else {
        // Adicionar novo presente
        await addDoc(giftsRef, giftData);
      }

      // Recarregar lista de presentes
      await loadGifts();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar presente:', error);
      alert('Erro ao salvar presente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGift = async (giftId: string) => {
    if (!currentUser) return;
    
    if (!confirm('Tem certeza que deseja excluir este presente?')) return;
    
    try {
      const giftDoc = doc(db, 'users', currentUser.uid, 'gifts', giftId);
      await deleteDoc(giftDoc);
      
      // Recarregar lista de presentes
      await loadGifts();
    } catch (error) {
      console.error('Erro ao excluir presente:', error);
      alert('Erro ao excluir presente. Tente novamente.');
    }
  };

  const handleUpdateProfile = async () => {
    await updateUserProfile({
      displayName: profileForm.displayName,
      bio: profileForm.bio
    });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-4xl text-center justify-center">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-default-500 mt-2">
            Gerencie seu perfil e sua lista de presentes
          </p>
        </div>

        <div className="w-full max-w-4xl px-4 space-y-6">
          {/* Seção do Perfil */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Informações do Perfil</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  label="Nome de exibição"
                  value={profileForm.displayName}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, displayName: e.target.value }))}
                  className="flex-1"
                />
                <div className="text-sm text-default-500 flex items-center">
                  <span>URL pública: /gift/{username}</span>
                </div>
              </div>
              
              <Textarea
                label="Bio (opcional)"
                placeholder="Conte um pouco sobre você..."
                value={profileForm.bio}
                onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
              />
              
              <Button 
                color="secondary" 
                onPress={handleUpdateProfile}
                className="w-fit"
              >
                Salvar Perfil
              </Button>
            </CardBody>
          </Card>

          {/* Seção dos Presentes */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Lista de Presentes</h2>
              <Button color="secondary" onPress={handleAddGift}>
                Adicionar Presente
              </Button>
            </CardHeader>
            <CardBody>
              {gifts.length === 0 ? (
                <div className="text-center py-8 text-default-500">
                  <p>Nenhum presente adicionado ainda.</p>
                  <p>Clique em "Adicionar Presente" para começar!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gifts.map((gift) => (
                    <Card key={gift.id} className="max-w-[300px]">
                      <CardBody className="p-4">
                        {gift.imageUrl && (
                          <Image
                            src={gift.imageUrl}
                            alt={gift.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                        )}
                        <h3 className="font-semibold text-lg">{gift.name}</h3>
                        {gift.description && (
                          <p className="text-sm text-default-500 mb-2">{gift.description}</p>
                        )}
                        <p className="text-lg font-bold text-primary mb-2">
                          R$ {gift.price.toFixed(2)}
                        </p>
                        {gift.link && (
                          <p className="text-sm text-default-500 mb-2 truncate">
                            Link: {gift.link}
                          </p>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="flat"
                            onPress={() => handleEditGift(gift)}
                          >
                            Editar
                          </Button>
                          <Button 
                            size="sm" 
                            color="danger" 
                            variant="flat"
                            onPress={() => handleDeleteGift(gift.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Modal para adicionar/editar presente */}
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalContent>
            <ModalHeader>
              {editingGift ? "Editar Presente" : "Adicionar Presente"}
            </ModalHeader>
            <ModalBody className="space-y-4">
              <Input
                label="Nome do presente"
                value={giftForm.name}
                onChange={(e) => setGiftForm(prev => ({ ...prev, name: e.target.value }))}
                isRequired
              />
              
              <Textarea
                label="Descrição (opcional)"
                value={giftForm.description}
                onChange={(e) => setGiftForm(prev => ({ ...prev, description: e.target.value }))}
              />
              
              <Input
                label="Preço"
                type="number"
                step="0.01"
                value={giftForm.price}
                onChange={(e) => setGiftForm(prev => ({ ...prev, price: e.target.value }))}
                startContent="R$"
                isRequired
              />
              
              <Input
                label="URL da imagem (opcional)"
                value={giftForm.imageUrl}
                onChange={(e) => setGiftForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              
              <Input
                label="Link para compra (opcional)"
                value={giftForm.link}
                onChange={(e) => setGiftForm(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://loja.com/produto"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button 
                color="secondary" 
                onPress={handleSaveGift}
                isDisabled={!giftForm.name || !giftForm.price}
              >
                {editingGift ? "Salvar" : "Adicionar"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
    </DefaultLayout>
  );
}
