import { useEffect, useRef, useState } from 'react'

export default function PlayerSectionTitle({
  trackTitle,
}: {
  trackTitle: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const scrollOffset = useRef(0)
  const [goingLeft, setGoingLeft] = useState(false)

  useEffect(
    function () {
      const interval = setInterval(() => {
        const playerTitle = ref.current

        if (!playerTitle) return

        const oldScrollLeft = playerTitle.scrollLeft

        if (goingLeft) {
          scrollOffset.current -= 10
        } else {
          scrollOffset.current += 10
        }

        playerTitle.scrollTo(scrollOffset.current, 0)

        const newScrollLeft = playerTitle.scrollLeft

        if (newScrollLeft === oldScrollLeft) {
          setGoingLeft((goingLeft) => !goingLeft)
          scrollOffset.current = newScrollLeft
        }
      }, 100)

      return () => clearInterval(interval)
    },
    [goingLeft],
  )

  return (
    <div className="player-section player-section-title">
      <div id="player-title" ref={ref} className="player-section-title-text">
        {trackTitle}
      </div>
    </div>
  )
}
