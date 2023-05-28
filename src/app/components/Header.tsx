import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderStyle = styled.header`
  background-color: var(--primary-green);
  color: #fff;
  padding: 1rem;
  display: flex;

  .overlay {
    position: fixed;
    width: 100%;
    height: calc(100vh - 40px - 2rem);
    top: calc(40px + 2rem);
    left: 0;
    opacity: 0;
    visibility: hidden;
    z-index: 1;
    transition: opacity 0.3s ease-in-out;

    &.visible {
      opacity: 0.5;
      visibility: visible;
      background-color: #000;
      transition: opacity 0.3s ease-in-out;
    }
  }

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 1.3em;
    z-index: 2;

    .header-home {
      margin-right: auto;
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
        padding: 1rem;
        cursor: pointer;
        text-align: center;

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
    <HeaderStyle>
      {/* <div className={ `overlay ${isMenuVisible ? 'visible' : ''}` } onClick={handleMenuClose}></div> */}
      <div className="header">
        <div className="header-home">
          <Link href="/">Home</Link>
        </div>
        <div className="header-menu">
          <div className={ `header-toggle ${isMenuVisible ? 'close' : 'open' }` } onClick={handleMenuClick} />
          <div className="header-links">
            <div className="header-link">
              <Link href="/usage">Usage</Link>
            </div>
            <div className="header-link">
              <Link href="/ingredients">Ingredients</Link>
            </div>
            <div className="header-link">
              <Link href="/combination">Combination</Link>
            </div>
          </div>
        </div>
        { isMobile && 
          <div className={ `header-links-mobile ${isMenuVisible ? 'open' : 'hide'}` }>
            <div className="header-link">
              <Link href="/usage">Usage</Link>
            </div>
            <div className="header-link">
              <Link href="/ingredients">Ingredients</Link>
            </div>
            <div className="header-link">
              <Link href="/combination">Combination</Link>
            </div>
          </div>
        }
      </div>
    </HeaderStyle>
  )
}