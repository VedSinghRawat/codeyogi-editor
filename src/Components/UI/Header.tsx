import { FC, LegacyRef, memo, useEffect, useState } from 'react'
import CodeYogiLogoWhite from '../../assets/SVGs/CodeYogiLogoWhite'
import User from '../../Models/User'
import Dropdown from './Dropdown/Dropdown'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiSolidLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { Menu } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { ROUTE_FORWARD_SLASH, ROUTE_PROFILE } from '../../constants.routes'
import DropdownItem from './Dropdown/DropdownItem'
import DropdownItemList from './Dropdown/DropdownItemList'
import { connect } from 'react-redux'
import { meSelector } from '../../store/selectors/auth.selectors'
import { AppState } from '../../store/store'
import { logoutTryAction } from '../../store/reducers/auth.reducer'
import { toast } from 'react-toastify'
import { signupAPI } from '../../APIs/auth.apis'
import { FcGoogle } from 'react-icons/fc'

interface HeaderProps {
  user?: User
  getRef?: LegacyRef<HTMLElement>
  logoutTryAction: () => void
}

const Header: FC<HeaderProps> = ({ user, getRef, logoutTryAction }) => {
  const [isScrollVisible, setIsScrollVisible] = useState(false)

  useEffect(() => {
    setIsScrollVisible(document.body.scrollHeight > document.body.clientHeight)
  }, [])

  if (!user) return <></>

  return (
    <header
      ref={getRef}
      className={`sm:p-4 p-2 bg-primary-700 sticky top-0 left-0 flex justify-between items-center z-50 ${
        isScrollVisible ? 'sm:w-[calc(100vw-0.5rem)]' : 'w-full'
      }`}
    >
      <Link to={ROUTE_FORWARD_SLASH} className={`flex gap-x-4 text-white items-center`}>
        <CodeYogiLogoWhite className={`sm:w-12 sm:h-12 w-8 h-8`} />

        <p className={`sm:text-2xl text-lg font-secondary-extrabold`}>CODEYOGI</p>
      </Link>

      <Dropdown>
        {({ open }) => [
          <Menu.Button key={1}>
            <GiHamburgerMenu className={`sm:h-10 sm:w-10 w-7 h-7 text-white`} />
          </Menu.Button>,

          <DropdownItemList key={2} isOpen={open} arrowPos="top-right">
            {user.is_guest ? (
              <>
                <DropdownItem
                  Icon={FcGoogle}
                  iconClasses="bg-white rounded-full"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    void toast.promise(signupAPI, {
                      pending: 'Redirecting to Google',
                    })
                  }}
                >
                  Sign in with Google
                </DropdownItem>
              </>
            ) : (
              <>
                <Link to={ROUTE_PROFILE}>
                  <DropdownItem Icon={CgProfile}>Profile</DropdownItem>
                </Link>

                <DropdownItem
                  Icon={BiSolidLogOut}
                  onClick={() => logoutTryAction()}
                  className={`!bg-red-500 text-sm sm:text-base !rounded-md !cursor-pointer`}
                >
                  Log Out
                </DropdownItem>
              </>
            )}
          </DropdownItemList>,
        ]}
      </Dropdown>
    </header>
  )
}

const mapStateToProps = (state: AppState) => ({
  user: meSelector(state),
})

const mapDispatchToProps = {
  logoutTryAction,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Header))
