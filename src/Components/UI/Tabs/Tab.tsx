import { FC, memo, useState } from 'react'
import { Tab as HeadLessTab } from '@headlessui/react'
import cn from 'classnames'
import spotlight from '../../../assets/images/spotlight.png'

export interface TabProps {
  children: string
  className?: string
  onClick?: () => void
  highlightSelected?: boolean
}

const Tab: FC<TabProps> = ({ children, className = '', onClick, highlightSelected = true }) => {
  return (
    <HeadLessTab
      onClick={onClick}
      className={({ selected }) => {
        return cn(`font-primary-secondary rounded-b-xl overflow-hidden relative text-lg flex-1 py-2.5 bg-white bg-opacity-10 ${className}`, {
          'text-white font-primary-extrabold': selected && highlightSelected,
          'text-secondary-400': !selected || !highlightSelected,
        })
      }}
    >
      {({ selected }) => {
        const [isSelected, setIsSelected] = useState(false)

        if (selected) {
          setTimeout(() => {
            setIsSelected(selected)
          }, 500)
        } else if (selected !== isSelected) {
          setIsSelected(selected)
        }

        return (
          <>
            {/* The selected light effect */}
            {isSelected && highlightSelected && <img src={spotlight} className={`absolute -top-2 left-0 right-0 mx-auto w-3/4 max-w-40`} />}

            <span className={`z-10 relative`}>{children}</span>
          </>
        )
      }}
    </HeadLessTab>
  )
}

export default memo(Tab)
