import Head from 'next/head';
import { ActiveRoom, Footer, MetaHead, NameInput } from '../components';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { apiPath } from '../helpers/api';

const CAT_ANIMALS = 'animals';
const CAT_PEOPLE = 'people';
const CAT_HOUSEHOLD = 'household';
const CAT_PLANTS = 'plants';
const CAT_HARDCORE = 'hardcore';

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
                <CategoryItem
                  onClick={() => selectCategory(CAT_ANIMALS)}
                  emoji="🐕"
                  active={category}
                  catID={CAT_ANIMALS}
                />

                <CategoryItem
                  onClick={() => selectCategory(CAT_PEOPLE)}
                  emoji="👨"
                  active={category}
                  catID={CAT_PEOPLE}
                />

                <CategoryItem
                  onClick={() => selectCategory(CAT_HOUSEHOLD)}
                  emoji="🏡"
                  active={category}
                  catID={CAT_HOUSEHOLD}
                />

                <CategoryItem
                  onClick={() => selectCategory(CAT_PLANTS)}
                  emoji="🌿"
                  active={category}
                  catID={CAT_PLANTS}
                />

                <CategoryItem
                  onClick={() => selectCategory(CAT_HARDCORE)}
                  emoji="💥"
                  active={category}
                  catID={CAT_HARDCORE}
                />
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

const CategoryItem = ({ onClick, emoji, active, catID }) => {
  return (
    <div
      className={`${styles.catIcon} ${active === catID && styles.active}`}
      onClick={onClick}
    >
    <span>
      {emoji}
    </span>
  </div>
  )
};
