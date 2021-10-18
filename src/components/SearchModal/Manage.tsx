import React, { useState } from 'react'
import { Token } from '@pancakeswap/sdk'
import { ButtonMenu, ButtonMenuItem, ModalBody } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { TokenList } from '@uniswap/token-lists'
import { useTranslation } from 'contexts/Localization'
import ManageLists from './ManageLists'
import ManageTokens from './ManageTokens'
import { CurrencyModalView } from './types'

const StyledButtonMenu = styled(ButtonMenu)`
  width: 100%;
  height: 50px;
  background: #1B1D28;
  box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.11);
  border-radius: 25px;
  overflow: hidden;
  border: none;

  & button {
    height: 50px;
    border-radius: 25px;
    overflow: hidden;
    font-weight: bold;
    font-size: 16px;
  }
`

export default function Manage({
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  const [showLists, setShowLists] = useState(true)

  const { t } = useTranslation()

  return (
    <ModalBody>
      <StyledButtonMenu
        activeIndex={showLists ? 0 : 1}
        onItemClick={() => setShowLists((prev) => !prev)}
        scale="sm"
        variant="subtle"
        mb="30px"
      >
        <ButtonMenuItem width="50%">{t('Lists')}</ButtonMenuItem>
        <ButtonMenuItem width="50%">{t('Tokens')}</ButtonMenuItem>
      </StyledButtonMenu>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </ModalBody>
  )
}
