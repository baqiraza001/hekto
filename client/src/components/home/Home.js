import InfoSlider from "./InfoSlider";
import { Container, Box } from '@mui/material';
import FeaturedProducts from "./FeaturedProducts";
import LatestProducts from "./LatestProducts";
import OffersList from "./OffersList";
import UniqueFeatures from "./UniqueFeatures";
import TrendingProducts from "./TrendingProducts";
import TopCategories from "./TopCategories";
import DiscountItem from "./DiscountItem";
import GetUpdates from "./GetUpdates";
import HomeBanner from "./HomeBanner";
import LatestBlogs from "./LatestBlogs";

function Home() {

    return (
        <>
            <InfoSlider />
            <Container maxWidth="md" disableGutters>
                <FeaturedProducts />
                <LatestProducts />
                <OffersList />

            </Container>
            <Box mt={5} display="flex" justifyContent='center' sx={{ 'backgroundColor': 'var(--light-purple)' }}>
                <UniqueFeatures />
            </Box>
            <Container maxWidth="md" disableGutters>
                <TrendingProducts />
                <DiscountItem />
                <TopCategories />
            </Container>
            <GetUpdates />

            <Container maxWidth='md' disableGutters >
                <HomeBanner />
                <LatestBlogs />
            </Container>
        </>
    );
}

export default Home;