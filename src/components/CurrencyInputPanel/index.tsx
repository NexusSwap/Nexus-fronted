import React, {CSSProperties} from 'react'
import { Currency, Pair } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  // padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
  margin-top: 20px;
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0;
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  // font-size: 0.75rem;
  // line-height: 1rem;
  // padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  // border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border-radius: 24px;
  // background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 24px;
  // background-color: ${({ theme }) => theme.colors.input};
  background-color: rgba(180, 163, 227, 0.13);
  // box-shadow: ${({ theme }) => theme.shadows.inset};
  padding: 30px 20px 47px 20px;
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  style?: CSSProperties
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  style
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput} style={style}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize="18px" fontWeight={600} style={{ 'lineHeight': 1 }}>{translatedLabel}</Text>
              {account && (
                <Text onClick={onMax} fontSize="18px" fontWeight={600} style={{ display: 'inline', cursor: 'pointer' }}>
                  {!hideBalance && !!currency
                    ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                    : ' -'}
                </Text>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {marginTop: 0}} selected={disableCurrencySelect}>
          <CurrencySelectButton
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={32} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="32px" style={{ marginRight: '12px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" fontSize='21px' fontWeight={400} style={{ 'lineHeight': '25px' }}>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" fontSize='21px' fontWeight={400} style={{ 'lineHeight': '25px' }}>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                      currency.symbol.length - 5,
                      currency.symbol.length,
                    )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
              {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} scale="sm" variant="text" style={{fontSize: '21px',color: '#1DEE94', padding: '0 5px'}}>
                  MAX
                </Button>
              )}
            </Flex>
          </CurrencySelectButton>
          {!hideInput && (
            <NumericalInput
              className="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          )}
        </InputRow>
      </Container>
    </InputPanel>
  )
}
