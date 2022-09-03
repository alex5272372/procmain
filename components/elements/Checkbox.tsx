import { NextPage } from 'next'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo } from 'react'

const Checkbox: NextPage<{
  keyProp: string, name: string, checked: boolean, toolbar: any, group?: string
}> = ({ keyProp, name, checked, toolbar, group }) => {
  const checkedState = group ? toolbar.dataState[group]
    ? toolbar.dataState[group][keyProp] : undefined : toolbar.dataState[keyProp]

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.currentTarget.checked === checked ? undefined : event.currentTarget.checked
    toolbar.dispatchData(group ? { [group]: { [keyProp]: data }} : { [keyProp]: data })
  }

  return <div className="field">
    <div className="control">
      <label className="checkbox">
        <input
          type="checkbox"
          checked={checkedState === undefined ? checked : checkedState}
          onChange={changeHandler}
        /> {name}
      </label>
      {checkedState !== undefined && checkedState !== checked && <span className="icon is-right has-text-primary">
        <FontAwesomeIcon icon={faCheck} />
      </span>}
    </div>
  </div>
}

export default memo(Checkbox)
