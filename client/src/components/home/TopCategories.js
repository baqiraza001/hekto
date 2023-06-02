import { Box, Typography, useTheme, useMediaQuery, Grid, Button } from "@mui/material"
import ShopProductCard from "../common/ShopProductCard";
import { themeStyles } from "../../styles";
import categoryImage1 from '../../static/images/top_categories/category1.png';
import categoryImage2 from '../../static/images/top_categories/category2.png';
import categoryImage3 from '../../static/images/top_categories/category3.png';
import categoryImage4 from '../../static/images/top_categories/category4.png';
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TopCategories() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const topProducts = useSelector(({ home: { data: { topProducts } } }) => topProducts);

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        slidesToShow: isMobile ? 1 : 4,
        slidesToScroll: isMobile ? 1 : 4,
        arrows: false
    };

    return (
        <>
            {topProducts && topProducts.length > 0 && (
                <>
                    <Box mt={5} textAlign="center">
                        <Typography variant="h1" sx={{ ...themeStyles.mainHeading, color: '#151875', fontSize: !isMobile ? '42px' : '32px' }}>Top Categories</Typography>
                    </Box>

                    <Slider key={isMobile ? "mobile" : "desktop"} {...settings}>
                        {topProducts.map((product) => (
                            <ShopProductCard
                                key={product._id}
                                columnNumber={3}
                                viewDetailsLink={`/products/details/${product._id}`}
                                productImage={product.productPictures && product.productPictures.length > 0 ? process.env.REACT_APP_BASE_URL + `content/products/${product._id}/${product.productPictures[0]}` : null}
                                isMobile={isMobile}
                                title={product.name}
                                price={product.sale_price}
                                discount={product.discountPrice}
                                saleText={product.discountPercentage ? `${product.discountPercentage}% OFF` : null}
                                detailsBoxStyle={{ flexDirection: 'column', justifyContent: 'space-between', 'alignItems': 'center' }}
                                priceStyle={{ marginRight: '20px' }}
                                titleStyle={{ fontWeight: '400', fontSize: '20px', lineHeight: '20px', color: 'var(--off-blue)', marginBottom: '10px' }}
                                discountStyle={{ color: 'var(--dark-light)' }}
                                saleTagHoverStyle={{ visibility: 'hidden' }}
                                iconsHoverStyle={{ visibility: 'hidden' }}
                                paperStyle={{ 'padding': '10px', boxShadow: 'none' }}
                                paperHoverStyle={{ border: '0', '&:hover .detailsButton': { visibility: 'visible' } }}
                                imageBoxStyle={{ backgroundColor: '#F6F7FB', "boxShadow": "0px 8px 40px 0px #31208A0D", transform: 'rotate(-54deg)', borderRadius: '50%', width: '180px', height: '180px', margin: 'auto' }}
                                imageHoverStyle={{ backgroundColor: '#F6F7FB', borderLeft: '5px solid var(--voilet)' }}
                                imageStyle={{ transform: 'rotate(54deg)' }}
                                imageBoxContent={<Box position="absolute" bottom={0} py={1} visibility="hidden" className="detailsButton" sx={{ transform: 'rotate(54deg) translateX(-60%)' }}>
                                    <Button variant="contained" sx={{ padding: '5px 12px', borderRadius: '2px', backgroundColor: '#08D15F', color: '#FFFFFF', fontFamily: 'var(--josefin)', fontSize: '12px', '&:hover': { backgroundColor: '#08D15F', color: '#FFFFFF' } }} size="small">
                                        View Details
                                    </Button>
                                </Box>
                                }
                            />
                        ))}

                    </Slider>
                </>
            )
            }
        </>
    )
}

export default TopCategories