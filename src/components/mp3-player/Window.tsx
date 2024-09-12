type Props = {
  children: React.ReactNode
  title: string
}

export function Window({ children, title }: Props) {
  return (
    <div className="window">
      <div className="window-title">
        <div className="window-title-text">{title}</div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  )
}
