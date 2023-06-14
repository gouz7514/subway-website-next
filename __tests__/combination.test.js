import { render, screen, fireEvent } from '@testing-library/react'
import PageCombination from '../src/app/combination/page'
import { createMockRouter } from '../src/lib/util/test/createMockRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterContext } from 'next/dist/shared/lib/router-context'

describe('PageCombination', () => {
  let queryClient

  beforeEach(() => {
    queryClient = new QueryClient()
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('Test 02 : 조합 추가하기 클릭 시 조합 form 페이지 이동 테스트', () => {
    const mockRouter = createMockRouter()
    mockRouter.push = jest.fn()

    render(
      <QueryClientProvider client={queryClient}>
        <RouterContext.Provider value={mockRouter}>
          <PageCombination />
        </RouterContext.Provider>
      </QueryClientProvider>
    )

    const addCombinationLink = screen.getByRole('link', {
      name: /나만의 조합 추가하기 →/i,
    })

    fireEvent.click(addCombinationLink)

    expect(mockRouter.push).toHaveBeenCalledWith(
      "/combination/form", "/combination/form", {"locale": undefined, "scroll": undefined, "shallow": undefined}
    )
  })
})
