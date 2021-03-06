import { Currency, Percent, Price } from '@pancakeswap/sdk'
import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { AutoColumn } from '../../components/Layout/Column'
import { AutoRow } from '../../components/Layout/Row'
import { ONE_BIPS } from '../../config/constants'
import { Field } from '../../state/mint/actions'

function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
}) {
  const { t } = useTranslation()
  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-between" gap="0">
        <AutoColumn justify="center">
          <Text fontSize="18px" color='rgba(255, 255, 255, 0.5)' fontWeight={600}>{price?.toSignificant(6) ?? '-'}</Text>
          <Text fontSize="18px" color='rgba(255, 255, 255, 0.5)' fontWeight={600} pt={15}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_B]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_A]?.symbol ?? '',
            })}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <Text fontSize="18px" color='rgba(255, 255, 255, 0.5)' fontWeight={600}>{price?.invert()?.toSignificant(6) ?? '-'}</Text>
          <Text fontSize="18px" color='rgba(255, 255, 255, 0.5)' fontWeight={600} pt={15}>
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_A]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_B]?.symbol ?? '',
            })}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <Text fontSize="18px" color='rgba(255, 255, 255, 0.5)' fontWeight={600}>
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </Text>
          <Text fontSize="18px" color='rgba(255, 255, 255, 0.5)' fontWeight={600} pt={15}>
            {t('Share of Pool')}
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}

export default PoolPriceBar
