import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { NavigationMenuAdmin } from "../components/admin-nav";
import { ModeToggle } from "@/app/components/theme-toggle";
import { ButtonExit } from "@/app/components/exit-button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <header className="py-4 px-7 flex justify-between items-center border-b">
          <div className="flex space-x-5 items-center">
            <span className="font-semibold">Dashboard</span>
            <NavigationMenuAdmin />
          </div>
          <div className="flex justify-center items-center space-x-3">
            <ModeToggle />
            <ButtonExit/>
          </div>
        </header>
        <main className="">
        {children}
        </main>
    </>
  );
}
