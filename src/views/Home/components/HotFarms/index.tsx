import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
// import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { ChainId } from '@pancakeswap/sdk'
import { Flex, Heading, Image, RowType } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

import BigNumber from 'bignumber.js'
import { getFarmApr } from 'utils/apr'
import isArchivedPid from 'utils/farmHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { DeserializedFarm } from 'state/types'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useFarms, usePriceCakeBusd, usePollFarmsWithUserData } from 'state/farms/hooks'
import { DesktopColumnSchema } from './types'
import { FarmWithStakedValue } from './components/FarmCard'
import Table from './components/FarmTable'
import { RowProps } from './components/Row'

const Header = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const More = styled.p`
  font-size: 21px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
`

const NUMBER_OF_FARMS_VISIBLE = 10

const HotFarms: React.FC = () => {
  const history = useHistory()
  const { t } = useTranslation()
  // const { observerRef, isIntersecting } = useIntersectionObserver()
  const { observerRef } = useIntersectionObserver()
  const cakePrice = usePriceCakeBusd()
  // farms的列表
  // const { data: farmsLP, userDataLoaded } = useFarms()
  const { data: farmsLP } = useFarms()
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  // 连接钱包后获取到的账户信息
  // const { account } = useWeb3React()

  usePollFarmsWithUserData()

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MSC])
        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      return farmsToDisplayWithAPR
    },
    [cakePrice],
  )

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    chosenFarms = farmsList(activeFarms)

    return chosenFarms.slice(0, NUMBER_OF_FARMS_VISIBLE)
  }, [ activeFarms, farmsList ])

  const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number) => {
    if (cakeRewardsApr && lpRewardsApr) {
      return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    if (cakeRewardsApr) {
      return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
    return null
  }

  const rowData = chosenFarmsMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: getDisplayApr(farm.apr, farm.lpRewardsApr),
        pid: farm.pid,
        multiplier: farm.multiplier,
        lpLabel,
        lpSymbol: farm.lpSymbol,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: {...farm, hotFarm: true},
    }

    return row
  })

  const FarmList = (): JSX.Element => {
    const columnSchema = DesktopColumnSchema

    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case 'farm':
            return b.id - a.id
          case 'apr':
            if (a.original.apr.value && b.original.apr.value) {
              return Number(a.original.apr.value) - Number(b.original.apr.value)
            }

            return 0
          case 'earned':
            return a.original.earned.earnings - b.original.earned.earnings
          default:
            return 1
        }
      },
      sortable: column.sortable,
    }))

    return <Table data={rowData} columns={columns} userDataReady hotfarm />
  }

  const goFarms = () => {
    history.push('/farms')
  }

  return (
    <div ref={observerRef}>
      <Flex flexDirection="column" mt="24px" background="#363151" borderRadius="16px">
        <Header>
          <Flex width="500px" flexDirection="row">
            <Image width={24} height={24} src="/assets/hot.svg" alt={t('Burnt CAKE')} />
            <Heading ml="5px" style={{fontSize:'21px'}} color="#fff" >
              {t('Hot Farms')}
            </Heading>
          </Flex>
          <More onClick={goFarms} style={{cursor: 'pointer'}}>
            {t('More')}
          </More>
        </Header>
        <FarmList />
      </Flex>
    </div>
  )
}

export default HotFarms
