import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export const MetaHead = ({ title }) => {
  return (
    <Head>
        <title>{title}</title>
    </Head>
  )
}

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link
        href="http://www.elpassion.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <a>
          EL Passion
        </a>
      </Link>
    </footer>
  )
}

export const NameInput = ({ onChange, value }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        onChange={onChange}
        value={value}
        type="text"
        className={styles.input}
      />
    </div>
  )
}
