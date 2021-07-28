import React from 'react';
import Button from '@material-ui/core/Button';

import { ServiceProviderModal } from './ServiceProviderModal';
import {
  ServiceProviderConfig,
  ServiceProviderType,
} from '../pages/api/loadConfig';

type EditButtonProps = {
  label: string;
  serviceProviderConfig?: ServiceProviderConfig;
  initialValues?: any;
  selectedServiceProviderType?: ServiceProviderType;
};

export const EditButton = ({
  label,
  selectedServiceProviderType,
  initialValues = {},
}: EditButtonProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant={label === 'Edit' ? 'outlined' : 'contained'}
        color={label === 'Edit' ? 'default' : 'primary'}
        onClick={handleClickOpen}
      >
        {label}
      </Button>
      <ServiceProviderModal
        label={label}
        initialValues={initialValues}
        visible={open}
        handleClose={handleClose}
        selectedServiceProviderType={selectedServiceProviderType}
      />
    </React.Fragment>
  );
};
