import { ButtonHTMLAttributes, FC, memo } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { Link } from 'react-router-dom'

type ButtonProps = {
  isLoading?: boolean
  loaderClasses?: string
  containerClasses?: string
  link?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const ButtonPrimary: FC<ButtonProps> = ({ children, loaderClasses = '', className = '', link, isLoading, ...rest }) => {
  const button = (
    <button
      className={`relative shadow-button-secondary-inner bg-primary-600 rounded-full text-xs sm:text-sm md:text-base lg:text-lg py-3 px-10 sm:py-4 sm:px-16 overflow-visible active:shadow-secondary-button-active ${className}`}
      {...rest}
    >
      {isLoading ? (
        <ImSpinner2 className={`${loaderClasses} md:h-6 md:w-6 h-4 w-4 md:mx-4 mx-3 animate-spin`} />
      ) : (
        <span className="relative text-white font-secondary-extrabold tracking-wider">{children}</span>
      )}

      <div className="-inset-y-1 sm:-inset-y-1.5 group-hover:shadow-button-secondary -z-10 inset-x-2 bg-primary-500 absolute rounded-full"></div>

      <svg className="absolute top-2 left-2" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.24199 9.97162C0.24199 9.97162 -0.51345 5.6802 2.7233 2.96087C5.69878 0.182788 10.9871 0.964629 10.9993 1.01934C8.72585 2.0983 6.57253 3.41396 4.57503 4.9445C2.88719 6.39387 1.42656 8.08847 0.24199 9.97162Z"
          fill="#72ACE0"
        />
      </svg>
      <svg className="absolute bottom-2 right-2 rotate-180" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.24199 9.97162C0.24199 9.97162 -0.51345 5.6802 2.7233 2.96087C5.69878 0.182788 10.9871 0.964629 10.9993 1.01934C8.72585 2.0983 6.57253 3.41396 4.57503 4.9445C2.88719 6.39387 1.42656 8.08847 0.24199 9.97162Z"
          fill="#72ACE0"
        />
      </svg>
    </button>
  )
  return link ? (
    <Link className={`${className}`} to={link}>
      {button}
    </Link>
  ) : (
    button
  )
}

ButtonPrimary.defaultProps = {}

export default memo(ButtonPrimary)
