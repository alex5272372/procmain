import { NextPage } from 'next'
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import utilStyles from '../../styles/utils.module.sass'

const NoData: NextPage = (props) => {
  return (
    <section className="hero is-align-items-center">
      <div className="hero-body">
        <div className={'icon ' + utilStyles['is-100x100']}>
          <FontAwesomeIcon icon={faSearchMinus} />
        </div>
      </div>
    </section>
  )
}

export default NoData
