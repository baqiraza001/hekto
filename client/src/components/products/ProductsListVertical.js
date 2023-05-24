import { useTheme } from "@emotion/react";
import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import ShopProductCard from "../common/ShopProductCard";
import shopProduct1 from "../../static/images/products/shop/shop1.png";
import shopProduct2 from "../../static/images/products/shop/shop2.png";
import shopProduct3 from "../../static/images/products/shop/shop3.png";
import shopProduct4 from "../../static/images/products/shop/shop4.png";
import shopProduct5 from "../../static/images/products/shop/shop5.png";
import shopProduct6 from "../../static/images/products/shop/shop6.png";
import shopProduct7 from "../../static/images/products/shop/shop7.png";
import shopProduct8 from "../../static/images/products/shop/shop8.png";
import shopProduct9 from "../../static/images/products/shop/shop9.png";
import shopProduct10 from "../../static/images/products/shop/shop10.png";
import shopProduct11 from "../../static/images/products/shop/shop11.png";
import shopProduct12 from "../../static/images/products/shop/shop12.png";
import shopProduct13 from "../../static/images/products/shop/shop13.png";
import shopProduct14 from "../../static/images/products/shop/shop14.png";
import shopProduct15 from "../../static/images/products/shop/shop15.png";
import shopProduct16 from "../../static/images/products/shop/shop16.png";
import { themeStyles } from "../../styles";

function ProductsListVertical() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container columnSpacing={1} mb={5}>
      <ShopProductCard
        productImage={shopProduct4}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      />
      {/* <ShopProductCard
        productImage={shopProduct16}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      />
      <ShopProductCard
        productImage={shopProduct5}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      />
      <ShopProductCard
        productImage={shopProduct6}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      /> */}

      {/* <ShopProductCard
        productImage={shopProduct7}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      />
      <ShopProductCard
        productImage={shopProduct8}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      />
      <ShopProductCard
        productImage={shopProduct9}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      />
      <ShopProductCard
        productImage={shopProduct10}
        title={"RevolvingChair"}
        price={"$42.00"}
        discount={"$65.00"}
        saleText={"50% OFF"}
        isMobile={isMobile}
        columnNumber={3}
        paperStyle={{ boxShadow: "0" }}
        imageHoverStyle={{ backgroundColor: "#EBF4F3" }}
        iconHoverStyle={{ backgroundColor: "#fff" }}
        paperHoverStyle={{ border: "none" }}
        saleTagHoverStyle={{ visibility: "hidden" }}
        imageBoxStyle={{}}
        saleTagStyle={{}}
        saleBoxStyle={{}}
        iconsStyle={{}}
        detailsBoxStyle={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #E7E6EF",
        }}
        titleStyle={{ ...themeStyles.productListProductTitle }}
        priceStyle={{}}
        discountStyle={{}}
        priceBoxStyle={{ marginTop: "20px" }}
      /> */}
    </Grid>
  );
}

export default ProductsListVertical;
