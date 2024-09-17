import { useState } from 'react'

export function BalanceController({
  pannerNode,
}: {
  pannerNode: StereoPannerNode | undefined
}) {
  const [value, setValue] = useState(50)
  return (
    <input
      type="range"
      min="0"
      max="100"
      className="player-section-volumetc-range balanceController"
      onInput={(e) => {
        if (!pannerNode) return
        // @ts-expect-error
        const ratio = e.target.value / 50 - 1
        pannerNode.pan.value = ratio
        // @ts-expect-error
        setValue(e.target.value)
      }}
      value={value}
    />
  )
}
