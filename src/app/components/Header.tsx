import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderStyle = styled.header`
  background-color: #333;
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

    .header-home {
      margin-right: auto;
    }

    .header-menu {
      .header-toggle {
        display: none;

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
      background-color: #333;
      right: 0;
      top: calc(40px + 2rem);
      transform: translateX(100%);
      transition: all 0.3s ease-in-out;

      .header-link {
        padding: 1rem;
        cursor: pointer;
        text-align: center;

        &:hover {
          background-color: #444;
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
      <div className="header">
        <div className="header-home">
          <Link href="/">Home</Link>
        </div>
        <div className="header-menu">
          <div className="header-toggle" onClick={handleMenuClick}>
            메뉴
          </div>
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