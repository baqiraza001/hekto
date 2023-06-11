import {
  Box,
  Grid,
  Rating,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";

import thumb1 from "../../static/images/products/thumb1.png";
import thumb2 from "../../static/images/products/thumb2.png";
import thumb3 from "../../static/images/products/thumb3.png";
import { Container } from "@mui/system";
import { themeStyles } from "../../styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ProductsDetailTabs from "./ProductsDetailTabs";
import RelatedProducts from "./RelatedProducts";
import BreadCrumbs from "../common/products/BreadCrumbs"
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { productId } = useParams();
  let [searchParams] = useSearchParams();
  const { isFeatured, isLatest, isTrending, isTop, category } = Object.fromEntries([...searchParams]);


  const product = useSelector(state => {
    if (isFeatured) {
      return state.home.data.featuredProducts.find(product => product._id === productId)
    }

    if (isLatest) {
      const latestProducts = state.home.data.latestProducts[0].latestProducts;
      return latestProducts[category].find(product => product._id === productId)
    }

    if (isTrending) {
      return state.home.data.trendingProducts.find(product => product._id === productId)
    }

    if (isTop) {
      return state.home.data.topProducts.find(product => product._id === productId)
    }

  });


  const breadCrumbs = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
  ]

  const images = product.productPictures;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClickThumbnail = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <>
      <Container maxWidth={'xl'} disableGutters sx={{ 'background': 'var(--bread-crumbs)' }}  >
        <BreadCrumbs title={product.name} breadCrumbs={breadCrumbs} active={"Details"} />
      </Container>
      <Container
        maxWidth="md"
        sx={{
          boxShadow: "0px 0px 25px 10px #F6F4FD",
          borderRadius: "2px",
        }}
        disableGutters
      >
        <Grid container my={5} p={1}>
          <Grid item md={7}>
            <div
              style={{ display: "flex", flexWrap: "wrap-reverse", flexGrow: 1 }}
            >
              <Grid item md={2} xs={12}>
                <Box
                  mr={1}
                  my={3}
                  sx={{
                    display: isMobile ? "flex" : "block", // Set a fixed height for the container to enable scrolling
                    height: isMobile ? "10vh" : "80vh", // Set a fixed height for the container to enable scrolling
                    overflowY: "overlay", // Add vertical scrolling
                    "&::-webkit-scrollbar": {
                      display: "none", // Hide the scrollbar for WebKit-based browsers
                    },
                    "-ms-overflow-style": "none", // Hide the scrollbar for IE and Edge
                    scrollbarWidth: "none", // Hide the scrollbar for Firefox
                    scrollBehavior: "smooth", // Add a smooth scroll transition
                    cursor: "pointer",
                  }}
                >
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={process.env.REACT_APP_BASE_URL + `content/products/${product._id}/${image}`}
                      alt={process.env.REACT_APP_BASE_URL + `content/products/${product._id}/${image}`}
                      style={{ maxWidth: "100%", height: "auto" }}
                      onClick={() => handleClickThumbnail(index)}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item md={10} my={3}>
                <img
                  src={process.env.REACT_APP_BASE_URL + `content/products/${product._id}/${images[currentImageIndex]}`}
                  alt={process.env.REACT_APP_BASE_URL + `content/products/${product._id}/${images[currentImageIndex]}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Grid>
            </div>
          </Grid>
          <Grid item md={5}>
            <Box
              ml={2}
              my={3}
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
              <Typography mb={3} sx={{ ...themeStyles.mainHeading }}>
                {product.name}
              </Typography>
              <Box mb={3}>
                <Rating
                  value={5}
                  readOnly
                  sx={{ fontSize: "14px", color: "#FFC416" }}
                />
                <Typography
                  variant="caption"
                  sx={{ ...themeStyles.productDetailsTotalRating }}
                >
                  (22)
                </Typography>
              </Box>
              <Box display={"flex"} mr={"10px"}>
                <Typography sx={{ ...themeStyles.productDetailsPrice }}>
                  {product.sale_price}
                </Typography>
                <Typography sx={{ ...themeStyles.productDetailsDiscountedPrice }}>
                  {product.discountPrice}
                </Typography>
              </Box>
              <Typography
                mb={2}
                sx={{
                  ...themeStyles.productDetailsPrice,
                  color: "#0D134E",
                  fontSize: "16px",
                  lineHeight: "19px",
                  fontWeight: "600",
                }}
              >
                Color: <Button variant="contained" sx={{ backgroundColor: product.color, color: product.color, minWidth: '20px', height: '30px', borderRadius: 0 }}></Button>
              </Typography>
              <Typography sx={{ ...themeStyles.productDetailsDescription }}>{product.shortDescription}</Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                mb={3}
              >
                <Button
                  variant="contained"
                  sx={{ ...themeStyles.productDetailsAddToCartButton }}
                >
                  Add To Cart
                </Button>
              </Box>
              <Box mb={3}>
                <Typography variant="span" mb={3} sx={{ ...themeStyles.productDetailsSubTitle }}>
                  Category:
                </Typography>
                <Typography variant="span" ml={3}>{product.categoryName}</Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="span" mb={3} sx={{ ...themeStyles.productDetailsSubTitle }}>
                  Tags
                </Typography>
                <Typography variant="span" ml={3}>{product.tags}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={3}>
                <Typography sx={{ ...themeStyles.productDetailsSubTitle }}>
                  Share
                </Typography>
                <Box ml={4}>
                  <FacebookIcon sx={{ marginRight: "10px" }} />
                  <InstagramIcon
                    sx={{ color: "var(--pink)", marginRight: "10px" }}
                  />
                  <TwitterIcon sx={{ marginRight: "10px" }} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Detail Description */}

      <Box
        paddingY={9}
        sx={{
          ...themeStyles.productDescriptionContainer,
        }}
      >
        <ProductsDetailTabs product={product} />
      </Box>

      <Box
        paddingY={9}
      >
        <RelatedProducts />
      </Box>

    </>
  );
}