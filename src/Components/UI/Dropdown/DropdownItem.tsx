import { Menu } from '@headlessui/react'
import cn from 'classnames'
import { FC, memo } from 'react'
import { IconType } from 'react-icons/lib'

export interface DropdownItemProps {
  Icon?: IconType
  className?: string
  children?: string
  onClick?: () => void
  to?: string
  iconClasses?: string
}

const DropdownItem: FC<DropdownItemProps> = ({ Icon, iconClasses = '', className = '', children = '', onClick, to }) => {
  return (
    <Menu.Item
      as="li"
      className={cn(
        `${className} bg-primary-600 whitespace-nowrap text-sm sm:text-base w-full pr-5 gap-x-1 ${
          Icon ? 'pl-2' : 'pl-6'
        } py-2.5 font-primary-extrabold text-white rounded-md flex items-center`,
        { 'cursor-pointer': onClick || to }
      )}
      onClick={onClick}
    >
      {Icon && <Icon className={` h-5 w-5 shrink-0 ${iconClasses}`}></Icon>} {children}
    </Menu.Item>
  )
}

export default memo(DropdownItem)
