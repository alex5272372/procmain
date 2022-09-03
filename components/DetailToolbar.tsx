import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'

const DetailToolbar: NextPage<{ toolbar: any, dispatch: any }> = ({ toolbar, dispatch }) => {
  const submitHandler = async () => {
    await toolbar.updateData({ variables: { ...toolbar.variables, data: toolbar.dataState }})
    dispatch({ type: 'SHOW_MODAL', body: '<h2>Object has been updated</h2>' })
  }

  return <div className="navbar-start">
    <div className="navbar-item">
      <button className="button is-link" disabled={Object.keys(toolbar.dataState).length === 0} onClick={submitHandler}>
        <span className="icon"><FontAwesomeIcon icon={faSave} /></span>
        <span>Submit</span>
      </button>
    </div>
  </div>
}

export default DetailToolbar
