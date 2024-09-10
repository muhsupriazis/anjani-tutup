import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { NavigationMenuHome } from "../components/home-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <header className="py-4 px-7 flex justify-between items-center">
          <div className="flex space-x-5 items-center">
            <span className="text-lg font-semibold">kol-apps</span>
            <NavigationMenuHome />
          </div>
          <Link href={'/dashboard'} className={buttonVariants({variant: 'default'})}>Dashboard</Link>
        </header>
        {children}
        <footer>site footer</footer>
    </>
  );
}
