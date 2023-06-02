import { Grid, Box, Paper, Typography, Button, Rating } from "@mui/material";
import { themeStyles } from '../../styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";

function ShopProductCard({
    productImage,
    title,
    price,
    discount,
    saleText,
    imageIcons,

    isMobile,
    columnNumber,
    paperStyle,
    paperHoverStyle,
    imageHoverStyle,
    iconsHoverStyle,
    saleTagHoverStyle,
    imageBoxStyle,
    imageStyle,
    saleBoxStyle,
    saleTagStyle,
    iconsStyle,
    detailsBoxStyle,
    titleStyle,
    priceStyle,
    discountStyle,
    imageBoxContent,
    priceBoxStyle,
    rating,
    viewDetailsLink
}) {
    return (
        <Grid item md={columnNumber || 4} xs={12}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={viewDetailsLink}>
                <Box m={!isMobile ? 1 : 3}>
                    <Paper square sx={{
                        ...paperStyle,
                        borderTopRightRadius: '5px', borderTopLeftRadius: '5px',
                        '&:hover .imageBox': {
                            backgroundColor: 'white',
                            ...imageHoverStyle
                        },
                        '&:hover .iconsContainer': {
                            visibility: 'visible',
                            ...iconsHoverStyle
                        },
                        ':hover': {
                            border: '2px solid #F701A8',
                            borderRadius: 0,
                            boxShadow: 0,
                            ...paperHoverStyle
                        },
                        '&:hover .saleTagBox': {
                            visibility: 'visible',
                            ...saleTagHoverStyle
                        }

                    }}>
                        <Box className="imageBox" display="flex" justifyContent="center" alignItems="center" sx={{
                            width: '100%',
                            height: '236px',
                            backgroundColor: 'var(--product-background-hover)',
                            position: 'relative',
                            ...imageBoxStyle
                        }}>
                            <img
                                style={{
                                    maxWidth: '100%',
                                    height: isMobile ? '100%' : 'auto',
                                    ...imageStyle
                                }}
                                src={productImage} />

                            {/* Top Left Sale Tag */}
                            {saleText &&
                                <Box className="saleTagBox" sx={{ visibility: 'hidden', ...saleBoxStyle }}>
                                    <span className="saleTag" style={{
                                        position: 'absolute',
                                        top: 15,
                                        left: 10,
                                        fontFamily: 'var(--josefin)',
                                        backgroundColor: 'var(--off-navy-blue)',
                                        color: '#ffffff',
                                        fontSize: '14px',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        width: '60px',
                                        textAlign: 'center',
                                        transform: 'rotate(-20deg) skew(-10deg) translateX(-5px)',
                                        ...saleTagStyle
                                    }}>{saleText}</span>
                                </Box>
                            }

                            <Box className="iconsContainer" sx={{
                                position: 'absolute',
                                bottom: 7,
                                left: 10,
                                visibility: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                zIndex: 2,
                                ...iconsStyle
                            }}>
                                {imageIcons}
                                <AddShoppingCartIcon className="productHoverIcons" sx={{ color: '#2F1AC4', padding: '10px', '&:hover': { backgroundColor: '#EEEFFB', borderRadius: '50%', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.05)' } }} />
                                {/* <FavoriteBorderIcon className="productHoverIcons" sx={{ padding: '10px', color: '#2F1AC4', '&:hover': { backgroundColor: '#EEEFFB', borderRadius: '50%', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.05)' } }} /> */}
                                <ZoomInIcon className="productHoverIcons" sx={{ padding: '10px', color: '#2F1AC4', '&:hover': { backgroundColor: '#EEEFFB', borderRadius: '50%', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.05)' } }} />
                            </Box>

                            {imageBoxContent}
                        </Box>
                        <Box display="flex" alignItems="baseline" pt={3} px={1} justifyContent='space-between' className="detailsBox" paddingBottom={1} sx={{ ...detailsBoxStyle }}>
                            {
                                rating ?
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography className="productTitle" sx={{ ...themeStyles.productTitle, color: 'var(--off-blue)', fontSize: '16px', fontFamily: "var(--josefin)", fontWeight: "normal", ...titleStyle }}>{title.length > 20 ? title.substring(0, 20) + '...' : title}</Typography>
                                        <Rating value={rating} readOnly size='small' />
                                    </Box> :
                                    <Typography className="productTitle" sx={{ ...themeStyles.productTitle, color: 'var(--off-blue)', fontSize: '16px', fontFamily: "var(--josefin)", fontWeight: "normal", ...titleStyle }}>{title.length > 20 ? title.substring(0, 20) + '...' : title}</Typography>

                            }
                            <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ ...priceBoxStyle }}>
                                <Typography className="productOtherDetails" sx={{ ...themeStyles.productPrice, fontFamily: 'var(--josefin)', marginRight: '20px', ...priceStyle }}>{price}</Typography>
                                <Typography className="productOtherDetails" sx={{ ...themeStyles.productPrice, fontFamily: 'var(--josefin)', textDecorationLine: 'line-through', color: 'var(--pink)', fontSize: '12px', lineHeight: '14px', ...discountStyle }}>{discount}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Link>
        </Grid>
    );

}
export default ShopProductCard;