import { FC, ReactNode, memo } from 'react'
import Popup, { PopupProps } from './Popup'
import { AiFillWarning } from 'react-icons/ai'
import ButtonTertiary from '../Buttons/Button.Tertiary'

interface ConfirmationPopupProps extends Omit<PopupProps, 'children'> {
  children: ReactNode
  buttonText: string
  onConfirm: () => void
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ onConfirm, children, setIsOpen, buttonText, className = '', ...rest }) => {
  return (
    <Popup {...rest} className={`${className} flex flex-col items-center text-center`} setIsOpen={setIsOpen}>
      <AiFillWarning className={`text-red-500 h-24 w-24`} />

      <p className={`text-lg text-white font-primary-semibold my-5`}>{children}</p>

      <ButtonTertiary
        onClick={() => {
          onConfirm()
          setIsOpen(false)
        }}
        theme="green"
      >
        {buttonText}
      </ButtonTertiary>
    </Popup>
  )
}

export default memo(ConfirmationPopup)
