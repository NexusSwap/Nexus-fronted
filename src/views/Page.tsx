import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
// import Footer from 'components/Menu/Footer'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  // background: ${({ theme }) => theme.colors.gradients.bubblegum};
  background: #161824;
  position: relative;

  &::after {
    content: '';
    background-image: url(/images/trade/wave.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .1;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 50px;
    min-height: calc(100vh - 64px);
  }
`

const ButtonContent = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 62px;

  & div:first-child {
    width: 320px;
    height: 48px;
    line-height: 48px;
    background: #1B1D28;
    border: none;
    box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.11);
    border-radius: 25px;
    overflow: hidden;
  }

  & a {
    height: 100%;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    overflow: hidden;
  }

  & .cIhHQd {
    color: rgba(255, 255, 255, 0.5);
  }
`

interface MenuItemProps {
  label: string
  href: string
  id: string
}

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  const location = useLocation()
  const { t } = useTranslation()

  const MenuItem: MenuItemProps[] = [
    {
      label: t('Exchange'),
      href: '/swap',
      id: 'swap-nav-link'
    },
    {
      label: t('Liquidity'),
      href: '/liquidity',
      id: 'pool-nav-link'
    },
  ]

  const getActiveIndex = (pathname: string): number => {
    const path = ['/pool', '/create', '/add', '/remove', '/find', 'liquidity']
    const pathmatch = path.some(item => pathname.includes(item))
    if (pathmatch) {
      return 1
    } return 0
  }

  return (
    <> 
      <PageMeta />
      <StyledPage {...props}>
        <ButtonContent>
          <ButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm">
            {MenuItem.map(item => <ButtonMenuItem key={item.href} id={item.id} as={Link} to={item.href}>{item.label}</ButtonMenuItem>)}
          </ButtonMenu>
        </ButtonContent>
        {children}
        <Flex flexGrow={1} />
        {/* <Footer /> */}
      </StyledPage>
    </>
  )
}

export default Page
