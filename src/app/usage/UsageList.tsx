import styled from 'styled-components'

const SwiperInner = styled.div`
  border: 1px solid black;
  height: 95%;
  margin: 24px;
  max-width: calc(100% - 48px);
  width: 100%;
`

export const UsageMenu = () => {
  return (
    <SwiperInner>
      메뉴 선택
    </SwiperInner>
  )
}

export const UsageBread = () => {
  return (
    <SwiperInner>
      빵 선택
    </SwiperInner>
  )
}

export const UsageCheese = () => {
  return (
    <SwiperInner>
      치즈 선택
    </SwiperInner>
  )
}

export const UsageVegetable = () => {
  return (
    <SwiperInner>
      야채 선택
    </SwiperInner>
  )
}

export const UsageExtra = () => {
  return (
    <SwiperInner>
      추가 토핑 선택
    </SwiperInner>
  )
}

export const UsageSet = () => {
  return (
    <SwiperInner>
      세트 선택
    </SwiperInner>
  )
}