import { FC, memo } from 'react'
import { BsFillBellFill } from 'react-icons/bs'
import Arrow from '../Arrow'
import ButtonTertiary from '../Buttons/Button.Tertiary'
import Popup, { PopupProps } from './Popup'
import { toast } from 'react-toastify'
import { signupAPI } from '../../../APIs/auth.apis'
import { FcGoogle } from 'react-icons/fc'

type SignupNotificationPopupProps = Omit<PopupProps, 'children'>

const SignupNotificationPopup: FC<SignupNotificationPopupProps> = (props) => {
  return (
    <Popup {...props} className={`relative w-fit !h-fit `}>
      <Arrow size={'sm'} dir={'down'} color={'white'} className={`absolute inset-x-0 mx-auto top-0`} />

      <div className={`relative w-fit mx-auto`}>
        <BsFillBellFill className={`text-white mt-8 w-20 h-20 mb-4`} />

        <div
          className={`font-primary-extrabold bg-red-500 rounded-full h-8 w-8 text-center pt-1 absolute border-2 text-white top-0 right-0 mx-auto border-white`}
        >
          1
        </div>
      </div>

      <p className={`font-primary-extrabold text-center text-white`}>To continue the course you need to Sign Up</p>

      <ButtonTertiary
        theme={'red'}
        className={`mx-auto text-sm sm:text-lg mt-9 flex items-center`}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          void toast.promise(signupAPI, {
            pending: 'Redirecting to Google',
          })
        }}
      >
        <FcGoogle className={`md:h-6 md:w-6 rounded-full bg-white h-5 w-5 sm:mr-4`} />
        SIGN IN WITH GOOGLE
      </ButtonTertiary>
    </Popup>
  )
}

export default memo(SignupNotificationPopup)
