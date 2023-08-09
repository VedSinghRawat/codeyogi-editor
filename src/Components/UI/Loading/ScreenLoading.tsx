import { FC, memo, useEffect, useState } from 'react'
import black_logo from '../../../assets/SVGs/LogoBlack.svg'
import { LoadingText } from '../LoadingText'

const ScreenLoading: FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    !isVisible && setIsVisible(true)
  }, [])

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } duration-300 transition-opacity ease-in-out -translate-y-1/2 pb-28`}
    >
      <img src={black_logo} className={`w-52 h-52 `} alt="" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`fixed top-1/2 left-1/2 bg-white -translate-x-1/2 w-44 -translate-y-11`}
        viewBox="0 0 215.5 117.4"
      >
        <path
          fill="none"
          stroke="#0a0a0a"
          strokeWidth={17}
          strokeDasharray="256.5889 256.5889"
          strokeLinecap="round"
          d="M63.6,18.5c-25.8,0-38.6,26.6-38.6,40s12.8,40,38.6,40c38.6,0,64.2-80,102.8-80c25.8,0,38.6,26.6,38.6,40
s-12.8,40-38.6,40C127.8,98.5,102.2,18.5,63.6,18.5z"
        >
          <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.5873015873015872s" keyTimes="0;1" values="0;513.1778"></animate>
        </path>
      </svg>

      <h1 className={`relative translate-y-16 text-center font-primary-extrabold text-4xl `}>
        <LoadingText maxDots={5} />
      </h1>
    </div>
  )
}

export default memo(ScreenLoading)
