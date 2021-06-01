/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import moment from 'moment-timezone';
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import PropTypes from 'prop-types';
import { addPaymentDetails } from './../../Redux/Actions/UserDetails';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import gif from '../../Assets/Gif/success.gif';

const useStyles = makeStyles((theme) => ({
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


function CheckoutForm(props) {
  const classes = useStyles();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [paymentResponse, setPaymnetResponse] = useState();
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [paymentDetail, setPaymentDetail] = useState(props.paymentResponse);
  const [data, setData] = useState(false);
  const [clientSecret, setClientSecret] = useState(props.secret && props.secret['key-response'] && props.secret['key-response'].value);
  const stripe = useStripe();
  const elements = useElements();


  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setPaymnetResponse(payload);
    }
    if (payload && payload.paymentIntent && payload.paymentIntent.status === "succeeded" && !data) {
      setData(true);

      const today = moment();
      let startDate = today.format('YYYY-MM-DD');
      let endDate = '';
      if (props.secret && props.secret['key-response'] && props.secret['key-response'].id === 'Yearly') {
        endDate = today.add(365, 'days').format('YYYY-MM-DD');
      }
      else {
        endDate = today.add(30, 'days').format('YYYY-MM-DD');
      }
      if (props.loginData && props.loginData.login_response && props.loginData.login_response.id) {
        console.log(props.loginData);
        const Request = {
          userId: props.loginData.login_response.id,
          subscriptionId: props.secret && props.secret['key-response'] && props.secret['key-response'].id,
          paymentStatus: payload.paymentIntent.status,
          paymentType: payload.paymentIntent.payment_method_types[0],
          status: 'active',
          startDate,
          endDate,
        }
        props.addPaymentDetails(Request);
      }
    }
  };

  const handleModalButton = () => {
    setOpen(false);
    props.history.push('/');
  };

  //Payment Response
  React.useEffect(() => {
    const { paymentResponse } = props;
    if (paymentDetail !== paymentResponse) {
      const response = props.paymentResponse && props.paymentResponse.paymnet_response && props.paymentResponse.paymnet_response.code;
      if (response === 200) {
        setOpen(true);
      }
    }
    setPaymentDetail(paymentResponse);
  }, [paymentDetail, props, props.paymentResponse]);


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={classes.modalDiv}>
          <Card className={classes.modalCard}>
            <div className={classes.cardDiv}>
              <img src={gif} width="50%" />
              <div className={classes.successText}>Payment Successfully, Please re-login</div>
              <br />
              <Button variant="contained" className={classes.buttonStyle} color="#696969" size="sm" onClick={() => handleModalButton(false)}>
                Ok
      </Button>
            </div>
          </Card>
        </div>
      </Modal>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}
CheckoutForm.propTypes = {
  getClientSecret: PropTypes.func,
  userDetails: PropTypes.object,
  addPaymentDetails: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = ({ getUserDetails }) => ({
  secret: getUserDetails.secret,
  loginData: getUserDetails.loginData,
  paymentResponse: getUserDetails.paymentDetails,

});

export default connect(mapStateToProps, { addPaymentDetails })(CheckoutForm);
