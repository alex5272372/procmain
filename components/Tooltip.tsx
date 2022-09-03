import { NextPage } from 'next'
import React from 'react'
import styles from './Tooltip.module.sass'

// https://www.w3schools.com/css/css_tooltip.asp
const Tooltip: NextPage<{ children: React.ReactNode, message: string }> = ({ children, message }) => {

  return <div className={styles.tooltip}>
    {children}
    {message && <span className={styles.tooltiptext}>{message}</span>}
  </div>
}

export default Tooltip
