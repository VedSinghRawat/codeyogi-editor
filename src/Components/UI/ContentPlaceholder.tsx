import { FC, memo } from 'react'

const ContentPlaceholder: FC<{ className?: string; theme?: 'primary'; count?: number }> = ({ className = '', theme, count = 1 }) => {
  const gradientClasses = theme ? 'from-primary-300 via-primary-400 to-primary-300' : 'from-secondary-100 via-secondary-200 to-seoncdary-100'

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`${gradientClasses} bg-gradient-to-l bg-200% animate-placeholder-wave  ${className}`}></div>
      ))}
    </>
  )
}

export default memo(ContentPlaceholder)
