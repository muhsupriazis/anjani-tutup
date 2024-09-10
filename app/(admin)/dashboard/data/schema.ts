import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export const kolsSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  followers: z.number(),
  age: z.number(),
  gender: z.string(),
  address: z.string(),
  engagement: z.number(),
  category: z.string(),
  followers_category: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type Kol = z.infer<typeof kolsSchema>