import { Menu } from '@headlessui/react'
import { FC, memo, ReactElement } from 'react'

interface DropdownProps {
  children: ({ open }: { open: boolean }) => ReactElement[]
  className?: string
}

const Dropdown: FC<DropdownProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative w-fit ${className}`}>
      <Menu>{({ open }) => <>{children({ open })}</>}</Menu>
    </div>
  )
}

export default memo(Dropdown)
