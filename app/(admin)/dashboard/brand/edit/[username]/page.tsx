'use client';

import { getBrandByUsername } from "@/_action/brand";
import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function BrandEdit({ params }: { params: { username: string } }) {
  const [brand, setBrand] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const { brand, error } = await getBrandByUsername(params.username);
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
    <main className="max-w-3xl mx-auto py-10">
      <div>
        <h1 className="text-xl">Edit Brand</h1>
      </div>
      <Separator className="my-5" />
      {brand && (
        <div className="space-y-8">
          <div className="space-y-2">
            <Label>Nama Brand</Label>
            <Input value={brand.name} disabled />
            <p className="text-[0.8rem] text-muted-foreground">
              Nama brand tidak bisa diubah.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Input value={brand.name} disabled />
            <p className="text-[0.8rem] text-muted-foreground">
              Nama brand tidak bisa diubah.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Kategori Pengikut</Label>
            <Input value={brand.name} disabled />
            <p className="text-[0.8rem] text-muted-foreground">
              Nama brand tidak bisa diubah.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Jenis Kelamin</Label>
            <Input value={brand.name} disabled />
            <p className="text-[0.8rem] text-muted-foreground">
              Nama brand tidak bisa diubah.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Domisili</Label>
            <Input value={brand.name} disabled />
            <p className="text-[0.8rem] text-muted-foreground">
              Nama brand tidak bisa diubah.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Usia</Label>
            <Input value={brand.name} disabled />
            <p className="text-[0.8rem] text-muted-foreground">
              Nama brand tidak bisa diubah.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Engagement</Label>
            <Input value={brand.name} disabled />
            <p className="text-[0.8rem] text-muted-foreground">
              Nama brand tidak bisa diubah.
            </p>
          </div>
          <Button>Simpan</Button>
        </div>
      )}
    </main>
  );
}