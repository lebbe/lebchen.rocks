type Props = {
  nextSong: () => void
  previousSong: () => void
  playSong: () => void
  pauseSong: () => void
  stopSongs: () => void
}

export function Controls({
  nextSong,
  previousSong,
  playSong,
  pauseSong,
  stopSongs,
}: Props) {
  return (
    <div className="controls">
      <button onClick={previousSong} className="player-button controls-button">
        <span className="material-icons"> skip_previous </span>
      </button>
      <button onClick={stopSongs} className="player-button controls-button">
        <span className="material-icons"> stop </span>
      </button>
      <button onClick={playSong} className="player-button controls-button">
        <span className="material-icons"> play_arrow </span>
      </button>
      <button onClick={pauseSong} className="player-button controls-button">
        <span className="material-icons"> pause </span>
      </button>
      <button onClick={nextSong} className="player-button controls-button">
        <span className="material-icons"> skip_next </span>
      </button>
    </div>
  )
}
