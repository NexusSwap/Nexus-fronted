import React from 'react'
import styled from 'styled-components'
import { Flex, Button, Text } from '@pancakeswap/uikit'
import QuestionHelper from 'components/QuestionHelper'
import { useTranslation } from 'contexts/Localization'
import { GAS_PRICE_GWEI, GAS_PRICE } from 'state/user/hooks/helpers'
import { useGasPriceManager } from 'state/user/hooks'

const Line = styled.p`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  width: 500px;
  margin-top: 30px;
`

const GasSettings = () => {
  const { t } = useTranslation()
  const [gasPrice, setGasPrice] = useGasPriceManager()

  return (
    <Flex flexDirection="column">
      <Flex mb="20px" alignItems="center">
        <Text fontSize='18px'>{t('Default Transaction Speed (GWEI)')}</Text>
        <QuestionHelper
          text={t(
            'Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees',
          )}
          placement="top-start"
          size={18}
          ml="5px"
        />
      </Flex>
      <Flex flexWrap="wrap">
        <Button
          mr="20px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.default)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.default ? 'primary' : 'tertiary'}
          style={{height: '40px', borderRadius: '20px', fontSize: '16px', fontWeight: 600, width: '120px', padding: 0}}
        >
          {t('Standard (%gasPrice%)', { gasPrice: GAS_PRICE.default })}
        </Button>
        <Button
          mr="20px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.fast)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.fast ? 'primary' : 'tertiary'}
          style={{height: '40px', borderRadius: '20px', fontSize: '16px', fontWeight: 600, width: '120px', padding: 0}}
        >
          {t('Fast (%gasPrice%)', { gasPrice: GAS_PRICE.fast })}
        </Button>
        <Button
          mr="20px"
          scale="sm"
          onClick={() => {
            setGasPrice(GAS_PRICE_GWEI.instant)
          }}
          variant={gasPrice === GAS_PRICE_GWEI.instant ? 'primary' : 'tertiary'}
          style={{height: '40px', borderRadius: '20px', fontSize: '16px', fontWeight: 600, width: '120px', padding: 0}}
        >
          {t('Instant (%gasPrice%)', { gasPrice: GAS_PRICE.instant })}
        </Button>
      </Flex>
      <Line />
    </Flex>
  )
}

export default GasSettings
