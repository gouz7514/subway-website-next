import { render, screen, waitFor } from '@testing-library/react'
import PageCombination from '../src/app/combination/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import { getCombinations } from '../src/lib/util/api'

jest.mock('../src/lib/util/api', () => ({
  getCombinations: jest.fn(() =>
    Promise.resolve({
      data: [{
        id: 1,
      }]
    })
  )
}))

describe('Api Test', () => {
  let queryClient

  beforeEach(() => {
    queryClient = new QueryClient()
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('Test 03 : api 테스트 - combination', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PageCombination />
      </QueryClientProvider>
    )

    const loadingText = screen.getByText(/샌드위치 준비 중/i, {
      exact: false,
    })

    // 초기에 Loading 컴포넌트 렌더링되는지 테스트
    expect(loadingText).toBeInTheDocument()

    const combinationData = await getCombinations()
    expect(combinationData.data[0].id).toBe(1)

    await waitFor(() => {
      expect(loadingText).not.toBeInTheDocument()
    })
  })
})