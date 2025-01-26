import { useState } from 'react'

type Props = {
  children: React.ReactNode
  title: string
  minimizable?: boolean
}

export function Window({ children, title, minimizable }: Props) {
  const [isMinimized, setIsMinimized] = useState(false)
  return (
    <div className="window">
      <div className="window-title">
        <div className="window-title-text">{title}</div>
        {minimizable && (
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="window-title-minimize"
          >
            <span className="material-icons">minimize</span>
          </button>
        )}
      </div>
      {!isMinimized && <div className="window-content">{children}</div>}
    </div>
  )
}
