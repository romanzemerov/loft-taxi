import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import LuxonUtils from '@date-io/luxon';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { GlobalStyles } from 'GlobalStyles';
import { theme } from 'loft-taxi-mui-theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <App />
            <CssBaseline />
            <GlobalStyles />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
