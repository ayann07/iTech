import React from 'react';
import { commerce } from '../../lib/commerce';
import { Paper, Stepper, Step, StepLabel, Typography, Container } from "@mui/material";
import { useState, useEffect } from 'react';
import PaymentForm from './PaymentForm';
import AddressForm from './AddressForm';
import Confirmation from './Confirmation';
const steps = ['Shipping address', 'Payment details'];
const Checkout = ({ cart, order, setOrder, handleCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        console.log(token);
        setCheckoutToken(token);
      }
      catch (error) {
        console.log("error while token creation")
      }
    }
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  }
  const Form = () => (
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm shippingData={shippingData} nextStep={nextStep} checkoutToken={checkoutToken} backStep={backStep} handleCaptureCheckout={handleCaptureCheckout} />
  )
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 2, mt: 10 }} elevation={3}>
        <Typography
          variant="h3"
          component="h3"
          marginBottom="20px"
          textAlign="center"
          sx={{ fontWeight: "bolder", fontFamily: "times-new-roman" }}
        >
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step} style={{ margin: "15px" }}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? <Confirmation order={order} error={error} setOrder={setOrder} /> : checkoutToken && <Form />}
      </Paper>
    </Container>
  )
}

export default Checkout

