import BigNumber from 'bignumber.js'
import { DeserializedFarm } from 'state/types'

export interface FarmWithStakedValue extends DeserializedFarm {
  apr?: number
  lpRewardsApr?: number
  liquidity?: BigNumber
  hotFarm?: boolean
}