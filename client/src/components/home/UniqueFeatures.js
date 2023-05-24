import { Box, Grid, Button, Paper, Typography } from "@mui/material"
import sofa from '../../static/images/sofa2.png';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { themeStyles } from "../../styles";

export default function UniqueFeatures() {
  return (
    <Grid container maxWidth="md">
      <Grid item md={5} xs={12} sx={{ 'paddingRight': { md: '20px' }, marginTop: { xs: '15px' } }}>
        <img src={sofa} width="100%" />
      </Grid>
      <Grid item md={7} xs={12} sx={{ display: 'flex', textAlign: { xs: 'center', md: 'left' }, 'alignItems': 'center' }}>
        <Box dipslay="flex" alignItems="center">
          <Typography variant="h3" sx={{ 'fontFamily': 'var(--josefin) sans', color: 'var(--off-blue)', 'lineHeight': '132%', 'letterSpacing': '0.015em', fontWeight: '700', fontSize: '35px' }}>
            Unique Features Of leatest & Trending Poducts
          </Typography>
                <Typography sx={{ lineHeight: "40px"}}>
                  <FiberManualRecordIcon sx={{fontSize: "15px", marginRight: '10px', color: 'var(--pink)' }} />
                  All frames constructed with hardwood solids and laminates
                </Typography>
                <Typography sx={{ lineHeight: "40px"}}>
                  <FiberManualRecordIcon sx={{fontSize: "15px", marginRight: '10px', color: '#2B2BF5' }} />
                  All frames constructed with hardwood solids and laminates
                </Typography>
                <Typography sx={{ lineHeight: "40px"}}>
                  <FiberManualRecordIcon sx={{fontSize: "15px", marginRight: '10px', color: '#2BF5CC' }} />
                  All frames constructed with hardwood solids and laminates
                </Typography>
                
          <Box display={"flex"} sx={{ margin: "20px 0"}}>
            <Button variant='contained' style={{ 'backgroundColor': 'var(--pink)',  marginRight: "20px" , 'borderRadius': 0, 'padding': '16px 40px', 'fontFamily': 'Josefin Sans', 'fontSize': '17px', 'letterSpacing': '0.02em' }} >Add To Cart</Button>
            <Box>
              <Typography sx={{...themeStyles.uniqueFeature}}>B&B Italian Sofa</Typography>
              <Typography sx={{...themeStyles.uniqueFeaturePrice}}>$32.00</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}