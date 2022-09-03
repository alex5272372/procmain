import { NextPage } from 'next'

const CurrencyFormatter: NextPage<{ value: string }> = ({ value }) => {
  const currencyFormatter = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'usd'
  })
  const intValue = parseInt(value)

  return isNaN(intValue) ? null : <>{currencyFormatter.format(intValue)}</>
}

export default CurrencyFormatter
