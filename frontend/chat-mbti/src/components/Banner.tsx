import React from "react";
import styled from "styled-components";

interface BannerProps {}

const BannerContainer = styled.div`
  background-color: #ccd6a6;
  color: #494949;
  padding: 10px 20px;
  text-align: center;
  font-size: 1rem;
`;

const Banner: React.FC<BannerProps> = () => {
  return (
    <BannerContainer>
      <span style={{ fontWeight: "bolder" }}>ChatMBTI</span>
      <span style={{ fontWeight: "thin" }}> by ChatGPT</span>
    </BannerContainer>
  );
};

export default Banner;
