import { ThemeSwitch } from "@/components/theme-switch";
import { Link } from "@heroui/link";
import Avatar from "@/components/avatar";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
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
