import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { connect } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getClientSecret } from './../../Redux/Actions/UserDetails';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';


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
}));

const tiers = [
  {
    title: 'Yearly',
    id: 1,
    subheader: 'Most popular',
    price: '1999',
    description: [],
    buttonText: 'Pay 1999 Now',
    buttonVariant: 'contained',
  },
  {
    title: 'Monthly',
    id: 2,
    subheader: 'Most popular',
    price: '299',
    description: [],
    buttonText: 'Pay 299 Now',
    buttonVariant: 'contained',
  },
];



function Pricing(props) {
  const classes = useStyles();
  const [secretResult, setSecretResult] = React.useState(props.secret);
  const [showLoader, setLoader] = React.useState(false);


  const onSubmit = (e, tier) => {
    setLoader(true);
    const data = { items: { id: tier.title } }
    props.getClientSecret(data);
  }

  //Key Response
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
  return (
    <React.Fragment>
      <CssBaseline />
      <Backdrop className={classes.backdrop} open={showLoader} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
          Get Started Today!!
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
          Choose the right plan that works best for you.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ₹{tier.price}
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button onClick={(e) => onSubmit(e, tier)}
                    fullWidth variant={tier.buttonVariant} color="primary">
                    {tier.buttonText}

                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
Pricing.propTypes = {
  getClientSecret: PropTypes.func,
  userDetails: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = ({ getUserDetails }) => ({
  secret: getUserDetails.secret,
});

export default connect(mapStateToProps, { getClientSecret })(Pricing);