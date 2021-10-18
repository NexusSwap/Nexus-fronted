import React from 'react'
import styled from "styled-components";


export interface NexLogoProps {
  src: string
  alt?: string
}

const NexLogoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 160px;
  height: 56px;
  margin-left: 16px;
  overflow: hidden;
  display: flex;
  z-index: 21;
`

const NexLogo: React.FC<NexLogoProps> = ({ src, alt, ...rest }) => {

  return <NexLogoWrapper>
    <img
      {...rest}
      alt={alt}
      src={src}
    />
  </NexLogoWrapper>
}

export default NexLogo
