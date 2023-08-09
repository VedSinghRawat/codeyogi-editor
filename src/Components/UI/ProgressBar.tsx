import { FC, memo, useMemo } from 'react'

type Props = {
  className?: string
  indicator?: boolean
  progress: number
}

const ProgressBar: FC<Props> = ({ className = '', progress, indicator = false }) => {
  const calcProgress = useMemo(() => {
    let calcProgress

    if (progress < 0) {
      calcProgress = 0
    } else if (progress > 1) {
      calcProgress = progress
    } else if (progress > 100) {
      calcProgress = 100
    } else if (progress === 1) {
      calcProgress = 100
    } else {
      calcProgress = Math.round((progress % 1) * 100)
    }

    return calcProgress
  }, [progress])

  return (
    <div className={`bg-secondary-200 rounded-xl h-2 relative ${className}`}>
      <div className="absolute left-0 bottom-0 top-0 bg-secondary-900 rounded-xl duration-500 transition-size" style={{ width: `${calcProgress}%` }}>
        {indicator && (
          <div className={`bg-black h-3 w-3 absolute right-0 top-1/2 ${calcProgress === 0 ? 'left-1/2' : ''} -translate-y-1/2 rounded-full`}></div>
        )}
      </div>
    </div>
  )
}

ProgressBar.defaultProps = {}

export default memo(ProgressBar)
