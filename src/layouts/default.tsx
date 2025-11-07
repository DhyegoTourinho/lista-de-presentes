import { ThemeSwitch } from "@/components/theme-switch";
import { Link as HeroUILink } from "@heroui/link";
import { Link } from "react-router-dom";
import Avatar from "@/components/avatar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Logo } from "@/components/icons";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <StarsBackground className="absolute inset-0 -z-20 w-full h-full" />
      <ShootingStars className="absolute inset-0 -z-10 w-full h-full" />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-6">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo className="text-secondary group-hover:scale-110 transition-transform" size={40} />
            <span className="font-bold text-lg hidden sm:block">GiftLab</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeSwitch />
            <Avatar />
          </div>
        </div>
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <HeroUILink
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
          >
          <span className="text-default-600">Powered by</span>
          <p className="text-secondary">HeroUI</p>
        </HeroUILink>
      </footer>
    </div>
  );
}
