import React, { useState } from 'react'
import { JSBI, Pair, Percent } from '@pancakeswap/sdk'
import {
  Button,
  Text,
  ChevronUpIcon,
  ChevronDownIcon,
  Card,
  CardBody,
  Flex,
  CardProps,
  AddIcon,
} from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTotalSupply from '../../hooks/useTotalSupply'

import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'

import { LightCard } from '../Card'
import { AutoColumn } from '../Layout/Column'
import CurrencyLogo from '../Logo/CurrencyLogo'
import { DoubleCurrencyLogo } from '../Logo'
import { RowBetween, RowFixed } from '../Layout/Row'
import { BIG_INT_ZERO } from '../../config/constants'
import Dots from '../Loader/Dots'

const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

interface PositionCardProps extends CardProps {
  pair: Pair
  showUnwrapped?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const { t } = useTranslation()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, JSBI.BigInt(0)) ? (
        <Card style={{padding: 0, background: 'rgba(0, 0, 0, 0.25)', borderRadius: '25px'}}>
          <CardBody style={{padding: '30px 20px'}}>
            <AutoColumn gap="16px">
              <FixedHeightRow>
                <RowFixed>
                  <Text color="#1DEE94" bold fontSize='21px'>
                    {t('LP tokens in your wallet')}
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{marginBottom: '5px'}}>
                <RowFixed>
                  <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={24} />
                  <Text fontSize='18px' fontWeight={400} color="rgba(255, 255, 255, 0.6)">
                    {currency0.symbol}-{currency1.symbol} LP
                  </Text>
                </RowFixed>
                <RowFixed>
                  <Text fontSize='18px' fontWeight={400}>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
                </RowFixed>
              </FixedHeightRow>
              <AutoColumn gap="4px">
                <FixedHeightRow>
                  <Text fontSize='18px' fontWeight={400} color="rgba(255, 255, 255, 0.6)">
                    {t('Share of Pool')}
                  </Text>
                  <Text fontSize='18px' fontWeight={400}>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(6)}%` : '-'}</Text>
                </FixedHeightRow>
                <FixedHeightRow>
                  <Text fontSize='18px' fontWeight={400} color="rgba(255, 255, 255, 0.6)">
                    {t('Pooled %asset%', { asset: currency0.symbol })}
                  </Text>
                  {token0Deposited ? (
                    <RowFixed>
                      <Text fontSize='18px' fontWeight={400} ml="6px">{token0Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
                <FixedHeightRow  style={{marginBottom: '0'}}>
                  <Text fontSize='18px' fontWeight={400} color="rgba(255, 255, 255, 0.6)">
                    {t('Pooled %asset%', { asset: currency1.symbol })}
                  </Text>
                  {token1Deposited ? (
                    <RowFixed>
                      <Text fontSize='18px' fontWeight={400} ml="6px">{token1Deposited?.toSignificant(6)}</Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
              </AutoColumn>
            </AutoColumn>
          </CardBody>
        </Card>
      ) : (
        <LightCard>
          <Text fontSize="18px" color='#fff' style={{ textAlign: 'center' }}>
            <span role="img" aria-label="pancake-icon">
              🥞
            </span> {' '}
            {t(
              "By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.",
            )}
          </Text>
        </LightCard>
      )}
    </>
  )
}

export default function FullPositionCard({ pair, ...props }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <Card style={{ borderRadius: '24px', background: 'transparent' }} {...props}>
      <Flex style={{ background: 'rgba(180, 163, 227, 0.13)', padding: '20px 24px' }} justifyContent="space-between" role="button" onClick={() => setShowMore(!showMore)}>
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="20px">
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={32} />
            <Text ml="10px" fontSize='21px' fontWeight={400}>
              {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
            </Text>
          </Flex>
          <Text fontSize="18px" color="#FFFFF">
            {userPoolBalance?.toSignificant(4)}
          </Text>
        </Flex>
        {showMore ? <ChevronUpIcon style={{width: '28px', height: '28px'}} /> : <ChevronDownIcon style={{width: '28px', height: '28px'}} />}
      </Flex>

      {showMore && (
        <AutoColumn gap="8px" style={{ padding: '16px 24px' }}>
          <FixedHeightRow style={{marginBottom: '5px'}}>
            <RowFixed>
              <CurrencyLogo size="20px" currency={currency0} />
              <Text color="#FFFFF" ml="4px">
                Pooled {currency0.symbol}
              </Text>
            </RowFixed>
            {token0Deposited ? (
              <RowFixed>
                <Text ml="6px">{token0Deposited?.toSignificant(6)}</Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow style={{marginBottom: '5px'}}>
            <RowFixed>
              <CurrencyLogo size="20px" currency={currency1} />
              <Text color="#FFFFF" ml="4px">
                Pooled {currency1.symbol}
              </Text>
            </RowFixed>
            {token1Deposited ? (
              <RowFixed>
                <Text ml="6px">{token1Deposited?.toSignificant(6)}</Text>
              </RowFixed>
            ) : (
              '-'
            )}
          </FixedHeightRow>

          <FixedHeightRow style={{marginBottom: '5px'}}>
            <Text color="#FFFFF">Share of pool</Text>
            <Text>
              {poolTokenPercentage
                ? `${poolTokenPercentage.toFixed(2) === '0.00' ? '<0.01' : poolTokenPercentage.toFixed(2)}%`
                : '-'}
            </Text>
          </FixedHeightRow>

          {userPoolBalance && JSBI.greaterThan(userPoolBalance.raw, BIG_INT_ZERO) && (
            <Flex flexDirection="column" mt={10}>
              <Button
                as={Link}
                to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
                variant="primary"
                width="100%"
                mb="8px"
              >
                Remove
              </Button>
              <Button
                as={Link}
                to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                variant="text"
                startIcon={<AddIcon color="primary" />}
                width="100%"
              >
                Add liquidity instead
              </Button>
            </Flex>
          )}
        </AutoColumn>
      )}
    </Card>
  )
}
