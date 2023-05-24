import { Box, Grid, Paper, Typography, useTheme, useMediaQuery } from "@mui/material"
import { themeStyles } from "../../styles"
import offer1Image from '../../static/images/offers/offer1.png';
import offer2Image from '../../static/images/offers/offer2.png';
import offer3Image from '../../static/images/offers/offer3.png';
import offer4Image from '../../static/images/offers/offer4.png';

function OffersList() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Box mt={5} textAlign="center">
                <Typography variant="h1" sx={{ ...themeStyles.mainHeading, fontSize: !isMobile ? '42px' : '32px' }}>What Shopex Offer!</Typography>
            </Box>
            <Grid container columnSpacing={2} rowSpacing={3} justifyContent='center'>
                <Grid item md={3} xs={11}>
                    <Paper square elevation={3} sx={{ 
                        borderTopRightRadius: '5px', 
                        borderTopLeftRadius: '5px',
                    }}>
                    <Box className="imageBox" display="flex" justifyContent="space-evenly" alignItems="center" flexDirection="column" 
                        sx={{
                            width: '100%',
                            height: '320px',
                            backgroundColor: 'white',
                            position: 'relative',
                        }}>
                        <Box>
                            <img src={offer1Image} />
                        </Box>
                        <Box>
                            <Typography 
                            sx={{
                                fontFamily: 'var(--josefin)',
                                fontSize: '22px',
                                lineHeight: '26px',
                                color: 'var(--off-blue)',
                                fontWeight: '700'
                            }}>24/7 Support</Typography>
                        </Box>
                        <Box>
                            <Typography 
                            variant="body1"
                            sx={{
                                fontFamily: 'var(--lato)',
                                fontWeight: '700',
                                fontStyle: 'normal',
                                fontSize: '16px',
                                lineHeight: '26px',
                                textAlign: 'center',
                                color: 'rgba(26, 11, 91, 0.3)'
                            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</Typography>
                        </Box>
                    </Box>
                    </Paper>
                </Grid>
                <Grid item md={3} xs={11}>
                    <Paper square elevation={3} sx={{ 
                        borderTopRightRadius: '5px', 
                        borderTopLeftRadius: '5px',
                    }}>
                    <Box className="imageBox" display="flex" justifyContent="space-evenly" alignItems="center" flexDirection="column" 
                        sx={{
                            width: '100%',
                            height: '320px',
                            backgroundColor: 'white',
                            position: 'relative',
                        }}>
                        <Box>
                            <img src={offer2Image} />
                        </Box>
                        <Box>
                            <Typography 
                            sx={{
                                fontFamily: 'var(--josefin)',
                                fontSize: '22px',
                                lineHeight: '26px',
                                color: 'var(--off-blue)',
                                fontWeight: '700'
                            }}>24/7 Support</Typography>
                        </Box>
                        <Box>
                            <Typography 
                            variant="body1"
                            sx={{
                                fontFamily: 'var(--lato)',
                                fontWeight: '700',
                                fontStyle: 'normal',
                                fontSize: '16px',
                                lineHeight: '26px',
                                textAlign: 'center',
                                color: 'rgba(26, 11, 91, 0.3)'
                            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</Typography>
                        </Box>
                    </Box>
                    </Paper>
                </Grid>
                <Grid item md={3} xs={11}>
                    <Paper square elevation={3} sx={{ 
                        borderTopRightRadius: '5px', 
                        borderTopLeftRadius: '5px',
                    }}>
                    <Box className="imageBox" display="flex" justifyContent="space-evenly" alignItems="center" flexDirection="column" 
                        sx={{
                            width: '100%',
                            height: '320px',
                            backgroundColor: 'white',
                            position: 'relative',
                        }}>
                        <Box>
                            <img src={offer3Image} />
                        </Box>
                        <Box>
                            <Typography 
                            sx={{
                                fontFamily: 'var(--josefin)',
                                fontSize: '22px',
                                lineHeight: '26px',
                                color: 'var(--off-blue)',
                                fontWeight: '700'
                            }}>24/7 Support</Typography>
                        </Box>
                        <Box>
                            <Typography 
                            variant="body1"
                            sx={{
                                fontFamily: 'var(--lato)',
                                fontWeight: '700',
                                fontStyle: 'normal',
                                fontSize: '16px',
                                lineHeight: '26px',
                                textAlign: 'center',
                                color: 'rgba(26, 11, 91, 0.3)'
                            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</Typography>
                        </Box>
                    </Box>
                    </Paper>
                </Grid>
                <Grid item md={3} xs={11}>
                    <Paper square elevation={3} sx={{ 
                        borderTopRightRadius: '5px', 
                        borderTopLeftRadius: '5px',
                    }}>
                    <Box className="imageBox" display="flex" justifyContent="space-evenly" alignItems="center" flexDirection="column" 
                        sx={{
                            width: '100%',
                            height: '320px',
                            backgroundColor: 'white',
                            position: 'relative',
                        }}>
                        <Box>
                            <img src={offer4Image} />
                        </Box>
                        <Box>
                            <Typography 
                            sx={{
                                fontFamily: 'var(--josefin)',
                                fontSize: '22px',
                                lineHeight: '26px',
                                color: 'var(--off-blue)',
                                fontWeight: '700'
                            }}>24/7 Support</Typography>
                        </Box>
                        <Box>
                            <Typography 
                            variant="body1"
                            sx={{
                                fontFamily: 'var(--lato)',
                                fontWeight: '700',
                                fontStyle: 'normal',
                                fontSize: '16px',
                                lineHeight: '26px',
                                textAlign: 'center',
                                color: 'rgba(26, 11, 91, 0.3)'
                            }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.</Typography>
                        </Box>
                    </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default OffersList