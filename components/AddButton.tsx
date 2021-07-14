import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import * as Providers from '../providers';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const AddButton = () => {
  const [open, setOpen] = React.useState(false);
  const [params, setParams] = useState<Array<
    'host' | 'username' | 'password'
  > | null>(null);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      provider: '',
      host: '',
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const response = await fetch('/api/provider/create', {
        method: 'POST',
        body: JSON.stringify(formik.values),
      });
      console.log(response);
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (formik.values.provider) {
      // @ts-ignore
      setParams(Providers[formik.values.provider].params);
    }
  }, [formik.values.provider]);

  // @ts-ignore
  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add provider</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              To add a new provider, please provide details below.
            </DialogContentText>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id='provider'>Provider</InputLabel>
              <Select
                labelId='provider'
                id='provider'
                name='provider'
                value={formik.values.provider}
                onChange={formik.handleChange}
              >
                {Object.keys(Providers).map((providerName, i) => (
                  <MenuItem key={i} value={providerName}>
                    {providerName}
                  </MenuItem>
                ))}
              </Select>
              {params &&
                params.map((param, i) => (
                  <TextField
                    key={i}
                    autoFocus
                    margin='dense'
                    id={param}
                    label={param}
                    type='text'
                    fullWidth
                    value={formik.values[param]}
                    onChange={formik.handleChange}
                  />
                ))}
              )
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
