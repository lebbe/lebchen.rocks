import { Link } from './Link'

type Props = {
  amazon?: string
  anghami?: string
  apple?: string
  bandcamp?: string
  boomplay?: string
  deezer?: string
  soundcloud?: string
  spotify?: string
  tidal?: string
  youtube?: string
  showIcons?: boolean
}

export function Links({
  amazon,
  anghami,
  apple,
  bandcamp,
  boomplay,
  deezer,
  soundcloud,
  spotify,
  tidal,
  youtube,
  showIcons = true,
}: Props) {
  return (
    <>
      {amazon && (
        <Link
          href={amazon}
          imgSrc="../services/amazon.png"
          showIcon={showIcons}
        >
          Amazon Music
        </Link>
      )}
      {anghami && (
        <Link
          href={anghami}
          imgSrc="../services/anghami.svg"
          showIcon={showIcons}
        >
          Anghami
        </Link>
      )}
      {apple && (
        <Link
          href={apple}
          imgSrc="../services/apple-min.png"
          showIcon={showIcons}
        >
          Apple Music
        </Link>
      )}

      {bandcamp && (
        <Link
          href={bandcamp}
          imgSrc="../services/icon-bandcamp-min.png"
          showIcon={showIcons}
        >
          Bandcamp
        </Link>
      )}

      {boomplay && (
        <Link
          href={boomplay}
          imgSrc="../services/boomplay.png"
          showIcon={showIcons}
        >
          Boomplay
        </Link>
      )}

      {deezer && (
        <Link
          href={deezer}
          imgSrc="../services/deezer.png"
          showIcon={showIcons}
        >
          Deezer
        </Link>
      )}

      {soundcloud && (
        <Link
          href={soundcloud}
          imgSrc="../services/soundcloud.webp"
          showIcon={showIcons}
        >
          Soundcloud
        </Link>
      )}

      {spotify && (
        <Link
          href={spotify}
          imgSrc="../services/spotify.webp"
          showIcon={showIcons}
        >
          Spotify
        </Link>
      )}

      {tidal && (
        <Link href={tidal} imgSrc="../services/tidal.png" showIcon={showIcons}>
          Tidal
        </Link>
      )}

      {youtube && (
        <Link
          href={youtube}
          imgSrc="../services/youtube-104-432560.webp"
          showIcon={showIcons}
        >
          YouTube
        </Link>
      )}
    </>
  )
}
