import React from 'react';
import Signup from 'components/Signup';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from 'loft-taxi-mui-theme';
import backgroundImage from 'assets/background.jpg';

const useStyles = makeStyles({
  signupPage: {
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

const SignupPage = () => {
  const { signupPage, formWrapper } = useStyles();

  return (
    <div className={signupPage}>
      <Logo animated={true} white={true} />
      <div className={formWrapper}>
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
