import Head from 'next/head';
import { ActiveRoom, Footer, MetaHead, NameInput } from '../components';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { apiPath } from '../helpers/api';

export default function Create() {
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [activeRoom, setActiveRoom] = useState('');

  const submitForm = (evt) => {
    evt.preventDefault();
    setLoading(true);

    apiPath.post('/create', { username }).then((response) => {
      setActiveRoom(response.data.room_id);
      setUsername(response.data.username);
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
          <MetaHead title="Create the room" />
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
