import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
import { connect } from 'react-redux'
import { AppState } from '../../../../../store/store'
import { editorRefSelector } from '../../../../../store/selectors/exercise.selector'
import { isMobile } from 'react-device-detect'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'

type Props = {
  className?: string
  keys: string[]
  editorRef: ReactCodeMirrorRef['view']
}

const CLOSEABLE_KEYS_MAPPING_WITH_CLOSING_KEY = { '(': ')', '[': ']', '{': '}', "'": "'", '"': '"', '`': '`', '<': '>' } as { [key: string]: string }

const KeysList: FC<Props> = ({ className = '', keys, editorRef }) => {
  const listContainerRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const keyRef = useRef<HTMLLIElement | null>(null)
  const [slideRightCount, setSlideRightCount] = useState(0)
  const [canSlide, setCanSlide] = useState({ right: false, left: false })
  const [oneSlideWidth, setOneSlideWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)

  const handleSliderLeft = useCallback(() => {
    setSlideRightCount((count) => count - 1)
  }, [])

  const handleSliderRight = useCallback(() => {
    setSlideRightCount((count) => count + 1)
  }, [])

  useEffect(() => {
    const keyWidth = keyRef.current?.clientWidth || 0
    const extraLeftWidth = keyWidth * 2
    const oneSlideWidth = (listContainerRef.current?.clientWidth || 0) - extraLeftWidth

    setOneSlideWidth(oneSlideWidth)
  }, [listContainerRef, keyRef])

  useEffect(() => {
    const listOverflowWidth = listRef.current?.scrollWidth || 0
    const canSlideRight = slideRightCount !== 0
    const canSlideLeft =
      (listRef.current?.offsetWidth || 0) < (listRef.current?.scrollWidth || 0) && Math.abs(translateX) < listOverflowWidth - oneSlideWidth

    setCanSlide({ right: canSlideRight, left: canSlideLeft })
  }, [slideRightCount])

  const translateX = useMemo(() => {
    const translateX = oneSlideWidth * slideRightCount
    return translateX
  }, [slideRightCount])

  useEffect(() => {
    const resizeHandle = () => {
      setScreenHeight(window.visualViewport?.height || 0)
    }

    window.addEventListener('resize', resizeHandle)
    setScreenHeight(window.visualViewport?.height || 0)

    return () => window.removeEventListener('resize', resizeHandle)
  }, [])

  return (
    <div
      className={`bg-secondary-900 rounded-t-xl ${isMobile ? '' : 'md:hidden'} fixed right-0 left-0 z-30 px-8 py-2 ${className}`}
      ref={(el) => setElementHeight(el?.clientHeight || 0)}
      style={{ top: screenHeight - elementHeight }}
    >
      {canSlide.left && (
        <IoIosArrowDropleftCircle onClick={handleSliderLeft} className="absolute text-white top-1/2 -translate-y-1/2 left-1 text-xl" />
      )}
      <div ref={listContainerRef} className="overflow-hidden">
        <ul ref={listRef} className="flex gap-1 transform transition-all" style={{ transform: `translateX(${translateX}px)` }}>
          {keys.map((key, index) => {
            return (
              <li
                key={`${key}${index}`}
                ref={index === 0 ? keyRef : undefined}
                className="bg-primary-700 rounded-md text-center text-white font-primary-semibold cursor-pointer w-8 h-8 shrink-0 flex justify-center items-center"
                onClick={() => {
                  if (editorRef) {
                    const closing = CLOSEABLE_KEYS_MAPPING_WITH_CLOSING_KEY[key]
                    const withClosing = closing ? key + closing : key
                    const currSelection = editorRef.state.selection.main

                    editorRef.dispatch({
                      selection: { anchor: currSelection.to + 1, head: currSelection.to + 1 },
                      changes: { from: editorRef.state.selection.main.from, to: editorRef.state.selection.main.to, insert: withClosing },
                    })

                    editorRef.focus()
                    // editorRef.doc.replace(editorRef.selection.main.from, editorRef.selection.main.to, withClosing)
                  }
                }}
              >
                {key}
              </li>
            )
          })}
        </ul>
        {canSlide.right && (
          <IoIosArrowDroprightCircle onClick={handleSliderRight} className="absolute text-white top-1/2 -translate-y-1/2 right-1 text-xl" />
        )}
      </div>
    </div>
  )
}

KeysList.defaultProps = {}

const mapStateToProps = (state: AppState) => ({
  editorRef: editorRefSelector(state),
})

const matchDispatchToProps = {}

export default memo(connect(mapStateToProps, matchDispatchToProps)(KeysList))
