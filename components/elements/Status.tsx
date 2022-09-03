import { NextPage } from 'next'
import { memo } from 'react'
import Checkbox from './Checkbox'

const Status: NextPage<{
  statuses: { key: string, name: string, checked: boolean }[], toolbar: any
}> = ({ statuses, toolbar }) => {
  return <div className="box">
    {statuses.map(status => <Checkbox
      key={status.key}
      keyProp={status.key}
      name={status.name}
      checked={status.checked}
      toolbar={toolbar}
      group="statuses"
    />)}
  </div>
}

export default memo(Status)
