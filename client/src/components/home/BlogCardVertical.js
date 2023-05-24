import { Grid, useMediaQuery } from '@mui/material'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { themeStyles } from '../../styles';
import CreateIcon from '@mui/icons-material/Create';
import { Box } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useTheme } from '@emotion/react';


function BlogCardVertical({ blogImage }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Grid item md={4} xs={12}>
            <Card sx={{
                maxWidth: !isMobile ? 345 : "auto",
                boxShadow: '0px 8px 40px rgba(49, 32, 138, 0.05)',
                "&:hover span": {
                    opacity: '0 !important',
                },
                "&:hover .MainHeading": {
                    color: "var(--pink)"
                },
                "&:hover .actionBtn": {
                    color: "var(--pink)"
                }
            }}>
                <CardMedia
                    sx={{
                        height: '255px',
                        width: '370px',
                        borderRadius: "5px",

                    }}
                    component="img"
                    height="140"
                    image={blogImage}
                    alt="green iguana"
                />
                <CardContent>
                    <Box display="flex" alignItems={"center"} justifyContent="space-around">
                        <Typography sx={{ ...themeStyles.latestBlogAuthor, flex: 1 }}>
                            <CreateIcon style={{ color: "var(--pink)", fontSize: "14px", verticalAlign: 'text-top' }} /> Sabir Ali
                        </Typography>
                        <Typography sx={{ ...themeStyles.latestBlogAuthor, flex: 2 }}>
                            <CalendarMonthIcon style={{ color: "#FFA454", fontSize: "14px", verticalAlign: 'text-top' }} /> 21 August 2020
                        </Typography>
                    </Box>
                    <Typography className='MainHeading' gutterBottom variant="h5" component="div" sx={{ ...themeStyles.latestBlogsHeading }} >
                        Top esssential Trends in 2021

                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ...themeStyles.latestBlogDescription }}>
                        More off this less hello samlande lied much over tightly circa horse taped mightly
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className='actionBtn' size="small" color="primary" sx={{ ...themeStyles.latestBlogButton }}>
                        Read More
                    </Button>
                </CardActions>
            </Card>
        </Grid >
    )
}

export default BlogCardVertical