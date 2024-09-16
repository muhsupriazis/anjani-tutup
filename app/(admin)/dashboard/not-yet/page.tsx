'use client';

import { useEffect, useState } from "react";
import { TableBrand } from "./components/table/table-structure";
import { getBrand, getBrandNetYet } from "@/_action/brand";
import { supabase } from "@/lib/db";

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
      const { brand, error } = await getBrandNetYet();
      if (brand) {
        setBrand(brand);
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  if(loading) {
    return <div className="flex justify-center items-center py-5">
      Loading...
    </div>
  }

  return (
    <div className="p-10">
      <h1 className="py-4 text-xl"> Brand yang belum berkategori</h1>
      <div>
        <TableBrand data={brand} handlerDelete={handlerDelete} />
      </div>
    </div>
  )
}