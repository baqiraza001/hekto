import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Slider from "react-slick";
import sofa from '../../static/images/sofa_promotional_header.png';
import bell_image from '../../static/images/bell_image.png';
import { Link } from "react-router-dom";

function InfoSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        appendDots: dots => (
            <div
                style={{
                    color: 'var(--pink)',
                    bottom: '10px',
                    fontSize: '20px'
                }}
            >
                <ul style={{ margin: "0px", fontSize: '20px' }}> {dots} </ul>
            </div>
        )
    };

    return (
        <Slider {...settings}>
            <Grid container sx={{ height: { xs: 'auto', md: '80vh' }, display: 'flex !important', 'backgroundColor': 'var(--light-purple)' }}>
                <Grid item md={2} xs={12} sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: { xs: 'center', md: 'block' } }}>
                    <img src={bell_image} width={200} />
                </Grid>
                <Grid item md={6} xs={12} sx={{ display: 'flex', textAlign: { xs: 'center', md: 'left' }, 'alignItems': 'center' }}>
                    <Box dipslay="flex" alignItems="center">
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ 'color': 'var(--pink)', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '700', 'fontSize': '16px', 'lineHeight': '28px' }}>
                            Best Furniture For Your Castle....
                        </Typography>
                        <Typography component="div" variant="h3" sx={{ 'fontFamily': 'var(--josefin) sans', 'fontWeight': 'bold', 'lineHeight': '70px', 'letterSpacing': '1.5' }}>
                            New Furniture Collection
                            Trends in 2020
                        </Typography>
                        <Typography my={3} component="div" variant="p" sx={{ 'color': 'var(--soft-blue)', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '600', 'fontSize': '16px', 'lineHeight': '28px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing
                            in phasellus non in justo.
                        </Typography>
                        <Button variant='contained' style={{ 'backgroundColor': 'var(--pink)', 'borderRadius': 0, 'padding': '16px 40px', 'fontFamily': 'Josefin Sans', 'fontSize': '17px', 'letterSpacing': '0.02em',  }} ><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/products">Shop Now</Link></Button>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12} sx={{ display: 'flex', 'alignItems': 'center', 'paddingRight': { md: '20px' }, marginTop: { xs: '15px' } }}>
                    <img src={sofa} width="100%" />
                </Grid>
            </Grid>


            <Grid container sx={{ height: { xs: 'auto', md: '80vh' }, display: 'flex !important', 'backgroundColor': 'var(--light-purple)' }}>
                <Grid item md={2} xs={12} sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: { xs: 'center', md: 'block' } }}>
                    <img src={bell_image} width={200} />
                </Grid>
                <Grid item md={6} xs={12} sx={{ display: 'flex', textAlign: { xs: 'center', md: 'left' }, 'alignItems': 'center' }}>
                    <Box dipslay="flex" alignItems="center">
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ 'color': 'var(--pink)', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '700', 'fontSize': '16px', 'lineHeight': '28px' }}>
                            Best Furniture For Your Castle....
                        </Typography>
                        <Typography component="div" variant="h3" sx={{ 'fontFamily': 'var(--josefin) sans', 'fontWeight': 'bold', 'lineHeight': '70px', 'letterSpacing': '1.5' }}>
                            New Furniture Collection
                            Trends in 2020
                        </Typography>
                        <Typography my={3} component="div" variant="p" sx={{ 'color': 'var(--soft-blue)', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '600', 'fontSize': '16px', 'lineHeight': '28px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing
                            in phasellus non in justo.
                        </Typography>
                        <Button variant='contained' style={{ 'backgroundColor': 'var(--pink)', 'borderRadius': 0, 'padding': '16px 40px', 'fontFamily': 'Josefin Sans', 'fontSize': '17px', 'letterSpacing': '0.02em',  }} ><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/products">Shop Now</Link></Button>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12} sx={{ display: 'flex', 'alignItems': 'center', 'paddingRight': { md: '20px' }, marginTop: { xs: '15px' } }}>
                    <img src={sofa} width="100%" />
                </Grid>
            </Grid>
            <Grid container sx={{ height: { xs: 'auto', md: '80vh' }, display: 'flex !important', 'backgroundColor': 'var(--light-purple)' }}>
                <Grid item md={2} xs={12} sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: { xs: 'center', md: 'block' } }}>
                    <img src={bell_image} width={200} />
                </Grid>
                <Grid item md={6} xs={12} sx={{ display: 'flex', textAlign: { xs: 'center', md: 'left' }, 'alignItems': 'center' }}>
                    <Box dipslay="flex" alignItems="center">
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ 'color': 'var(--pink)', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '700', 'fontSize': '16px', 'lineHeight': '28px' }}>
                            Best Furniture For Your Castle....
                        </Typography>
                        <Typography component="div" variant="h3" sx={{ 'fontFamily': 'var(--josefin) sans', 'fontWeight': 'bold', 'lineHeight': '70px', 'letterSpacing': '1.5' }}>
                            New Furniture Collection
                            Trends in 2020
                        </Typography>
                        <Typography my={3} component="div" variant="p" sx={{ 'color': 'var(--soft-blue)', 'fontFamily': 'Lato', 'fontStyle': 'normal', 'fontWeight': '600', 'fontSize': '16px', 'lineHeight': '28px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing
                            in phasellus non in justo.
                        </Typography>
                        <Button variant='contained' style={{ 'backgroundColor': 'var(--pink)', 'borderRadius': 0, 'padding': '16px 40px', 'fontFamily': 'Josefin Sans', 'fontSize': '17px', 'letterSpacing': '0.02em',  }} ><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/products">Shop Now</Link></Button>
                    </Box>
                </Grid>
                <Grid item md={4} xs={12} sx={{ display: 'flex', 'alignItems': 'center', 'paddingRight': { md: '20px' }, marginTop: { xs: '15px' } }}>
                    <img src={sofa} width="100%" />
                </Grid>
            </Grid>
        </Slider>
    );
}

export default InfoSlider;