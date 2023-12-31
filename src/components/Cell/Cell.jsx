import React from 'react';
import { StyledCell } from './Cell.styles';
import { TETROMINOS } from '../../setup';

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
);

export default React.memo(Cell);
