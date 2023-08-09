import { FC, memo } from 'react'

interface ArrowProps {
  size: 'sm' | 'md' | 'lg'
  dir: 'up' | 'down' | 'left' | 'right'
  color: string
  className?: string
}

const Arrow: FC<ArrowProps> = ({ size, dir, color, className = '' }) => {
  let styles = {}
  let height = 1
  let width = 1.5

  switch (size) {
    case 'sm':
      height *= 1
      width *= 1
      break

    case 'md':
      height *= 1.25
      width *= 1.25
      break

    case 'lg':
      height *= 1.5
      width *= 1.5
      break

    default:
      break
  }

  const tranparentStyle = `${height}rem solid transparent`
  const colorStyle = `${width}rem solid ${color}`

  switch (dir) {
    case 'up':
      styles = { borderLeft: tranparentStyle, borderRight: tranparentStyle, borderBottom: colorStyle }
      break

    case 'down':
      styles = { borderLeft: tranparentStyle, borderRight: tranparentStyle, borderTop: colorStyle }
      break

    case 'left':
      styles = { borderBottom: tranparentStyle, borderTop: tranparentStyle, borderRight: colorStyle }
      break

    case 'right':
      styles = { borderBottom: tranparentStyle, borderTop: tranparentStyle, borderLeft: colorStyle }
      break

    default:
      break
  }

  return <div className={`h-0 w-0 ${className}`} style={styles}></div>
}

export default memo(Arrow)
