import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputAdornment, OutlinedInput, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { themeStyles } from '../../styles';

function ProductMultiFilters({ filterData, handleFilters, selectedOption  }) {
  return (

    <Grid item md={12}>

      <Typography sx={{ ...themeStyles.productMultiFilterHeading }}>
        {
          filterData.heading
        }
      </Typography>

      <FormGroup value={selectedOption} onChange={handleFilters}>
        {
          filterData.heading === "Rating Item" ?
            filterData.options.map((option, index) => (
              <FormControlLabel key={index} control={<Checkbox size="small"
                value={option.value}
                sx={{
                  ...themeStyles.productMultiFilterHeading,
                  '&.Mui-checked': {
                    color: filterData.color,
                  },
                  color: filterData.color,
                }} />} label={ <Rating value={option.label} readOnly /> } />
            ))
            :
            filterData.options.map((option, index) => (
              <FormControlLabel key={index} control={<Checkbox size="small"
                value={option.value}
                sx={{
                  ...themeStyles.productMultiFilterHeading,
                  '&.Mui-checked': {
                    color: filterData.color ? filterData.color : option.color,
                  },
                  color: filterData.color ? filterData.color : option.color,
                }} />} label={option.label} />
            ))
        }
      </FormGroup>
      

    </Grid>
  )
}

export default ProductMultiFilters