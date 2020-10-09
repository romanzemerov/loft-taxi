import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const ErrorMessage = ({ text, cb }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        onExiting={cb}
      >
        <Alert onClose={handleClose} severity="error">
          {text}
        </Alert>
      </Snackbar>
    </MuiThemeProvider>
  );
};

export default ErrorMessage;
