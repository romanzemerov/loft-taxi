import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import LuxonUtils from '@date-io/luxon';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { theme } from 'loft-taxi-mui-theme';
import { GlobalStyles } from 'GlobalStyles';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <App />
            <GlobalStyles />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
