import React from 'react'
import PageSection from 'components/PageSection'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import tokens from 'config/constants/tokens'

import DataBox from './components/DataBox'

const DataShow: React.FC = () => {
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(tokens.cake.address))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const cakePriceBusd = usePriceCakeBusd()
  const mcap = cakePriceBusd.times(cakeSupply).toNumber()

  return (
    <PageSection
      style={{padding: '0px'}}
      innerProps={{style: { marginTop: '-80px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '0px'}}}
      background="#161824"
      index={2}
      hasCurvedDivider={false}
    >
      {/* 价格 */}
      <DataBox
        title="NEXUS Price"
        value={cakePriceBusd.toNumber()}
        width='390px'
        height='160px'
      />
      {/* 余额 */}
      <DataBox
        title="NEXUS Balance"
        value={mcap}
        width='390px'
        height='160px'
        innerProps={{style: {margin: '0 15px'}}}
      />
      {/* 总市值 */}
      <DataBox
        title="Market cap"
        value={mcap}
        width='390px'
        height='160px'
      />
      {/* 总供应量 */}
      <DataBox
        title="Total supply"
        value={cakeSupply}
        width='590px'
        height='160px'
        innerProps={{style: {marginRight: '20px', marginTop: '20px'}}}
      />
      {/* 总质押以及24小时总量 */}
      <DataBox
        title="HECO TVL"
        value={mcap}
        width='590px'
        height='160px'
        innerProps={{style: { marginTop: '20px'}}}
      />
    </PageSection>
  )
}

export default DataShow