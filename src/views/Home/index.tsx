import React from 'react'
import styled from 'styled-components'
import PageSection from 'components/PageSection'
import { PageMeta } from 'components/Layout/Page'
import Hero from './components/Hero'
import HotFarms from './components/HotFarms'
import DataShow from './components/DataShow'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 600px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Home: React.FC = () => {

  const HomeSectionContainerStyles = { margin: '0', padding: '0', width: '100%', maxWidth: '1200px' }

  return (
    <>
      <PageMeta />
      {/* banner */}
      <StyledHeroSection
        containerProps={{style:{height: '600px', padding: '0', position: 'relative', zIndex: 1}}}
        style={{padding: '72px 0', height: '600px'}}
        innerProps={{ style: { margin: '0', padding: '0', width: '100%'} }}
        background="url('/images/Banner.jpg')"
        index={2}
        hasCurvedDivider={false}
      >
        <Hero />
      </StyledHeroSection>
      {/* 数据统计展示 */}
      <DataShow />
      {/* 热门农场 */}
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="#161824"
        index={2}
        hasCurvedDivider={false}
      >
        <HotFarms />
      </PageSection>
    </>
  )
}

export default Home
