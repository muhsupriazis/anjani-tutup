'use client';

import { supabase } from "@/lib/db";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { chooseInfluencer } from "@/lib/ahp";
import { calculateFinalScores,
  calculateRelativeWeights,
  createComparisonMatrixAge,
  createComparisonMatrixEngagement,
  createComparisonMatrixFollowers,
  createPairwiseComparisonMatrix
} from "@/lib/ahp-2";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


export default function Alternatif({ params }: { params: { username: string } }) {
  const [loading, setLoading] = useState(true);
  const { username } = params;
  const [kol, setKol] = useState<any>([]);
  const [brand, setBrand] = useState<any>({});
  const statusAge = (age: any) : string => {
    if (age === 1) {
      return '1'
    } else if (age === 2) {
      return '2'
    }
      return '3'
  }
  
  const statusFollowers = (followers: any) : string => {
    if (followers === 1) {
      return '1'
    } else if (followers === 2) {
      return '2'
    } else {
    return '3'
    }}
  
  const statusEngagement = (engagement: any) : string => {
    if (engagement === 1) {
      return '1'
    } else if (engagement === 2) {
      return '2'
    } else {
    return '3'
    }}

  const getBrand = async () => {
    try {
      let { data: alternatif, error } = await supabase
      .from('brand')
      .select("*")
      .eq('username', username)
      if (error) throw error;
      setBrand(alternatif?.[0]);
      return alternatif?.[0];
      console.log(alternatif)
    } catch (error) {
    }
  }

  const filteredfollKol = (kols:any, category_followers:any) => {
    console.log(category_followers)
    return kols.filter((kol:any) => kol.followers_category == category_followers)
  }

  const filteredAge = (kols:any, age:any) => {
    if(age === 'anak') {
      return kols.filter((kol:any) => kol.age <= 15)
    } else if(age === 'remaja') {
      return kols.filter((kol:any) => kol.age > 15 && kol.age <= 22)
    } else {
      return kols.filter((kol:any) => kol.age > 22)
    }
  }

  const filteredCategoryKol = (kols:any, category:any) => {
    return kols.filter((kol:any) => kol.category == category)
  }

  const getKols = async () => {
    const brand:any = await getBrand();
    console.log(brand)
    let { data: kol, error } = await supabase
    .from('kol')
    .select('*')
    console.log(kol)
    // filter kol have 0 engegement
    // const filteredKol = kol.filter((kol:any) => kol.engagement == 0)
    
    const pairMatrix = createPairwiseComparisonMatrix(5, 5, 5);
    // console.table(pairMatrix);
    
    const relativeWeight = calculateRelativeWeights(pairMatrix);
    // console.log(relativeWeight);
    
    const categoryKol = filteredCategoryKol(kol, brand.category)
    console.log(categoryKol)
    const categoriFollKol = filteredfollKol(categoryKol, brand.category_followers)
    console.log(categoriFollKol)
    const addressKol = filteredAge(categoriFollKol, brand.age)
    // const engagementKol = filteredAngagement(addressKol, brand.engagement)
    // console.log(engagementKol)
    const filteredKol = addressKol.filter((kol:any) => kol.engagement !== 0)
    // console.table(filteredKol)
    
    const matrixFollwers = createComparisonMatrixFollowers(filteredKol || [])
    
    const matrixAge = createComparisonMatrixAge(filteredKol || [])
    
    const matrixEngagement = createComparisonMatrixEngagement(filteredKol || [])
    
    const rAge = calculateRelativeWeights(matrixAge);
    
    const rEngagement = calculateRelativeWeights(matrixEngagement);
    
    const rFollowers = calculateRelativeWeights(matrixFollwers);

    const kolWithRelative = filteredKol?.map((kol:any, index:number) => {
      return {
        ...kol,
        rFollowers: rFollowers[index],
        rAge: rAge[index],
        rEngagement: rEngagement[index]
      }
    })

    const finaleScore = filteredKol ? calculateFinalScores(kolWithRelative || [], relativeWeight) : [];
     console.table(finaleScore);
    setKol(finaleScore);
    return;
  }

  useEffect(() => {
    setLoading(true);
    getKols();
    setLoading(false);
  }, [])

  if(loading) {
    return <div>Loading...</div>
  }

  return(
    <div className="p-10">
          <Table>
      <TableCaption>Brand yang terdaftar.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Urut</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Pengikut</TableHead>
          <TableHead>Jenis Kelamin</TableHead>
          <TableHead>Domisili</TableHead>
          <TableHead>Usia</TableHead>
          <TableHead>Engegament</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {kol.map((item : any, index : any) => (
          <TableRow key={index}>
            <TableCell className="font-medium">#{index + 1}</TableCell>
            <TableCell><Link className={buttonVariants({variant:'link'})} href={`https://www.instagram.com/${item.username}`}>{item.name}</Link></TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell><Badge>{item.followers_category}</Badge> {item.followers}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.engagement}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}