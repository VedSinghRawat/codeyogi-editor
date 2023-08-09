import { Menu } from '@headlessui/react'
import { Dispatch, FC, memo, SetStateAction } from 'react'
import { AiFillEye, AiFillQuestionCircle } from 'react-icons/ai'
import { FaSave, FaWrench } from 'react-icons/fa'
import cn from 'classnames'
import DraggableIcon from '../../../../assets/SVGs/DraggableIcon'
import { useCodingExerciseToolbar } from '../../../../Hooks/Exercise/CodingExercisePage/useCodingExerciseToolbar'
import Dropdown from '../../../UI/Dropdown/Dropdown'
import DropdownItem from '../../../UI/Dropdown/DropdownItem'
import DropdownItemList from '../../../UI/Dropdown/DropdownItemList'
import { Link } from 'react-router-dom'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoIosCheckmarkCircle } from 'react-icons/io'
import ExerciseSubmission from '../../../../Models/ExerciseSubmission'
import { iFrameErrorsAction } from '../../../../store/reducers/exercise.reducer'
import { connect } from 'react-redux'
import { AppState, history } from '../../../../store/store'
import { ImSpinner2 } from 'react-icons/im'
import { animated } from '@react-spring/web'
import { TbViewportWide } from 'react-icons/tb'
import { CustomViewport } from '../../../../utilType'
import { FiMoreHorizontal } from 'react-icons/fi'
import { isMobile } from 'react-device-detect'

interface CodingExercisePreviewPanelProps {
  isCodeSavable: boolean
  onSave: () => void
  togglePreview: () => void
  nextLink?: string
  previousLink: string
  setIsConsoleOpen: Dispatch<SetStateAction<boolean>>
  exerciseSubmission?: ExerciseSubmission
  iFrameErrorsAction: typeof iFrameErrorsAction
  onSubmit: () => void
  isSubmitting: boolean
  setCustomViewport: (viewport: CustomViewport) => void
  setIsExerciseDetailPopupOpen: (arg: boolean) => void
}

const CodingExerciseToolbar: FC<CodingExercisePreviewPanelProps> = ({
  isCodeSavable,
  onSave,
  togglePreview,
  nextLink,
  isSubmitting,
  previousLink,
  exerciseSubmission,
  setIsConsoleOpen,
  iFrameErrorsAction,
  onSubmit,
  setCustomViewport,
  setIsExerciseDetailPopupOpen,
}) => {
  const { springPosition, previewPanelRoundedClass, clearIFrameErrors, bind, side, isDragging, previewPanelRef, position } =
    useCodingExerciseToolbar(iFrameErrorsAction)

  return (
    <animated.div
      style={{
        top: position.top,
        left: position.left,
        x: springPosition.x,
        y: springPosition.y,
        zIndex: 30,
        position: 'fixed',
      }}
    >
      <ul
        className={cn(`bg-primary-600 md:hidden  ${previewPanelRoundedClass} w-fit text-white md transition-size duration-75 `, {
          'p-2': isDragging,
          'p-1.5 ': !isDragging,
        })}
        ref={previewPanelRef}
      >
        <DraggableIcon className={`mx-auto fill-white mb-2.5 cursor-move w-8 h-8 rouned-full  touch-none`} {...bind()} />

        {!isDragging && (
          <>
            <li>
              <AiFillEye
                className={`w-6 h-6 cursor-pointer mx-auto`}
                onClick={() => {
                  togglePreview()
                  clearIFrameErrors()
                }}
              />
            </li>

            <hr className={`my-3 `}></hr>

            <li>
              <AiFillQuestionCircle className={`w-6 h-6 mx-auto cursor-pointer`} onClick={() => setIsExerciseDetailPopupOpen(true)}>
                Question
              </AiFillQuestionCircle>
            </li>

            {isCodeSavable && (
              <>
                <hr className={`my-3`}></hr>

                <FaSave className={`w-7 h-7 mx-auto ${isSubmitting ? 'animate-spin' : 'text-green-400 bg-white p-1 rounded-full'}`} onClick={onSave}>
                  Save
                </FaSave>
              </>
            )}

            {isMobile && (
              <>
                <hr className={`my-3`}></hr>

                <li>
                  <Dropdown className={`mx-auto`}>
                    {({ open }) => {
                      return [
                        <Menu.Button key={1}>
                          <TbViewportWide className={`w-6 h-6 `} />
                        </Menu.Button>,

                        <DropdownItemList key={2} isOpen={open} arrowPos={side ? (`side-${side}` as 'side-right' | 'side-left') : undefined}>
                          <DropdownItem onClick={() => history.push({ search: '' })}>Default Viewport</DropdownItem>

                          <DropdownItem onClick={() => setCustomViewport('sm')}>Small Viewport</DropdownItem>

                          <DropdownItem onClick={() => setCustomViewport('md')}>Medium ViewPort</DropdownItem>

                          <DropdownItem onClick={() => setCustomViewport('lg')}>Large Viewport</DropdownItem>
                        </DropdownItemList>,
                      ]
                    }}
                  </Dropdown>
                </li>
              </>
            )}

            <hr className={`my-3`}></hr>

            <li>
              <Dropdown className={`mx-auto`}>
                {({ open }) => [
                  <Menu.Button key={1}>
                    <FiMoreHorizontal
                      className={cn(`w-6 h-6 transition-transform duration-300`, {
                        '-rotate-90': open && side === 'left',
                        'rotate-90': open && side === 'right',
                      })}
                    />
                  </Menu.Button>,

                  <DropdownItemList key={2} isOpen={open} arrowPos={side ? (`side-${side}` as 'side-right' | 'side-left') : undefined}>
                    <DropdownItem
                      Icon={FaWrench}
                      onClick={() => {
                        setIsConsoleOpen((curr) => !curr)
                      }}
                    >
                      Console
                    </DropdownItem>

                    {exerciseSubmission?.is_submitted ? (
                      <Link to={nextLink || ''}>
                        <DropdownItem Icon={IoIosArrowDroprightCircle}>Next Level</DropdownItem>
                      </Link>
                    ) : (
                      <DropdownItem
                        Icon={isSubmitting ? ImSpinner2 : IoIosCheckmarkCircle}
                        iconClasses={`${isSubmitting ? 'animate-spin' : ''}`}
                        onClick={onSubmit}
                      >
                        Submit
                      </DropdownItem>
                    )}

                    <Link to={previousLink}>
                      <DropdownItem Icon={IoIosArrowDropleftCircle}>Previous Level</DropdownItem>
                    </Link>
                  </DropdownItemList>,
                ]}
              </Dropdown>
            </li>
          </>
        )}
      </ul>
    </animated.div>
  )
}

const mapStateToProps = (_: AppState) => ({})

const matchDispatchToProps = {
  iFrameErrorsAction,
}

export default memo(connect(mapStateToProps, matchDispatchToProps)(CodingExerciseToolbar))
