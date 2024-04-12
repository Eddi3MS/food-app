import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Insira um e-mail válido.'),
  password: z.string().min(1, 'Campo Obrigatório'),
})

export type LoginFormType = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Campo Obrigatório'),
  email: z.string().email('Insira um e-mail válido.'),
  password: z.string().min(6, 'Senha deve ter 6 caracteres ou mais.'),
})

export type RegisterFormType = z.infer<typeof RegisterSchema>

export const AddressSchema = z.object({
  street: z.string().min(1, 'Campo Obrigatório'),
  number: z.string().min(1, 'Campo Obrigatório'),
  district: z.string().min(1, 'Campo Obrigatório'),
  complement: z.string().optional(),
})

export type AddressFormType = z.infer<typeof AddressSchema>

export const ProductSchema = z.object({
  name: z.string().min(1, 'Campo Obrigatório'),
  description: z.string().min(1, 'Campo Obrigatório'),
  price: z.string().min(1, 'Campo Obrigatório'),
  image: z.string().optional(),
  size: z.enum(['P', 'M', 'G', 'GG']),
})

export type ProductFormType = z.infer<typeof ProductSchema>
