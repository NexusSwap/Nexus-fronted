import { Currency, CurrencyAmount, Fraction, Percent } from '@pancakeswap/sdk'
import React from 'react'
import { Button, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { RowBetween, RowFixed } from '../../components/Layout/Row'
import { CurrencyLogo } from '../../components/Logo'
import { Field } from '../../state/mint/actions'

function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { t } = useTranslation()
  return (
    <>
      <RowBetween>
        <Text fontSize='18px' fontWeight={400} color='#fff'>{t('%asset% Deposited', { asset: currencies[Field.CURRENCY_A]?.symbol })}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Text fontSize='18px' fontWeight={400} color='#fff'>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text fontSize='18px' fontWeight={400} color='#fff'>{t('%asset% Deposited', { asset: currencies[Field.CURRENCY_B]?.symbol })}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Text fontSize='18px' fontWeight={400} color='#fff'>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text fontSize='18px' fontWeight={400} color='#fff'>{t('Rates')}</Text>
        <Text fontSize='18px' fontWeight={400} color='#fff'>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Text fontSize='18px' fontWeight={400} color='#fff'>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Text>
      </RowBetween>
      <RowBetween>
        <Text fontSize='18px' fontWeight={400} color='#fff'>{t('Share of Pool')}:</Text>
        <Text fontSize='18px' fontWeight={400} color='#fff'>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </RowBetween>
      <RowBetween style={{justifyContent: 'center', marginBottom: '10px'}}>
        <Button onClick={onAdd} mt="30px" style={{borderRadius: '24px', width: '200px', height: '48px'}}>
          {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
        </Button>
      </RowBetween>
    </>
  )
}

export default ConfirmAddModalBottom
