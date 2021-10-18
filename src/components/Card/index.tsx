import styled from 'styled-components'
import { Box } from '@pancakeswap/uikit'

const Card = styled(Box)<{
  width?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 25px;
  padding: 20px;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
`
export default Card

export const LightCard = styled(Card)`
  // border: 1px solid ${({ theme }) => theme.colors.background};
  // background-color: ${({ theme }) => theme.colors.backgroundAlt};
  background: rgba(0, 0, 0, 0.25);
  border-radius: 25px;
`

export const LightGreyCard = styled(Card)`
  // border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  // background-color: ${({ theme }) => theme.colors.background};
  background: rgba(0, 0, 0, 0.25);
  border-radius: 25px;
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.dropdown};
`
