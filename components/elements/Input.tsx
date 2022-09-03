import { NextPage } from 'next'
import { faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '../Tooltip'
import { ChangeEvent, FocusEvent, memo, useState } from 'react'

const Input: NextPage<{
  keyProp: string, name: string, title: string, toolbar: any, type?: string, readOnly?: boolean
}> = ({ keyProp, name, title, toolbar, type, readOnly }) => {
  const [value, setValue] = useState(toolbar.dataState[keyProp] || title)
  const [danger, setDanger] = useState('')

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
    if (!event.currentTarget.value) setDanger('Value cannot be empty')
    else setDanger('')
  }

  const blurHandler = (event: FocusEvent<HTMLInputElement>) => {
    if (!readOnly) {
      const data = event.currentTarget.value === title ? undefined : event.currentTarget.value
      toolbar.dispatchData({ [keyProp]: data })
    }
  }

  const controlClasses = ['control']
  if (danger) controlClasses.push('has-icons-left')
  if (value !== title) controlClasses.push('has-icons-right')

  return <div className="field">
    <label className="label">{name}</label>
    <Tooltip message={danger}>
      <div className={controlClasses.join(' ')}>
        <input
          className="input"
          type={type || 'text'}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          readOnly={!!readOnly}
        />
        {danger && <span className="icon is-left has-text-danger">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </span>}
        {value !== title && <span className="icon is-right has-text-primary">
          <FontAwesomeIcon icon={faCheck} />
        </span>}
      </div>
    </Tooltip>
  </div>
}

export default memo(Input)
