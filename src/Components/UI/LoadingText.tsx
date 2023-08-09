import { useState, useEffect, FC } from 'react'

export const LoadingText: FC<{ maxDots?: number; className?: string }> = ({ maxDots = 3, className = '' }) => {
  const [dotCount, setDotCount] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDotCount((curr) => ++curr)
    }, 250)

    return () => clearTimeout(timeout)
  }, [dotCount])

  return (
    <span className={`${className} relative`}>
      Loading
      {Array.from({ length: (dotCount % maxDots) + 1 }).map((_, i) => (
        <span key={i} className={`absolute`} style={{ translate: `${i * 100}%` }}>
          .
        </span>
      ))}
    </span>
  )
}
