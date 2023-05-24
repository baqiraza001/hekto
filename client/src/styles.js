import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--lato)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export const themeStyles = {
  topBarContainer: {
    fontFamily: "var(--josefin)",
  },
  topBarGrid: {
    height: { xs: "100%" },
    justifyContent: "space-evenly",
    paddingTop: { xs: "10px", lg: 0 },
  },
  btnMenu: {
    color: "var(--white)",
    textTransform: "capitalize",
    fontFamily: "var(--josefin)",
    fontSize: '16px',
    fontWeight: 600,
    paddingLeft: { xs: 0 },
    textDecoration: "none",
  },
  btnMenuIcon: {
    marginLeft: "-8px",
  },
  btnCartIcon: {
    marginLeft: { xs: "10px", lg: "20px" },
  },
  menuLink: {
    color: "black",
    textDecoration: "none",
    fontFamily: "var(--josefin)",
  },
  headerSearchInputBtn: {
    borderRadius: 0,
    backgroundColor: "var(--pink)",
    "&:hover": {
      backgroundColor: "var(--pink)",
    },
    "&:focus": {
      backgroundColor: "var(--pink)",
    },
    border: 0,
  },
  mainHeading: {
    fontFamily: "var(--josefin)",
    fontSize: "32px",
    lineHeight: "49px",
    color: "#1A0B5B",
    fontWeight: 700,
  },
  productTitle: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "22px",
    color: "var(--pink)",
  },
  productCode: {
    fontFamily: "var(--josefin)",
    fontSize: "14px",
    lineHeight: "16px",
    color: "var(--off-blue)",
  },
  productPrice: {
    fontFamily: "var(--josefin)",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "17px",
    color: "var(--off-blue)",
  },
  singleTab: {
    fontFamily: "var(--lato)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "22px",
    textTransform: "capitalize",
    padding: "0 30px",
  },
  discountItemHeading: {
    fontFamily: "Josefin Sans",
    fontSize: "30px",
    lineHeight: "132%",
    letterSpacing: "0.015em",
    color: "var(--off-blue)",
    margin: "10px 0 ",
    fontWeight: "bold",
  },
  discountedItemSubHeading: {
    fontFamily: "Josefin Sans",
    fontSize: "21px",
    lineHeight: "30px",
    letterSpacing: "0.015em",
    color: "var(--pink)",
    margin: "10px 0 ",
  },
  discountedItemDescription: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontHeight: 400,
    fontSize: "16px",
    lineHeight: "30px",
    letterSpacing: "0.02em",
    color: "var(--light-gray)",
  },
  discountedItemDescriptionPoints: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontHeight: 400,
    fontSize: "15px",
    lineHeight: "30px",
    letterSpacing: "0.02em",
    color: "var(--light-gray)",
  },
  discountBtn: {
    borderRadius: 0,
    color: "var(--white)",
    padding: "15px 48px",
    marginTop: "20px",
    backgroundColor: "var(--pink)",
    "&:hover": {
      backgroundColor: "var(--pink)",
    },
    "&:focus": {
      backgroundColor: "var(--pink)",
    },
  },
  btnText: {
    fontFamily: "var(--josefin)",
    fontSize: "17px",
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: "#FFFFFF",
  },
  updatesHeading: {
    fontFamily: "var(--josefin)",
    fontSize: "35px",
    color: "#151875",
    textAlign: "center",
    letterSpacing: "0.0015em",
    fontWegith: 700,
  },
  latestBlogsHeading: {
    fontFamily: "Josefin Sans",
    fontSize: "18px",
    color: "#151875",
    fontStyle: "600",
    margin: "20px 0",
  },
  latestBlogDescription: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontHeight: 400,
    fontSize: "16px",
  },
  latestBlogAuthor: {
    fontFamily: "Josefin Sans",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#151875",
  },
  latestBlogButton: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "30px",
    textDecoration: " underline",
    marginBottom: "20px",
  },

  // Products Page
  // Filtes
  mainContainer: {
    marginTop: "50px",
  },

  //footer code
  footerCopyRightText: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontHeight: 600,
    fontSize: "16px",
    lineHeight: "19px",
    color: "#9DA0AE",
  },
  footerSocialIcon: {
    color: "var(--off-blue)",
    margin: "0 5px",
  },
  footerLogo: {
    fontFamily: "Josefin Sans",
    fontSize: "38px !important",
    lineHeight: "45px",
    color: "#000000",
    marginBottom: "20px",
    fontWeight: "700 !important",
    marginBottom: "20px !important",
  },
  footerInput: {
    background: "#FFFFFF",
    borderRadius: "3px",
    marginRight: "10px",
  },
  footerButton: {
    backgroundColor: "var(--pink) !important",
    borderRadius: "3px",
    "&:hover": {
      background: "var(--pink)",
    },
  },
  footerButtonText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "19px",
    color: "#EEEFFB",
  },
  footerAddress: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "19px",
    color: "#8A8FB9",
  },
  footerSection: {
    marginBottom: "20px",
  },
  footerHeading: {
    fontFamily: "Josefin Sans",
    fontSize: "22px !important",
    lineHeight: "26px",
    color: "#000000",
    marginBottom: "10px",
    fontWeight: "700 !important",
    marginBottom: "20px !important",
  },
  footerLinks: {
    display: "flex",
    flexDirection: "column",
  },
  footerLink: {
    fontFamily: "Lato",
    fontStyle: "normal",
    textDecoration: "none",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "35px",
    color: "#8A8FB9",
    marginBottom: "5px",
    textDecoration: "none",
    "&:hover": {
      color: "#FB2E86",
    },
  },
  productListProductTitle: {
    fontFamily: "Josefin Sans",
    fontStyle: "normal",
    fontHeight: 700,
    fontSize: "18px",
    lineHeight: "18px",
    textAlign: "center",
    color: "#151875",
    fontWeight: "bold",
  },
  //footer code

  // breadcurmbs
  latestBlogButton: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "30px",
    textDecoration: " underline",
    marginBottom: "20px",
  },
  breaCrumbsHeading: {
    fontFamily: "var(--josefin)",
    fontSize: { xs: "28px", md: "36px" },
    lineHeight: "42px",
    color: "#101750",
    fontWeight: "600",
  },
  breaCrumbsLink: {
    my: 2,
    color: "var(--pink)",
    display: "block",
    fontSize: "16px",
    fontFamily: "var(--lato)",
    fontWeight: "500",
    textDecoration: "none",
  },
  breadcrumbsBox: {
    padding: { md: "72px" },
    paddingTop: { xs: "40px" },
    paddingBottom: { xs: "40px" },
  },
  // breadcurmbs

  // horizontal filters
  filterResults: {
    color: "var(--soft-blue)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "14px",
    textAlign: "center",
  },
  filterPerPageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "space-around", md: "space-between" },
  },
  filterPerPageText: {
    color: "var(--off-blue-blue)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
  },
  filterSortText: {
    color: "var(--off-blue-blue)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
  },
  filterSearchInputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "center" },
    marginTop: { xs: "20px", md: "0" },
  },
  filterViewText: {
    display : {md : "flex", xs :"none"},
    color: "var(--off-blue)",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
    marginRight: "10px",
  },
  filterWindowIcon: {
    color: "var(--off-blue)",
    fontSize: "20px",
    marginRight: "5px",
    display : {md : "flex", xs :"none"}
  },
  filterSearchInput: {
    marginLeft: "20px",
    padding: "0",
    borderWidth: "1px",
    borderRadius: 0,
    borderColor: "#E7E6EF",
    "& input": {
      padding: "6px 14px",
      borderColor: "var(--off-blue)",
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#E7E6EF",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E7E6EF",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E7E6EF !important",
      borderWidth: "1px",
    },
  },
  // horizontal filters

  //product details page
  productDetailsPrice: {
    fontFamily: 'Josefin Sans',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#111C85',
    marginRight: '10px'
  },
  productDetailsDiscountedPrice: {
    fontFamily: 'Josefin Sans',
    fontSize: '14px',
    lineHeight: '16px',
    textDecoration: 'line-through',
    color: "#FF2AAA",
    marginBottom: '20px'
  },
  productDetailsDescription: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontHeight: '400',
    fontSize: '16px',
    lineHeight: '28px',
    color: '#9295AA',
    marginBottom: '20px'
  },
  productDetailsAddToCartButton: {
    backgroundColor: 'var(--pink) !important',
    borderRadius: '0',
    boxShadow: '0',
    '&:hover': {
      background: 'var(--pink)',
      boxShadow: '0'
    }
  },
  productDetailsSubTitle: {
    fontFamily: 'var(--josefin)',
    fontSize: '18px',
    lineHeight: '21px',
    fontWeight: "bold",
    color: "#0D134E"
  },
  productDetailsTotalRating: {
    fontFamily: "var(--josefin)",
    fontSize: "14px",
    lineHeight: "29px",
    textTransform: "capitalize",
    color: '#151875',
    marginLeft: '5px',
    marginBottom: '20px'
  },
  //product details page: ended


  //horizontal Product Lists

  horizontalProductsListTitle: {
    fontFamily: 'Josefin Sans',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#111C85',
    fontWeight: "bold"
  },
  horizontalproductsListContainer: {
    padding: "7px",
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  },
  horizontalProductsListPrice: {
    fontFamily: 'Josefin Sans',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#111C85',
    marginRight: '10px'
  },
  horizontalProductsListDiscountedPrice: {
    fontFamily: 'Josefin Sans',
    fontSize: '14px',
    lineHeight: '16px',
    textDecoration: 'line-through',
    color: "#FF2AAA",
  },
  horizontalProductsListDescription: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontHeight: '400',
    fontSize: '16px',
    lineHeight: '28px',
    color: '#9295AA',
  },
  horizontalProductsListButtons: {
    background: "#fff",
    color: "var(--off-blue)",
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    margin: "0 5px"
  },
  horizontalProductsListIcons: {
    fontSize: "17px",
  },
  horizontalProductsListDetailArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },

  //horizontal Product Lists
  //Products Multi Filters


  productMultiFilterHeading: {
    fontFamily: 'Josefin Sans',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    color: '#151875',
    fontWeight: "bold",
    textAlign: "start",
    textDecoration: 'underline',
    textDecorationColor: '#000',
    textDecorationThickness: '1px',
  },
  productMultiFilterOptions: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontHeight: 400,
    fontSize: '16px',
    lineHeight: '30px',
    color: '#7E81A2',
  },

  //Products Multi Filters: ended

  //checkout
  checkoutInput: {
    marginBottom: '10px',
    borderBottom: '1px solid #C1C8E1',
    '&::placeholder': { color: "#C1C8E1" },
    '& .MuiInput-underline::before': {
      borderBottom: '1px solid #C1C8E1'
    },
    '&:hover .MuiInput-underline::before': {
      borderBottom: '1px solid #C1C8E1 !important'
    },
    '& .MuiInput-underline::after': {
      borderBottom: '1px solid #C1C8E1'
    },
    '& .MuiInput-underline::after': {
      borderBottom: '1px solid #C1C8E1'
    },
  },
  //checkout: ended

  // Product description Details Tabs Styling is Started
  productDescriptionContainer: {
    background: "var(--product-description-background)"
  },
  prductDescriptionTabsTitle: {
    fontFamily: 'Josefin Sans',
    fontSize: '18px',
    lineHeight: '28px',
    textDecorationzine: 'underline',
    color: '#151875',
    fontWeight: "bold",
    textTransform: "capitalize",

  },
  prductDescriptionHeading: {
    fontFamily: 'Josefin Sans',
    fontSize: '22px',
    lineHeight: '26px',
    color: '#151875',
    fontWeight: "bold"
  },
  productDescriptionText: {
    fontFamily: 'Josefin Sans',
    fontSize: '16px',
    lineHeight: '29px',
    color: '#A9ACC6',
    display: 'flex',
    alignItems: "center"
  },
  productDescriptionPoints: {
    fontFamily: 'Josefin Sans',
    fontSize: '14px',
    lineHeight: '29px',
    color: '#A9ACC6',
    display: 'flex',
    alignItems: "center",
    '&:hover .MuiSvgIcon-root': {
      color: "blue"
    }
  },
  productDescriptionPointIcon: {
    color: "black",
    fontSize: '20px',
  },
  relatedProductHeading: {
    fontFamily: 'Josefin Sans',
    fontSize: '36px',
    lineHeight: '42px',
    color: '#101750',
    fontWeight: "bold",
  },
  // Product description Details Tabs: ended


};
