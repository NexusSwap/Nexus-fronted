import React from 'react'
import styled from 'styled-components'
import { BoxProps, Heading, Skeleton } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'

interface DataBoxProps {
  title: string
  value: number
  decimal?: number
  width: string
  height: string
  innerProps?: BoxProps
}

const Wrapper = styled.div<{width: string, height: string}>`
  display: flex;
  flex-direction: column;
  background: rgba(54, 49, 81, 0.65);
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 16px;
  padding: 30px 20px;
`

const Content = styled.div`
  flex: 1;
`

const TextWrapper = styled(Balance) `
  color: #1DEE94;
  font-size: 36px;
  text-align: right;
  line-height: 50px;
`

const DataBox: React.FC<DataBoxProps> = ({
  title,
  value,
  decimal=2,
  width,
  height,
  innerProps
}) => {
  const { t } = useTranslation()
  // const valString = formatLocalisedCompactNumber(value.toNumber())

  return (
    <Wrapper {...innerProps} width={width} height={height}>
      <Content>
        <Heading style={{fontSize: '32px', lineHeight: '50px'}} as="h2" >
          {t(title)}
        </Heading>
      </Content>
      <Content>
        {value > 0  ? (
          <TextWrapper decimals={decimal} bold value={value} />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </Content>
    </Wrapper>
  )
}

export default DataBox