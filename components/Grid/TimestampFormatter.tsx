import { NextPage } from 'next'

const TimestampFormatter: NextPage<{
  timestamp: string | null, date?: boolean, time?:boolean
}> = ({ timestamp, date = true, time = true }) => {
  const dateOption: Intl.DateTimeFormatOptions = date ? {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  } : {}

  const timeOption: Intl.DateTimeFormatOptions = time ? {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  } : {}

  const options: Intl.DateTimeFormatOptions = {
    ...dateOption,
    ...timeOption,
    timeZone: 'America/Los_Angeles'
  }

  return <>{timestamp === null ? '' : new Date(timestamp).toLocaleDateString(navigator.language, options)}</>
}

export default TimestampFormatter
