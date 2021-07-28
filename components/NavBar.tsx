import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },

    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },

    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

export const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.grow} style={{ marginBottom: '40px' }}>
      <AppBar position='static'>
        <Toolbar>
          <Link href='/' passHref>
            <Typography
              style={{ cursor: 'pointer' }}
              className={classes.title}
              variant='h6'
              noWrap
            >
              Pi-monitor
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link href='/config' passHref>
              <IconButton aria-label='show 4 new mails' color='inherit'>
                <SettingsIcon />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
