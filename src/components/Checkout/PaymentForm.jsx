import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import Review from "./Review";

const defaultValues =
{
  cardno: "4242424242424242",
  expiry: '4242',
  cvv: "123"
}
const PaymentForm = ({
  checkoutToken,
  backStep,
  nextStep,
  shippingData,
  handleCaptureCheckout,
}) => {
  const methods = useForm({ defaultValues });
  const handleSubmit = (data) => {
    const orderData = {
      line_items: checkoutToken.line_items,
      customer: {
        firstname: shippingData.firstname,
        lastname: shippingData.lastname,
        email: shippingData.email,
      },
      shipping: {
        name: `${shippingData.firstname} ${shippingData.lastname}`,
        street: shippingData.address,
        town_city: shippingData.city,
        county_state: shippingData.state,
        postal_zip_code: shippingData.zip,
        country: shippingData.country,
      },
      billing: {
        name: `${shippingData.firstname} ${shippingData.lastname}`,
        street: shippingData.address,
        town_city: shippingData.city,
        county_state: shippingData.state,
        postal_zip_code: shippingData.zip,
        country: shippingData.country,
      },
      fulfillment: {
        shipping_method: checkoutToken.shipping_methods[0].id,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: data.cardno,
          expiry_month: data.expiry.slice(0, 2),
          expiry_year: data.expiry.slice(2, 4),
          cvc: data.cvv,
          postal_zip_code: shippingData.zip,
        },
      },
    };
    handleCaptureCheckout(checkoutToken.id, orderData);
    nextStep();
  };

  return (
    <>
      <Review checkOutToken={checkoutToken} />
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => handleSubmit(data))}>
          <Grid container spacing={3}>
            <FormInput
              name="cardno"
              label="Card Number"
              size={12}
              inputProps={{ pattern: "[0-9]{16}" }}
            />
            <FormInput
              name="expiry"
              label="Expiry(MMYY)"
              inputProps={{ pattern: "[0-9]{4}", }}
            />
            <FormInput
              name="cvv"
              label="CVC (CVV)"
              inputProps={{ pattern: "[0-9]{3}" }}
            />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Button
              onClick={() => backStep()}
              color="error"
              variant="outlined"
              disableElevation
            >
              Back
            </Button>
            <Button
              type="submit"
              color="success"
              variant="contained"
              disableElevation
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default PaymentForm;