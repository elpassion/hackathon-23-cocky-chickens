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
        placeholder="Your username"
        minLength={3}
        className={styles.input}
      />
    </div>
  )
}

const STATUS_OPEN = 'open';
const STATUS_LIVE = 'on_air';

export const ActiveRoom = ({ roomID, username, category, name }) => {
  const myUsername = username;
  const [players, setPlayers] = useState([]);
  const [value, setValue] = useState('');
  const [roomStatus, setRoomStatus] = useState('');
  const [copied, setCopied] = useState(false);
  const [roomName, setRoomName] = useState(name);
  const [roomCategory, setRoomCategory] = useState(category);
  
  useEffect(() => {
    setValue(window.location.origin + '/join/' + roomID);

    apiPath.get(`/status/${roomID}`).then((response) => {
      setRoomName(response.data.room_name);
      setRoomCategory(response.data.room_category);
      setPlayers(response.data.players);
      setRoomStatus(response.data.status);
    });

    const interval = setInterval(() => {
      apiPath.get(`/status/${roomID}`).then((response) => {
        setRoomName(response.data.room_name);
        setRoomCategory(response.data.room_category);
        setPlayers(response.data.players);
        setRoomStatus(response.data.status);
      }).catch(() => {
        alert('Coś poszło nie tak!')
      })
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const startGame = () => {
    apiPath.post(`/start/${roomID}`).then((response) => {
      setRoomStatus(STATUS_LIVE);
    }).catch(() => {
      alert('Coś poszło nie tak!')
    })
  };

  return (
    <main className={styles.main}>
      <div className={styles.roomWrapper}>
        <p className={styles.roomName}>
          <strong>{roomName}</strong>
          <br/>
          Category: <strong>{roomCategory}</strong>
        </p>

        <CopyToClipboard
          text={value}
          onCopy={() => setCopied(true)}
        >
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

export const RoomsList = () => {
  const [rooms, setRoomList] = useState([]);

  useEffect(() => {
    apiPath.get('/rooms').then((response) => {
      setRoomList(response.data.rooms);
    }).catch((error) => {
      console.log(error);
    });

    const interval = setInterval(() => {
      apiPath.get('/rooms').then((response) => {
        setRoomList(response.data.rooms);
      }).catch((error) => {
        console.log(error);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (rooms.length > 0) {
    return (
      <div style={{ width: '100%' }}>
        <h4 style={{ textAlign: 'center' }}>
          or join any open game
        </h4>
        
        <div className={styles.roomListing}>
          {rooms.map((room) => {
            return (
              <div className={styles.roomItem} key={room.room_name}>
                <div className={styles.roomDetails}>
                  <p>
                    {room.room_name}
                  </p>
                  <p>
                    Category: <strong>{room.room_category}</strong>
                  </p>
                </div>

                <Link href={`/join/${room.room_id}`}>
                  <a className={styles.joinButton}>
                    Join
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return null;
}
