import { Link } from 'react-router-dom';
import { Typography, TextField, Button, Grid, OutlinedInput, InputAdornment, FormControl, InputLabel, useMediaQuery, Box, Container } from '@mui/material';
import { useTheme } from '@emotion/react';
import { themeStyles } from '../../../styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSelector } from "react-redux";

function Footer() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const {configuration, latestProducts} = useSelector( state => ({configuration: state.home.configuration, latestProducts: state.home.data.latestProducts }) );

    const categories = Object.keys(latestProducts[0].latestProducts);
    return (
        <>
            <Box sx={{
                backgroundColor: '#F4F6F8',
                padding: '40px 20px 0 20px'
            }}>
                <Container maxWidth={"md"} disableGutters>
                    <Grid container justifyContent={isMobile ? "center" : "start"} >
                        <Grid item md={5} marginBottom={isMobile ? 5 : 0} textAlign={isMobile ? "center" : "start"}>
                            <Typography variant="h1" sx={{ ...themeStyles.footerLogo }}>
                                {configuration.siteName}
                            </Typography>

                            <FormControl sx={{ margin: "5px 0", width: isMobile ? '100%' : '80%' }} variant="outlined">
                                <OutlinedInput
                                    sx={{
                                        ...themeStyles.footerInput,
                                        paddingRight: "0",
                                        "& fieldset": {
                                            border: "none !important",
                                            borderColor: "transparent !important"
                                        }
                                    }}
                                    id="outlined-adornment-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Button disableElevation variant="contained" sx={{ ...themeStyles.footerButton }}>
                                                <Typography sx={{ ...themeStyles.footerButtonText }}>Subscribe</Typography>
                                            </Button>
                                        </InputAdornment>
                                    }
                                    placeholder="Enter Email"
                                    size='small'
                                    fullWidth={isMobile ? true : false}
                                />
                            </FormControl>
                            <Typography sx={{ ...themeStyles.footerAddress }}>
                                {configuration.address}
                            </Typography>
                        </Grid>
                        <Grid container item md={7} justifyContent={isMobile ? "center" : "start"} spacing={2}>
                            <Grid item xs={6} sm={6} md={4} sx={{ ...themeStyles.footerSection }}>
                                <Typography variant="h2" sx={{ ...themeStyles.footerHeading }}>
                                    Categories
                                </Typography>
                                <div style={{ ...themeStyles.footerLinks }}>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Laptops & Computers
                                    </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Cameras & Photography
                                    </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Smart Phones & Tablets
                                    </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Video Games & Consoles
                                    </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Waterproof Headphones
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} sx={{ ...themeStyles.footerSection }}>
                                <Typography variant="h2" sx={{ ...themeStyles.footerHeading }}>
                                    Customer Care
                                </Typography>
                                <div style={{ ...themeStyles.footerLinks }}>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        My Account                        </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Discount                        </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Returns                        </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Orders History                        </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Order Tracking                        </Link>
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={6} md={4} display={isMobile ? "none" : "block"} sx={{ ...themeStyles.footerSection }}>
                                <Typography variant="h2" sx={{ ...themeStyles.footerHeading }}>
                                    Pages
                                </Typography>
                                <div style={{ ...themeStyles.footerLinks }}>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Blog
                                    </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Browse the Shop</Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Category
                                    </Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Pre-Built Pages</Link>
                                    <Link to="/" style={{ ...themeStyles.footerLink }}>
                                        Visual Composer Elements
                                    </Link>

                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

            </Box>
            <Box sx={{ background: "#E7E4F8" }} py={isMobile ? 0 : 1}>
                <Container maxWidth={"md"} disableGutters>
                    <Grid container alignItems={"center"}>
                        <Grid item md={6} xs={12} mt={isMobile ? 2 : 0} textAlign={isMobile ? "center" : "start"}>
                            <Typography sx={{ ...themeStyles.footerCopyRightText }}>
                                &copy; {configuration.siteName} - All Rights Reserved
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs={12} my={isMobile ? 1 : 0} textAlign={isMobile ? "center" : "end"}>
                            <Link to={configuration.facebookLink} style={{ ...themeStyles.footerLink }}><FacebookIcon sx={{ ...themeStyles.footerSocialIcon }} /></Link>
                            <Link to={configuration.instagramLink} style={{ ...themeStyles.footerLink }}><InstagramIcon sx={{ ...themeStyles.footerSocialIcon }} /></Link>
                            <Link to={configuration.twitterLink} style={{ ...themeStyles.footerLink }}><TwitterIcon sx={{ ...themeStyles.footerSocialIcon }} /></Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
export default Footer;