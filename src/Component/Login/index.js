/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { addLoginDetails } from './../../Redux/Actions/UserDetails';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // backgroundImage: `url(${two})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundPosition: 'center',
    width: '80%',

  },
  forgetPassword: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  imageImg: {
    width: '600px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  logoImage: {
    width: '23%',
    height: 'auto',
    marginTop: '-5px',
    marginLeft: '35%',
  },
  loginImage: {
    width: '100%',
    display: 'contents',
  },
  redErrorValidation: {
    margin: '10px 0',
    color: '#C2255C',
    fontWeight: 'bold',
  },
  paper: {
    padding: theme.spacing(1),
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  imageLogo:
  {
    backgroundImage: 'url(./logo.png)',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SignInSide = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState([]);
  const [showLoader, setLoader] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [preLogin, setLoginResult] = useState(props.loginData);
  const [password, setPassword] = useState([]);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  function handleUser(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }
  const FieldValidation = () => {
    let validate = true;
    if(username === '')
    {
      setLoginError(true)
      validate = false;
    }  if(password === '')
    {
      setPasswordError(true)
      validate = false;
    }
    if(username !== '')
    {
      setLoginError(false)
    }  if(password !== '')
    {
      setPasswordError(false)
    }
    return validate;
  };

  // Login Request
  function loginCheck() {
    if (FieldValidation()) {
      setLoader(true);
    const requestBody = {
      emailId: username,
      password: password
    };
    props.addLoginDetails(requestBody);
  }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };


  //Login Response
  React.useEffect(() => {
    const { loginData } = props;
    setLoader(false);
    if (preLogin !== loginData) {
      const loginResponse = props.loginData && props.loginData.login_response && props.loginData.login_response.code;
      if (loginResponse === 200) {
        if(props.loginData.login_response.list && loginData.login_response.list.length )
        {
          props.history.push('/main');
        }
        else {
          props.history.push('/plans');
        }
      }
      if (loginResponse=== 500) {
        setToastOpen(true);
      }
      else {
        setToastOpen(true);
      }
      setLoginResult(loginData);
    }
  }, [preLogin, props, props.loginData]);

  return (
    <Grid container>
      <Grid item xs={4} />
      <Backdrop className={classes.backdrop} open={showLoader} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Login Failed : Due to Bad Credentials
        </Alert>
      </Snackbar>
      <Grid item xs={4}>
        <div className={classes.paper}>
          <div className={classes.loginImage}>
          </div>
          {<form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Email"
              name="login"
              placeholder='Enter a valid email address'
              autoComplete="email"
              autoFocus
              onChange={(e) => handleUser(e)}
              value={username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="login"
              label="Password"
              type="password"
              placeholder='Enter Password '
              id="password"
              autoComplete="current-password"
              onChange={(e) => handlePassword(e)}
              value={password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              name="login"
              id="sign"
              className={classes.submit}
              onClick={loginCheck}
            >
              Sign In
            </Button>
            {(loginError || passwordError) && <p className={classes.redErrorValidation}>
              Login failed : Add credentials.
              <i className="fas fa-exclamation-triangle" />
            </p>}
          </form>}
          <div className={classes.forgetPassword}>
            <a className={classes.textColor} href="/signup" >Don't have an account?SignUp</a>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
SignInSide.propTypes = {
  addLoginDetails: PropTypes.func,
  loginData: PropTypes.object,
  history: PropTypes.object,
};
const mapStateToProps = ({ getUserDetails }) => ({
  loginData: getUserDetails.loginData,
});

export default connect(mapStateToProps,
  { addLoginDetails })(SignInSide);
