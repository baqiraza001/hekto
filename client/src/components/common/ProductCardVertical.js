import { Grid, Box, Paper, Typography, Button } from "@mui/material";
import { themeStyles } from '../../styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Link } from "react-router-dom";

function ProductCardVertical({
  productImage,
  isMobile,
  productTitle,
  productPrice,
  viewDetailsLink
}) {
  return (
    <Link style={{ color: 'inherit', textDecoration: 'none' }} to={viewDetailsLink}>
      <Box m={!isMobile ? 1 : 2}>
        <Paper square elevation={3} sx={{
          borderTopRightRadius: '5px', borderTopLeftRadius: '5px',
          '&:hover .imageBox': {
            backgroundColor: 'var(--product-background-hover)',
          },
          '&:hover .iconsContainer': {
            visibility: 'visible'
          },
          '&:hover .detailsBox': {
            backgroundColor: '#2F1AC4',
          },
          ':hover': {
            border: '2px solid #F701A8',
            borderRadius: 0,
            boxShadow: 0
          },
          '&:hover .productTitle': {
            color: 'white'
          },
          '&:hover .productOtherDetails': {
            color: '#F3F9FF'
          },
          '&:hover .detailsButton': {
            visibility: 'visible'
          },

        }}>
          <Box className="imageBox" display="flex" justifyContent="center" alignItems="center" sx={{
            width: '100%',
            height: '236px',
            backgroundColor: 'var(--product-background)',
            position: 'relative',
          }}>
            <img
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              src={productImage} />

            <Box className="iconsContainer" sx={{
              position: 'absolute',
              top: 7,
              left: 10,
              visibility: 'hidden',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2,
            }}>
              <AddShoppingCartIcon className="productHoverIcons" sx={{ color: '#1389FF', padding: '10px', '&:hover': { backgroundColor: '#EEEFFB', color: '#2F1AC4', borderRadius: '50%', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.05)' } }} />
              {/* <FavoriteBorderIcon className="productHoverIcons" sx={{ padding: '10px', color: '#1389FF', '&:hover': { backgroundColor: '#EEEFFB', color: '#2F1AC4', borderRadius: '50%', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.05)' } }} /> */}
              <ZoomInIcon className="productHoverIcons" sx={{ padding: '10px', color: '#1389FF', '&:hover': { backgroundColor: '#EEEFFB', color: '#2F1AC4', borderRadius: '50%', boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.05)' } }} />
            </Box>

            {/* Add button */}
            <Box position="absolute" bottom={0} transform="translateX(-50%)" py={1} visibility="hidden" className="detailsButton">
              <Button variant="contained" sx={{ padding: '8px 13px', borderRadius: '2px', backgroundColor: '#08D15F', color: '#FFFFFF', fontFamily: 'var(--josefin)', fontSize: '12px', '&:hover': { backgroundColor: '#08D15F', color: '#FFFFFF' } }} size="small">
                View Details
              </Button>
            </Box>

          </Box>
          <Box textAlign='center' className="detailsBox" paddingBottom={2}>
            <Typography className="productTitle" varinat='h5' mb={2} paddingTop={2} sx={{ ...themeStyles.productTitle }}>{productTitle.length > 20 ? productTitle.substring(0, 20) + '...' : productTitle}</Typography>
            {/* // <Typography className="productOtherDetails" sx={{...themeStyles.productCode}} mb={1}>Code - Y523201</Typography> */}
            <Typography className="productOtherDetails" sx={{ ...themeStyles.productPrice }} mt={2}>{productPrice}</Typography>
          </Box>
        </Paper>
      </Box>
    </Link>
  );

}
export default ProductCardVertical;