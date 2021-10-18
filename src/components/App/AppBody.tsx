import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap/uikit';

export const BodyWrapper = styled(Card)`
  border-radius: 32px;
  max-width: 560px;
  width: 100%;
  z-index: 1;
  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.11);
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, background, borderBackground }: { children: React.ReactNode, background?: string, borderBackground?: string}) {
  return <BodyWrapper background={background} borderBackground={borderBackground}>{children}</BodyWrapper>
}
