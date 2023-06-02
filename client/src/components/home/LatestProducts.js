import { Box, Typography, useTheme, useMediaQuery, Grid, Container } from "@mui/material"
import ShopProductCard from "../common/ShopProductCard";
import { themeStyles } from "../../styles";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { useSelector } from "react-redux";

function LatestProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  const [{ latestProducts }] = useSelector(({ home: { data: { latestProducts } } }) => latestProducts);

  const categories = Object.keys(latestProducts);

  return (
    <>
      {
        latestProducts && (
          <>
            <Box mt={5} textAlign="center">
              <Typography variant="h1" sx={{ ...themeStyles.mainHeading, fontSize: !isMobile ? '42px' : '32px' }}>Latest Products</Typography>
            </Box>
            {/* tabs */}
            <Box >
              <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                  centered={!isMobile ? true : false}
                  variant={isMobile ? 'scrollable' : 'standard'}
                  scrollButtons={isMobile ? true : false}
                  allowScrollButtonsMobile={isMobile ? true : false}
                  sx={{
                    '& .Mui-selected': {
                      color: 'var(--pink) !important',
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'var(--pink) !important',
                    }
                  }}
                >
                  {
                    categories.map((category, index) => (
                      <Tab key={index} label={category} id={`simple-tabpanel-${index}`}
                        sx={{
                          ...themeStyles.singleTab
                        }}
                      />
                    ))
                  }

                </Tabs>
              </Box>
              {categories.map((category, index) => (
                <div key={index} role="tabpanel" hidden={value !== index} aria-labelledby={`simple-tab-${index}`} >
                  <Box sx={{ p: !isMobile ? 3 : 0 }}>
                    <Grid container columnSpacing={1}>
                      {latestProducts[category].map((product) => (
                        <ShopProductCard key={product._id} viewDetailsLink={`/products/details/${product._id}`} productImage={product.productPictures && product.productPictures.length > 0 ? process.env.REACT_APP_BASE_URL + `content/products/${product._id}/${product.productPictures[0]}` : null } title={product.name} discount={product.discountPrice} price={product.sale_price} saleText={product.discountPercentage ? `${product.discountPercentage}% OFF` : null} isMobile={isMobile} />
                      ))
                      }
                    </Grid>
                  </Box>
                </div>
              ))
              }

            </Box>

            {/* tabs */}
          </>
        )
      }

    </>
  )
}

export default LatestProducts