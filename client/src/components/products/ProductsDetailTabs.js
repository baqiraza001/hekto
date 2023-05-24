import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { themeStyles } from '../../styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ProductsDetailTabs() {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
  

    return (
    <Container maxWidth="md">
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile

              sx={{
                '& .Mui-selected': {
                    color: 'var(--off-blue) !important',
                },
                '& .MuiTabs-indicator': {
                    backgroundColor: 'var(--off-blue)',
                }
              }}
            >
              <Tab label="Description" id={`simple-tabpanel-0`} sx={{ ...themeStyles.prductDescriptionTabsTitle, }} />
              <Tab label="Additional Information" id={`simple-tabpannel-1`} sx={{ ...themeStyles.prductDescriptionTabsTitle, }} />
              <Tab label="Reviews" id={`simple-tabpanel-2`} sx={{ ...themeStyles.prductDescriptionTabsTitle, }} />
              <Tab label="Video" id={`simple-tabpanel-2`} sx={{ ...themeStyles.prductDescriptionTabsTitle, }} />
            </Tabs>
          </Box>

          <div role="tabpanel" hidden={value !== 0} aria-labelledby={`simple-tab-${0}`} >
            <Box paddingTop={9}>
                <Typography sx={{...themeStyles.prductDescriptionHeading}}>
                    Varius tempor.
                </Typography>
                <Typography sx={{...themeStyles.productDescriptionText}}>
                    Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr.
                </Typography>
            </Box>

            <Box paddingTop={5}>
                <Typography sx={{...themeStyles.prductDescriptionHeading}}>
                    More details
                </Typography>
                <Box>
                    <Typography sx={{...themeStyles.productDescriptionPoints}}>
                    <ArrowForwardIcon sx={{...themeStyles.productDescriptionPointIcon}} /> Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc.
                    </Typography>
                </Box>
            </Box>
          </div>
          <div role="tabpanel" hidden={value !== 1} aria-labelledby={`simple-tab-${1}`} >
            div 2
          </div>
          <div role="tabpanel" hidden={value !== 2} aria-labelledby={`simple-tab-${2}`}>
            div 3
          </div>
          <div role="tabpanel" hidden={value !== 3} aria-labelledby={`simple-tab-${3}`}>
            div 4
          </div>
        </Container>
  )
}

export default ProductsDetailTabs