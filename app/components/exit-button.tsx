'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ButtonExit() {
  const router = useRouter()
  function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  }
  const handlerExit = () => {
    deleteAllCookies();
    router.push('/login')
  }
  return(
    <Button onClick={handlerExit}>Keluar</Button>
  )
}