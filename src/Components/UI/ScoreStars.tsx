import { FC, memo, useMemo } from 'react'

interface ScoreStarsProps {
  score: number
  starClasses?: string
  totalStars?: number
  className?: string
}

interface IncompleteStarLinearGradientProps {
  fillPercent: number
}

export const CompleteStarLinearGradient: FC = () => (
  <svg className={`h-0" w-0 absolute`} aria-hidden="true" focusable="false">
    <linearGradient id="complete" x2="1.25" y2="1">
      <stop offset="50%" stopColor="#E9C91F" />
      <stop offset="50%" stopColor="#FFDC1F" />
    </linearGradient>
  </svg>
)

export const IncompleteStarLinearGradient: FC<IncompleteStarLinearGradientProps> = ({ fillPercent }) => (
  <svg className={`h-0" w-0 absolute`} aria-hidden="true" focusable="false">
    <linearGradient id="incomplete">
      <stop offset={`${fillPercent}%`} stopColor="#FFDC1F" />
      <stop offset={`${fillPercent}%`} stopColor="#E9EEF3" />
    </linearGradient>
  </svg>
)

const ScoreStars: FC<ScoreStarsProps> = ({ score, starClasses = '', totalStars = 5, className = '' }) => {
  const stars: JSX.Element[] = []

  const { lastStarFillPercent, fullStars } = useMemo(() => {
    let lastStarFillPercent
    let fullStars
    if (score < 0) {
      lastStarFillPercent = 0
      fullStars = 0
    } else if (score > 1) {
      fullStars = Math.trunc((score / 100) * 5)
      lastStarFillPercent = Math.trunc((((score / 100) * 5) % 1) * 100)
    } else if (score > 100) {
      fullStars = totalStars
      lastStarFillPercent = 100
    } else {
      lastStarFillPercent = Math.round(((score * totalStars) % 1) * 100)
      fullStars = Math.trunc(score * totalStars)
    }

    return { lastStarFillPercent, fullStars }
  }, [score])

  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={`${i <= fullStars ? 'url(#complete)' : i - 1 === fullStars ? 'url(#incomplete)' : '#E9EEF3'}`}
        width="1em"
        height="1em"
        viewBox="0 0 24.484 22.964"
        className={`${starClasses}`}
        key={i}
      >
        <path
          id="Path_1115"
          data-name="Path 1115"
          d="M344.316,352.27l-7.349-1.309a.7.7,0,0,1-.508-.385l-3.177-6.588a.7.7,0,0,0-1.261,0l-3.177,6.588a.7.7,0,0,1-.508.385l-7.349,1.309a.7.7,0,0,0-.339,1.215l5.506,4.824a.7.7,0,0,1,.226.659l-1.306,6.753a.7.7,0,0,0,1.011.753l6.242-3.258a.7.7,0,0,1,.648,0l6.242,3.258a.7.7,0,0,0,1.011-.753l-1.306-6.753a.7.7,0,0,1,.226-.659l5.506-4.824A.7.7,0,0,0,344.316,352.27Z"
          transform="translate(-320.409 -343.592)"
        />
        <use xlinkHref="#symbol-id"></use>
      </svg>
    )
  }
  return (
    <div className={`flex ${className}`}>
      <CompleteStarLinearGradient />

      <IncompleteStarLinearGradient fillPercent={lastStarFillPercent} />

      {stars}
    </div>
  )
}

export default memo(ScoreStars)
