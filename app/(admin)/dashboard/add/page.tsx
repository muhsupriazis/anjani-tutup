"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { categoryKols } from "../data/data"
import { addKoL, isKoLExist } from "@/_action/kol"
import { useRouter } from "next/navigation"

const profileFormSchema = z.object({
  name: z.string({
    required_error: "Masukan nama kol.",
  }),
  username: z
    .string(
      {
        required_error: "Masukan username kol.",
      }
    ),
  followers: z.string({
    required_error: "Masukan jumlah pengikut kol.",
  }),
  gender: z
    .string({
      required_error: "Pilih jenis kelamin kol.",
    }),
  category: z.string({
    required_error: "Pilih kategori kol.",
  }),
  age: z.string({
    required_error: "Masukan usia kol.",
  }),
  address: z.string({
    required_error: "Masukan domisili kol.",
  }),
  engagement: z.string({
    required_error: "Masukan engagement rate kol.",
  }
  ),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
const defaultValues: Partial<ProfileFormValues> = {
  //bio: "I own a computer."
};

export default function Add() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const router = useRouter();

  async function onSubmit(data: ProfileFormValues) {
    const id = Math.floor(Math.random() * 1000) + 600
    const age = parseInt(data.age)
    const followers = parseInt(data.followers)
    const engagement = parseInt(data.engagement)
    const username = data.username.toLowerCase()
    const followers_category = followers < 1000 ? "nano" : followers >= 100000  ? "makro" : "mikro"
    const kol = {
      id,
      ...data,
      followers_category,
      age,
      followers,
      username,
      engagement,
    }

    const isExist = await isKoLExist(username)

    if(isExist) {
      toast({
        title: "Kol sudah ada!",
        description: "Kol yang akan ditambahkan sudah ada.",
      })
      return
    }

    const result = await addKoL(kol)

    if(result.error) {
      toast({
        title: "Gagal!",
        description: "Gagal menambahkan kol.",
      })
      return
    }

    toast({
      title: "Berhasil!",
      description: "Kol berhasil ditambahkan.",
    })
    router.push('/dashboard')
  }

  return (
    <main className="max-w-3xl mx-auto py-5">
      <div>
        <h1>Tambahkan KOL</h1>
      </div>
      <Separator className="my-5" />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategory kol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryKols.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> 
              <FormDescription>
                Masukan kotegori konten yang sering dibahas oleh kol yang akan ditambahkan.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Anjani Sera" {...field} />
              </FormControl>
              <FormDescription>
                Nama tidak boleh kosong, masukan nama lengkap dari kol yang akan ditambahkan.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="anjani" {...field} />
              </FormControl>
              <FormDescription>
                Username tidak boleh kosong, jangan masukan simbol seperti @.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="followers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Pengikut</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10000" {...field} />
              </FormControl>
              <FormDescription>
                Masukan jumlah pengikut dari kol yang akan ditambahkan! Pastikan berupa angka.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usia</FormLabel>
              <FormControl>
                <Input type="number" placeholder="20" {...field} />
              </FormControl>
              <FormDescription>
                Masukan usia dari kol yang akan ditambahkan! Pastikan berupa angka.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jeni kelamin kol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domisili</FormLabel>
              <FormControl>
                <Input placeholder="Makassar" {...field} />
              </FormControl>
              <FormDescription>
                Hindari penggunaan kata kunci seperti jalan, gang, dsb.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="engagement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engagement</FormLabel>
              <FormControl>
                <Input type="number" placeholder="24" {...field} />
              </FormControl>
              <FormDescription>
                Masukan engagement rate dari kol yang akan ditambahkan! Pastikan berupa angka (%).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" >Tambahkan</Button>
      </form>
    </Form>
    </main>
  )
}