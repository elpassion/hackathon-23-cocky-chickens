import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { apiPath } from '../helpers/api';

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

export const ActiveRoom = ({ roomID, username }) => {
  const myUsername = username;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setInterval(() => {
      apiPath.get(`/status/${roomID}`).then((response) => {
        setPlayers(response.data.players);
      }).catch((error) => {
        alert('Coś poszło nie tak!')
      })
    }, 2400);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.roomWrapper}>
        <p className={styles.roomName}>
          Room ID: {roomID}
        </p>

        {players.length > 0 ? (
          <>
            {players.map((player) => {
              return (
                <div className={styles.playerList}>
                  <p>
                    {player.username}
                  </p>

                  {myUsername !== player.username ? (
                    <p>
                      <strong>
                        {player.label}
                      </strong>
                    </p>
                  ) : (
                    <p className={styles.you}>
                      Ty!
                    </p>
                  )}

                </div>
              )
            })}
          </>
        ) : (
          <div className={styles.loading}>
            Loading players list...
          </div>
        )}
      </div>
    </main>
  )
}
