import { NextPage } from 'next'

const PercentFormatter: NextPage<{ value: string }> = ({ value }) => {
  const intValue = parseInt(value)
  return isNaN(intValue) || intValue === 0 ? null : <>{intValue} %</>
}

export default PercentFormatter
