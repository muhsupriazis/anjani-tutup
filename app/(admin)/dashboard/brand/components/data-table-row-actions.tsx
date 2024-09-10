"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
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

import { kolsSchema, taskSchema } from "../../data/schema"
import { labels } from "../../data/data"
import { supabase } from "@/lib/db"
import { useRouter } from "next/navigation"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = kolsSchema.parse(row.original)
  const router = useRouter();

  const handlerDelete = async () => {
    const isDelete = confirm("Apakah kamu yakin ingin menghapus?")
    if(isDelete) {      
    const { error } = await supabase
    .from('kol')
    .delete()
    .eq('id', task.id)
    router.push('/dashboard')
    return;
    }
    return;
  }

  const hanlderEdit = async () => {
    router.push(`/dashboard/edit/${task.id}`)
  }

  return (
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
        <DropdownMenuItem onClick={hanlderEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handlerDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}