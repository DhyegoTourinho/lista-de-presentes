import { ThemeSwitch } from "@/components/theme-switch";
import { Link } from "@heroui/link";
import Avatar from "@/components/avatar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <StarsBackground className="absolute inset-0 -z-20 w-full h-full" />
      <ShootingStars className="absolute inset-0 -z-10 w-full h-full" />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        <div className="flex items-center justify-end gap-4 mb-6">
          <Avatar />
          <ThemeSwitch />
        </div>
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://heroui.com"
          title="heroui.com homepage"
          >
          <span className="text-default-600">Powered by</span>
          <p className="text-secondary">HeroUI</p>
        </Link>
      </footer>
    </div>
  );
}
