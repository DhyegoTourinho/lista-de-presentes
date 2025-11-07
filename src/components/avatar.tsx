import { useState } from "react";
import { 
  Avatar, 
  AvatarIcon, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function App() {
  const { currentUser, userProfile, logout } = useAuth();
  const isLoggedIn = !!currentUser;
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    onOpen(); // Abre o modal de confirmação
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancelLogout = () => {
    onClose(); // Apenas fecha o modal
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center">
        <Link to="/login">
          <Avatar
            classNames={{
              base: "bg-linear-to-br from-[#303030] to-[#b3b3b3] cursor-pointer hover:scale-120 transition-transform",
              icon: "text-black/100 hover:text-white",
            }}
            icon={<AvatarIcon />}
          />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform hover:scale-110"
              classNames={{
                base: "bg-gradient-to-br from-[#303030] to-[#b3b3b3]",
                icon: "text-black/100",
              }}
              name={userProfile?.displayName}
              icon={<AvatarIcon />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Avatar Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" textValue="Perfil">
              <p className="font-semibold">Logado como</p>
              <p className="font-semibold text-secondary">{userProfile?.displayName}</p>
            </DropdownItem>
            <DropdownItem 
              key="admin" 
              onPress={() => navigate(`/admin/${userProfile?.username}`)}
              textValue="Gerenciar Lista"
            >
              Gerenciar Minha Lista
            </DropdownItem>
            <DropdownItem 
              key="public" 
              onPress={() => navigate(`/gift/${userProfile?.username}`)}
              textValue="Ver Perfil Público"
            >
              Ver Perfil Público
            </DropdownItem>
            <DropdownItem 
              key="logout" 
              color="danger" 
              onPress={handleLogoutClick}
              className="text-danger"
              textValue="Sair"
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Modal de Confirmação de Logout */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Encerrar Sessão
          </ModalHeader>
          <ModalBody>
            <p className="text-default-600">
              Deseja realmente encerrar sua sessão? Você precisará fazer login novamente para acessar sua conta.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="default" 
              variant="light" 
              onPress={handleCancelLogout}
              isDisabled={isLoggingOut}
            >
              Cancelar
            </Button>
            <Button 
              color="danger" 
              onPress={handleConfirmLogout}
              isLoading={isLoggingOut}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}