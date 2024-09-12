import { useEffect, useRef, useState } from 'react'

export default function Visualizer({
  analyserNode,
  isPlaying,
  isPaused,
}: {
  analyserNode: any
  isPlaying: boolean
  isPaused: boolean
}) {
  const intervalId = useRef(0)
  const [frequencyData, setFrequencyData] = useState(Array(19).fill('0px'))

  useEffect(() => {
    if (!isPlaying && !isPaused) {
      setFrequencyData(Array(19).fill('0px'))
    }
  }, [isPlaying, isPaused])

  if (isPlaying && analyserNode && !intervalId.current) {
    intervalId.current = setInterval(() => {
      updateFrequencyData()
    }, 100)
  } else if (!isPlaying && intervalId.current) {
    clearInterval(intervalId.current)
    intervalId.current = 0
  }

  function updateFrequencyData() {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteFrequencyData(dataArray)

    const minHz = 100
    const maxHz = 10000
    const minLog = Math.log(minHz)
    const maxLog = Math.log(maxHz)
    const scale = (maxLog - minLog) / 18
    let newData = []

    for (let i = 0; i < 19; i++) {
      const logIndex = Math.exp(minLog + i * scale)
      const index = Math.round(
        ((logIndex - minHz) / (maxHz - minHz)) * (bufferLength - 1),
      )

      newData.push(`${(dataArray[index] / 255) * 44}px`)
    }

    setFrequencyData(newData)
  }

  return (
    <div className="visualizer">
      {frequencyData.map((data, index) => (
        <div key={index} className="bar" style={{ height: `${data}` }}></div>
      ))}
    </div>
  )
}
