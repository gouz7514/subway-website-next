import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderStyle = styled.header`
  background-color: var(--primary-green);
  color: #fff;
  padding: 1rem;
  display: flex;

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 1.3em;
    color: black;
    font-weight: bold;

    .header-home {
      margin-right: auto;
      background-image: url('/icon/logo_subhow.svg');
      width: 120px;
      height: 30px;
      background-repeat: no-repeat;
      background-size: 120px 30px;
    }

    .header-menu {
      .header-toggle {
        display: none;
        cursor: pointer;
        background-image: url('/icon/icon_menu.svg');
        width: 30px;
        height: 30px;
        background-size: 30px 30px;

        &.close {
          background-image: url('/icon/icon_close.svg');
        }

        @media screen and (max-width: 600px) {
          display: block;
        }
      }

      .header-links {
        display: flex;
        gap: 8px;

        .header-link {
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        @media screen and (max-width: 600px) {
          display: none;
        }
      }
    }

    .header-links-mobile {
      position: absolute;
      display: flex;
      flex-direction: column;
      height: calc(100vh - 40px - 2rem);
      background-color: var(--primary-yellow);
      right: 0;
      top: calc(40px + 2rem);
      transform: translateX(100%);
      --webkit-transform: translateX(100%);
      transition: all 0.3s ease-in-out;
      color: black;
      font-weight: bold;

      .header-link {
        padding: 2rem;
        cursor: pointer;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

        &:hover {
          backdrop-filter: brightness(1.1);
        }
      }

      &.open {
        transform: translateX(0);
      }
    }
  }
`

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: -1;
  transition: opacity 0.3s ease-in-out;

  &.visible {
    opacity: 0.5;
    visibility: visible;
    background-color: #000;
    transition: opacity 0.3s ease-in-out;
  }
`

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const pathname = usePathname()
  const currentPathNameRef = useRef(pathname)

  const handleMenuClick = function() {
    setIsMenuVisible(!isMenuVisible)
  }

  const handleMenuClose = function() {
    setIsMenuVisible(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (currentPathNameRef.current !== pathname) {
      handleMenuClose()
      currentPathNameRef.current = pathname
    }
  })

  return (
    <>
      <HeaderStyle>
        <div className="header">
          <Link href={"/"} className="header-home" />
          <div className="header-menu">
            <div className={ `header-toggle ${isMenuVisible ? 'close' : 'open' }` } onClick={handleMenuClick} />
            <div className="header-links">
              <div className="header-link">
                <Link href="/usage">사용 방법</Link>
              </div>
              <div className="header-link">
                <Link href="/ingredients">재료 소개</Link>
              </div>
              <div className="header-link">
                <Link href="/combination">조합</Link>
              </div>
            </div>
          </div>
          { isMobile && 
            <div className={ `header-links-mobile ${isMenuVisible ? 'open' : 'hide'}` }>
              <div className="header-link">
                <Link href="/usage">사용 방법</Link>
              </div>
              <div className="header-link">
                <Link href="/ingredients">재료 소개</Link>
              </div>
              <div className="header-link">
                <Link href="/combination">조합</Link>
              </div>
            </div>
          }
        </div>
      </HeaderStyle>
      <Overlay className={ `${isMenuVisible ? 'visible' : ''}` } onClick={handleMenuClose}></Overlay>
    </>
  )
}