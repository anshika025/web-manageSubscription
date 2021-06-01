/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from 'react-redux';
import { addSignUpDetails } from './../../Redux/Actions/UserDetails';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import gif from '../../Assets/Gif/success.gif';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '2%',
  },
  root: {
    width: '80%',
    '&.focused': {
      color: '#00acc1',
      fontSize: '90%',
      fontStyle: 'Helvetica, Arial,sans-serif',
    },
  },
  activeInputLableColor: {
    fontSize: '100%',
    fontStyle: 'Helvetica, Arial,sans-serif',
    color: '#191919',

    '&.focused': {
      color: '#00acc1',
      fontSize: '140%',
    },
  },
  resize: {
    fontSize: '100%',
    fontStyle: 'Helvetica, Arial,sans-serif',
    color: '#191919',
  },
  activeInputColor: {
    color: '#fff',
  },
  labelAsterisk: {
    color: 'red',
  },
  buttonContainer: {
    display: 'flex',
    margin: '2%',
    justifyContent: 'space-between',
    width: '100%',
  },
  addNewButton: {
    color: '#fff',
    backgroundColor: '#00aab4',
    '&:hover': {
      backgroundColor: '#00aab4',
      color: '#fff',
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modalCard: {
    width: '30%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  modalDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  cardDiv: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10% 10%',
  },
}));

