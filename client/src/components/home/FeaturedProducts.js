import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { themeStyles } from "../../styles";
import ProductCardVertical from "../common/ProductCardVertical";

import featureImage1 from '../../static/images/products/featured1.png';
import featureImage2 from '../../static/images/products/featured2.png';
import featureImage3 from '../../static/images/products/featured3.png';
import featureImage4 from '../../static/images/products/featured4.png';
import Slider from "react-slick";

function FeaturedProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay:false,
      slidesToShow: isMobile ? 1 : 4,
      slidesToScroll: isMobile ? 1 : 4,
      arrows: false
  };

  return (
    <>
      <Box mt={5} textAlign="center">
        <Typography variant="h1" sx={{ ...themeStyles.mainHeading, fontSize: !isMobile ? '42px' : '32px' }}>Featured Products</Typography>
      </Box>
      <Slider key={isMobile ? "mobile" : "desktop"} {...settings}>
          <ProductCardVertical productImage={featureImage1} isMobile={isMobile}/>
          <ProductCardVertical productImage={featureImage2} isMobile={isMobile}/>
          <ProductCardVertical productImage={featureImage3} isMobile={isMobile}/>
          <ProductCardVertical productImage={featureImage4} isMobile={isMobile}/>
          <ProductCardVertical productImage={featureImage1} isMobile={isMobile}/>
          <ProductCardVertical productImage={featureImage2} isMobile={isMobile}/>
          <ProductCardVertical productImage={featureImage3} isMobile={isMobile}/>
          <ProductCardVertical productImage={featureImage4} isMobile={isMobile}/>
      </Slider>
    </>
  );
}

export default FeaturedProducts;