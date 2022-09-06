import Image from 'next/image'
import logo from "../../../public/img/logo.png";
import styles from "./index.module.css"

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>Utopia Country Highlighter</div>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src={logo}
          alt="Utopia Music"
          width={100}
          height={100}
        />
        <div className={styles.dot}/>
      </div>
    </div>
  )
}