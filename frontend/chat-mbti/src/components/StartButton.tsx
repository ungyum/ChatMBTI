import React from 'react';
import styled from 'styled-components';

interface StartButtonProps {
  onClick: () => void;
}

const StartButtonContainer = styled.button`
  background-color: #DABC1F;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
`;

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <StartButtonContainer onClick={onClick}>
      시작하기
    </StartButtonContainer>
  );
};

export default StartButton;
