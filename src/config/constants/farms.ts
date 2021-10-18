import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      777: '0x61ecEa3A1f4f82f4BADe8E072Bb40ffABfB4dE0B'
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'NU-USDC LP',
    lpAddresses: {
      97: '0x060Fc4B5D793f3Ac7669a4B222aE72171e2DB462',
      56: '0x1472976e0b97f5b2fc93f1fff14e2b5c4447b64f',
      42: '0x20d476eCEC4DC6fE230A5AE174f96a66b05f833e',
      777: '0x9Da2C4CBEe5dD7E2b48d360E99B09Bc1Bfb0B571'
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 2,
    lpSymbol: 'USDC-NEX LP',
    lpAddresses: {
      97: '0xfaa221731dc0b9c8bb478ec6222cf78fb4d7db65',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
      777: '0x4ae1308736A2717Fc3F4Ca4caC3e2C2881695635'
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'NU-NEX LP',
    lpAddresses: {
      97: '0x10527e10d6deaff5a77e84604cbf21dacd9736b7',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
      777: '0x0B0ab5A3EAaC6D5240C528349251db304a7eF7bc'
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'NEX-BUSD LP',
    lpAddresses: {
      97: '0x060Fc4B5D793f3Ac7669a4B222aE72171e2DB462',
      56: '0x1472976e0b97f5b2fc93f1fff14e2b5c4447b64f',
      42: '0x20d476eCEC4DC6fE230A5AE174f96a66b05f833e',
      777: '0x43064C34a7Ae8eeD683260cB5C2732E5a9172048'
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.busd,
  }
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
]

export default farms
