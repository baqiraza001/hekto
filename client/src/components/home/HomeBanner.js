import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import creame from '../../static/images/banners/banner1.jpg';
import { themeStyles } from '../../styles';
import { Link } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <Box mb={5} py={2} px={3} sx={{ "backgroundImage" : `url(${creame})`, 'display':'flex' , 'justifyContent':'space-between','alignItems':'center' }} >
            <Box>
                <Typography fontSize={'24px'} fontFamily={'var(--josefin)'} fontWeight={'600'} fontStyle={'normal'} color={'#151875'} >Ice Creame Store</Typography>
                <Typography fontSize={'14px'} fontFamily={'var(--lato)'} fontWeight={'400'} fontStyle={'normal'} color={'#1A0B5B'} mr={1} >The world is better with the sweets</Typography>
            </Box>
            <Box my={'auto'} >
                <Button sx={{ ...themeStyles.discountBtn, marginTop: 0, padding: '10px', minWidth: '100px' }} ><Link style={{ color: 'inherit', textDecoration: 'none' }} to="/products">Try This</Link></Button>
            </Box>
        </Box>
    )
}

export default HomeBanner