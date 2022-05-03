import { NextPage } from 'next'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import utilStyles from '../../styles/utils.module.sass'

const Error: NextPage<{ title: string, subtitle: string }> = ({ title, subtitle }) => {
  return (
    <section className="hero is-align-items-center">
      <div className="hero-body">
        <div className={'icon has-text-danger' + utilStyles['is-100x100']}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
        <p className="title">
          {title}
        </p>
        <p className="subtitle">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

export default Error
