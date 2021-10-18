import React, { useCallback, useEffect, useState } from 'react'
import { Currency, ETHER, JSBI, TokenAmount } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { LightCard } from '../../components/Card'
import { AutoColumn, ColumnCenter } from '../../components/Layout/Column'
import { CurrencyLogo } from '../../components/Logo'
import { MinimalPositionCard } from '../../components/PositionCard'
import Row from '../../components/Layout/Row'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { PairState, usePair } from '../../hooks/usePairs'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { usePairAdder } from '../../state/user/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import StyledInternalLink from '../../components/Links'
import { currencyId } from '../../utils/currencyId'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const StyledButton = styled(Button)`
  // background-color: ${({ theme }) => theme.colors.input};
  // color: ${({ theme }) => theme.colors.text};
  height: 80px;
  background: rgba(180, 163, 227, 0.13);
  box-shadow: none;
  border-radius: 16px;
  padding: 0 20px;
`

export default function PoolFinder() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(ETHER)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.raw, JSBI.BigInt(0)) &&
        JSBI.equal(pair.reserve1.raw, JSBI.BigInt(0)),
    )

  const position: TokenAmount | undefined = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && JSBI.greaterThan(position.raw, JSBI.BigInt(0)))

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <LightCard padding="35px 10px" mt="20px">
      <Text textAlign="center" fontSize='18px'>
        {!account ? t('Connect to a wallet to find pools') : t('Select a token to find your liquidity.')}
      </Text>
    </LightCard>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  return (
    <Page>
      <AppBody background="#191B26">
        <AppHeader title={t('Import Pool')} subtitle={t('Import an existing pool')} backTo="/liquidity" />
        <AutoColumn style={{ padding: '30px' }} gap="md">
          <StyledButton
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN0)
            }}
          >
            {currency0 ? (
              <Row>
                <CurrencyLogo currency={currency0} size='32px' />
                <Text ml="10px" fontSize='18px' fontWeight={400}>{currency0.symbol}</Text>
              </Row>
            ) : (
              <Text ml="10px" fontSize='18px'>{t('Select a Token')}</Text>
            )}
          </StyledButton>

          <ColumnCenter>
            {/* <AddIcon /> */}
            <img src="/images/trade/add.svg" alt="" width={64} height={64} style={{ border: '3px solid #000', borderRadius: '50%' }} />
          </ColumnCenter>

          <StyledButton
            endIcon={<ChevronDownIcon />}
            onClick={() => {
              onPresentCurrencyModal()
              setActiveField(Fields.TOKEN1)
            }}
          >
            {currency1 ? (
              <Row>
                <CurrencyLogo currency={currency1} size='32px' />
                <Text ml="10px" fontSize='18px' fontWeight={400}>{currency1.symbol}</Text>
              </Row>
            ) : (
              <Text ml="10px" fontSize='18px' as={Row}>{t('Select a Token')}</Text>
            )}
          </StyledButton>

          {hasPosition && (
            <ColumnCenter
              style={{ justifyItems: 'center', padding: '30px 0px' }}
            >
              <Text fontSize='18px' textAlign="center">{t('Pool Found!')}</Text>
              <StyledInternalLink to="/liquidity">
                <Text fontSize='18px' textAlign="center">{t('Manage this pool.')}</Text>
              </StyledInternalLink>
            </ColumnCenter>
          )}

          {currency0 && currency1 ? (
            pairState === PairState.EXISTS ? (
              hasPosition && pair ? (
                <MinimalPositionCard pair={pair} />
              ) : (
                <LightCard padding="35px 10px" mt={20}>
                  <AutoColumn gap="sm" justify="center">
                    <Text fontSize='18px' textAlign="center">{t('You don’t have liquidity in this pool yet.')}</Text>
                    <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                      <Text fontSize='18px' textAlign="center">{t('Add Liquidity')}</Text>
                    </StyledInternalLink>
                  </AutoColumn>
                </LightCard>
              )
            ) : validPairNoLiquidity ? (
              <LightCard padding="35px 10px" mt={20}>
                <AutoColumn gap="sm" justify="center">
                  <Text fontSize='18px' textAlign="center">{t('No pool found.')}</Text>
                  <StyledInternalLink to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}>
                    {t('Create pool.')}
                  </StyledInternalLink>
                </AutoColumn>
              </LightCard>
            ) : pairState === PairState.INVALID ? (
              <LightCard padding="35px 10px" mt={20}>
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center" fontSize='18px' fontWeight={500}>
                    {t('Invalid pair.')}
                  </Text>
                </AutoColumn>
              </LightCard>
            ) : pairState === PairState.LOADING ? (
              <LightCard padding="35px 10px" mt={20}>
                <AutoColumn gap="sm" justify="center">
                  <Text textAlign="center">
                    {t('Loading')}
                    <Dots />
                  </Text>
                </AutoColumn>
              </LightCard>
            ) : null
          ) : (
            prerequisiteMessage
          )}
        </AutoColumn>

        {/* <CurrencySearchModal
          isOpen={showSearch}
          onCurrencySelect={handleCurrencySelect}
          onDismiss={handleSearchDismiss}
          showCommonBases
          selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
        /> */}
      </AppBody>
    </Page>
  )
}
