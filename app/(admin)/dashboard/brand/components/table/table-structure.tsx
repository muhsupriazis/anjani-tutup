import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function TableBrand({data, handlerDelete} : any) {
  const router = useRouter();

  const hanlderEdit = async(username:any) => {
    router.push(`/dashboard/brand/edit/${username}`)
  }

  return (
    <Table>
      <TableCaption>Brand yang terdaftar.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Pengikut</TableHead>
          {/* <TableHead>Jenis Kelamin</TableHead> */}
          {/* <TableHead>Domisili</TableHead> */}
          <TableHead>Usia</TableHead>
          <TableHead>Engagement</TableHead>
          <TableHead>Kol Terpilih (username)</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item : any, index : any) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category == null ?  'Belum ditentukan' : item.category}</TableCell>
            <TableCell>{item.category_followers == null ?  'Belum ditentukan' : item.category_followers}</TableCell>
            {/* <TableCell>{item.gender == null ? 'Belum ditentukan' : item.gender}</TableCell> */}
            {/* <TableCell>{item.address == null ? 'Belum ditentukan' : item.address}</TableCell> */}
            <TableCell>{item.age == null ? 'Belum ditentukan' : item.age}</TableCell>
            <TableCell>{item.engagement == null ? 'Belum ditentukan' : item.engagement}</TableCell>
            <TableCell>{item.kol == null ? 'Belum ditentukan o/ brand' : item.kol}</TableCell>
            <TableCell className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => hanlderEdit(item.username)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlerDelete(item.username)}>Delete</DropdownMenuItem>
                {!(item.engagement == null) && 
                <>
                  <DropdownMenuItem onClick={()=>router.push(`/dashboard/brand/${item.username}`)}>Lihat</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>router.push(`/dashboard/brand/print/${item.username}`)}>Cetak</DropdownMenuItem>
                </>
                }
              </DropdownMenuContent>
            </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export function TableCetak({data, handlerDelete} : any) {
  const router = useRouter();
  const formater = (tanggalObj: any) => {
    // Mengecek apakah tanggalObj adalah objek Date yang valid
    const date = new Date(tanggalObj);
  // Mengubah format menjadi tanggal/bulan/tahun
    const tanggalFormat = date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return tanggalFormat  // Output: 27/09/2024
  }

  const hanlderEdit = async(username:any) => {
    router.push(`/dashboard/brand/edit/${username}`)
  }

  return (
    <Table>
      <TableCaption>Brand yang terdaftar.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Nama Brand</TableHead>
          <TableHead>Kategori</TableHead>
          {/* <TableHead>Pengikut</TableHead> */}
          {/* <TableHead>Jenis Kelamin</TableHead> */}
          {/* <TableHead>Domisili</TableHead> */}
          {/* <TableHead>Usia</TableHead> */}
          {/* <TableHead>Engagement</TableHead> */}
          <TableHead>Nama KOL</TableHead>
          <TableHead className="text-right">Tanggal Kerja Sama</TableHead>
          {/* <TableHead className="text-right">Action</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item : any, index : any) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category == null ?  'Belum ditentukan' : item.category}</TableCell>
            {/* <TableCell>{item.category_followers == null ?  'Belum ditentukan' : item.category_followers}</TableCell> */}
            {/* <TableCell>{item.gender == null ? 'Belum ditentukan' : item.gender}</TableCell> */}
            {/* <TableCell>{item.address == null ? 'Belum ditentukan' : item.address}</TableCell> */}
            {/* <TableCell>{item.age == null ? 'Belum ditentukan' : item.age}</TableCell> */}
            {/* <TableCell>{item.engagement == null ? 'Belum ditentukan' : item.engagement}</TableCell> */}
            <TableCell>{item.kol == null ? 'Belum ditentukan o/ brand' : item.kol}</TableCell>
            <TableCell className="text-right">{formater(item.created_at)}</TableCell>
            {/* <TableCell className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => hanlderEdit(item.username)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlerDelete(item.username)}>Delete</DropdownMenuItem>
                {!(item.engagement == null) && 
                  <DropdownMenuItem onClick={()=>router.push(`/dashboard/brand/${item.username}`)}>Lihat</DropdownMenuItem>
                }
              </DropdownMenuContent>
            </DropdownMenu>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}