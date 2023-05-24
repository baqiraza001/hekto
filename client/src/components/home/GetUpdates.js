import { Box, Button, Grid, Typography } from '@mui/material';
import { themeStyles } from '../../styles';
import getUpdateImage from '../../static/images/updates/update1.png';

const GetUpdates = () => {
    return (
        <Box mt={5} mb={5} display="flex" justifyContent='center' sx={{ "backgroundImage" : `url(${getUpdateImage})`,'backgroundPosition':'center' }}>
        <Grid container maxWidth={'xl'} sx={{ 'height':'300px' }}>
            <Box sx={{'width':'550px','marginX':'auto','marginY':'auto'}}  >
                <Box>
                    <Typography sx={{ ...themeStyles.updatesHeading }}>Get Latest Update By Subscribe Our Newsletter</Typography>
                </Box>
                <Box textAlign={'center'} >
                    <Button sx={{ ...themeStyles.discountBtn }}>Shop Now</Button>
                </Box>
            </Box>
        </Grid>
        </Box>
    );
};

export default GetUpdates;