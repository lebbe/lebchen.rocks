export function Timer({ time }: { time: number }) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return (
    <div className="player-section-timer-text">
      {`${minutes}:${seconds.toString().padStart(2, '0')}`}
    </div>
  )
}
