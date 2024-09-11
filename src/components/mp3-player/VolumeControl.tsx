import { useState } from 'react'

type Color = {
  r: number
  g: number
  b: number
}
export default function VolumeControl({ audio }: { audio: HTMLAudioElement }) {
  // Just making sure the volume button renders when the volume changes
  const [randomValue, setRandomValue] = useState(0)

  function findColor(ratio: number) {
    // Define the RGB values for black, orange, and red
    const black = { r: 0, g: 0, b: 0 }
    // #bd7a00:
    const orange = { r: 189, g: 122, b: 0 }
    const red = { r: 255, g: 0, b: 0 }

    // Function to interpolate between two colors
    function interpolateColor(color1: Color, color2: Color, factor: number) {
      let result = {
        r: Math.round(color1.r + factor * (color2.r - color1.r)),
        g: Math.round(color1.g + factor * (color2.g - color1.g)),
        b: Math.round(color1.b + factor * (color2.b - color1.b)),
      }
      return result
    }

    // Determine which two colors to blend between
    let startColor, endColor
    let localRatio
    if (ratio < 0.5) {
      // Blend between black and orange
      startColor = black
      endColor = orange
      localRatio = ratio * 2 // Adjust ratio because we're only moving halfway
    } else {
      // Blend between orange and red
      startColor = orange
      endColor = red
      localRatio = (ratio - 0.5) * 2 // Adjust ratio because we're starting from halfway
    }

    // Interpolate between the two colors
    const finalColor = interpolateColor(startColor, endColor, localRatio)

    // Convert the RGB color to a hex string and return it
    return `#${finalColor.r.toString(16).padStart(2, '0')}${finalColor.g
      .toString(16)
      .padStart(2, '0')}${finalColor.b.toString(16).padStart(2, '0')}`
  }

  function setBackgroundOn(ratio: number) {
    const color = findColor(ratio)
    const input = document.getElementById('volume')
    if (!input) return

    input.style.setProperty('--background', color)
  }

  return (
    <input
      type="range"
      className="player-section-volumetc-range"
      id="volume"
      min="0"
      max="100"
      onInput={(e) => {
        // @ts-expect-error
        const ratio = e.target.value / 100
        audio.volume = ratio
        setBackgroundOn(ratio)
        setRandomValue(Math.random())
      }}
      value={(audio?.volume || 1) * 100}
    />
  )
}
