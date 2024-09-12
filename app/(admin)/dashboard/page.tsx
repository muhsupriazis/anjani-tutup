'use client';

import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./components/columns"
import { kolsSchema } from "./data/schema"
import { DataTable } from "./components/data-table"
import { request } from "https"
import { useEffect, useState } from "react";
//import { headers } from "next/headers"

// export const metadata: Metadata = {
//   title: "Key Opinion Leaders",
//   description: "Key Opinion Leaders",
// }


async function getKol() {
// const headersList = headers();
// const domain = headersList.get("x-forwarded-host") || "";
// const protocol = headersList.get("x-forwarded-proto") || "";
// const pathname = headersList.get("x-invoke-path") || "";
// console.log(domain)
  //const response:any = await fetch(`http://${domain}/api/kol`, {
  const response:any = await fetch(`${document.location.origin}/api/kol`)
  const data = await response.json()
  return z.array(kolsSchema).parse(data.kol)
}

export default function TaskPage() {
  const [kol, setKol] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getKol().then((data:any) => {
      setKol(data)
      setLoading(false)
    })
  }, [])

  if(loading) {
    return <div className="flex justify-center items-center py-10">
      Loading...
    </div>
  }

  //const kols = await getKol()
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <DataTable data={kol} columns={columns} />
      </div>
    </>
  );
}
