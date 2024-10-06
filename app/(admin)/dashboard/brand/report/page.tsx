'use client';

import { useEffect, useState } from "react";
import { TableCetak } from "../components/table/table-structure";
import { getBrand } from "@/_action/brand";
import { supabase } from "@/lib/db";
import { Button } from "@/components/ui/button";
// import html2pdf from 'html2pdf.js';

export default function BrandAdmin () {
  const [brand, setBrand] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const handlerDelete = async(username:any) => {
    const isDelete = confirm("Apakah kamu yakin ingin menghapus?")
    if(isDelete) {
      const { error } = await supabase
      .from('brand')
      .delete()
      .eq('username', username)
      if(!error) {
        const newBrand = [...brand].filter((item:any) => item.username !== username)
        setBrand(newBrand)
      }
      return
    }
    return;
  }

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const { brand, error } = await getBrand();
      if (brand) {
        setBrand(brand);
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  const handlerCetak = () => {
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

  if(loading) {
    return <div className="flex justify-center items-center py-5">
      Loading...
    </div>
  }

  return (
    <div className="p-10">
      <div className="max-w-2xl m-auto">
      <Button className="mb-10" onClick={handlerCetak}>Cetak Laporan</Button>
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
        <div className="py-2 space-y-2">
          <p className="text-sm font-semibold text-center">Laporan Kerja Sama Brand dengan Key Opinion Leader (KOL)</p>
          {/* <p className="text-sm font-semibold">Periode: Oktober 2024</p> */}
          <p className="text-sm">Dalam sebulan terakhir, terdapat {`${brand.length}`} kerja sama antara brand dan KOL. Berikut adalah rinciannya:
          </p>
          <p className="text-sm text-center">Table Daftar KOL</p>
          <TableCetak data={brand} handlerDelete={handlerDelete} />
          <p className="text-sm">Total kerja sama antara brand dan KOL selama periode ini adalah {`${brand.length}`} brand. </p>
        </div>
        <div className="border-b-2 border-red-500">
          <p className="text-right text-sm pb-14">Hormat Kami,</p>
          <p className="text-right text-sm">(Dila)</p>
          <p className="text-right text-sm pb-4">Admin Management Asheera</p>
        </div>
      </div>
      </div>
    </div>
  )
}