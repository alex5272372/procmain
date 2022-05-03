import { NextPage } from 'next'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import utilStyles from '../../styles/utils.module.sass'

const AccessDenied: NextPage = (props) => {
  return (
    <section className="hero is-align-items-center">
      <div className="hero-body has-text-danger">
        <div className={'icon ' + utilStyles['is-100x100']}>
          <FontAwesomeIcon icon={faBan} />
        </div>
      </div>
    </section>
  )
}

export default AccessDenied
