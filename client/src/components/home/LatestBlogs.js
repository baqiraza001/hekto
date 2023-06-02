import { useTheme } from '@emotion/react';
import { Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { themeStyles } from '../../styles'
import BlogCardVertical from './BlogCardVertical'
import blogImage1 from '../../static/images/blogs/blog1.png'
import blogImage2 from '../../static/images/blogs/blog2.png'
import blogImage3 from '../../static/images/blogs/blog3.png'

function LatestBlogs() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container mt={6} rowSpacing={5} columnSpacing={ !isMobile ? 3 : 0} sx={{...themeStyles.latestBlogsContainer}}>
        <Grid item md={12} xs={12} textAlign="center" mb={5}>
            <Typography sx={{...themeStyles.mainHeading}}>
                Latest Blog
            </Typography>
        </Grid>
        <BlogCardVertical blogImage={blogImage1}/>
        <BlogCardVertical blogImage={blogImage2}/>
        <BlogCardVertical blogImage={blogImage3}/>
    </Grid>
  )
}

export default LatestBlogs