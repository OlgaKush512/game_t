import React from 'react';
import { StyledStartButton } from './StartButton.styles';

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);
export default StartButton;
