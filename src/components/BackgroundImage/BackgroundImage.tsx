import type { ReactNode } from 'react'
import css from './BackgroundImage.module.css'

interface BackgroundImageProps {
  src: string
  children: ReactNode
}

export function BackgroundImage({ src, children }: BackgroundImageProps) {
  return (
    <>
      <div className={css.container}>
        <div
          className={css.backgroundImage}
          style={{ backgroundImage: `url(${src})` }}
        >
          <div className={css.overlay}></div>
        </div>
      </div>
      <div className={css.content}>{children}</div>
    </>
  )
}
