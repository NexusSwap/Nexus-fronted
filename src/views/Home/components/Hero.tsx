import React from 'react'
import { Link } from 'react-router-dom'
import { Flex, Heading, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <>
      {/* <BgWrapper>
        <InnerWrapper>{theme.isDark ? <SlideSvgDark width="100%" /> : <SlideSvgLight width="100%" />}</InnerWrapper>
      </BgWrapper> */}
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="flex-start"
        mt={[account ? '280px' : '50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <Heading style={{fontSize: '48px'}} color="#fff" mb="40px">
            {t('The moon is made of pancakes.')}
          </Heading>
          <Heading style={{fontSize: '20px', fontWeight: 'normal'}} color="#fff" mb="80px">
            {t('Trade, earn, and win crypto on the most popular decentralized platform in the galaxy.')}
          </Heading>
          <Flex>
            {!account && <ConnectWalletButton style={{borderRadius: '24px'}} mr="50px" />}
            <Link to="/swap">
              <Button style={{borderRadius: '24px', borderColor: '#fff', color: '#fff'}} variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </Link>
          </Flex>
        </Flex>
        <Flex flex="1" flexDirection="column" />
        {/* <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
        >
          <BunnyWrapper>
            <img src={`${imagePath}${imageSrc}.png`} srcSet={getSrcSet(imagePath, imageSrc)} alt={t('Lunar bunny')} />
          </BunnyWrapper>
          <StarsWrapper>
            <CompositeImage {...starsImage} />
          </StarsWrapper>
        </Flex> */}
      </Flex>
    </>
  )
}

export default Hero
