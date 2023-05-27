import styled from 'styled-components'
import Link from 'next/link'

const HeaderStyle = styled.header`
  background-color: #333;
    color: #fff;
    padding: 1rem;
    display: flex;

  .header-navigation {
    display: flex;
    gap: 8px;
  }
`

export default function Header() {
  return (
    <HeaderStyle>
      <div className="header-navigation">
        <div className="header-links">
          <Link href="/">Home</Link>
        </div>
        <div className="header-links">
          <Link href="/usage">Usage</Link>
        </div>
        <div className="header-links">
          <Link href="/ingredients">Ingredients</Link>
        </div>
        <div className="header-links">
          <Link href="/combination">Combination</Link>
        </div>
      </div>
    </HeaderStyle>
  )
}