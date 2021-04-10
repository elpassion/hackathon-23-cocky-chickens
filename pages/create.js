import Head from 'next/head';
import { ActiveRoom, Footer, MetaHead, NameInput } from '../components';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { apiPath } from '../helpers/api';

const CAT_ANIMALS = 'animals';
const CAT_PEOPLE = 'people';

export default function Create() {
  const [username, setUsername] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [activeRoom, setActiveRoom] = useState('');
  const [category, selectCategory] = useState(CAT_ANIMALS);
  const [roomName, setRoomName] = useState('');

  const submitForm = (evt) => {
    evt.preventDefault();
    setLoading(true);

    apiPath.post('/create', { username, room_category: category }).then((response) => {
      setActiveRoom(response.data.room_id);
      setUsername(response.data.username);
      setRoomName(response.data.room_name);
    }).catch((error) => {
      alert('Coś poszło nie tak!')
    }).finally(() => {
      setLoading(false);
    })
  }

  return (
    <div className={styles.container}>
      {!!activeRoom ? (
        <ActiveRoom roomID={activeRoom} username={username} category={category} name={roomName} />
      ) : (
        <>
          <MetaHead title="Create the room" />
          <main className={styles.main}>
            <h1 className={styles.title}>
              New game
            </h1>

            <form className={styles.enterName} onSubmit={submitForm}>
              <p>
                Select Category:
              </p>

              <div className={styles.row}>
                <div
                  className={`${styles.catIcon} ${category === CAT_ANIMALS && styles.active}`}
                  onClick={() => selectCategory(CAT_ANIMALS)}
                >
                    <span>
                      🐕
                    </span>
                </div>
                <div
                  className={`${styles.catIcon} ${category === CAT_PEOPLE && styles.active}`}
                  onClick={() => selectCategory(CAT_PEOPLE)}
                >
                  <span>
                    👨
                  </span>
                </div>
              </div>

              <div className={styles.row}>
                {isLoading ? 'Creating a game...' : (
                  <>
                    <NameInput value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <button className={styles.button}>
                      Enter
                    </button>
                  </>
                )}
              </div>
            </form>
          </main>
        </>
      )}

      <Footer />
    </div>
  )
}
