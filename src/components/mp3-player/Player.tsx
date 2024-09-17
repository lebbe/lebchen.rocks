import { useEffect, useRef, useState } from 'react'
import { Window } from './Window'
import { Timer } from './Timer'
import { ButtonLed } from './ButtonLed'
import Visualizer from './Visualizer'
import PlayerSectionTitle from './PlayerSectionTitle'
import VolumeControl from './VolumeControl'
import { BalanceController } from './BalanceController'
import { Range } from './Range'
import { Controls } from './Controls'

import './style.css'

type Song = {
  name: string
  artist: string
  src: string
  duration: string
}

type Props = {
  songs: Song[]
  audio: HTMLAudioElement
  userGestureHasHappened: boolean
}

interface AudioRefs {
  analyserNode: AnalyserNode
  pannerNode: StereoPannerNode
}

function Player({ songs, audio, userGestureHasHappened }: Props) {
  const [songIndex, setSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  // We need to know if it's paused (not stopped) to prevent clearing the visualizer
  const [isPaused, setIsPaused] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('')
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [time, setTime] = useState(0)

  const audioRefs = useRef<AudioRefs>(null)

  useEffect(
    function playPause() {
      if (isPlaying) {
        setIsPaused(false)
        audio.play()
      } else {
        audio.pause()
      }
    },
    [isPlaying],
  )

  useEffect(function timer() {
    const interval = setInterval(() => {
      setTime(audio.currentTime)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(
    function onEnd() {
      audio.onended = function () {
        if (!repeat && songIndex === songs.length - 1) {
          stopSongs()
          setSongIndex(0)
        } else {
          nextSong()
        }
      }

      if (isPlaying) {
        audio.play()
      }
    },
    [songIndex, repeat, isPlaying],
  )

  if (!audioRefs.current && userGestureHasHappened) {
    const audioContext = new AudioContext()
    const analyserNode = audioContext.createAnalyser()
    const sourceNode = audioContext.createMediaElementSource(audio)
    const pannerNode = new StereoPannerNode(audioContext)

    sourceNode
      .connect(pannerNode)
      .connect(analyserNode)
      .connect(audioContext.destination)

    // @ts-expect-error
    audioRefs.current = { analyserNode, pannerNode }
  }

  const { analyserNode, pannerNode } = audioRefs.current || {}

  function nextSong() {
    if (shuffle) {
      setSongIndex(Math.floor(Math.random() * songs.length))
    } else {
      setSongIndex((songIndex + 1) % songs.length)
    }
    setIsPlaying(true)
  }

  function previousSong() {
    setSongIndex((songIndex - 1 + songs.length) % songs.length)
    setIsPlaying(true)
  }

  function stopSongs() {
    setIsPlaying(false)
    setTime(0)
    audio.pause()
    audio.currentTime = 0
  }

  if (songs.length === 0) {
    return <div>There are no songs</div>
  }

  if (currentSrc !== songs[songIndex].src) {
    audio.src = songs[songIndex].src
    setCurrentSrc(songs[songIndex].src)
  }

  return (
    <div className="player">
      <Window title="CrossSnow OST">
        <div className="player-section player-section-info">
          <div className="player-section player-section-timer">
            <Timer time={time} />
            <Visualizer
              analyserNode={analyserNode}
              isPlaying={isPlaying}
              isPaused={isPaused}
            />
          </div>
          <div className="prevent-flex-child-to-overflow">
            <PlayerSectionTitle
              trackTitle={`${songs[songIndex].artist} - ${songs[songIndex].name}`}
            />
            <div className="player-section player-section-volumetc">
              <VolumeControl audio={audio} />
              <BalanceController pannerNode={pannerNode} />
            </div>
          </div>
        </div>
        <div className="player-section player-section-slider">
          <Range time={time} audio={audio} setTime={setTime} />
        </div>
        <div className="player-section">
          <Controls
            nextSong={nextSong}
            previousSong={previousSong}
            stopSongs={stopSongs}
            playSong={() => setIsPlaying(true)}
            pauseSong={() => {
              setIsPaused(true)
              setIsPlaying(false)
            }}
          />
          <div className="misc-buttons">
            <button
              className="player-button misc-button"
              onClick={() => setShuffle(!shuffle)}
            >
              <ButtonLed active={shuffle} />
              SHUFFLE
            </button>
            <button
              className="player-button misc-button"
              onClick={() => setRepeat(!repeat)}
            >
              <ButtonLed active={repeat} />
              <span className="material-icons"> repeat </span>
            </button>
          </div>
        </div>
      </Window>
      <Window title="Playlist">
        <div className="player-section">
          <div className="player-section-playlist">
            <ul className="playlist">
              {songs.map(function (song: Song, i: number) {
                return (
                  <li
                    key={song.src}
                    onClick={() => {
                      setSongIndex(i)
                      setIsPlaying(true)
                    }}
                    className={
                      'playlist-track ' +
                      (songIndex === i ? 'playlist-track-playing' : '')
                    }
                  >
                    <span className="playlist-track-track">
                      {i + 1}. {song.artist} - {song.name}
                    </span>
                    <span className="playlist-track-duration">
                      {song.duration}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Window>
    </div>
  )
}

export function PlayerWrapper({ songs }: { songs: Song[] }) {
  const [userGestureHasHappened, setUserGestureHasHappened] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isAudioReady, setIsAudioReady] = useState(false)

  useEffect(function initiateOnUserGesture() {
    function handleUserGesture() {
      setUserGestureHasHappened(true)
    }

    window.addEventListener('click', handleUserGesture)
    window.addEventListener('keydown', handleUserGesture)

    return function cleanup() {
      window.removeEventListener('click', handleUserGesture)
      window.removeEventListener('keydown', handleUserGesture)
    }
  }, [])

  useEffect(function () {
    setIsAudioReady(true)
  }, [])

  return (
    <div className="mp3-player">
      <audio ref={audioRef} id="audio" src={songs[0].src} />
      {audioRef.current && (
        <Player
          songs={songs}
          audio={audioRef.current}
          userGestureHasHappened={userGestureHasHappened}
        />
      )}
    </div>
  )
}
