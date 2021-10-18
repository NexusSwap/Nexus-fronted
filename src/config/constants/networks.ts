import { ChainId } from '@pancakeswap/sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://bsc-dataseed1.defibit.io',
  [ChainId.TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [ChainId.KOVAN]: 'https://kovan.infura.io/v3/74d3de6db014405388a32e51189fb6fd',
  [ChainId.MSC]: 'http://192.168.1.234:8545'
}

export default NETWORK_URLS
