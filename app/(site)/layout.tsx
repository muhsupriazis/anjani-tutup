import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { NavigationMenuHome } from "../components/home-nav";
import { ModeToggle } from "../components/theme-toggle";

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
          {/* //<NavigationMenuHome /> */}
        </div>
        <div className="flex space-x-3 justify-center items-center">
        <ModeToggle />
        <Link
          href={"/dashboard"}
          className={buttonVariants({ variant: "default" })}
          >
          Dashboard
        </Link>
          </div>
      </header>
      {children}
      <footer className="w-full h-32 flex items-center justify-center bg-primary text-lg text-white">
        <p>&copy; 2024 Asheera Management. All rights reserved.</p>
      </footer>
    </>
  );
}
