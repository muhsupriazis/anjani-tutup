import { supabase } from "@/lib/db"

export const isKoLExist = async (username: string) => {
  let { data: kol, error } = await supabase
  .from('kol')
  .select("*")
  .eq('username', username)
  if(kol?.length ?? 0 > 0) {
    return true
  }
  return false
}

export const getKol = async (id: any) => {
  let { data: kol, error } = await supabase
  .from('kol')
  .select("*")
  .eq('id', id)
  return { data: kol, error }
}

export const addKoL = async (kol: any) => {  
    const { data, error } = await supabase
    .from('kol')
    .insert([
      kol,
    ])
    .select()    
  return { data, error }
}

export const getKolDb = async () => {
  let { data: kol, error } = await supabase
  .from('kol')
  .select('*')
  return { data: kol, error }
}

export const updateKol = async (kol: any) => {  
  const { data, error } = await supabase
  .from('kol')
  .update(kol)
  .eq('id', kol.id)
  .select()
  return { data, error }
}