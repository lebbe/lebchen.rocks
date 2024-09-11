export function ButtonLed({ active }: { active: boolean }) {
  const classNames = ['player-button-led']

  if (active) {
    classNames.push('player-button-led--active')
  }

  return <span className={classNames.join(' ')}></span>
}
