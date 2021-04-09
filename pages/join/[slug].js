import Head from 'next/head';
import { Footer, MetaHead, NameInput } from '../../components';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router'

export default function Join() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <MetaHead title="Create the room" />

            <main className={styles.main}>
            <h1 className={styles.title}>
                Enter Your name {router.query.slug}
            </h1>

            <form className={styles.enterName}>
                <NameInput />

                <button className={styles.button}>
                Enter
                </button>
            </form>
            </main>

            <Footer />
        </div>
    )
}
