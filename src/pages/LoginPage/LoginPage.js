import React from 'react';
import Login from 'components/Login';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from 'loft-taxi-mui-theme';
import backgroundImage from 'assets/background.jpg';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
  },
  formWrapper: {
    marginLeft: '214px',
  },
});

const LoginPage = () => {
  const { loginPage, formWrapper } = useStyles();

  return (
    <div className={loginPage}>
      <Logo animated={true} white={true} />
      <div className={formWrapper}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
