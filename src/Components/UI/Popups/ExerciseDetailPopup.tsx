import { FC, memo } from 'react'
import Popup, { PopupProps } from './Popup'
import Exercise from '../../../Models/Exercise'
import MDEditor from '@uiw/react-md-editor'

interface ExerciseDetailPopupProps extends Omit<PopupProps, 'children'> {
  exercise: Exercise
}

const ExerciseDetailPopup: FC<ExerciseDetailPopupProps> = ({ exercise, ...rest }) => {
  return (
    <Popup {...rest}>
      <h5 className={`text-3xl font-secondary-bold text-white mb-4`}>Problem Statement</h5>

      <MDEditor.Markdown
        source={exercise.problem_statement}
        className={`!font-secondary-medium !bg-transparent !text-white !text-sm md:!text-base lg:!text-lg !font-medium !mb-10 md:!mb-14`}
      />
    </Popup>
  )
}

export default memo(ExerciseDetailPopup)
