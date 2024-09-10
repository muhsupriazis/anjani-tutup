import { getKolDb } from "@/_action/kol"
import { NextResponse } from "next/server"

export async function GET() {
  const { data: kol, error } = await getKolDb()
  return NextResponse.json({kol, error})
}