const UserDetailsForm = (props) => {
  const classes = useStyles();
  const [signUpResult, setSignUpResult] = React.useState(props.userDetails);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [showLoader, setLoader] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    password: "",
    companyName: "",
    emailId: "",
    birthDate: "",
    address: ""
  });
  const [validationError, setValidationError] = React.useState({
    firstName: false,
    lastName: false,
    password: false,
    companyName: false,
    emailId: false,
    birthDate: false,
    address: false,
  });

  const FieldValidation = () => {
    const error = { ...validationError };
    let validate = true;
    for (const key in values) {
      if (values[key] === '') {
        error[key] = true;
        validate = false;
      } else {
        error[key] = false;
      }
    }
    setValidationError(error);
    return validate;
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };
  const onChange = (value, type) => {
    const allState = { ...values };
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (type === 'emailId') {
      const emailValid = reg.test(value);
      if (emailValid === true) {

        validationError.emailId = false;
      } else {
        validationError.emailId = true;

      }
      setValidationError(validationError);
    }
    if (type === 'birthDate') {
      allState[type] = value.replace("/", "-");
    }
    allState[type] = value;
    setValues(allState);
  }

  const onSubmit = () => {
    if (FieldValidation()) {
      setLoader(true);
      props.addSignUpDetails(values);
    }
  }
  const handleModalButton = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (signUpResult !== props.userDetails) {
      if (props.userDetails.signUp_configuration_response) {
        if (props.userDetails.signUp_configuration_response.code === 200) {
          setOpen(true);
          props.history.push('/');
        }
        if (props.userDetails.signUp_configuration_response.code === 500) {
          setToastOpen(true);
        }
      }
      setSignUpResult(props.userDetails);
    }
    setLoader(false);
  }, [props, signUpResult]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={showLoader} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please Check Details
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={classes.modalDiv}>
          <Card className={classes.modalCard}>
            <div className={classes.cardDiv}>
              <img src={gif} width="50%" />
              <div className={classes.successText}>SignUp Successfully</div>
              <br />
              <Button variant="contained" className={classes.buttonStyle} color="#696969" size="sm" onClick={() => handleModalButton(false)}>
                Ok
      </Button>
            </div>
          </Card>
        </div>
      </Modal>
      <Grid container className={classes.margin}>
        <Grid item xs>
          <TextField hover
            required
            error={validationError.firstName}
            className={classes.root}
            InputLabelProps={{
              classes: {
                root: classes.activeInputLableColor,
                focused: 'focused',
              },
            }}
            InputProps={{
              classes: {
                root: classes.activeInputColor,
                focused: 'focused',
                input: classes.resize,
              },
            }}
            autoComplete="off"
            onChange={(e) => onChange(e.target.value, 'firstName')}
            label="First Name"
            type="text"
            value={values.firstName}
            name="firstName"
            id="firstName"
            helperText={validationError.firstName && 'Please Enter FirtName'}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            error={validationError.lastName}
            className={classes.root}
            InputLabelProps={{
              classes: {
                root: classes.activeInputLableColor,
                focused: 'focused',
              },
              FormLabelClasses: {
                asterisk: classes.labelAsterisk,
              },
            }}
            InputProps={{
              classes: {
                root: classes.activeInputColor,
                focused: 'focused',
                input: classes.resize,
              },
            }}
            autoComplete="off"
            label="Last Name"
            value={values.lastName}
            onChange={(e) => onChange(e.target.value, 'lastName')}
            name="lastName"
            id="lastName"
            type='text'
            helperText={validationError.lastName && 'Please Enter LastName'}
          />
        </Grid>

      </Grid>
      <Grid container className={classes.margin}>
        <Grid item xs>
          <TextField hover
            required
            error={validationError.emailId}
            className={classes.root}
            InputLabelProps={{
              classes: {
                root: classes.activeInputLableColor,
                focused: 'focused',
              },
            }}
            InputProps={{
              classes: {
                root: classes.activeInputColor,
                focused: 'focused',
                input: classes.resize,
              },
            }}
            autoComplete="off"
            label="Email Id"
            onChange={(e) => onChange(e.target.value, 'emailId')}
            type="text"
            value={values.emailId}
            name="emailId"
            id="emailId"
            helperText={validationError.emailId && 'Please Enter Valid EmailId'}
          />
        </Grid>
        <Grid item xs>
          <TextField
            error={validationError.password}
            className={classes.root}
            InputLabelProps={{
              classes: {
                root: classes.activeInputLableColor,
                focused: 'focused',
              },
              FormLabelClasses: {
                asterisk: classes.labelAsterisk,
              },
            }}
            InputProps={{
              classes: {
                root: classes.activeInputColor,
                focused: 'focused',
                input: classes.resize,
              },
            }}
            required
            name="login"
            label="Password"
            type="password"
            placeholder='Enter Password '
            id="password"
            autoComplete="current-password"
            onChange={(e) => onChange(e.target.value, 'password')}
            value={values.password}
            helperText={validationError.password && 'Please Enter Password'}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.margin}>
        <Grid item xs>
          <TextField
            required
            error={validationError.companyName}
            className={classes.root}
            InputLabelProps={{
              classes: {
                root: classes.activeInputLableColor,
                focused: 'focused',
              },
            }}
            InputProps={{
              classes: {
                root: classes.activeInputColor,
                input: classes.resize,
                focused: 'focused',
              },
            }}
            label="Company Name"
            value={values.companyName}
            onChange={(e) => onChange(e.target.value, 'companyName')}
            name="companyName"
            id="companyName"
            helperText={validationError.companyName && 'Please Enter CompanyName'}
          >
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            required
            error={validationError.address}
            className={classes.root}
            InputLabelProps={{
              classes: {
                root: classes.activeInputLableColor,
                focused: 'focused',
              },
            }}
            InputProps={{
              classes: {
                root: classes.activeInputColor,
                input: classes.resize,
                focused: 'focused',
              },
            }}
            label="Address"
            value={values.address}
            onChange={(e) => onChange(e.target.value, 'address')}
            name="address"
            id="address"
            helperText={validationError.address && 'Please Enter Address'}
          >
          </TextField>
        </Grid>
      </Grid>
      <Grid container className={classes.margin}>
        <Grid item xs={6}>
          <TextField
            required
            error={validationError.birthDate}
            className={classes.root}
            id="date"
            label="DOB"
            onChange={(e) => onChange(e.target.value, 'birthDate')}
            type="date"
            value={values.birthDate}
            helperText={validationError.birthDate && 'Please Enter DOB'}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.buttonContainer} spacing={1}>

        <Grid item xs={6} style={{
          display: 'flex',
          flexDirection: 'row-reverse'
        }}>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              name="login"
              id="sign"
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
          </Grid>

        </Grid>
      </Grid>
    </>);
}
UserDetailsForm.propTypes = {
  addSignUpDetails: PropTypes.func,
  userDetails: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = ({ getUserDetails }) => ({
  userDetails: getUserDetails.data,
});

export default connect(mapStateToProps, { addSignUpDetails })(UserDetailsForm);
