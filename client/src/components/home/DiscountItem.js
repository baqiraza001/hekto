import { Button, Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material';
import { themeStyles } from '../../styles';
import discountedProduct from '../../static/images/discount_images/discount1.png'
import { Box } from '@mui/system';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { useTheme } from "@emotion/react";
import { Link } from 'react-router-dom';

function DiscountItem() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    return (

        <Grid container my={3} >
            <Grid item md={12} my={3} sx={{ display: "flex", textAlign: "center" }}>
                <Typography sx={{ ...themeStyles.mainHeading }}>Discount Item</Typography>
            </Grid>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="secondary"
                centered={!isMobile ? true : false}
                variant={isMobile ? 'scrollable' : 'standard'}
                scrollButtons={isMobile ? true : false}
                allowScrollButtonsMobile={isMobile ? true : false}
                sx={{
                    '& .Mui-selected': {
                        color: 'var(--pink)',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'var(--pink)'
                    }
                }}
            >
                <Tab label="New Arival" id={`simple-tabpanel-0`} sx={{ ...themeStyles.singleTab }} />
                <Tab label="Best Seller" id={`simple-tabpannel-1`} sx={{ ...themeStyles.singleTab }} />
                <Tab label="Featured" id={`simple-tabpanel-2`} sx={{ ...themeStyles.singleTab }} />
                <Tab label="Special Offer" id={`simple-tabpanel-2`} sx={{ ...themeStyles.singleTab }} />
            </Tabs>



            <div role="tabpanel" hidden={value !== 0} aria-labelledby={`simple-tab-${0}`} >
                <Grid container >
                    <Grid item md={6} sx={{ display: "flex", alignItems: "center" }} >
                        <Box>

                            <Grid item md={12} sx={{ textAlign: { md: "start", xs: "center" } }}>
                                <Typography sx={{ ...themeStyles.discountItemHeading }}>20% Discount Of All Products</Typography>
                                <Typography sx={{ ...themeStyles.discountedItemSubHeading }}>Eams Sofa Compact</Typography>
                                <Typography sx={{ ...themeStyles.discountedItemDescription }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.</Typography>
                            </Grid>


                            <Grid container sx={{ textAlign: { md: "start", xs: "center" } }}>

                                <Grid item md={6} xs={12}>
                                    <Typography sx={{ ...themeStyles.discountedItemDescriptionPoints, alignItems: "center" }} >
                                        <DoneIcon /> Material expose like metals
                                    </Typography>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Typography sx={{ ...themeStyles.discountedItemDescriptionPoints, alignItems: "center" }} >
                                        <DoneIcon /> Material expose like metals
                                    </Typography>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Typography sx={{ ...themeStyles.discountedItemDescriptionPoints, alignItems: "center" }} >
                                        <DoneIcon /> Material expose like metals
                                    </Typography>
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Typography sx={{ ...themeStyles.discountedItemDescriptionPoints, alignItems: "center" }} >
                                        <DoneIcon /> Material expose like metals
                                    </Typography>
                                </Grid>

                            </Grid>
                            <Grid container sx={{ justifyContent: { md: "start", xs: "center" } }}>
                                <Button sx={{ ...themeStyles.discountBtn }}><Link style={{ color: 'inherit', textDecoration: 'none'}} to="/products">Shop Now</Link></Button>

                            </Grid>

                        </Box>
                    </Grid>

                    <Grid item md={6} xs={12} sx={{ display: "flex", justifyContent: { md: "start", xs: "center" } }}>
                        <img width={"85%"} src={discountedProduct} alt="" />
                    </Grid>
                </Grid>
            </div>


        </Grid>
    )
}

export default DiscountItem