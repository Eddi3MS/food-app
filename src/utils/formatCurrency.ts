export function formatCurrency(value?: number) {
  if (!value || typeof value !== 'number') return ''

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
