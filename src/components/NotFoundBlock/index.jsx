import React from 'react'
import styles from "./NotFoundBlock.module.scss"
const NotFoundBlock = () => {
  return (
    <div  className={styles.root}>
      <h1><span>:(</span>
        <br />
        ничего не найдена</h1>
        <p className={styles.description}>к сожалению обнаружена страница отсутствует в нашем интернет-магазине</p>
    </div>
  )
}

export default NotFoundBlock
