import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link as HeroUILink } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar
} from "@heroui/react";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { useAuth } from "@/contexts/AuthContext";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <RouterLink
            className="flex justify-start items-center gap-1 text-foreground"
            to="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Lista de Presentes</p>
          </RouterLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <RouterLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-secondary data-[active=true]:font-medium",
                )}
                to={item.href}
              >
                {item.label}
              </RouterLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <HeroUILink isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </HeroUILink>
          <HeroUILink isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </HeroUILink>
          <HeroUILink isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </HeroUILink>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        
        {/* Seção de Autenticação */}
        {currentUser && userProfile ? (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  name={userProfile.displayName}
                  size="sm"
                  src={userProfile.profileImage}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Logado como</p>
                  <p className="font-semibold">{userProfile.displayName}</p>
                </DropdownItem>
                <DropdownItem 
                  key="admin" 
                  onPress={() => navigate(`/admin/${userProfile.username}`)}
                >
                  Painel Admin
                </DropdownItem>
                <DropdownItem 
                  key="public" 
                  onPress={() => navigate(`/gift/${userProfile.username}`)}
                >
                  Ver Perfil Público
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              as={RouterLink}
              color="secondary"
              to="/login"
              variant="flat"
            >
              Entrar
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <HeroUILink isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </HeroUILink>
        <ThemeSwitch />
        {currentUser && userProfile ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={userProfile.displayName}
                size="sm"
                src={userProfile.profileImage}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Logado como</p>
                <p className="font-semibold">{userProfile.displayName}</p>
              </DropdownItem>
              <DropdownItem 
                key="admin" 
                onPress={() => navigate(`/admin/${userProfile.username}`)}
              >
                Painel Admin
              </DropdownItem>
              <DropdownItem 
                key="public" 
                onPress={() => navigate(`/gift/${userProfile.username}`)}
              >
                Ver Perfil Público
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button
            as={RouterLink}
            color="secondary"
            to="/login"
            size="sm"
          >
            Entrar
          </Button>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <RouterLink
                className={`text-${
                  index === 2
                    ? "secondary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                } text-lg`}
                to={item.href}
              >
                {item.label}
              </RouterLink>
            </NavbarMenuItem>
          ))}
          {currentUser && userProfile && (
            <>
              <NavbarMenuItem>
                <RouterLink
                  className="text-foreground text-lg"
                  to={`/admin/${userProfile.username}`}
                >
                  Painel Admin
                </RouterLink>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <button
                  className="text-danger text-lg text-left"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
