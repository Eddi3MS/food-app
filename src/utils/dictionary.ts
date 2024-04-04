import { PizzaSize } from '@/types'

const sizeNames = {
  P: 'Pequena',
  M: 'Média',
  G: 'Grande',
  GG: 'Extra Grande',
}

export function sizeName(size: PizzaSize) {
  return sizeNames[size]
}
