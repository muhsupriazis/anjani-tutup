import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <p>Applocation under development</p>
      <Link href={'/register'}>Tambahkan Brand</Link>
    </main>
  );
}
