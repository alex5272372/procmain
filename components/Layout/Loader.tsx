import { NextPage } from 'next'
import styles from './Loader.module.sass'

const Loader: NextPage = () => {
  return <div className="modal is-active">
    <div className="modal-background"></div>
    <div className={['modal-content', styles.spinner].join(' ')}></div>
  </div>
}

export default Loader
