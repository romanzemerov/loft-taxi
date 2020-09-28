import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LuxonUtils from '@date-io/luxon';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'loft-taxi-mui-theme';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
