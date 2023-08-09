import classNames from 'classnames'
import { ButtonHTMLAttributes, FC, memo } from 'react'
import { ImSpinner2 } from 'react-icons/im'

interface PatternMirrorProps {
  className?: string
}

const PatternMirror: FC<PatternMirrorProps> = ({ className }) => {
  return (
    <div className={`flex justify-around ${className || ''}`}>
      <div className={`bg-secondary-100 h-full w-6 -skew-x-35`}></div>
      <div className={`bg-secondary-100 h-full w-2 -skew-x-35`}></div>
      <div className={`bg-secondary-100 h-full w-4 -skew-x-35`}></div>
    </div>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  loaderClasses?: string
}

const ButtonSecondary: FC<ButtonProps> = ({ children, className = '', isLoading, loaderClasses = '', ...rest }) => {
  return (
    <button
      className={classNames(
        `border-4 border-primary-500 rounded-full bg-primary-600 py-2.5 px-24 text-white hover:shadow-lg shadow active:shadow-primary-button-active flex items-center justify-center group relative overflow-hidden font-primary-extrabold ${className}`
      )}
      {...rest}
    >
      {isLoading ? <ImSpinner2 className={`animate-spin md:h-6 md:w-6 h-4 w-4 md:mx-4 mx-3 ${loaderClasses}`} /> : <span>{children}</span>}
      <PatternMirror className="absolute top-0 animate-button-mirror-flash left-0 right-0 bottom-0" />
    </button>
  )
}

ButtonSecondary.defaultProps = {}

export default memo(ButtonSecondary)
