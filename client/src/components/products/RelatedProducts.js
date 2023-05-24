import { useTheme } from '@emotion/react'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { themeStyles } from '../../styles'
import ShopProductCard from '../common/ShopProductCard'
import relatedProduct1 from '../../static/images/related-products/relatedProduct1.png'
import relatedProduct2 from '../../static/images/related-products/relatedProduct2.png'
import relatedProduct3 from '../../static/images/related-products/relatedProduct3.png'
import relatedProduct4 from '../../static/images/related-products/relatedProduct4.png'

function RelatedProducts() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth="md">
            <Typography mb={3} sx={{...themeStyles.relatedProductHeading}}>
                Related Products
            </Typography>

            <Grid container columnSpacing={1}>
            <ShopProductCard 
              columnNumber={3}
                    productImage={relatedProduct1}
                    isMobile={isMobile}
                    title="Mens Fashion Wear"
                    price="$26.00"
                    discount=""
                    saleText=""
                    detailsBoxStyle={{ flexDirection: 'column', justifyContent: 'space-between', 'alignItems': 'center' }}
                    priceStyle={""}
                    titleStyle={''}
                    discountStyle={""}
                    saleTagHoverStyle={{ visibility: 'hidden' }}
                    iconsHoverStyle={{ visibility: 'hidden' }}
                    paperStyle={{ 'padding': '0px', boxShadow: 'none' }}
                    paperHoverStyle={{ border: '0'}}
                    imageBoxStyle={{height: 'auto', maxWidth: "100%"}}
                    imageHoverStyle={""}
                    imageStyle={{ maxWidth: "100%"}}
                    imageBoxContent={""}
                    rating="5"
            />
            <ShopProductCard 
              columnNumber={3}
                    productImage={relatedProduct2}
                    isMobile={isMobile}
                    title="Mens Fashion Wear"
                    price="$26.00"
                    discount=""
                    saleText=""
                    detailsBoxStyle={{ flexDirection: 'column', justifyContent: 'space-between', 'alignItems': 'center' }}
                    priceStyle={""}
                    titleStyle={''}
                    discountStyle={""}
                    saleTagHoverStyle={{ visibility: 'hidden' }}
                    iconsHoverStyle={{ visibility: 'hidden' }}
                    paperStyle={{ 'padding': '0px', boxShadow: 'none' }}
                    paperHoverStyle={{ border: '0'}}
                    imageBoxStyle={{height: 'auto', maxWidth: "100%"}}
                    imageHoverStyle={""}
                    imageStyle={{ maxWidth: "100%"}}
                    imageBoxContent={""}
                    rating="5"
            />
            <ShopProductCard 
              columnNumber={3}
                    productImage={relatedProduct3}
                    isMobile={isMobile}
                    title="Mens Fashion Wear"
                    price="$26.00"
                    discount=""
                    saleText=""
                    detailsBoxStyle={{ flexDirection: 'column', justifyContent: 'space-between', 'alignItems': 'center' }}
                    priceStyle={""}
                    titleStyle={''}
                    discountStyle={""}
                    saleTagHoverStyle={{ visibility: 'hidden' }}
                    iconsHoverStyle={{ visibility: 'hidden' }}
                    paperStyle={{ 'padding': '0px', boxShadow: 'none' }}
                    paperHoverStyle={{ border: '0'}}
                    imageBoxStyle={{height: 'auto', maxWidth: "100%"}}
                    imageHoverStyle={""}
                    imageStyle={{ maxWidth: "100%"}}
                    imageBoxContent={""}
                    rating="5"
            />
            <ShopProductCard 
              columnNumber={3}
                    productImage={relatedProduct4}
                    isMobile={isMobile}
                    title="Mens Fashion Wear"
                    price="$26.00"
                    discount=""
                    saleText=""
                    detailsBoxStyle={{ flexDirection: 'column', justifyContent: 'space-between', 'alignItems': 'center' }}
                    priceStyle={""}
                    titleStyle={''}
                    discountStyle={""}
                    saleTagHoverStyle={{ visibility: 'hidden' }}
                    iconsHoverStyle={{ visibility: 'hidden' }}
                    paperStyle={{ 'padding': '0px', boxShadow: 'none' }}
                    paperHoverStyle={{ border: '0'}}
                    imageBoxStyle={{height: 'auto', maxWidth: "100%"}}
                    imageHoverStyle={""}
                    imageStyle={{ maxWidth: "100%"}}
                    imageBoxContent={""}
                    rating="5"
            />
  
        </Grid>


        </Container>
    )
}

export default RelatedProducts