import { STAGE_WIDTH } from '../setup';
import { isColliding, randomTetromino } from '../gameHelpers';
import { useCallback, useState } from 'react';

export const usePlayer = () => {
  const [player, setPlayer] = useState({});

  const rotate = (matrix) => {
    const mtrx = matrix.map((_, i) => matrix.map((column) => column[i]));
    return mtrx.map((row) => row.reverse());
  };

  const playerRotate = (stage) => {
    const clonnedPlayer = JSON.parse(JSON.stringify(player));
    clonnedPlayer.tetromino = rotate(clonnedPlayer.tetromino);

    const posX = clonnedPlayer.pos.x;
    let offset = 1;
    while (isColliding(clonnedPlayer, stage, { x: 0, y: 0 })) {
      clonnedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonnedPlayer.tetromino[0].length) {
        clonnedPlayer.pos.x = posX;
        return;
      }
    }

    setPlayer(clonnedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(
    () =>
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
      }),
    []
  );
  return { player, updatePlayerPos, resetPlayer, playerRotate };
};
