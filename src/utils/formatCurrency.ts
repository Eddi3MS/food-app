export function formatCurrency(value?: string | number) {
  if (!value) return ''
  let numericValue =
    typeof value === 'string' ? Number(value.replace(/\D/g, '')) : value

  if (!numericValue) return ''

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue / 100)

  return formattedValue
}
