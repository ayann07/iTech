import { Grid, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormInput = ({ name, label, size = 6, inputProps = {} }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={size}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{ required: `${label} required` }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            inputProps={inputProps}
            label={label}
            value={value}
            onChange={onChange}
            size="small"
            fullWidth
            variant="filled"
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;