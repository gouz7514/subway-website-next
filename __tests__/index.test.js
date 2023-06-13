import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('Test 01 : 메인 페이지 렌더링 테스트', () => {
    render(<Home />)

    const introText = screen.getByText('SUBHOW와 함께 써브웨이를 즐기세요!')

    expect(introText).toBeInTheDocument()
  })
})