"use client"

import { updateBrand } from "@/_action/brand"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/db"
//import { cookies } from "next/headers"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Register() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  //const cookieStore = cookies()

  const validationData = async (data : any) => {
    //validation when data empt
    if(data.username == ''){
      return {
        error: true,
        title: "Gagal!",
        description: "Masukan username!",
      }
    }
    if(data.password == ''){
      return {
        error: true,
        title: "Gagal!",
        description: "Masukan Password!",
      }
    }
    let { data: brand, error } = await supabase
    .from('brand')
    .select("*")
    .eq('username', data.username)

    const dataBrand : any = brand && brand[0] || null
    const passwordDb = brand && brand[0] ? brand[0].password : null;

    if(brand?.length === 0) {
      return {
        error: true,
        title: "Gagal!",
        description: "Username tidak ditemukan!"
      }
    }

    if(password !== passwordDb) {
      return {
        error: true,
        title: "Gagal!",
        description: "Password salah"
      }
    }

    const brandData = {
      ...dataBrand,
      token: 'brand'
    }
    if(dataBrand.username == 'admin') {
      document.cookie = 'token=admin'
    } else {
      document.cookie = 'token=brand'
    }
    document.cookie = `username=${username}`

    const {errormsg} = await updateBrand(username, brandData)
    if(errormsg) {
      return {
        error: true,
        title: "Gagal!",
        description: "Sesuatu salah saat login",
      }
    }

    return {
      error: false,
      title: "Berhasil!",
      description: "Berhasil login, tunggu untuk memuat halaman!",
    }
  }

  const handlerSubmit = async () => {
    try {
      const brand = {
        password,
        username,
        name
      }
      const {error, title, description} = await validationData(brand)
      if(!error) {
        if(username == 'admin') {
          router.push('/dashboard')
        } else {
          router.push(`/brand/${username}`)
        }
      }
      toast({
        title,
        description
      })
      return
    } catch (error) {
      
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-3xl w-80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Masuk</CardTitle>
          <Separator/>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input onChange={(e) => setUsername(e.target.value)} type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => setPassword(e.target.value)} type={checked? 'text' : 'password'} />
          </div>
          <div className="flex gap-3">
          <Checkbox checked={checked} onClick={() => setChecked(!checked)} id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Lihat Password
          </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button onClick={handlerSubmit} className="w-full">Masuk</Button>
          <CardDescription>Belum punya akun? <Link className={buttonVariants({variant: 'link'})} href={'/register'}>Register</Link></CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}