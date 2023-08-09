import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useRef, useState, useCallback, useEffect } from 'react'
import { useWindowSize } from '../../useWindowSize'
import { useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

export const useCodingExerciseToolbar = (iFrameErrorsAction: ActionCreatorWithPayload<{ val: string }, string>) => {
  const { width } = useWindowSize()
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPostion] = useState({ top: 0, left: 0 })
  const [{ previewPanelRoundedClass, side }, setPanelData] = useState<{ previewPanelRoundedClass: string; side: string }>({
    previewPanelRoundedClass: 'rounded-r',
    side: 'left',
  })

  const [springPosition, api] = useSpring(() => ({ x: 0, y: 30 }), [])

  const bind = useDrag(({ dragging, down, movement: [x, y] }) => {
    setIsDragging(!!(dragging && down))
    api.start({ x, y })

    if (!dragging) {
      const top = position.top + springPosition.y.toJSON()
      let left = position.left + springPosition.x.toJSON()

      if (dragging) setPanelData({ previewPanelRoundedClass: 'rounded-full', side: '' })
      else if (left > width / 2) {
        left = width - 38
        setPanelData({ previewPanelRoundedClass: 'rounded-l', side: 'right' })
      } else if (left < width / 2) {
        left = 0
        setPanelData({ previewPanelRoundedClass: 'rounded-r', side: 'left' })
      } else setPanelData({ previewPanelRoundedClass: '', side: '' })

      setPostion({ top: top, left: left })
      api.start({ x: 0, y: 0 })
    }
  })

  const previewPanelRef = useRef<HTMLUListElement>(null)

  const clearIFrameErrors = useCallback(() => {
    iFrameErrorsAction({ val: '' })
  }, [])

  useEffect(() => {
    if (position.left > width) {
      setPostion({ ...position, left: width - 38 })
    }
  }, [width])

  return {
    clearIFrameErrors,
    previewPanelRoundedClass,
    position,
    side,
    isDragging,
    previewPanelRef,
    springPosition,
    bind,
  }
}
