import styled from "styled-components"
import LottieAnimation from "./Lottie"

import LottieSandwich from '../../../public/icon/lottie_sandwich.json'

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

`

export default function Loading() {
  return (
    <LoadingWrapper>
      <LottieAnimation json={LottieSandwich} height={200} />
    </LoadingWrapper>
  )
}