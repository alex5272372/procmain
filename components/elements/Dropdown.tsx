import { NextPage } from 'next'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { memo, MouseEvent, useEffect, useState } from 'react'
import { DocumentNode, useLazyQuery } from '@apollo/client'

const Dropdown: NextPage<{
  keyProp: string, id: number, name: string, title: string, query: DocumentNode, toolbar: any, dispatch: any
}> = ({ keyProp, id, name, title, query, toolbar, dispatch }) => {
  const [active, setActive] = useState(false)
  const [getData, { loading, error, data }] = useLazyQuery(query)

  useEffect(() => {
    if (loading === true) dispatch({ type: 'ADD_LOADING', loading: 'Dropdown' })
    else if (loading === false) dispatch({ type: 'DELETE_LOADING', loading: 'Dropdown' })
  }, [dispatch, loading])

  const triggerHandler = () => {
    if (!data) getData({ variables: { limit: 100, page: 1 }})
    setActive(state => !state)
  }

  const menuHandler = (event: MouseEvent<HTMLAnchorElement>): void => {
    const data = event.currentTarget.innerText === title ? undefined : event.currentTarget.innerText
    toolbar.dispatchData({ [keyProp]: data })
  }

  const dropdownClasses = ['control', 'dropdown']
  if (active) dropdownClasses.push('is-active')

  return <div className="field">
    <label className="label">{name}</label>
    <div className={dropdownClasses.join(' ')}>
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={triggerHandler}>
          <span>{title}</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {data?.companies.map((company: any) =>
            <a key={company.id} className="dropdown-item" onClick={menuHandler}>{company.title}</a>
          )}
        </div>
      </div>
    </div>
  </div>
}

export default memo(Dropdown)
