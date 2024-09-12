"use client"

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
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Register() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const isExist = async (username:any) => {
    let { data: brand, error } = await supabase
    .from('brand')
    .select("*")
    .eq('username', username)

    return brand?.length ?? 0 > 0
  }

  const validationData = async (data : any) => {
    //validation when data empt
    console.log(data);
    if(data.password == '' || data.name == '' || data.username == ''){
      return {
        error: true,
        title: "Gagal!",
        description: "Data brand tidak boleh kosong!",
      }
    }

    const finding = await isExist(data.username)
    
    if(finding) {
      return {
        error: true,
        title: "Gagal!",
        description: "Username sudah ada!",
      }
    }

    return {
      error: false,
      title: "Berhasil!",
      description: "Data brand berhasil ditambahkan",
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
      console.log(error, title, description)
      if(!error) {
        const { data, error } = await supabase
        .from('brand')
        .insert([
          brand,
        ])
        .select()   
        router.push('/login')   
      }
      toast({
        title,
        description,
      })
      return
    } catch (error) {
      
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-3xl w-80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Buat Akun</CardTitle>
          <Separator/>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nama">Nama Brand</Label>
            <Input onChange={(e) => setName(e.target.value)} type="text" />
            
         </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input onChange={(e) => setUsername(e.target.value)} type="text" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => setPassword(e.target.value)} type={checked ? 'text' : 'password'} />
          </div>
          <div className="flex items-center space-x-2">
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
          <Button onClick={handlerSubmit} className="w-full">Buat Akun</Button>
          <CardDescription>Sudah punya akun? <Link className={buttonVariants({variant: 'link'})} href={'/login'}>Login</Link></CardDescription>
        {/* <Link className={buttonVariants({variant: 'link'})} href={'/reset-password'}>Lupa password?</Link> */}
        </CardFooter>
      </Card>
    </div>
  )
}