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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"




export function TableBrand({data} : any) {
  const router = useRouter();

  const handlerDelete = async() => {
    const isDelete = confirm("Apakah kamu yakin ingin menghapus?")
    if(isDelete) {
      console.log('delete')
    }
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
          <TableHead>Nama</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Pengikut</TableHead>
          <TableHead>Jenis Kelamin</TableHead>
          <TableHead>Domisili</TableHead>
          <TableHead>Usia</TableHead>
          <TableHead>Engegament</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item : any, index : any) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category == null ?  'Belum ditentukan' : item.category}</TableCell>
            <TableCell>{item.followers == null ?  'Belum ditentukan' : item.followers}</TableCell>
            <TableCell>{item.gender == null ? 'Belum ditentukan' : item.gender}</TableCell>
            <TableCell>{item.address == null ? 'Belum ditentukan' : item.address}</TableCell>
            <TableCell>{item.age == null ? 'Belum ditentukan' : item.age}</TableCell>
            <TableCell>{item.engegament == null ? 'Belum ditentukan' : item.engegament}</TableCell>
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
                <DropdownMenuItem onClick={handlerDelete}>Delete</DropdownMenuItem>
                {!(item.engegament == null) && 
                  <DropdownMenuItem onClick={handlerDelete}>Lihat</DropdownMenuItem>
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