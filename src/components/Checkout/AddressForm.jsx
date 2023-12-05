import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';
import FormSelector from './FormSelector';
import { NavLink } from 'react-router-dom';
const AddressForm = ({ checkoutToken, next }) => {
  const defaultValues = {
    firstname: 'John',
    lastname: 'Snow',
    address: 'J - 1, Qutub Plaza, Ashoka Marg, Block A, Sector 26',
    email: 'johnsnow29@gmail.com',
    pno: '8712945922',
    city: 'Lucknow',
    zip: '226001',
  };
  const methods = useForm({ defaultValues });
  const [shippingCountries, setshippingCountries] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);

  const Countries = Object.entries(shippingCountries).map(([code, name]) => ({
    value: code,
    label: name,
  }));
  const States = Object.entries(shippingStates).map(([code, name]) => ({
    value: code,
    label: name,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId);
    setshippingCountries(countries);
  };

  const fetchShippingStates = async (checkoutTokenId, countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        checkoutTokenId,
        countryCode
      );
    setShippingStates(subdivisions);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    fetchShippingStates(checkoutToken.id, "IN");
  }, [checkoutToken]);



  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next(data))}>
          <Grid container spacing={3}>
            <FormInput required name='firstname' label="First Name" />
            <FormInput required name='lastname' label="Last Name" />
            <FormInput required name='address' label="Address" size={12} />
            <FormInput required name='email' label="Email" />
            <FormInput required name='pno' label="Contact Number" />
            <FormInput required name='city' label="City" />
            <FormInput required name='zip' label="Zip Code" />
            <FormSelector name="state" label="State" options={States} />
            <FormSelector name="country" label="Country" options={Countries} />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <Button
              LinkComponent={NavLink}
              to="/cart"
              color="primary"
              variant="contained"
              disableElevation
            >
              Cancel
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
  )
}

export default AddressForm