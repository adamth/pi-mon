import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { AddServiceProviderModal } from './AddServiceProviderModal';

export const AddButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // @ts-ignore
  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Add
      </Button>
      <AddServiceProviderModal visible={open} handleClose={handleClose} />
    </React.Fragment>
  );
};
