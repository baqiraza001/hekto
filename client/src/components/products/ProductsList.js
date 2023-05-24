import { Box, FormControl, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import { Container } from "@mui/system";
import BreadCrumbs from "../common/products/BreadCrumbs";
import ProductsFilters from "../common/products/ProductsFilters";
import ProductsListVertical from "./ProductsListVertical";
import ProductMultiFilters from "./ProductMultiFilters";
import ProductsListsHorizontal from "./ProductsListsHorizontal";
import { themeStyles } from "../../styles";
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const breadCrumbs = [
  { to: "home", label: "Home" },
  { to: "pages", label: "Products" },
];

export default function ProductsList() {
  const [selectedProductBrandOption, setSelectedProductBrandOptions] = useState([])

  const handleProductBrandFilters = (event) => {
    if (event.target.checked) {
      setSelectedProductBrandOptions((options) => {
        return [...options, event.target.value]
      })
    } else {
      const updateSelectedProductBrandOption = selectedProductBrandOption.filter(option => (
        option !== event.target.value
      ))
      setSelectedProductBrandOptions(updateSelectedProductBrandOption)
    }
  }

  const [selectedDiscountedProductOption, setSelectedDiscountedProductOptions] = useState([])

  const handleDiscountedProductFilters = (event) => {
    if (event.target.checked) {
      setSelectedDiscountedProductOptions((options) => {
        return [...options, event.target.value]
      })
    } else {
      const updateSelectedDiscountedProductOption = selectedDiscountedProductOption.filter(option => (
        option !== event.target.value
      ))
      setSelectedDiscountedProductOptions(updateSelectedDiscountedProductOption)
    }
  }

  const [selectedCategoriesOption, setSelectedCategoriesOptions] = useState([])

  const handleCategoriesFilters = (event) => {
    if (event.target.checked) {
      setSelectedCategoriesOptions((options) => {
        return [...options, event.target.value]
      })
    } else {
      const updateSelectedCategoriesOption = selectedCategoriesOption.filter(option => (
        option !== event.target.value
      ))
      setSelectedCategoriesOptions(updateSelectedCategoriesOption)
    }
  }


  const [selectedRatingItemOption, setSelectedRatingItemOptions] = useState([])

  const handleRatingItemFilters = (event) => {
    if (event.target.checked) {
      setSelectedRatingItemOptions((options) => {
        return [...options, event.target.value]
      })
    } else {
      const updateSelectedRatingItemOption = selectedRatingItemOption.filter(option => (
        option !== event.target.value
      ))
      setSelectedRatingItemOptions(updateSelectedRatingItemOption)
    }
  }

  const [selectedPriceOption, setSelectedPriceOptions] = useState([])

  const handlePriceFilters = (event) => {
    if (event.target.checked) {
      setSelectedPriceOptions((options) => {
        return [...options, event.target.value]
      })
    } else {
      const updateSelectedPriceOption = selectedPriceOption.filter(option => (
        option !== event.target.value
      ))
      setSelectedPriceOptions(updateSelectedPriceOption)
    }
  }

  const [selectedColorOption, setSelectedColorOptions] = useState([])

  const handleColorFilters = (event) => {
    if (event.target.checked) {
      setSelectedColorOptions((options) => {
        return [...options, event.target.value]
      })
    } else {
      const updateSelectedColorOption = selectedColorOption.filter(option => (
        option !== event.target.value
      ))
      setSelectedColorOptions(updateSelectedColorOption)
    }
  }

  const filterData = {
    productBrands: {
      heading: "Product Brands",
      color: "var(--off-navy-blue)",
      options: [{ label: "Coaster Furniture", value: "CoasterFurniture" }, { label: "Fusion Dot High Fashion", value: "FusionDotHighFashion" }, { label: "Unique Furnitture Restor", value: "UniqueFurnittureRestor" }, { label: "Dream Furnitture Flipping", value: "DreamFurnittureFlipping" }, { label: "Young Repurposed", value: "YoungRepurposed" }, { label: "Green DIY furniture", value: "GreenDIYfurniture" }]
    },
    discountOffer: {
      heading: "Discount Offer",
      color: "var(--pink)",
      options: [{ label: "20% Cashback", value: "20%Cashback" }, { label: "5% Cashback Offer", value: "5%CashbackOffer" }, { label: "25% Discount Offer", value: "25%DiscountOffer" }]
    },
    categories: {
      heading: "Categories",
      color: "var(--pink)",
      options: [{ label: "Prestashop", value: "Prestashop" }, { label: "Magento", value: "Magento" }, { label: "Bigcommerce", value: "Bigcommerce" }, { label: "osCommerce", value: "osCommerce" }, { label: "3dcart", value: "3dcart" }, { label: "Bags", value: "Bags" }, { label: "Accessories", value: "Accessories" }, { label: "Jewellery", value: "Jewellery" }, { label: "Watches", value: "Watches" }]
    },
    ratingItem: {
      heading: "Rating Item",
      options: [{ label: 1, value: "1" }, { label: 2, value: "2" }, { label: 3, value: "3" }, { label: 4, value: "4" }, { label: 5, value: "5" }],
      color: "yellow"
    },
    priceFilter: {
      heading: "Price Filter",
      color: "var(--pink)",
      options: [{ label: "$0.00 - $150.00", value: "$0.00 - $150.00" }, { label: "$150.00 - $350.00", value: "$150.00 - $350.00" }, { label: "$150.00 - $504.00", value: "$150.00 - $504.00" }, { label: "$450.00 +", value: "$450.00 +" }]
    },
    colorFilter: {
      heading: "Color Filter",
      options: [{ label: "Blue", value: "Blue", color: "var(--blue)" }, { label: "Orange", value: "Orange", color: "var(--orange)" }, { label: "Brown", value: "Brown", color: "var(--brown)" }, { label: "Green", value: "Green", color: "var(--green)" }, { label: "Purple", value: "Purple", color: "var(--purple)" }]
    }

  }


  return (
    <>
      <Container
        maxWidth={"xl"}
        disableGutters
        sx={{ background: "var(--bread-crumbs)" }}
      >
        <BreadCrumbs breadCrumbs={breadCrumbs} />
      </Container>
      <Container maxWidth="md" disableGutters>
        <ProductsFilters />
        <ProductsListVertical />

        {/* product left side filters and horizontal products */}
        <Grid container sx={{ display : {md : "flex", xs :"none"} }}>
          <Grid item md={3}  >
            <ProductMultiFilters selectedOption={selectedProductBrandOption} handleFilters={handleProductBrandFilters} filterData={filterData.productBrands} />
            <ProductMultiFilters selectedOption={selectedDiscountedProductOption} handleFilters={handleDiscountedProductFilters} filterData={filterData.discountOffer} />
            <ProductMultiFilters selectedOption={selectedRatingItemOption} handleFilters={handleRatingItemFilters} filterData={filterData.ratingItem} />
            <ProductMultiFilters selectedOption={selectedCategoriesOption} handleFilters={handleCategoriesFilters} filterData={filterData.categories} />
            <ProductMultiFilters selectedOption={selectedPriceOption} handleFilters={handlePriceFilters} filterData={filterData.priceFilter} />
            <FormControl sx={{ margin: "5px 0", width: '80%' }} variant="outlined">
              <OutlinedInput
                sx={{
                  ...themeStyles.footerInput,
                  paddingRight: "0",
                  "& fieldset": {
                    border: "1px solid gray !important",
                  }
                }}
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography><SearchIcon sx={{
                      verticalAlign: "middle"
                    }} size="small" /></Typography>
                  </InputAdornment>
                }
                placeholder="$10.00 - 20000$"
                size='small'
              />
            </FormControl>
            <ProductMultiFilters selectedOption={selectedColorOption} handleFilters={handleColorFilters} filterData={filterData.colorFilter} />
          </Grid>
          <Grid item md={9}>
            <ProductsListsHorizontal />
            <ProductsListsHorizontal />
            <ProductsListsHorizontal />
            <ProductsListsHorizontal />
            <ProductsListsHorizontal />
          </Grid>
        </Grid>

      </Container>
    </>
  );
}
