import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
  } from "@mui/material";
  import React from "react";
  import { Controller, useFormContext } from "react-hook-form";
  
  const FormInput = ({ name, label, options }) => {
    const { control } = useFormContext();
  
    return (
      <Grid item xs={12} sm={6}>
        <FormControl variant="filled" fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Controller
            control={control}
            name={name}
            defaultValue=""
            rules={{ required: "Select an option" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <Select onChange={onChange} value={value} error={!!error}>
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={!!error}>
                  {error ? error.message : null}
                </FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Grid>
    );
  };
  
  export default FormInput;