import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

export const DownloadControlButton = () => {
  const pause = 'Pause';
  const resume = 'Resume';
  const [status, setStatus] = useState(pause);
  const [isReady, setIsReady] = useState(true);

  const handleClick = async () => {
    setIsReady(false);
    const endpoint: string = status === pause ? resume : pause;
    await fetch(`/api/${endpoint.toLowerCase()}`);

    setIsReady(true);
    setStatus(status === pause ? resume : pause);
  };

  return (
    <Button
      variant={status === pause ? 'outlined' : 'contained'}
      color={status === pause ? 'default' : 'primary'}
      onClick={handleClick}
    >
      {isReady ? status : <CircularProgress size='24px' />}
    </Button>
  );
};
