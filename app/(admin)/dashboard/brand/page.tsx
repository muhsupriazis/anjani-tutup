'use client';

import { useEffect, useState } from "react";
import { TableBrand } from "./components/table/table-structure";
import { getBrand } from "@/_action/brand";

export default function BrandAdmin () {
  const [brand, setBrand] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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

  if(loading) {
    return <div className="flex justify-center items-center py-5">
      Loading...
    </div>
  }

  return (
    <div className="p-10">
      <div>
        <TableBrand data={brand} />
      </div>
    </div>
  )
}