import React from 'react';
import styled from 'styled-components';

interface BannerProps {
  title: string;
}

const BannerContainer = styled.div`
  background-color: #DABC1F;
  color: white;
  padding: 10px 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const Banner: React.FC<BannerProps> = ({ title }) => {
  return (
    <BannerContainer>
      <span style={{ fontWeight: 'normal' }}>{title}</span>
    </BannerContainer>
  );
};

export default Banner;
