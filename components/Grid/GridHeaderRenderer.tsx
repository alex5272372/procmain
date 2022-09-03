import { HeaderRenderer, HeaderRendererProps } from 'react-data-grid'
import styles from './GridHeaderRenderer.module.sass'

function GridHeaderRenderer<R, SR>(props: HeaderRendererProps<R, SR>) {
  return <p className={styles.paragraph}>
    <HeaderRenderer {...props}/>
  </p>
}

export default GridHeaderRenderer
