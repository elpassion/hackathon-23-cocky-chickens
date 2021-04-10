import Head from 'next/head';
import { useState } from 'react';
import { Footer, MetaHead, NameInput, ActiveRoom } from '../../components';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router'
import { apiPath } from '../../helpers/api';

export default function Join() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [activeRoom, setActiveRoom] = useState('');
    const roomID = router.query.slug;

    const submitForm = (evt) => {
      evt.preventDefault();
      setLoading(true);
  
      apiPath.post(`/join/${roomID}`, { username }).then((response) => {
        setUsername(username);
        setActiveRoom(response.data.room_id);
      }).catch((error) => {
        alert('Coś poszło nie tak!')
      }).finally(() => {
        setLoading(false);
      })
    }

    return (
      <div className={styles.container}>
        {!!activeRoom ? (
          <ActiveRoom roomID={activeRoom} username={username} />
        ) : (
          <>
            <MetaHead title="Join Room" />
            <main className={styles.main}>
              <h1 className={styles.title}>
                Your username
              </h1>

              <form className={styles.enterName} onSubmit={submitForm}>
                <NameInput value={username} onChange={(e) => setUsername(e.target.value)}/>

                <button className={styles.button}>
                  Enter
                </button>
              </form>
            </main>
          </>
        )}

        <Footer />
      </div>
    )
}