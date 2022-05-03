import { NextPage } from 'next'
import styles from './Loader.module.sass'

const Loader: NextPage = () => {
  return (
    <section className="hero is-align-items-center">
      <div className="hero-body">
        <div className={styles.spinner}></div>
      </div>
    </section>
  )
}

export default Loader
