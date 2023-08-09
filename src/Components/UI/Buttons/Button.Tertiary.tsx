import classNames from 'classnames'
import { ButtonHTMLAttributes, FC, memo } from 'react'
import { IconType } from 'react-icons'
import { ImSpinner2 } from 'react-icons/im'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'red' | 'green' | 'primary'
  isLoading?: boolean
  Icon?: IconType
  iconClasses?: string
  loaderClasses?: string
}

const ButtonTertiary: FC<ButtonProps> = ({
  children,
  loaderClasses = '',
  className = '',
  iconClasses = '',
  theme = 'primary',
  Icon,
  isLoading,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        `border-4 rounded-full tracking-wide text-white hover:shadow-lg px-6 sm:px-12 py-1.5 shadow  font-primary-extrabold ${className}`,
        {
          'border-green-400 bg-green-600 active:shadow-tertiary-button-active-green': theme === 'green',
          'border-red-400 bg-red-500 active:shadow-tertiary-button-active-red': theme === 'red',
          'border-primary-500 bg-primary-600 active:shadow-tertiary-button-active-primary': theme === 'primary',
          'flex items-center justify-center': Icon,
        }
      )}
      {...rest}
    >
      {Icon && <Icon className={`shrink-0 ${iconClasses}`} />}
      {isLoading ? <ImSpinner2 className={`animate-spin md:h-6 md:w-6 h-4 w-4 md:mx-4 mx-3 ${loaderClasses}`} /> : children}
    </button>
  )
}

ButtonTertiary.defaultProps = {}

export default memo(ButtonTertiary)
