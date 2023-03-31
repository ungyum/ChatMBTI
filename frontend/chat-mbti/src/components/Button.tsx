import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const ButtonContainer = styled.button<{ active: boolean }>`
  background-color: ${props => (props.active ? 'yellow' : 'white')};
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
`;

const Button: React.FC<ButtonProps> = ({ label, active, onClick }) => {
  return (
    <ButtonContainer active={active} onClick={onClick}>
      {label}
    </ButtonContainer>
  );
};

export default Button;
