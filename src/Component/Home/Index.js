/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getClientSecret, updateStatus } from './../../Redux/Actions/UserDetails';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function createData(subscriptionId, startDate, endDate, paymentType, status, userId) {
  return {
    subscriptionId, startDate, endDate, paymentType, status, userId,
  };
}


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(1),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  addNewButton: {
    color: '#fff',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
      color: '#fff',
    },
  },
}));



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function Home(props) {
  const classes = useStyles();
  const [secretResult, setSecretResult] = React.useState(props.secret);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [updateResult, setUpdateResult] = React.useState(props.updateData);
  const [showLoader, setLoader] = React.useState(false);

  const onSubmit = (e, row) => {
    setLoader(true);
    console.log(row);
    const Request = {
      userId: row.userId,
      status: row.status === 'active' ? 'inactive' : 'active'
    }
    props.updateStatus(Request);
  }

  //Secret Key Response
  React.useEffect(() => {
    const { secret } = props;
    setLoader(false);
    if (secretResult !== secret) {
      const key = props.secret && props.secret['key-response'] && props.secret['key-response'].value;
      if (key) {
        props.history.push('/payment');
      }
      setSecretResult(secret);
    }
  }, [secretResult, props, props.secret]);

// Updated Status Response
  React.useEffect(() => {
    if (updateResult !== props.updateData) {
      setLoader(false);
      if (props.updateData.status_response) {
        if (props.updateData.status_response.code === 200) {
          props.history.push('/');
        }
        if (props.updateData.status_response.code === 500) {
          setToastOpen(true);
        }
      }
      setUpdateResult(props.updateData);
    }
  }, [props, updateResult]);

  const rows = [];
  if (props.loginData && props.loginData.login_response && props.loginData.login_response.list) {
    const list = props.loginData.login_response.list
    if (list.length) {
      list.forEach((v, i) => {
        const { subscriptionId } = v;
        const { startDate } = v;
        const { endDate } = v;
        const { paymentType } = v;
        const { status } = v;
        const { userId } = v;
        rows.push(createData(subscriptionId, startDate, endDate, paymentType, status, userId));
      });
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastOpen(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Backdrop className={classes.backdrop} open={showLoader} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please Check Details
        </Alert>
      </Snackbar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Hi User
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
          Enjoy your Future and view your plan
        </Typography>
      </Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Subscription Type</StyledTableCell>
              <StyledTableCell align="center">StartDate</StyledTableCell>
              <StyledTableCell align="center">EndDate</StyledTableCell>
              <StyledTableCell align="center">PaymentType</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row, index) => (
                <TableRow
                  hover
                  key={row.subscriptionId}
                >
                  <StyledTableCell align="center" style={{ fontWeight: 'bold' }}>
                    {row.subscriptionId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.startDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.endDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.paymentType}</StyledTableCell>
                  <StyledTableCell align="center">{row.status}</StyledTableCell>
                  <TableCell align="center"><Button className={classes.addNewButton} id="button" variant="contained" onClick={(e) => onSubmit(e, row)}> {row.status === 'active' ? 'Cancel' : 'Resume'}</Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
Home.propTypes = {
  getClientSecret: PropTypes.func,
  userDetails: PropTypes.object,
  updateStatus: PropTypes.func,
  updateData: PropTypes.func,
  loginData: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = ({ getUserDetails }) => ({
  secret: getUserDetails.secret,
  loginData: getUserDetails.loginData,
  updateData: getUserDetails.updateStatus,


});

export default connect(mapStateToProps, { getClientSecret, updateStatus })(Home);