import React from 'react'
import { ChainId, Currency, currencyEquals, ETHER, Token } from '@pancakeswap/sdk'
import { Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'

import { SUGGESTED_BASES } from '../../config/constants'
import { AutoColumn } from '../Layout/Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  // border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.dropdown)};
  display: flex;
  padding: 10px;
  border-radius: 12px;
  border: 2px solid #000000;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.background};
  }

  background-color: ${({ theme, disable }) => disable && theme.colors.dropdown};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const { t } = useTranslation()
  return (
    <AutoColumn gap="md">
      <AutoRow mb='4px'>
        <Text fontSize="18px">{t('Common bases')}</Text>
        <QuestionHelper text={t('These tokens are commonly paired with other tokens.')} ml="10px" />
      </AutoRow>
      <AutoRow gap="auto">
        <BaseWrapper
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER)
            }
          }}
          disable={selectedCurrency === ETHER}
        >
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <Text>NEX</Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 10 }} />
              <Text color='rgba(255, 255, 255, 0.6)' fontWeight={400} fontSize='18px'>{token.symbol}</Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
