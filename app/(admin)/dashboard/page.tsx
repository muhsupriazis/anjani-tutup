import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./components/columns"
import { kolsSchema } from "./data/schema"
import { DataTable } from "./components/data-table"

export const metadata: Metadata = {
  title: "Key Opinion Leaders",
  description: "Key Opinion Leaders",
}

async function getKol() {
  const response:any = await fetch('http://localhost:3000/api/kol', {
    cache: 'no-cache',
  })
  const data = await response.json()
  return z.array(kolsSchema).parse(data.kol)
}

export default async function TaskPage() {
  const kols = await getKol()
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <DataTable data={kols} columns={columns} />
      </div>
    </>
  );
}
