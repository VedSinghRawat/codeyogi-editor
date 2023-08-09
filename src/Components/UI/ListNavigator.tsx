import { FC, memo, RefObject } from 'react'
import { useElementPositionOnScreen } from '../../Hooks/useElementPositionOnScreen'
import TripleArrowWithShadowSVG from '../../assets/SVGs/TripleArrowWithShadow.svg'

interface Props {
  headerHeight?: number
  activeElementRef: RefObject<HTMLDivElement>
}
const ListNavigator: FC<Props> = ({ activeElementRef, headerHeight = 0 }) => {
  const activeElementPosition = useElementPositionOnScreen(activeElementRef)

  return (
    <>
      {activeElementPosition !== 'inView' && (
        <button
          className="fixed z-40 top-24 left-1/2 -translate-x-1/2 rounded-full"
          onClick={() => {
            window.scroll({
              behavior: 'smooth',
              top: Math.abs((activeElementRef.current?.offsetTop || 0) - headerHeight - 15),
            })
          }}
        >
          <div className="rounded-full relative animate-bounce text-white transform">
            <div className={`absolute shadow-navigator left-1/2 -translate-x-1/2 top-1/2`}></div>
            <TripleArrowWithShadowSVG className={` ${activeElementPosition === 'top' ? 'rotate-180' : ''} h-8 w-8 md:h-12 md:w-12`} />
          </div>
        </button>
      )}
    </>
  )
}

export default memo(ListNavigator)
