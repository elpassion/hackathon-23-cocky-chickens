import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { apiPath } from '../helpers/api';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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

const STATUS_OPEN = 'open';
// const STATUS_LIVE = 'on_air';
// const STATUS_CLOSED = 'closed';

export const ActiveRoom = ({ roomID, username }) => {
  const myUsername = username;
  const [players, setPlayers] = useState([]);
  const [value, setValue] = useState('');
  const [roomStatus, setRoomStatus] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setValue(window.location.origin + '/join/' + roomID);

    setInterval(() => {
      apiPath.get(`/status/${roomID}`).then((response) => {
        setPlayers(response.data.players);
        setRoomStatus(response.data.status);
      }).catch(() => {
        alert('Coś poszło nie tak!')
      })
    }, 2400);
  }, []);

  const startGame = () => {
    apiPath.post(`/start/${roomID}`).then((response) => {
      console.log('started!');
    }).catch(() => {
      alert('Coś poszło nie tak!')
    })
  };

  console.log(roomStatus);

  return (
    <main className={styles.main}>
      <div className={styles.roomWrapper}>
        <p className={styles.roomName}>
          Room ID: {roomID}
        </p>

        <CopyToClipboard text={value}
          onCopy={() => setCopied(true)}>
          <p
            style={{
              cursor: 'pointer',
              margin: '1rem auto',
              width: '100%',
              textAlign: 'center',
              background: '#eaeaea',
              padding: '.25rem',
              borderRadius: '.75rem',
            }}
          >
            {copied ? 'Copied!' : 'Copy invite to clipboard'}
          </p>
        </CopyToClipboard>

        {players.length > 0 ? (
          <>
            {players.map((player) => {
              return (
                <div className={styles.playerList} key={player.username}>
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
                      You
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
        {(roomStatus === STATUS_OPEN && players.length > 2) && (
          <p
            style={{
              cursor: 'pointer',
              margin: '1rem auto',
              width: '100%',
              textAlign: 'center',
              background: '#69d73b',
              padding: '.5rem',
              borderRadius: '.75rem',
              color: '#fff',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
            onClick={startGame}
          >
            START
          </p>
        )}
      </div>
    </main>
  )
}
