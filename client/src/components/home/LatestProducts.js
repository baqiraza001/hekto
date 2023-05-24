import { Box, Typography, useTheme, useMediaQuery, Grid, Container } from "@mui/material"
import ShopProductCard from "../common/ShopProductCard";
import { themeStyles } from "../../styles";
import latestImage2 from '../../static/images/products/latest2.png';
import latestImage3 from '../../static/images/products/latest3.png';
import latestImage4 from '../../static/images/products/latest4.png';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

function LatestProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) =>  setValue(newValue);

  return (
    <>
      <Box mt={5} textAlign="center">
        <Typography variant="h1" sx={{ ...themeStyles.mainHeading, fontSize: !isMobile ? '42px' : '32px' }}>Latest Products</Typography>
      </Box>
      {/* tabs */}
      <Box >
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
              centered={ !isMobile ? true : false }
              variant={ isMobile ? 'scrollable' : 'standard' }
              scrollButtons={ isMobile ? true : false }
              allowScrollButtonsMobile={ isMobile ? true : false}
              sx={{
                '& .Mui-selected': {
                  color: 'var(--pink) !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'var(--pink) !important',
                }
              }}
            >
              <Tab label="New Arrival" id={`simple-tabpanel-0`} 
              sx={{
                ...themeStyles.singleTab
              }}
              />
              <Tab label="Best Seller" id={`simple-tabpannel-1`} 
              sx={{
                ...themeStyles.singleTab
              }}
              />
              <Tab label="Featured" id={`simple-tabpanel-2`} 
              sx={{
                ...themeStyles.singleTab
              }}
              />
              <Tab label="Special Offer" id={`simple-tabpanel-3`} 
              sx={{
                ...themeStyles.singleTab
              }}
              />
            </Tabs>
          </Box>
        <div role="tabpanel" hidden={value !== 0} aria-labelledby={`simple-tab-${0}`} >
          <Box sx={{ p: !isMobile ? 3 : 0 }}> 
            <Grid container columnSpacing={1}>
              <ShopProductCard 
                columnNumber={4}
                productImage={latestImage2} 
                isMobile={isMobile}
                title="Comfort product"
                price="$42"
                discount="$42"
                saleText="50% OFF"
              />
                <ShopProductCard productImage={latestImage3} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
                <ShopProductCard productImage={latestImage4} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
            </Grid>
          </Box>
        </div>
        <div role="tabpanel" hidden={value !== 1}  aria-labelledby={`simple-tab-${1}`} >
          <Box sx={{ p: !isMobile ? 3 : 0 }}> 
            <Grid container columnSpacing={1}>
              <ShopProductCard 
                columnNumber={4}
                productImage={latestImage2} 
                isMobile={isMobile}
                title="Comfort product"
                price="$42"
                discount="$42"
                saleText="50% OFF"
              />
                <ShopProductCard productImage={latestImage3} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
                <ShopProductCard productImage={latestImage4} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
            </Grid>
          </Box>
        </div>
        <div role="tabpanel" hidden={value !== 2} aria-labelledby={`simple-tab-${2}`}>
          <Box sx={{ p: !isMobile ? 3 : 0 }}> 
            <Grid container columnSpacing={1}>
              <ShopProductCard 
                columnNumber={4}
                productImage={latestImage2} 
                isMobile={isMobile}
                title="Comfort product"
                price="$42"
                discount="$42"
                saleText="50% OFF"
              />
                <ShopProductCard productImage={latestImage3} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
                <ShopProductCard productImage={latestImage4} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
            </Grid>
          </Box>
        </div>
        <div role="tabpanel" hidden={value !== 3} aria-labelledby={`simple-tab-${3}`}>
          <Box sx={{ p: !isMobile ? 3 : 0 }}> 
            <Grid container columnSpacing={1}>
              <ShopProductCard 
                columnNumber={4}
                productImage={latestImage2} 
                isMobile={isMobile}
                title="Comfort product"
                price="$42"
                discount="$42"
                saleText="50% OFF"
              />
                <ShopProductCard productImage={latestImage3} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
                <ShopProductCard productImage={latestImage4} title="Comfort product" discount="$42" price="$42" saleText="50% OFF" isMobile={isMobile}/>
            </Grid>
          </Box>
        </div>
      </Box>

      {/* tabs */}


      
    </>
  )
}

export default LatestProducts