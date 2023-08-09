import { Menu, Transition } from '@headlessui/react'
import { FC, memo, ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import Arrow from '../Arrow'
import { DropdownItemProps } from './DropdownItem'

export interface DropdownItemListProps {
  isOpen: boolean
  children: ReactElement<DropdownItemProps>[] | ReactElement<DropdownItemProps>
  arrowPos?: 'top-right' | 'side-right' | 'top-center' | 'top-left' | 'side-left'
  className?: string
}

const DropdownItemList: FC<DropdownItemListProps> = ({ children, isOpen, arrowPos = 'top-center', className = '' }) => {
  const [containerPositionClasses, setContainerPositionClasses] = useState('')
  const [arrowPositionClasses, setArrowPositionClasses] = useState('')
  const [arrowDir, setArrowDir] = useState<'up' | 'down' | 'left' | 'right'>('up')

  const menuRef = useRef<HTMLDivElement>(null)

  const setArrowPosTopRight = useCallback(() => {
    setContainerPositionClasses('mt-5 right-0')
    setArrowPositionClasses('-top-5 right-1')
    setArrowDir('up')
  }, [])

  const setArrowPosTopLeft = useCallback(() => {
    setContainerPositionClasses('mt-5')
    setArrowPositionClasses('-top-5')
    setArrowDir('up')
  }, [])

  useEffect(() => {
    switch (arrowPos) {
      case 'top-center':
        setContainerPositionClasses('mt-5 mx-auto inset-x-0')
        setArrowPositionClasses('-top-5 inset-x-0 mx-auto')
        setArrowDir('up')
        break

      case 'side-right':
        setContainerPositionClasses('-left-8 -translate-x-full -translate-y-8')
        setArrowPositionClasses('-right-5')
        setArrowDir('right')
        break

      case 'top-right':
        setArrowPosTopRight()
        break

      case 'top-left':
        setArrowPosTopLeft()
        break

      case 'side-left':
        setContainerPositionClasses('-right-8 translate-x-full -translate-y-8')
        setArrowPositionClasses('-left-5')
        setArrowDir('left')
        break

      default:
        break
    }
  }, [arrowPos, isOpen, menuRef])

  useEffect(() => {
    if (menuRef.current) {
      const { x, right } = menuRef.current.getBoundingClientRect()
      const isOutOfBound = x < 0

      if (isOutOfBound) {
        setArrowPosTopLeft()

        return
      }

      right > window.innerWidth && setArrowPosTopRight()
    }
  }, [containerPositionClasses, menuRef, isOpen])

  const items = Array.isArray(children) ? children : [children]

  return (
    <Transition
      as="div"
      className={`z-50 relative w-full`}
      show={isOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        as="ul"
        ref={menuRef}
        className={`bg-primary-400 p-1.5 gap-y-1.5 flex flex-col rounded absolute z-50 ${containerPositionClasses} ${className}`}
      >
        {items.map((Item, i) => {
          if (i !== 0 && i !== items.length - 1) return Item

          const className = i === 0 ? ' rounded-t-sm' : ' rounded-b-sm'
          const RoundedItem = { ...Item, props: { ...Item.props, className: (Item.props.className || '') + className } }

          return RoundedItem
        })}

        <Arrow dir={arrowDir} size="sm" color={'#A7C4DD'} className={`absolute ${arrowPositionClasses}`} />
      </Menu.Items>
    </Transition>
  )
}

export default memo(DropdownItemList)
