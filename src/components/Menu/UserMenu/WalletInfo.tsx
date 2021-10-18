import React from 'react'
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance, { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { getBscScanLink } from 'utils'
import { getFullDisplayBalance, formatBigNumber } from 'utils/formatBalance'
import tokens from 'config/constants/tokens'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useTokenBalance(tokens.cake.address)
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss()
    logout()
  }

  return (
    <>
      <Text color="#fff" fontSize="14px" textTransform="uppercase" fontWeight="bold" mb="10px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="40px" />
      {hasLowBnbBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('NEX Balance Low')}</Text>
            <Text as="p">{t('You need NEX for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between" mb='28px'>
        <Text color="rgba(255, 255, 255, 0.6)" fontSize='21px'>{t('NEX Balance')}</Text>
        {fetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text color="rgba(255, 255, 255, 0.6)" fontSize='21px'>{formatBigNumber(balance, 6)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="30px">
        <Text color="rgba(255, 255, 255, 0.6)" fontSize='21px'>{t('NU Balance')}</Text>
        {cakeFetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text color="rgba(255, 255, 255, 0.6)" fontSize='21px'>{getFullDisplayBalance(cakeBalance, 18, 3)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="end" mb="24px">
        <LinkExternal href={getBscScanLink(account, 'address')}>{t('View on MSPCscan')}</LinkExternal>
      </Flex>
      <Button variant="secondary" width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
