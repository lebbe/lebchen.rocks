type Props = {
  time: number
  setTime: (value: number) => void
  audio: HTMLAudioElement
}

export function Range({ time, audio, setTime }: Props) {
  const timeValue = time
  const tracklength = audio?.duration
  const ratioPlayed = Math.floor((timeValue / tracklength) * 1000)

  return (
    <input
      type="range"
      className="player-section-slider-range"
      min="0"
      max="1000"
      onChange={(e) => {
        // @ts-expect-error
        const ratio = e.target.value / 1000
        audio.currentTime = ratio * tracklength || 0
        setTime(audio.currentTime)
      }}
      value={ratioPlayed || 0}
    />
  )
}
