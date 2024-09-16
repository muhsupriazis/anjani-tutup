'use client'

import { getBrandByUsername, updateBrand } from "@/_action/brand"
import { getKolDb } from "@/_action/kol"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { categoryFollowers, categoryKols } from "../../../data/data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormDescription } from "@/components/ui/form"
import { useRouter } from "next/navigation"

const engagementTingkat = [
  { label: "Nol", value: "0" },
  { label: "Satu", value: "1" },
  { label: "Dua", value: "2" },
  { label: "Tiga", value: "3" },
  { label: "Empat", value: "4" },
]

const usiaKol = [
  { label: 'Anak', value: 'anak' },
  { label: 'Remaja', value: 'remaja' },
  { label: 'Dewasa', value: 'dewasa' },
]

export default function BrandEdit ({ params }: { params: { username: string } }) {
  const { username } = params
  const [kol, setKol] = useState<any>()
  const [brand, setBrand] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [category, setCategory] = useState<string>()
  const [categoryFollower, setCategoryFollower] = useState<string>()
  const [gender, setGender] = useState<string>()
  const [age, setAge] = useState<string>()
  const [engagement, setEngagement] = useState<string>()
  const router = useRouter()

  const handlerSubmit = async () => {
    const dataKol = {
      category,
      category_followers: categoryFollower,
      age,
      engagement,
    }
    const {errormsg} = await updateBrand(username, dataKol)
    if(errormsg) {
      console.log(errormsg)
    } else {
      router.push(`/dashboard/brand/${username}`)
    }
  }

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const kol = await getKolDb()
      const {brand} = await getBrandByUsername(username)
      setBrand(brand)
      setKol(kol)
    }
    fetchData()
    setLoading(false)
  }, [])

  if(loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="max-w-3xl mx-auto py-5">
      <div>
        <h1>Tambahkan KOL</h1>
      </div>
      <Separator className="my-5" />
      <div className="space-y-5">
      <div className="space-y-2">
        <Label>Nama Brand</Label>
        <Input value={brand?.name} disabled/>
        <p className="text-[0.8rem] text-muted-foreground">
          Nama tidak bisa diubah.
        </p>
      </div>
      <div className="space-y-2">
        <Label>Kategori</Label>
      <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategory kol" />
          </SelectTrigger>
        <SelectContent>
          {categoryKols.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> 
      <p className="text-[0.8rem] text-muted-foreground">
          Pilih kategori kol yang sesuai dengan brand.
        </p>
      </div>
      <div className="space-y-2">
        <Label>Kategori Pengikut</Label>
      <Select onValueChange={(value) => setCategoryFollower(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori pengikut kol" />
          </SelectTrigger>
        <SelectContent>
          {categoryFollowers.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> 
      <p className="text-[0.8rem] text-muted-foreground">
          Pilih kategori pengikut kol yang sesuai dengan brand.
        </p>
      </div>
      <div className="space-y-2">
        <Label>Tingkat Engagement</Label>
      <Select onValueChange={(value) => setEngagement(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih tingkat engagement" />
          </SelectTrigger>
        <SelectContent>
          {engagementTingkat.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
        <p className="text-[0.8rem] text-muted-foreground">
          Pilih tingkat engagement yang diinginkan.
        </p>
      </Select> 
      </div>
      <div>
        <Label>Usia</Label>
      <Select onValueChange={(value) => setAge(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih tingkat usia" />
          </SelectTrigger>
        <SelectContent>
          {usiaKol.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> 
      <p className="text-[0.8rem] text-muted-foreground">
          Pilih tingkat engagement yang diinginkan.
        </p>
      </div>
      </div>
      <Button onClick={handlerSubmit}>Tambahkan</Button>
    </div>
  )
}