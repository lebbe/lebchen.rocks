import { useEffect, useRef, type ReactNode } from 'react'

import css from './PulsatingHeader.module.css'

type Props = {
  children: ReactNode
  time: number
}

export function PulsatingHeader({ children, time }: Props) {
  const p = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (p.current) {
        p.current.classList.toggle(css.pulsatingHeaderOff)
      }
    }, time)

    return () => clearInterval(interval)
  }, [])

  return (
    <p ref={p} className={css.pulsatingHeader}>
      {children}
    </p>
  )
}
