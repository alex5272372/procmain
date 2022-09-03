import { faEdit, faFileCsv } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import router from 'next/router'
import { exportToCsv } from '..'

const DataGridToolbar: NextPage<{ toolbar: any, mainElement: any }> = ({ toolbar, mainElement }) => {
  const detailClick = (): void => {
    router.push(toolbar.selectedRows.values().next().value)
  }

  const exportToCsvClick = async (): Promise<void> => {
    await exportToCsv(mainElement, 'Data.csv')
  }

  return <div className="navbar-start">
    <div className="navbar-item">
      <button className="button is-link" disabled={toolbar.selectedRows.size === 0} onClick={detailClick}>
        <span className="icon"><FontAwesomeIcon icon={faEdit} /></span>
        <span>Detail</span>
      </button>
    </div>
    <div className="navbar-item">
      <button className="button" disabled={toolbar.selectedRows.size === 0} onClick={exportToCsvClick}>
        <span className="icon"><FontAwesomeIcon icon={faFileCsv} /></span>
        <span>Export to CSV</span>
      </button>
    </div>
  </div>
}

export default DataGridToolbar
