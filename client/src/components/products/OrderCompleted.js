import { Box, Button, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import BreadCrumbs from "../common/products/BreadCrumbs";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { themeStyles } from "../../styles";
import clockImage from '../../static/images/products/clock.png'
import notepadImage from '../../static/images/products/notepad.png'
import sponsorsImage from '../../static/images/products/sponsors.png'

const breadCrumbs = [
  { to: "home", label: "Home" },
  { to: "pages", label: "Products" },
  { to: "pages", label: "Orders" },
];

export default function OrderCompleted() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Box sx={{
          textAlign: 'center',
          margin: '50px 1px',
          borderLeft: '2px dashed #D2D1D1',
          borderBottom: '2px dashed #D2D1D1',
          position: 'relative'
        }}>
          <Box sx={{
            position: 'absolute',
            left: isMobile ? '0' : '-48px',
            top: isMobile ? '-15px' : '0',
          }}>
            <img src={clockImage} style={{
              width: !isMobile ? '94px' : '50px',
              height: !isMobile ? '94px' : '50px',
            }} />
          </Box>
          <CheckCircleOutlineIcon sx={{ color: 'var(--pink)', fontSize: '50px' }} />
          <Typography mt={3} mb={3} sx={{ ...themeStyles.mainHeading, fontSize: '36px', lineHeight: '42px', color: '#101750' }}>
            Your Order Is Completed!
          </Typography>
          <Typography mb={3} sx={{ color: '#8D92A7', fontSize: '16px', lineHeight: '30px' }}>
            Thank you for your order! Your order is being processed and will be completed within 3-6 hours. You will receive an email confirmation when your order is completed.
          </Typography>

          <Button
            variant="contained"
            sx={{ ...themeStyles.productDetailsAddToCartButton, marginBottom: '30px', borderRadius: '3px', padding: '10px 20px' }}
          >
            Continue Shopping
          </Button>
          <Box sx={{
            position: 'absolute',
            right: isMobile ? '-5px' : '-48px',
            bottom: isMobile ? '-10px' : '-45px',
          }}>
            <img src={notepadImage} style={{
              width: !isMobile ? '94px' : '50px',
              height: !isMobile ? '94px' : '50px',
            }} />
          </Box>
        </Box>
        <Box sx={{ marginTop: isMobile ? '20px' : '75px' }}>
          <img src={sponsorsImage} style={{
            maxWidth: !isMobile ? '100%' : '100%',
            height: !isMobile ? 'auto' : 'auto',
          }} />
        </Box>
      </Container>
    </>
  );
}
