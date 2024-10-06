'use client'

import { getBrandByUsername, updateBrand } from "@/_action/brand"
import { getKolDb } from "@/_action/kol"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"


export default function BrandPrint ({ params }: { params: { username: string } }) {
  const { username } = params
  const [kol, setKol] = useState<any>()
  const [brand, setBrand] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const handlePrint = async () => {
    const html2pdf = require('html2pdf.js');
    const element = document.querySelector('.cetak');
    html2pdf(element, {
      margin: 1,
      filename: 'brand.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    });
  }

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const kol = await getKolDb()
      const {brand} = await getBrandByUsername(username)
      console.log(brand.kol)
      const kolSelected = kol.data?.filter((item:any) => item.username === brand.kol)
      console.log(kolSelected)
      setBrand(brand)
      setKol(kolSelected)
    }
    fetchData()
    setLoading(false)
  }, [])

  if(loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="max-w-2xl m-auto my-4">
      <div className="py-4">
      <Button onClick={handlePrint}>Cetak Surat Persetujuan</Button>
      </div>
      <div className="cetak bg-white">
        {/* header */}
        <div className="border-b-2 border-red-600 pb-2 flex justify-between">
          <div className="w-20 h-20">
            <img src="/logo.jpg" alt="" />
          </div>
          <div>
          
          <p className="text-right text-red-700 font-bold">PT RAJA MASAKAN ENAK</p>
          <p className="text-right text-sm">Jalan Gading Kirana Timur A-11/15Desa/Kelurahan Kelapa Gading Barat</p>
          <p className="text-right text-sm">Kec. Kelapa Gading, Kota Adm. Jakarta Utara, Provinsi DKI Jakarta</p>
          <p className="text-right text-sm">Email : rajamasakanenak.rame@gmail.com</p>
          </div>
        </div>
        <div className="py-5 space-y-2">
          {kol && <>
          <div>
            <p className="text-sm font-semibold text-center underline">SURAT PERNYATAAN PEMILIH KOL</p>
            <p className="text-sm font-semibold text-center">NOl:AM/KOL/01/2024</p>
          </div>
            <p className="text-sm">Yang bertanda tangan di bawah ini:</p>
            <p className="text-sm pl-10">Nama: Dila</p>
            <p className="text-sm pl-10">Jabatan: Admin Management Asheera</p>
            <p className="text-sm">Dengan ini menyatakan bahwa:</p>
            <p className="text-sm pl-10">Nama: {kol[0].name}</p>
            <p className="text-sm pl-10">Domisili: {kol[0].address}</p>
            <p className="text-sm pl-10">Usia: {kol[0].age} tahun</p>
            <p className="text-sm pl-10">Kategori akun: {kol[0].category}</p>
            <p className="text-sm pl-10">Engagement Akun: {kol[0].engagement}%</p>
          </>}
          {brand && <p className="text-sm">Terpilih sebagai Key Opinion Leader (KOL) dari brand {(brand.name)} yang selanjutnya akan
            melaksanakan tugas yang diberikan oleh pihak brand tersebut. Untuk informasi lebih lanjut Anda
            dapat menghubungi nomor dari pihak brand sebagai berikut:
          </p>}
          <p className="text-sm text-center">Digital Jims Honey Makassar</p>
          <p className="text-sm text-center">(+629508411451)</p>
          <p className="text-sm">
            Demikian yang dapat kami sampaikan, di mohon untuk segera menghubungi pihak brand.
            Terima Kasih
          </p>
        </div>
        <div className="border-b-2 border-red-500">
          <p className="text-right text-sm pb-14">Hormat Kami,</p>
          <p className="text-right text-sm">(Dila)</p>
          <p className="text-right text-sm pb-4">Admin Management Asheera</p>
        </div>
      </div>
    </div>
  )
}