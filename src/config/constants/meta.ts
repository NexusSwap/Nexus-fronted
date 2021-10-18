import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Nexus Swap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Nexus Swap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('Nexus Swap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('Nexus Swap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('Nexus Swap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('Nexus Swap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('Nexus Swap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Nexus Swap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Nexus Swap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('Nexus Swap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Nexus Swap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('Nexus Swap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('Nexus Swap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Nexus Swap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Nexus Swap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Nexus Swap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('Nexus Swap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('Nexus Swap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('Nexus Swap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('PancakeSwap Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('Nexus Swap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('Nexus Swap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('Nexus Swap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('Nexus Swap')}`,
      }
    default:
      return null
  }
}
