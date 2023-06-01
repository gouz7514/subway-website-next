import styled from "styled-components"
import LottieAnimation from "./Lottie"
import { useState, useEffect } from "react"

import LottieSandwich from '../../../public/icon/lottie_sandwich.json'

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .loading-text {
    font-weight: bold;
    font-size: 1.2em;
  }
`

type LoadingProps = {
  text?: string
}

export default function Loading({ text = '샌드위치 준비 중' }: LoadingProps) {
  const [loadingText, setLoadingText] = useState(text)

  useEffect(() => {
    const interval= setInterval(() => {
      setLoadingText((prevText: string) => {
        if (prevText === text + '....') {
          return text
        }
        return prevText + '.'
      })
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [text])

  return (
    <LoadingWrapper>
      <LottieAnimation json={LottieSandwich} height={200} />
      <div className="loading-text">
        { loadingText }
      </div>
    </LoadingWrapper>
  )
}