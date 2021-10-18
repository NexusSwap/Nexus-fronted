import { ChainId } from '@pancakeswap/sdk'
import sample from 'lodash/sample'

enum Address {
  REACT_APP_NODE_1 = 'REACT_APP_NODE_1',
  REACT_APP_NODE_2 = 'REACT_APP_NODE_2',
  REACT_APP_NODE_3 = 'REACT_APP_NODE_3',
}


type NodeAddressMap = {[chainId in ChainId] : { [address in Address]?: string } }

const chainId = process.env.REACT_APP_CHAIN_ID

const nodeAddressMap: NodeAddressMap = {
  [ChainId.MAINNET]: {
    REACT_APP_NODE_1: 'https://bsc-dataseed1.ninicoin.io',
    REACT_APP_NODE_2: 'https://bsc-dataseed1.defibit.io',
    REACT_APP_NODE_3: 'https://nodes.pancakeswap.com',
  },
  [ChainId.TESTNET]: {
    REACT_APP_NODE_1: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    REACT_APP_NODE_2: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    REACT_APP_NODE_3: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
  [ChainId.KOVAN]: {
    REACT_APP_NODE_1: 'https://kovan.infura.io/v3/74d3de6db014405388a32e51189fb6fd',
    REACT_APP_NODE_2: 'https://kovan.infura.io/v3/74d3de6db014405388a32e51189fb6fd',
    REACT_APP_NODE_3: 'https://kovan.infura.io/v3/74d3de6db014405388a32e51189fb6fd',
  },
  [ChainId.MSC]: {
    REACT_APP_NODE_1: '/api',
    REACT_APP_NODE_2: '/api',
    REACT_APP_NODE_3: '/api',
  },
}

// Array of available nodes to connect to
const getNodeMap = () => {
  const currentNodesMap = nodeAddressMap[chainId]
  return Object.keys(currentNodesMap).map(item => currentNodesMap[item])
}

export const nodes = getNodeMap()

// if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_NODE_ALT) {
//   nodes.push(process.env.REACT_APP_NODE_ALT)
// }

const getNodeUrl = () => {
  return sample(nodes)
}

export default getNodeUrl
