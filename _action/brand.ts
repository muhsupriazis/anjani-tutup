import { supabase } from "@/lib/db"

export async function updateBrand (username : any, dataBrand : any) {  
  const { data, error } = await supabase
  .from('brand')
  .update(dataBrand)
  .eq('username', username)
  .select()

  return {errormsg: error};
}

export async function getBrand() {
  let { data: brand, error } = await supabase
  .from('brand')
  .select('*')
  const filterBrand = brand?.filter((item : any) => item.engagement !== null)
  const filterAdmin = filterBrand?.filter((item : any) => item.username !== 'admin')   
  return {brand:filterAdmin, error};
}

export async function getBrandByUsername(username : any) {
  let { data: brand, error } = await supabase
  .from('brand')
  .select('*')
  .eq('username', username)
  return {brand: brand ? brand[0] : null, error};
}

export async function getBrandNetYet() {
  let { data: brand, error } = await supabase
  .from('brand')
  .select('*')

  const filterBrand = brand?.filter((item : any) => item.engagement === null)
  const filterAdmin = filterBrand?.filter((item : any) => item.username !== 'admin')   
  return {brand: filterAdmin, error};
}