import { FC, memo, ReactElement, useCallback, useMemo, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import { TabProps } from './Tab'
import { useWindowSize } from '../../../Hooks/useWindowSize'

export interface TabListProps {
  children: ReactElement<TabProps>[]
  className?: string
  selectedIndex: number
  showIndicator?: boolean
}

const TAB_GAP = 28

const TabList: FC<TabListProps> = ({ children, className = '', selectedIndex, showIndicator = true }) => {
  const list = useRef<HTMLDivElement>(null)
  const [listWidth, setListWidth] = useState(0)

  const handleResize = useCallback(() => setListWidth(list.current?.clientWidth || 0), [list.current?.clientWidth])

  useWindowSize(handleResize)

  const { indicatorWidth, tabWidth } = useMemo(() => {
    // prettier-ignore
    const tabWidth = Math.round((listWidth - ((children.length - 1) * TAB_GAP)) / children.length)

    return { indicatorWidth: Math.min(tabWidth * 0.5, 100), tabWidth }
  }, [listWidth, children.length])

  return (
    <Tab.List as="div" ref={list} className={`${className} group pb-2 overflow-hidden flex gap-x-7 relative`}>
      {children.map((Tab) => {
        const highlightSelected = showIndicator
        const TabWithHighlight = { ...Tab, props: { ...Tab.props, highlightSelected } }

        return TabWithHighlight
      })}

      {/* The indicator */}
      {showIndicator && (
        <div
          className={`absolute h-1.5 bg-white z-10 rounded-lg transition-all duration-500`}
          // prettier-ignore
          style={{ width: `${indicatorWidth}px`, translate: `${(selectedIndex * (tabWidth + TAB_GAP)) + ((tabWidth - indicatorWidth) / 2)}px` }}
        ></div>
      )}
    </Tab.List>
  )
}

export default memo(TabList)
