import React, { useState } from 'react'
import {
  ButtonMenu,
  ButtonMenuItem,
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
} from '@pancakeswap/uikit'
import { parseUnits } from 'ethers/lib/utils'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import WalletInfo from './WalletInfo'
import WalletTransactions from './WalletTransactions'

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS,
}

interface WalletModalProps extends InjectedModalProps {
  initialView?: WalletView
}

export const LOW_BNB_BALANCE = parseUnits('2', 'gwei')

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({ theme }) => theme.colors.gradients.bubblegum};
`

const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

const WalletModal: React.FC<WalletModalProps> = ({ initialView = WalletView.WALLET_INFO, onDismiss }) => {
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  return (
    <ModalContainer title={t('Welcome!')} minWidth="560px">
      <ModalHeader style={{ background:"#151822" }}>
        <ModalTitle>
          <Heading>{t('Your Wallet')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="text" />
        </IconButton>
      </ModalHeader>
      <Tabs style={{ background:"#151822", borderTop: '1px solid rgba(255, 255, 255, 0.2)', padding: '20px 30px' }}>
        <ButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
          <ButtonMenuItem height={50} style={{ borderRadius: '25px' }}>{t('Wallet')}</ButtonMenuItem>
          <ButtonMenuItem height={50} style={{ borderRadius: '25px' }}>{t('Transactions')}</ButtonMenuItem>
        </ButtonMenu>
      </Tabs>
      <ModalBody p="30px" width="100%" style={{ background:"#151822" }}>
        {view === WalletView.WALLET_INFO && <WalletInfo hasLowBnbBalance={hasLowBnbBalance} onDismiss={onDismiss} />}
        {view === WalletView.TRANSACTIONS && <WalletTransactions />}
      </ModalBody>
    </ModalContainer>
  )
}

export default WalletModal
