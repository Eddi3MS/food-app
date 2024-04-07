import { Enums } from '@/types'

const sizeNames = {
  P: 'Pequena',
  M: 'Média',
  G: 'Grande',
  GG: 'Extra Grande',
}

export function sizeName(size: Enums<'sizes'>) {
  return sizeNames[size]
}
