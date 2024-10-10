import type { ReactNode } from 'react'

import css from './Link.module.css'

type Props = {
  href: string
  imgSrc: string
  children: ReactNode
  showIcon?: boolean
}

export function Link({ href, imgSrc, children, showIcon }: Props) {
  return (
    <a className={css.link} href={href}>
      <img
        className={css.linkIcon + (showIcon ? '' : ' ' + css.linkIconHidden)}
        src={imgSrc}
      />
      <span className={css.linkText}>{children}</span>
    </a>
  )
}
