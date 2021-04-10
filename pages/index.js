import Head from 'next/head';
import Link from 'next/link';
import { Footer, MetaHead, RoomsList } from '../components';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <MetaHead title="Spot the chicken" /> 

      <main className={styles.main}>
        <h1 className={styles.title}>
          Spot the Chicken
        </h1>

        <div className={styles.grid}>
          <Link href="/create">
            <a className={styles.card}>
              <h3>Create new room</h3>
            </a>
          </Link>
        </div>

        <RoomsList />
      </main>

      <Footer />
    </div>
  )
}
