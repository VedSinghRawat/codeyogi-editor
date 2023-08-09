import { FC, LegacyRef, memo, MouseEventHandler, useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import HomeCircle from '../../assets/SVGs/HomeCircle'
import NavArrow from '../../assets/SVGs/NavArrow'
import { ROUTE_LEVEL, ROUTE_LEVELS } from '../../constants.routes'
import { previousLinkSelector, nextLinkSelector } from '../../store/selectors/level.selectors'
import { AppState } from '../../store/store'
import { meSelector } from '../../store/selectors/auth.selectors'
import User from '../../Models/User'
import SignupNotificationPopup from './Popups/SignupNotificationPopup'

interface NavbarProps {
  previousLink?: string
  nextLink?: string
  className?: string
  user?: User
  setRef?: LegacyRef<HTMLElement> | undefined
}

const commonIconClasses = 'h-6 w-6 shrink-0 md:h-10 md:w-10'

export const Navbar: FC<NavbarProps> = ({ previousLink, nextLink, className = '', user, setRef }) => {
  const navigate = useNavigate()

  const [isSignupNotifOpen, setIsSignupNotifOpen] = useState(false)

  const handleNext: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    if (nextLink?.includes(ROUTE_LEVEL(4)) && user?.is_guest) setIsSignupNotifOpen(true)
    else navigate(nextLink || '')
  }, [nextLink])

  const handlePrevious: MouseEventHandler<SVGSVGElement> = useCallback(() => {
    navigate(previousLink || '')
  }, [previousLink])

  const preventDefault: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => e.preventDefault(), [])

  return (
    <>
      <nav
        ref={setRef}
        className={`fixed bottom-0 bg-primary-600 inset-x-0 z-10 md:justify-around flex justify-between items-center px-6 py-2 text-white ${className}`}
      >
        {previousLink ? (
          <Link to={previousLink} onClick={preventDefault}>
            <NavArrow dir="left" className={`${commonIconClasses}`} onClick={handlePrevious} />
          </Link>
        ) : (
          <span className={`${commonIconClasses}`}></span>
        )}

        <Link to={ROUTE_LEVELS}>
          <HomeCircle className={`${commonIconClasses} fill-white cursor-pointer`} />
        </Link>

        {nextLink ? (
          <Link to={nextLink} onClick={preventDefault}>
            <NavArrow dir="right" className={`${commonIconClasses}`} onClick={handleNext} />
          </Link>
        ) : (
          <span className={`${commonIconClasses}`}></span>
        )}
      </nav>

      <SignupNotificationPopup isOpen={isSignupNotifOpen} setIsOpen={setIsSignupNotifOpen} />
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  previousLink: previousLinkSelector(state),
  nextLink: nextLinkSelector(state),
  user: meSelector(state),
})

const mapDispatchToProps = {}

export default memo(connect(mapStateToProps, mapDispatchToProps)(Navbar))
